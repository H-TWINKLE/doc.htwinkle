---
title: centos 可用的app 
date: 2019-05-29
tags:
- centos
- notepad
- navicat
- RedisDesktopManager
- shell
categories:
- centos
- linux
---

## Notepad++

1. 下载环境

```shell
wget -O /etc/yum.repos.d/sea-devel.repo http://sea.fedorapeople.org/sea-devel.repo
```

2. 下载依赖

```shell
sudo yum install -y qt5-qtbase-devel qt5-qttools-devel qt5-qtwebkit-devel qt5-qtsvg-devel
```

3. 下载安装

```shell
sudo yum install notepadqq
```

## Navicat

1. 下载

```shell
wget http://download.navicat.com.cn/download/navicat121_premium_cs_x64.tar.gz
```

2. 解压

```shell
tar -zxvf navicat121_premium_cs_x64.tar.gz
```

3. 破解教程

https://www.cnblogs.com/liujiacai/p/11582000.html
https://www.jb51.net/database/664158.html

4. 运行脚本

```shell
yum install wine
env LC_ALL=zh_CN.UTF-8 wine /Navicat/Navicat.exe
```

## RedisDesktopManager

```shell
sudo yum install epel-release
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
sudo snap install redis-desktop-manager

##地址  
/snap/bin/redis-desktop-manager.rdm
```


