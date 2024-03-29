---
title: docker 使用
date: 2022-11-05
tags:

- docker
- centos
- shell

categories:

- docker
- linux
- centos

---

## docker的四种网络模式

1. host模式: 容器和宿主机共享network，这时候localhost就可以访问宿主机端口了。

```shell
docker run -d --network host --name nginx
```

2. container模式: 容器A和容器B共享network，就是说容器之间可以通过localhost直接访问。

```shell
docker run -d --network container --name nginx
```

3. none模式: 容器与宿主机隔绝，不能联网，安全性最高，一般很少用到。

```shell
docker run -d --network none --name nginx
```

4. bridge模式(默认模式): 每个容器有自己的network，通过localhost访问不到宿主机

```shell
docker run -d --name nginx
```

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

## 查看运行

```shell
docker ps -l
```

## 停止

```shell
sudo docker stop 10.26.1.6:30522/python:3.7-flask
```

## 移除

移除后，才可再运行新的容器

```shell
docker rm -f d18c26354e59
```

## 查看容器的日志

```shell
docker logs -f d78b56c80ec2
```

# centos 安装

[帮助文档](https://www.cnblogs.com/yufeng218/p/8370670.html)

1. 使用 root 权限登录 Centos,确保 yum 包更新到最新

```shell
 sudo yum update
```

2. 安装需要的软件包， yum-util 提供yum-config-manager功能，另外两个是devicemapper驱动依赖的

```shell
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

3. 设置yum源

```shell
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

4. 安装docker

```shell
sudo yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版17.12.0
```

5. 启动并加入开机启动

```shell
sudo systemctl start docker
sudo systemctl enable docker
```

6. 验证安装是否成功

```shell
docker version
```