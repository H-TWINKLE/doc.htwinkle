---
title: centos 防火墙 
date: 2019-03-29
tags:
- centos
- firewall
- shell
categories:
- centos
- linux
---

1. 通过systemctl start firewalld开启防火墙，没有任何提示即开启成功
2. 再次通过systemctl status firewalld查看firewalld状态，显示running即已开启了
3. 如果要关闭防火墙设置，可能通过systemctl stop firewalld这条指令来关闭该功能。
4. 再次执行执行firewall-cmd --permanent --zone=public --add-port=3306/tcp，提示success，表示设置成功，这样就可以继续后面的设置了。
5. firewall-cmd --reload 重启
6. 查看状态 firewall-cmd --list-all