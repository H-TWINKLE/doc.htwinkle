---
title: python3 运行环境 
date: 2020-05-29
tags:
- centos
- python3
categories:
- centos
---

#### 在安装Python之前，需要先安装一些后面遇到的依赖问题（如果有依赖问题，按照提示安装）

```shell
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
```

## 安装步骤

1. 下载命令

```shell
wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tgz
```

2. 解压文件

```shell
tar -xvf Python-3.6.4.tgz
```

3. 创建安装路径

```shell
mkdir -p /usr/local/Python3
```

4. 配置安装路径

```shell
cd Python-3.6.4
./configure --prefix=/usr/local/python3
```

5. 编译安装

```shell
make
make install
```

6. 软链接

```shell
ln -s /usr/local/python3/bin/python3.6 /usr/bin/python3
```

7. 设置pip软连接

```shell
ln -s /usr/local/python3/bin/pip3.6 /usr/bin/pip3
```

8.测试安装情况

```shell
python3 -V
```


