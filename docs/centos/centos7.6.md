---
title: centos 7.6
date: 2022-11-05
tags:

- centos
- docker

categories:

- nginx
- mysql

---

最新重新白嫖了一台服务器，重新开始装机之旅~
现在一切已docker为容器注入需要的服务，所以第一要务就是docker~

## centos使用docker镜像

帮助来源 https://www.runoob.com/docker/centos-docker-install.html

```shell
# 1. 安装docker
curl -sSL https://get.daocloud.io/docker | sh
# 2. 启动docker
sudo systemctl start docker
# 3. 卸载docker
yum remove docker-ce
```

1. 按照之前的规划，使用容器加载nginx然后代理给所有的服务使用，
2. 后来发现应该在外部安装nginx，其他服务使用nginx做统一转发，即减少各容器依赖nginx，又可以独立使用nginx，一举多得

## centos安装nginx

见 nginx.md

### docker安装nginx

```shell
# 拉取镜像
docker pull nginx:latest
# 创建外部conf目录
mkdir -p /home/local/docker/nginx/{conf,logs}
# 拷贝conf到外部目录
# 启动程序
# docker run --name nginx -d -p 80:80  -v /home/local/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf --privileged=true -d nginx
docker run --name nginx -d -p 80:80  -v /home/local/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /home/local/docker/nginx/conf/conf.d:/etc/nginx/conf.d  -v /home/local/docker/nginx/logs:/var/log/nginx -d nginx
# 停止容器
docker stop nginx
# 再次启动容器
docker restart nginx
# 移除容器
docker rm -f nginx
# 进入容器
docker exec -it nginx /bin/bash
```

conf文件

```text

#user  nobody;
worker_processes  1;
 
 
events {
    worker_connections  1024;
}
 
 
http {
    include       mime.types;
    default_type  application/octet-stream;
 
    sendfile        on;
   
    keepalive_timeout  65;
 
    server {
        listen       80;
        server_name  localhost;
 
        location / {
            root   /usr/share/nginx/html;    #指定容器中的路径
            index  index.html index.htm;
        }
 
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
           root   /usr/share/nginx/html;   #指定容器中的路径
        }
    }
    include /etc/nginx/conf.d/*.conf;

}
```
















