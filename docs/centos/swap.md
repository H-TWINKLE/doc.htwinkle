---
title: centos swap 虚拟内存技术 
date: 2020-01-06
tags:
- centos
- swap
categories:
- centos
---

## 内存使用率超过X时开始使用交换分区

1. 临时修改

```shell
sysctl vm.swappiness=10
```

2. 查看swappiness当前设置的值

```shell
cat /proc/sys/vm/swappiness
```

3. 永久修改

```shell
在 vi /etc/sysctl.conf 文件添加 vm.swappiness=0 行
```

## 创建swap虚拟分区

1. 创建虚拟内存

```shell
# 从分区分出2x1024M大小的空间，挂在/swap上
dd if=/dev/zero of=/swap bs=2048 count=1024000
```

2. 格式化成swap格式

```shell
mkswap /swap
```

3. 激活/swap，加入到swap分区中

```shell
swapon /swap
```

4. 赋予权限

```shell
chmod -R 0600 /swap
```

5.开机自启动新添加的swap分区

```shell
vi /etc/fstab
# 添加
/swap swap swap defaults 0 0
```

6. 删除分区

```shell
swapoff /swap
```

7. 查看创建的虚拟内存地址信息

```shell
ll /swap -h
```

8. 查看当前系统的内存信息

```shell
free -m
```


