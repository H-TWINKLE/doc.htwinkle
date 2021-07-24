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
                "href": "/favicon.ico"
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
                shape: ['circle'],  // shape of the particle, default: 'star'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            }
        ],
    ],
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
            "placeholder": "聊点什么..."
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
                        "text": "vuepress-reco",
                        "link": "/docs/theme-reco/"
                    }
                ]
            },
            {
                "text": "学习",
                "icon": "fa fa-code",
                "items": [
                    {
                        "text": "home",
                        "link": "/blogs/home/"
                    }
                ]
            },
            {
                "text": "关于我",
                "icon": "fa fa-grav",
                "link": "/about/guide/"
            },
            {
                "text": "github",
                "icon": "fa fa-github",
                "link": "https://github.com/h-twinkle"
            }
        ],
        "sidebar": {
            "/docs/theme-reco/": [
                "",
                "theme",
                "plugin",
                "api"
            ],
            "/blogs/home": [
                ""
            ]
        }
    }
}