module.exports = {
  "title": "醉鱼Java",
  "description": "鱼哥多年的踩坑笔记",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/zuiyujava.png"
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
        "icon": "reco-home"
      },
      {
        "text": "时间线",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      // {
      //   "text": "Docs",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "vuepress-reco",
      //       "link": "/docs/theme-reco/"
      //     }
      //   ]
      // },
      {
        "text": "联系作者",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/zuiyu-main",
            "icon": "reco-github"
          }
        ]
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
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
      {
        "title": "公众号:醉鱼Java",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "3128379695@qq.com",
        "link": "https://mp.weixin.qq.com/s/_8TLEaLgvyZT6M-Hee51wg",
        "avatar": "https://zuiyu-photo.oss-cn-beijing.aliyuncs.com/img1/202409121118999.png"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "醉鱼Java",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2019"
  },
  "markdown": {
    "lineNumbers": true
  }
}