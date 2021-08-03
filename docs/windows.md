---
title: window 使用技巧
date: 2021-08-02
tags:
- window
- bat
categories:
- window
---

## 在dns服务器查找ip

```shell
nslookup htwinkle.cn 8.8.8.8
```


## win10专业版通用密钥

```shell
 VK7JG-NPHTM-C97JM-9MPGT-3V66T
```

## 管理员身份运行cmd

```shell

@echo off
mode con lines=30 cols=60
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"


cmd python E:\WorkSpace\MyPython\Auto_IP.py
```

## host修改

```shell
start "D:\\WorkSoft\\Notepad++\\notepad++" notepad++.exe  "E:\\WorkSpace\\MyPython\\info.ini"
```

## 强制移除文件夹

```shell
# /S 表示除目录本身外，还将删除指定目录下的所有子目录和文件。用于删除目录树。
# /Q安静模式，带/S 删除目录树时不要求确认

rd /s/q d:\workSpace\python_webs
```




