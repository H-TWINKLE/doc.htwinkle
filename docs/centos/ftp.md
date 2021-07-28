---
title: ftp 运行环境 
date: 2020-05-29
tags:
- centos
- ftp
categories:
- centos
---

### 安装指导

[Centos搭建FTP服务器](https://www.jianshu.com/p/2cc9f4ca5bce)

[Centos7搭建FTP服务详细过程](https://blog.csdn.net/sinat_30802291/article/details/81706152)

1. 检查是否安装vsftpd

```shell
vsftpd -v
```

若输出版本号则已安装，否则需要自行安装

2. 安装vsftpd

```shell
yum install vsftpd
```

3. 启动vsftpd

```shell
systemctl start vsftpd
# 或者
service vsftpd start
```

4. 查看端口监听

```shell
netstat -nltp | grep 21
```

5. vsftp扩展信息介绍

```text

I. 配置文件

    vsftpd 的配置目录为 /etc/vsftpd，包含下列的配置文件：

    vsftpd.conf 为主要配置文件
    ftpusers 配置禁止访问 FTP 服务器的用户列表
    user_list 配置用户访问控制

我们在vsftpd.conf中完成绝大部分配置，简单的ftp功能也可以只配置此文件。安装完成后服务会新建一个ftp用户和ftp的组，通常指向home目录为/var/ftp,默认是nologin（不能登录系统），具体的可以去/etc/passwd下查看：cat /etc/passwd

II. 用户类型

    本地用户（local）：用户在FTP服务器拥有账号，且该账号为本地用户的账号，可以通过自己的账号和口令进行授权登录，登录目录为自己的home目录$HOME
    虚拟用户（guest）：用户在FTP服务器上拥有账号，但该账号只能用于文件传输服务。登录目录为某一特定的目录，通常可以上传和下载
    匿名用户（anonymous）：用户在FTP服务器上没有账号，登录目录为/var/ftp
    对于vsftpd默认配置是开启了本地用户和匿名用户，可以直接登录的。

III. 连接模式

    FTP的连接一般是有两个连接的，一个是客户程和服务器传输命令的，另一个是数据传送的连接。FTP服务程序一般会支持两种不同的模式，一种是主动（Port）模式，一种是被动（Passive）模式(又称Pasv Mode),我先说说这两种不同模式连接方式的分别。(先假设客户端为C,服务端为S。)

    主动（Port）模式:
    当客户端C向服务端S连接后，使用的是Port模式,那么客户端C会发送一条命令告诉服务端S(客户端C在本地打开了一个端口N在等着你进行数据连接),当服务端S收到这个Port命令后 就会向客户端打开的那个端口N进行连接，这种数据连接就生成了。

    被动（Pasv）模式:
    当客户端C向服务端S连接后，服务端S会发信息给客户端C,这个信息是(服务端S在本地打开了一个端口M,你现在去连接我吧),当客户端C收到这个信息后，就可以向服务端S的M端口进行连接,连接成功后，数据连接也建立了。

    从上面的解释中，大家可以看到两种模式主要的不同是数据连接建立的不同，对于Port模式，是客户端C在本地打开一个端口等服务端S去连接建立数据连接；而Pasv模式就是服务端S打开一个端口等待客户端C去建立一个数据连接。

IV. 防火墙管理

    对于CentOS 7 它的默认防火墙已改为FireWall进行管理，但还是有用iptables的，以及SELinux。

    firewall
        firewall能够允许哪些服务可用，那些端口可用…. 属于更高一层的防火墙。
        firewall的底层是使用iptables进行数据过滤，建立在iptables之上。
        firewall是动态防火墙，使用了D-BUS方式，修改配置不会破坏已有的数据链接。

    iptables
        iptables用于过滤数据包，属于网络层防火墙.
        在设置iptables后需要重启iptables，会重新加载防火墙模块，而模块的装载将会破坏状态防火墙和确立的连接。会破坏已经对外提供数据链接的程序。可能需要重启程序。

    SELinux
        SELinux(Security-Enhanced Linux) 是美国国家安全局（NSA）对于强制访问控制的实现，是 Linux历史上最杰出的新安全子系统。它不是用来防火墙设置的。但它对Linux系统的安全很有用。Linux内核(Kernel)从2.6就有了SELinux。
        SELinux是一种基于 域-类型 模型（domain-type）的强制访问控制（MAC）安全系统，它由NSA编写并设计成内核模块包含到内核中，相应的某些安全相关的应用也被打了SELinux的补丁，最后还有一个相应的安全策略。任何程序对其资源享有完全的控制权。假设某个程序打算把含有潜在重要信息的文件扔到/tmp目录下，那么在DAC情况下没人能阻止他。SELinux提供了比传统的UNⅨ权限更好的访问控制。

    安装ftp客户端组件
    yum -y install ftp

    尝试登陆
    初始时还没有进行配置，所以默认是允许匿名登录的，用户名用ftp，密码随便输(不输密码也行),登陆成功即表示我们的ftp初步搭建成功，之后就只是进行相关属性配置以及让外网能够访问了。

ftp localhost

    开启端口以及设置防火墙规则
    具体信息参考上面对防火墙管理的介绍，我这里用的是阿里云的学生轻量级服务器，默认未开启防火墙，所以还算方便，不用配置那么多，只需要前往阿里云控制台对安全组规则进行一下配置（打开端口）即可

其他根据自己版本需求进行配置，放开端口开启服务，比如：
由于ftp是默认监听的是21端口，因此我们需要在防火墙里面添加开放21端口，CentOS 7默认使用的是FireWall防火墙，因此我们需要配置该防火墙，开启ftp协议服务，如下所示：
# firewall-cmd --zone=public --permanent --add-port=21/tcp
# firewall-cmd --zone=public --permanent --add-service=ftp
# firewall-cmd --reload

其他的诸如使用iptables或者SELinux 的，根据命令配置即可，原理都是一样的。

    修改配置文件

/etc/vsftpd/vsftpd.conf
---------------------------------------主机相关----------------------------------------------
*   connect_from_port_20=YES (NO)
    ftp-data 的埠号；

*   listen_port=21
    vsftpd 使用的命令通道之端口号，如果您想要使用非正规的埠号，在这个设定项目修改吧！ 不过你必须要知道，这个设定值仅适合以 stand alone 的方式来启动喔！(对于 super daemon 无效)

*   dirmessage_enable=YES (NO)
    当用户进入某个目录时，会显示该目录需要注意的内容，显示的档案默认是 .message ，你可以使用底下的设定项目来修订！

*   message_file=.message
    当 dirmessage_enable=YES 时，可以设定这个项目来让 vsftpd 寻找该档案来显示讯息！

*   listen=YES (NO)
    若设定为 YES 表示 vsftpd 是以 standalone 的方式来启动的！

*   pasv_enable=YES (NO)
    启动被动式联机模式(passive mode)，一定要设定为 YES 的啦！

*   use_localtime=YES (NO)
    是否使用本地时间？vsftpd 预设使用 GMT 时间(格林威治)，所以会比台湾晚 8 小时，建议设定为 YES 吧！

*   write_enable=YES (NO)
    如果你允许用户上传数据时，就要启动这个设定值；

*   connect_timeout=60
    单位是秒，在数据连接的主动式联机模式下，我们发出的连接讯号在 60 秒内得不到客户端的响应，则不等待并强制断线咯。

*   accept_timeout=60
    当用户以被动式 PASV 来进行数据传输时，如果主机启用 passive port 并等待 client 超过 60 秒而无回应， 那么就给他强制断线！这个设定值与 connect_timeout 类似，不过一个是管理主动联机，一个管理被动联机。

*   data_connection_timeout=300
    如果服务器与客户端的数据联机已经成功建立 (不论主动还是被动联机)，但是可能由于线路问题导致 300 秒内还是无法顺利的完成数据的传送，那客户端的联机就会被我们的 vsftpd 强制剔除！

*   idle_session_timeout=300
    如果使用者在 300 秒内都没有命令动作，强制脱机！

*   max_clients=0
    如果 vsftpd 是以 stand alone 方式启动的，那么这个设定项目可以设定同一时间，最多有多少 client 可以同时连上 vsftpd 哩！？

*   max_per_ip=0
    与上面 max_clients 类似，这里是同一个 IP 同一时间可允许多少联机？

*   pasv_min_port=0, pasv_max_port=0
    上面两个是与 passive mode 使用的 port number有关，如果您想要使用 65400 到 65410 这 11 个 port 来进行被动式联机模式的连接，可以这样设定 pasv_max_port=65410 以及 pasv_min_port=65400。 如果是 0 的话，表示随机取用而不限制。

*   ftpd_banner=一些文字说明
    当使用者联机进入到 vsftpd 时，在 FTP 客户端软件上头会显示的说明文字。不过，这个设定值数据比较少啦！ 建议你可以使用底下的设定值来取代这个项目；

*   banner_file=/path/file
    这个项目可以指定某个纯文本档作为使用者登入 vsftpd 服务器时所显示的欢迎字眼。

-----------------------------与实体用户较相关的设定值----------------------

*   anonymous_enable=YES (NO)
    是否允许匿名登录！预设是 YES ，底下的所有相关设定都需要将这个设定为 anonymous_enable=YES 之后才会生效！

*   anon_world_readable_only=YES (NO)
    仅允许 anonymous 具有下载可读档案的权限，预设是 YES。

*   anon_other_write_enable=YES (NO)
    是否允许 anonymous 具有写入的权限？预设是 NO！如果要设定为 YES， 那么开放给 anonymous 写入的目录亦需要调整权限，让 vsftpd 的 PID 拥有者可以写入才行！

*   anon_mkdir_write_enable=YES (NO)
    是否让 anonymous 具有建立目录的权限？默认值是 NO！如果要设定为 YES， 那么 anony_other_write_enable 必须设定为 YES ！

*   anon_upload_enable=YES (NO)
    是否让 anonymous 具有上传数据的功能，默认是 NO，如果要设定为 YES ， 则 anon_other_write_enable=YES 必须设定。

*   deny_email_enable=YES (NO)
    将某些特殊的 email address 抵挡住，不让那些 anonymous 登入！ 如果以 anonymous 登入主机时，不是会要求输入密码吗？密码不是要您 输入您的 email address 吗？如果你很讨厌某些 email address ， 就可以使用这个设定来将他取消登入的权限！需与下个设定项目配合：

*   banned_email_file=/etc/vsftpd.banned_emails
    如果 deny_email_enable=YES 时，可以利用这个设定项目来规定哪个 email address 不可登入我们的 vsftpd 喔！在上面设定的档案内，一行输入一个 email address 即可！

*   no_anon_password=YES (NO)
    当设定为 YES 时，表示 anonymous 将会略过密码检验步骤，而直接进入 vsftpd 服务器内喔！所以一般预设都是 NO 的！

*   anon_max_rate=0
    这个设定值后面接的数值单位为 bytes/秒 ，限制 anonymous 的传输速度，如果是 0 则不限制(由最大带宽所限制)，如果您想让 anonymous 仅有 30 KB/s 的速度，可以设定『anon_max_rate=30000』

*   anon_umask=077
    限制 anonymous 的权限！如果是 077 则 anonymous 传送过来的档案 权限会是 -rw------- 喔！

-----------------------------系统安全方面的设定值----------------------
*   ascii_download_enable=YES (NO)
    如果设定为 YES ，那么 client 就可以使用 ASCII 格式下载文件。

*   ascii_upload_enable=YES (NO)
    与上一个设定类似的，只是这个设定针对上传而言！预设是 NO

*   one_process_model=YES (NO)
    这个设定项目比较危险一点～当设定为 YES 时，表示每个建立的联机 都会拥有一支 process 在负责，可以增加 vsftpd 的效能。不过， 除非您的系统比较安全，而且硬件配备比较高，否则容易耗尽系统资源喔！一般建议设定为 NO 的啦！

*   tcp_wrappers=YES (NO)
    当然我们都习惯支持 TCP Wrappers的啦！所以设定为 YES 吧！

*   xferlog_enable=YES (NO)
    当设定为 YES 时，使用者上传与下载文件都会被纪录起来。记录的档案与下一个设定项目有关：

*   xferlog_file=/var/log/vsftpd.log
    如果上一个 xferlog_enable=YES 的话，这里就可以设定了！这个是登录档的档名啦！

*   xferlog_std_format=YES (NO)
    是否设定为 wu ftp 相同的登录档格式？！预设为 NO ，因为登录档会比较容易读！ 不过，如果您有使用 wu ftp 登录文件的分析软件，这里才需要设定为 YES

*   nopriv_user=nobody
    我们的 vsftpd 预设以 nobody 作为此一服务执行者的权限。因为 nobody 的权限 相当的低，因此即使被入侵，入侵者仅能取得 nobody 的权限喔！

*   pam_service_name=vsftpd
    这个是 pam 模块的名称，我们放置在 /etc/pam.d/vsftpd 

    这里仅陈列常见配置参数，更多内容通过man 5 vsftpd.conf查看

    配置的时候按照需要更改相应配置信息即可，比较方便的就是只设置共享文件夹、用户以及共享文件夹的权限即可，之后访问会自动跳转到用户的家目录中，复杂一点的就需要按照配置文件自行设置其他的高级属性，比如匿名、自定义共享目录，配速限制、限制用户仅能用ftp访问等等。 我这里仅配置了禁止匿名和可写、可上传，用户自行添加

```

6. 指定用户组

```shell
# 指定用户 test 属于组 ftp，只能访问的目录是 /home/myspace，不能登陆系统
# -s /sbin/nologin ftpuser 表示不允许该用户通过命令行方式登录
useradd -g root -M -d /root/ftpspace -s /sbin/nologin twinkle
```

7. 设置该用户的密码

```shell
passwd twinkle
```

8. 把 /home/vsftpd 的所有权给ftpuser.root

```shell
chown -R twinkle.root  /root/ftpspace
```

9. 配置权限文件

```shell
local_root=/root/ftpspace/ huangdan
write_enable=YES
anon_umask=022
anon_world_readable_only=NO
anon_upload_enable=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES
```

