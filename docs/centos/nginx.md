---
title: nginx 运行环境 
date: 2020-05-29
tags:
- centos
- nginx
- shell
categories:
- centos
- linux
---

####       

## 安装步骤

1. 下载命令

```shell
wget http://nginx.org/download/nginx-1.17.5.tar.gz
```

2. 解压文件

```shell
tar -zxvf nginx-1.17.5.tar.gz  
```

3. 环境检测

```shell
./configure
```

如果没有出现./configure: error提示，表示当前环境可以安装nginx

4. 编译安装

```shell
make
make install
```

5. 配置nginx开机启动

```shell
cd /lib/systemd/system/
vim nginx.service
```

6. 书写以下配置信息

```shell
[Unit]
Description=nginx 
After=network.target 
   
[Service] 
Type=forking 
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx reload
ExecStop=/usr/local/nginx/sbin/nginx quit
PrivateTmp=true 
   
[Install] 
WantedBy=multi-user.target
```

7.退出保存

```shell
:wq
```

## 开机启动nginx服务

```shell
systemctl enable nginx.service
```

## 启动nginx服务

```shell
systemctl start nginx.service
```

## 结束nginx服务

```shell
systemctl stop nginx.service 
```

## 重启nginx服务

```shell
systemctl restart nginx.service 
```