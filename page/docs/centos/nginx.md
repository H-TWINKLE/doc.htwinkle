---
title: nginx 运行环境
date: 2022-11-05
tags:

- centos
- nginx
- shell

categories:

- centos
- linux

---

## 安装步骤

1. 下载命令

```shell
mkdir -p /home/app/nginx
cd /home/app/nginx
wget http://nginx.org/download/nginx-1.23.2.tar.gz
```

2. 解压文件

```shell
tar -zxvf nginx-1.23.2.tar.gz
```

3. 进入目录

```shell
cd nginx-1.23.2/
```

3. 环境检测

```shell
./configure --with-stream
```

如果没有出现./configure: error提示，表示当前环境可以安装nginx

4. 编译安装

```shell
make && make install
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

## 链接nginx环境变量

```shell
# 默认的地址
/usr/local/nginx/sbin/nginx -s reload
# 方案1 环境变量
vim /etc/profile
PATH=$PATH: /usr/local/nginx/sbin  //这个是你nginx的位置
export PATH
# 方案2 使用软连接来连接
ln -s /usr/local/nginx/sbin/nginx  /usr/local/bin
```

## 配置文件所在目录

```shell
/usr/local/nginx/conf
# 连接快捷方式
ln -s /usr/local/nginx/conf  /home/app/nginx/conf
```

## 配置中保留远程地址的真实ip

```shell
#保留代理之前的host 包含客户端真实的域名和端口号
proxy_set_header    Host  $host; 
#保留代理之前的真实客户端ip
proxy_set_header    X-Real-IP  $remote_addr;  
#这个Header和X-Real-IP类似，但它在多级代理时会包含真实客户端及中间每个代理服务器的IP
proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
```