---
title: nginx 使用
date: 2021-08-02
tags:
- nginx
- vue
categories:
- nginx
- linux
---

## 路径

```shell
/usr/local/nginx/sbin/
```

## 配置

文件不存在，重定向到首页（针对vue）

```shell
try_files $uri $uri/ /index.html;
```

## 支持php

```shell
server {
	
    listen       80;
    server_name  netmusic.htwinkle.cn;

    location / {
        root   /root/app_web/netMusic/Meting/src;
        index  index.html index.htm index.php Meting.php;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  /www/$fastcgi_script_name;
        include        fastcgi_params;
    }
	
}
```