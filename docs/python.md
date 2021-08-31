---
title: python3 使用技巧
date: 2021-08-02
tags:
- python
- python3
categories:
- python3
---

## 通用的package启动脚本

```py
## 文件名称 Run.py

import os
import runpy
import sys

# 通用的启动路径
if __name__ == '__main__':
    path = os.path.dirname(sys.modules[__name__].__file__)
    path = os.path.join(path, '..')
    sys.path.insert(0, path)
    runpy.run_module('{0}.App'.format(os.getcwd().split(os.sep)[-1]), run_name="__main__", alter_sys=True)
```

## 下载依赖

```shell
pip install -i http://mirrors.aliyun.com/pypi/simple/  --trusted-host mirrors.aliyun.com pypiwin32
```

## pyinstaller 打包

```shell
pyinstaller -F -i icon/ideaCode.ico GetIdeaCode.py --exclude-module PyQt5 ^ --exclude-module pydoc
pyinstaller -D -p pycharts -i icon/analyzeInfo.ico analyzeNetworkDataSize/App.py
```

```text
-F, –onefile 打包一个单个文件，如果你的代码都写在一个.py文件的话，可以用这个，如果是多个.py文件就别用 
-D, –onedir 打包多个文件，在dist中生成很多依赖文件，适合以框架形式编写工具代码，我个人比较推荐这样，代码易于维护 
-K, –tk 在部署时包含 TCL/TK -a, –ascii 不包含编码.在支持Unicode的python版本上默认包含所有的编码. 
-d, –debug 产生debug版本的可执行文件 
-w,–windowed,--noconsole 使用Windows子系统执行.当程序启动的时候不会打开命令行(只对Windows有效)
-c,–nowindowed,–console 使用控制台子系统执行(默认)(只对Windows有效)

pyinstaller -c xxxx.py 
pyinstaller xxxx.py --console

-s,–strip 可执行文件和共享库将run through strip.注意Cygwin的strip往往使普通的win32 Dll无法使用. 
-X, –upx 如果有UPX安装(执行Configure.py时检测),会压缩执行文件(Windows系统中的DLL也会)(参见note)
-o DIR, –out=DIR 指定spec文件的生成目录,如果没有指定,而且当前目录是PyInstaller的根目录,会自动创建一个用于输出(spec和生成的可执行文件)
的目录.如果没有指定,而当前目录不是PyInstaller的根目录,则会输出到当前的目录下. 
-p DIR, –path=DIR 设置导入路径(和使用PYTHONPATH效果相似).可以用路径分割符(Windows使用分号,Linux使用冒号)分割,指定多个目录.也可以使用多个-p参数来设置多个导入路径，让pyinstaller自己去找程序需要的资源 
–icon=<FILE.ICO>将file.ico添加为可执行文件的资源(只对Windows系统有效)，改变程序的图标 
pyinstaller -i ico路径 xxxxx.py –icon=<FILE.EXE,N> 将file.exe的第n个图标添加为可执行文件的资源(只对Windows系统有效)
-v FILE, –version=FILE 将verfile作为可执行文件的版本资源(只对Windows系统有效)
-n NAME, –name=NAME 可选的项目(产生的spec的)名字.如果省略,第一个脚本的主文件名将作为spec的名字

```

## 通用的logger日志处理器

```shell
import logging
import os
import time
from logging import Handler, FileHandler, StreamHandler


class PathFileHandler(FileHandler):
    def __init__(self, path, filename, mode='a', encoding='utf-8', delay=False):
        if not os.path.exists(path):
            os.mkdir(path)
        self.baseFilename = os.path.join(path, filename)
        self.mode = mode
        self.encoding = encoding
        self.delay = delay
        if delay:
            Handler.__init__(self)
            self.stream = None
        else:
            StreamHandler.__init__(self, self._open())


class LoggerKit(object):
    # 日志级别关系映射
    level_relations = {
        'debug': logging.DEBUG, 'info': logging.INFO, 'warning': logging.WARNING,
        'error': logging.ERROR, 'critical': logging.CRITICAL
    }

    def __init__(self, class_name=__name__, level='info', log_dir='log',
                 fmt='%(asctime)s.%(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s'):
        self.logger = logging.getLogger(class_name)
        # 不传递给上级logger
        self.logger.propagate = 0
        self.logger.setLevel(self.level_relations.get(level))  # 设置日志级别
        self.directory = os.path.join(os.getcwd(), log_dir)
        format_str = logging.Formatter(fmt)  # 设置日志格式
        stream_handler = logging.StreamHandler()  # 往屏幕上输出
        stream_handler.setFormatter(format_str)
        file_handler = PathFileHandler(path=self.directory,
                                       filename='{date}.log'.format(
                                           date=time.strftime("deis_platform_api_%Y_%m_%d", time.localtime())),
                                       mode='a')
        file_handler.setFormatter(format_str)
        self.logger.addHandler(stream_handler)
        self.logger.addHandler(file_handler)

    def get_logger(self):
        return self.logger


LOGGER = LoggerKit()

if __name__ == "__main__":
    txt = "将信息打印到日志文件中......"
    log = LoggerKit(level='debug')
    log.logger.info(4)
    log.logger.info(5)
    log.logger.info(txt)

```

## 通用的获取配置

```shell
import configparser

from ToolKit.kit.LoggerKit import LOGGER


class OptionKit:
    def __init__(self, *name):
        """获取基础配置"""
        self.default_file_name = 'config.ini'
        self.configKey = 'default'
        self.file_name = self.init_file_name(name)
        self.config = configparser.RawConfigParser()
        self.__init_read_file()

    def __init_read_file(self):
        self.config.read(self.file_name, encoding='utf-8-sig')
        # print(self.config.sections())

    def init_file_name(self, *name):
        if name is None or len(name) <= 1:
            return self.default_file_name
        else:
            return name[0]

    def get_conf(self, key, default=None):
        """获取某一个配置文件"""
        try:
            value = self.config.get(self.configKey, key)
            LOGGER.get_logger().info('get conf {0} value:{1}'.format(key, value))
            return value
        except configparser.NoSectionError as e:
            LOGGER.get_logger().info('get conf error: {0}  why: {1}'.format(key, e))
            return default
        except KeyError as e:
            LOGGER.get_logger().info('get conf error: {0}  why: {1}'.format(key, e))
            return default
        except configparser.NoOptionError as e:
            LOGGER.get_logger().info('get conf error: {0}  why: {1}'.format(key, e))
            return default

    def write_conf(self, key, value):
        """写入某一个配置文件"""
        self.config.set(self.configKey, key, value)

    def get_all_config_key(self):
        return self.config.items(self.configKey)

    def quote_config(self, value: str):
        """替换字符串中配置key的值到配置的值中"""
        items = self.get_all_config_key()
        for item in items:
            if len(value.split('%')) > 1 and item[0] in value:
                return value.replace('%{0}%'.format(item[0]), item[1])
        return value

```



