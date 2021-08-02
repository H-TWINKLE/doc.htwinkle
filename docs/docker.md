---
title: docker 使用
date: 2021-08-02
tags:
- docker
- centos
- shell
categories:
- docker
- linux
- centos
---

## 登录

```shell
docker login 10.26.1.6:30522
```

## tag

```shell
docker tag 10.26.1.6:30522/python:3.7 10.26.1.6:30522/python:3.7-flask
```

## 下载pip插件

```shell
docker run -t -i 10.26.1.6:30522/python:3.7-flask  pip install   -i http://mirrors.aliyun.com/pypi/simple/ lxml --trusted-host mirrors.aliyun.com
```

## 查看运行

```shell
docker ps -l
```

## 提交更改

```shell
docker commit -m 'add flask' -a 't' c2f9ec10d007  10.26.1.6:30522/python:3.7-flask
```

## 推送

```shell
docker push 10.26.1.6:30522/python:3.7-flask
```

## 挂载&运行

```shell
sudo docker run -v /opt/app/abc/python_webs:/home 10.26.1.6:30522/python:3.7-flask python /home/abc/Run.py

sudo docker run -p 9020:9020 -d -v /opt/app/abc/python_webs:/home -w /home/tool 10.26.1.6:30522/python:3.7-flask python WebRun.py
```

## 停止

```shell
sudo docker stop 10.26.1.6:30522/python:3.7-flask
```

## 移除

```shell
docker rm -f d18c26354e59
```


