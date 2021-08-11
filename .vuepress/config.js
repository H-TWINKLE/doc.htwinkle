module.exports = {
    "title": "TWINKLE",
    "description": "热爱可抵岁月漫长",
    "locales": {
        '/': {
            "lang": 'zh-CN'
        }
    },
    "dest": "public",
    "head": [
        [
            "link",
            {
                "rel": "icon",
                "href": "http://doc.file.htwinkle.cn/2021/07/25/8cc55192402359488043e679d57b07b9.ico"
            }
        ],
        [
            "link",
            {
                "rel": "stylesheet",
                "href": "//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    "theme": "reco",
    "markdown": {
        "lineNumbers": true
    },
    "devServer": {
        "proxy": {
            '/target': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'https://www.baidu.com/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    "plugins": [
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                message: "发现新内容可用",
                buttonText: "刷新"
            }
        }],
        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功!"
            }
        }],
        [
            //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
            "dynamic-title",
            {
                showIcon: "/favicon.ico",
                showText: " ✨ 连接成功 ",
                hideIcon: "/failure.ico",
                hideText: " 💢 连接失败 ",
                recoverTime: 2000
            }
        ],
        [
            //图片放大插件 先安装在配置， npm install @vuepress\plugin-medium-zoom --save
            '@vuepress/medium-zoom', {
            selector: '.page img',
            delay: 1000,
            options: {
                margin: 24,
                background: 'rgba(25,18,25,0.9)',
                scrollOffset: 40
            }
        }
        ],
        [
            //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
            "cursor-effects",
            {
                size: 3,                    // size of the particle, default: 2
                shape: ['star'],  // shape of the particle, default: 'star' 'circle'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            }
        ],
        ["vuepress-plugin-typescript"]
    ],
    // configureWebpack: {
    //     resolve: {
    //         extensions: ['.ts', '.vue'],
    //     },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.ts$/,
    //                 loader: "ts-loader",
    //                 options: { appendTsSuffixTo: [/\.vue$/] }
    //             },
    //             {
    //                 test: /.less$/,
    //                 loader: "style-loader!css-loader!less-loader"
    //             }
    //         ],
    //     },
    // },
    /* "chainWebpack": (config, isServer) => {
         config.resolve.extensions.add('.ts')
         config.module
             .rule('ts')
             .test(/\.ts$/)
             .use('ts-loader')
             .loader(require.resolve('ts-loader'))
             .options({
                 appendTsSuffixTo: [/\.vue$/, /\.md$/], compilerOptions: {
                     declaration: false,
                 }
             })
             .end()
     },*/
    "themeConfig": {
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 3,
                "icon": "fa fa-bars",
                "text": "分类"
            },
            "tag": {
                "location": 2,
                "icon": "fa fa-tags",
                "text": "标签"
            }
        },
        "logo": "/logo.png",
        "search": true,
        "searchMaxSuggestions": 10,
        "lastUpdated": "最后更新时间",
        "author": "TWINKLE",
        "authorAvatar": "/avatar.jpg",
        "startYear": "2019",
        "cyberSecurityRecord": "蜀ICP备18023054号-1",
        "cyberSecurityLink": "http://www.beian.miit.gov.cn/",
        "valineConfig": {
            "appId": '1nPYYBBDSthaoM6ir07KS4uQ-gzGzoHsz',
            "appKey": 'cFrHHkReCrincGrAaM5IHvD5',
            "placeholder": "聊点什么...",
            "avatar": "wavatar"
        },
        "nav": [
            {
                "text": "主页",
                "link": "/",
                "icon": "fa fa-home"
            },
            {
                "text": "归档",
                "link": "/timeline/",
                "icon": "fa fa-map-signs"
            },
            {
                "text": "生活",
                "icon": "fa fa-envira",
                "items": [
                    {
                        "text": "每日一文",
                        "link": "/life/article/"
                    },
                    {
                        "text": "每日一曲",
                        "link": "/life/music/"
                    },
                    {
                        "text": "每日一图",
                        "link": "/life/picture/"
                    },
                    {
                        "text": "每日一视",
                        "link": "/life/video/"
                    },
                    {
                        "text": "我们",
                        "link": "/life/we/"
                    }
                ]
            },
            {
                "text": "学习",
                "icon": "fa fa-code",
                "items": [
                    {
                        "text": "centos",
                        "link": "/docs/centos/"
                    },
                    {
                        "text": "nginx",
                        "link": "/docs/nginx/"
                    },
                    {
                        "text": "php",
                        "link": "/docs/php/"
                    },
                    {
                        "text": "python",
                        "link": "/docs/python/"
                    },
                    {
                        "text": "docker",
                        "link": "/docs/docker/"
                    },
                    {
                        "text": "windows",
                        "link": "/docs/windows/"
                    },
                    {
                        "text": "git",
                        "link": "/docs/git/"
                    },
                    {
                        "text": "vuepress-reco",
                        "link": "/docs/vuepress-reco/"
                    },
                    {
                        "text": "美工设计",
                        "link": "/docs/art/"
                    },
                    {
                        "text": "实用工具&网站",
                        "link": "/docs/tool/"
                    },
                ]
            },
            {
                "text": "关于我",
                "icon": "fa fa-grav",
                "link": "/about/about/"
            },
            {
                "text": "github",
                "icon": "fa fa-github",
                "link": "https://github.com/h-twinkle"
            }
        ],
        "sidebar": {
            "/docs/centos/": [
                "",
                "app",
                "swap",
                "firewall",
                "shell",
                "ftp",
                "java",
                "mysql",
                "nginx",
                "python",
                "redis"
            ],
            "/docs/art/": [
                "",
                "ae",
                "pic",
                "api"
            ]
        }
    }
}