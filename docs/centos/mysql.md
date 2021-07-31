---
title: mysql 运行环境 
date: 2020-05-29
tags:
- centos
- mysql
categories:
- centos
---

## 安装步骤

1. 下载命令

```shell
wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
```

2. mysql源

```shell
yum localinstall mysql57-community-release-el7-8.noarch.rpm
```

3. 先尝试安装

```shell
yum install -y mysql-community-server
```

如果可以安装那么安装之后查询mysql版本

```shell
mysql -V
```

显示5.7版本则安装成功

## 修改安装源5.7为5.6

1. 修改mqsql源

```shell
# 要安装5.6版本，将5.7源的enabled=1改成enabled=0。然后再将5.6源的enabled=0改成enabled=1即可
vi /etc/yum.repos.d/mysql-community.repo
```

配置信息

```shell
[mysql55-community]
name=MySQL 5.5 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.5-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

# Enable to use MySQL 5.6
[mysql56-community]
name=MySQL 5.6 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.6-community/el/7/$basearch/
enabled=0 #####################################
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=1 #######################################
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

[mysql-tools-preview]
name=MySQL Tools Preview
baseurl=http://repo.mysql.com/yum/mysql-tools-preview/el/7/$basearch/
enabled=0
```

## 启动mysql服务

```shell
systemctl start mysqld
```

## mysql开启启动

```shell
systemctl enable mysqld
```

## 查看mysql密码

```shell
grep 'temporary password' /var/log/mysqld.log
```

## 修改密码

```shell
# 1、设置安全级别
set global validate_password_policy=0;
# 2、默认密码为8，可以设置为其他值，最小4位
set global validate_password_length=4;
# 3、设置root密码
set password for root@localhost = password('新密码');
# 4、mode报错则修改配置文件
sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```


