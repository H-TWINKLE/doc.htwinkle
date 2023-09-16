---
title: 新服务器指导步骤
date: 2023-09-03
tags:
- centos
- docker
- docker-compose
categories:
- centos
- linux
- docker
---

## 新服务器安装指导

1. 安装docker

```shell
curl -sSL https://get.daocloud.io/docker | sh
# 2. 启动docker
sudo systemctl start docker
```

2. 安装nginx

```shell
bash -c "$(curl -L s.aaa.al/nginx_install.sh)"
```
```shell
# 使用软连接来连接
ln -s /usr/local/nginx/sbin/nginx  /usr/local/bin
# 连接配置文件快捷方式
ln -s /usr/local/nginx/conf  /opt/app/nginx/conf
```

3. 使用docker-compose
4. 部署使用