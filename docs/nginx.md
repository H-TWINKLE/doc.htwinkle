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

## 配置
文件不存在，重定向到首页（针对vue）
```shell
try_files $uri $uri/ /index.html;
```