---
title: centos 7.6
date: 2022-11-10
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

## centos安装 nginx

见 nginx.md

## docker安装 MySQL5.7
```shell
# 创建需要挂载的目录（自定义，这里只是举例，不一定要按照例子来）
mkdir -p /home/app/docker/mysql5.7/{conf,data,log}
#dokcer pull 镜像名:版本号
docker pull mysql:5.7
# -v 宿主机的被挂载路径:容器内需要挂载的路径
docker run -p 3306:3306 --name mysql5.7 \
-v /home/app/docker/mysql5.7/conf:/etc/mysql/mysql.conf.d \
-v /home/app/docker/mysql5.7/log:/var/log/ \
-v /home/app/docker/mysql5.7/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=asd123456 \
-d mysql:5.7
# 进入容器
docker exec -it mysql5.7 /bin/bash
```

## docker安装 java1.8
```shell
docker pull majiajue/jdk1.8
# jar目录
mkdir -p /home/app/htwinkle.cn.web/
# 运行容器
# 后台运行：需要java的指令前台运行
docker run -p 9011:9011 --name htwinkle.cn.web \
--network host \
-v /home/app/htwinkle.cn.web/:/home \
-w /home/web \
-itd majiajue/jdk1.8 \
/bin/bash ./runServer.sh start
# 前台运行可进入容器
# 进入容器，运行相关项目
docker exec -it jdk1.8 /bin/bash
# 执行指令
# 容器内部执行指令
cd /home/web/ && chmod +755 runServer.sh && ./runServer.sh start
```

### docker安装nginx

```shell
# 拉取镜像
docker pull nginx:latest
# 创建外部conf目录
mkdir -p /home/app/docker/nginx/{conf,logs}
# 拷贝conf到外部目录
# 启动程序
# docker run --name nginx -d -p 80:80  -v /home/local/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf --privileged=true -d nginx
docker run --name nginx -d -p 80:80  \
-v /home/app/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/app/docker/nginx/conf/conf.d:/etc/nginx/conf.d  \
-v /home/app/docker/nginx/logs:/var/log/nginx \
-d nginx
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
















