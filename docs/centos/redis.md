---
title: redis 运行环境 
date: 2020-05-29
tags:
- centos
- redis
categories:
- centos
---

## 下载压缩包

```shell
wget http://download.redis.io/releases/redis-5.0.5.tar.gz
```

## 解压

```shell
tar xzf redis-5.0.5.tar.gz
```

## 删除压缩包

```shell
rm -f redis-5.0.5.tar.gz
```

## 编译

```shell
make
make install
```

## 配置文件

```shell
vim /usr/develop/redis-5.0.5/redis.conf
# 找到daemonize no 改为daemonize yes

#:wq 保存退出
```

## 添加为系统服务

```shell
vim /usr/lib/systemd/system/redis-server.service
```

redis-server.service 内容详情

```shell
[Unit]
Description=The redis-server Process Manager
After=syslog.target network.target
 
[Service]
Type=simple
PIDFile=/var/run/redis.pid
ExecStart=/usr/local/bin/redis-server  /usr/develop/redis-5.0.5/redis.conf
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
 
[Install]
WantedBy=multi-user.target
```

## 开启服务

```shell
systemctl start redis-server
```

## 开机启动

```shell
systemctl enable redis-server
```

## 启动服务

```shell
redis-server '/usr/develop/redis-5.0.5/redis.conf'
```

## 运行

```shell
redis-cli
```
