const { sidebarItem } = require("./config_module/sidebarItem");
const { navItem } = require("./config_module/navItem");
const { headerItem } = require("./config_module/headerItem");

module.exports = {
    "title": "TWINKLE",
    "description": "热爱可抵岁月漫长",
    "locales": {
        '/': {
            "lang": 'zh-CN'
        }
    },
    "dest": "public",
    "theme": "reco",
    "markdown": {
        "lineNumbers": true
    },
    "devServer": {
        "proxy": {
            '/target': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'https://www.bing.com/',
                // 允许跨域
                changeOrigin: true,
                ws: true
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
    "themeConfig": {
        "noFoundPageByTencent": false,
        "subSidebar": 'auto',
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
            "avatar": "wavatar",
            "recordIP": true,
            "notify": true
        },
        "head": headerItem,
        /* 顶部的导航菜单 */
        "nav": navItem,
        /* 侧边栏信息 */
        "sidebar": sidebarItem
    }
}