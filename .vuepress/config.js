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
    "themeConfig": {
        "nav": [
            {
                "text": "主页",
                "link": "/",
                "icon": "fa fa-home"
            },
            {
                "text": "时间线",
                "link": "/timeline/",
                "icon": "fa fa-clock-o"
            },
            {
                "text": "学习文档",
                "icon": "fa fa-code",
                "items": [
                    {
                        "text": "vuepress-reco",
                        "link": "/docs/theme-reco/"
                    }
                ]
            },
            {
                "text": "关于我",
                "icon": "fa fa-grav",
                "link": "/blogs/other/guide/"
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
            ]
        },
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 4,
                "icon": "fa fa-bars",
                "text": "分类"
            },
            "tag": {
                "location": 3,
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
        "showAccessNumber": true
    },
    "markdown": {
        "lineNumbers": true
    },
    "plugins": [
        [
            'vuepress-plugin-comment',
            {
                "choosen": 'valine',
                // options选项中的所有参数，会传给Valine的配置
                "options": {
                    "el": '#valine-vuepress-comment',
                    "appId": '1nPYYBBDSthaoM6ir07KS4uQ-gzGzoHsz',
                    "appKey": 'cFrHHkReCrincGrAaM5IHvD5',
                    "path": '<%- frontmatter.to.path %>',
                    "visitor": true
                }
            }
        ]
    ]
}