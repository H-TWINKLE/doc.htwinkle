---
title: java 运行环境 
date: 2020-05-29
tags:
- centos
- java
- shell
categories:
- centos
- linux
---

## 查询CentOS自带的Java相关组件

```shell
rpm -qa|grep java
```

## 移除所有关于jdk的安装

```shell
rpm -e --nodeps `rpm -qa | grep jdk`
```

## 下载压缩包

```shell
wegt https://download.oracle.com/otn/java/jdk/8u231-b11/5b13a193868b4bf28bcb45c792fce896/jdk-8u231-linux-x64.tar.gz?AuthParam=1572534264_25773073fe2c2b67729b0a5d367dadd5
```

## 解压

```shell
tar -zxvf jdk-8u231-linux-x64.tar.gz
```

## 删除压缩包

```shell
rm -f jdk-8u181-linux-x64.tar.gz
```

## 进入环境变量，编辑

```shell
vim /etc/profile

# 输入以下
export JAVA_HOME=/usr/java/jdk1.8.0_221
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib

#:wq 保存退出
```

## 使环境生效

```shell
source /etc/profile
```


