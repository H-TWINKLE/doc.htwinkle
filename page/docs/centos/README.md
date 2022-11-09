---
title: centos 桌面运行环境 
date: 2020-05-29
tags:
- centos
- GNOME
- shell
categories:
- centos
- linux
---

#### CENTOS是最小化安装的，默认都是不带X WINDOWS的，所以在安装这些桌面之前得先安装一下X WINDOWS，这个控制功能

```shell
yum upgrade
yum -y groupinstall "X Window System"
```

## 安装GNOME桌面环境

```shell
yum -y groups install "GNOME Desktop"
```

## 启动桌面

```shell
startx
```

## 重启GNOME桌面进程

```shell
startx
```

## 杀死GNOME桌面进程

```shell
killall -9 gnome-shell
```

#### 如果需要在WINDOWS端远程桌面连接CENTOS的这些桌面系统，可以这样做

## 防火墙 方便远程连接

```shell
firewall-cmd --permanent --zone=public --add-port=3306/tcp

systemctl start firewalld
```

## 配置源

```shell
yum install  epel* -y
```

## 安装xrdp

```shell
yum --enablerepo=epel -y install xrdp
```

## 启动xrdp并设置开机启动

```shell
systemctl start xrdp
systemctl enable xrdp
reboot
```