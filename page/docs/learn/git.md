---
title: git 常用命令
date: 2021-08-03
tags:
- git
- shell
- ssh
categories:
- git
- ssh
---

## 移除远程服务器上已经提交的文件

```shell
# 移除 .idea文件夹
git rm -r --cached .idea
```

## 使用多个独立密钥进行ssh

1. 生成独立的密钥

```shell
ssh-keygen -t rsa -C "zhanghjqqqq@163.com" -f id_github
```

2. 配置配置文件

```shell
# 路径：~/.ssh
# 文件名称 config

Host github.com
    HostName github.com
    IdentityFile C:\Users\TWINKLE\.ssh\id_github
    PreferredAuthentications publickey
```

3. 测试

```shell
ssh -T git@github.com
# 显示以下信息则成功：
# Hi kevinkelin! You've successfully authenticated, but GitHub does not provide shell access.
```

4. 添加id_github.pub内容到github

5. 局部配置git配置信息

```shell
git config user.email zhanghjqqqq@163.com
git config user.name TWINKLE
```