---
title: php 安装使用
date: 2021-08-11
tags:
- docker
- centos
- shell
- php
categories:
- docker
- linux
- centos
- php
---

# 使用

[技术指导](https://www.jianshu.com/p/43037ce40b00)

1. 安装php镜像

```shell
docker pull php:7.1.30-fpm
```

2. 创建文件

```shell
#文件名称：index.php
# 文件路径：/root/app_web/netMusic/Meting/src/index.html
<?php
   phpinfo();
?>
```

3. 启动

```shell
docker run --name  myphp7 -p 9000:9000 -v /root/app_web/netMusic/Meting/src:/www  -d php:7.1.30-fpm
```