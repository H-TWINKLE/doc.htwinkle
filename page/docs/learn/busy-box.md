---
title: 基于linux的终端盒子定时重启
date: 2022-11-11
tags:

- linux
- busybox

categories:

- busybox

---

## ~~基于linux的终端盒子定时重启~~

~~<p style="color: #991919">已经放弃，发现盒子重启后配置都不见了。。。。</p>~~

## 登录管理端页面 192.168.1.1

## 开启 telnet

```html
http://192.168.1.1/getpage.gch?pid=1002&nextpage=tele_sec_tserver_t.gch
```

## 进入终端

1. 下载putty
2. ip 192.168.1.1 选择telnet(23端口)
3. 用户名：CMCCAdmin
4. 密码：aDm8H%MdA
5. 输入su提权，密码：aDm8H%MdA

## 编辑定时任务

由于var目录下的内容实际为内存虚拟的，并不存在与flash之中，重启后消失。为保证系统每次启动自动执行，需执行以下步骤：

```shell
# 查看
cat /etc/crontabs/root
mkdir -p /etc/crontabs/
vi /etc/crontabs/root
```

按i,输入以下内容,按esc,输入:wq

```text
0 4 * * * reboot
```

直接输入，一气呵成

```shell
#输入
echo '0 4 * * * reboot' > /etc/crontabs/root
#查看
cat /etc/crontabs/root
```

## 方案1：设置开机自启动（无效）

1.在/etc/init.d/rcS修改，让开发板每次启动之后自动执行(无效，开机会重置)

```shell
vi /etc/init.d/rcS
```

2.以下文本放置在最后面

```shell
## p cron config file
mkdir -p /var/spool/cron/crontabs
cp -p /etc/crontabs/root /var/spool/cron/crontabs

chmod 777 /var/spool/cron/crontabs/root

busybox crond
echo "cp cron config file to /var/spool/cron/crontabs"
```

3.重启

```shell
reboot
```

## 方案2：设置开机自启动

1.新建启动脚本

```shell
# 查看启动脚本
cat /etc/init.d/S77crond
# 编辑启动脚本
vi /etc/init.d/S77crond
```

2.输入一下内容，并保存

```shell
#!/bin/sh

umask 077

start() {
        mkdir -p /var/spool/cron/crontabs
        cp -p /etc/crontabs/root /var/spool/cron/crontabs
        chmod 777 /var/spool/cron/crontabs/root
        busybox crond
        echo "Start cronScript"
}

stop() {
        echo "Stopping cronScript"
}

restart() {
        stop
        start
}

case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart|reload)
        restart
        ;;
  *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
esac

exit $?

```

3.重启

```shell
reboot
```

重启crond

```shell
crond
```

##查看定时任务

```shell
crontab -l
```
