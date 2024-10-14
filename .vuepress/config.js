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
    // 密钥
    // keyPage: {
    //   keys: ['e10adc3949ba59abbe56e057f20f883e'], // 1.3.0 版本后需要设置为密文
    //   color: '#42b983', // 登录页动画球的颜色
    //   lineColor: '#42b983' // 登录页动画线的颜色
    // },
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
            "text": "商务合作",
            "link": "/docs/wechat.md",
            "icon": "reco-wechat"
          },
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
        title: "公众号:醉鱼Java",
        desc: "码农笔记，越努力越幸运!",
        // email: "3128379695@qq.com",
        link: "https://mp.weixin.qq.com/s/_8TLEaLgvyZT6M-Hee51wg",
        logo: "https://zuiyu-photo.oss-cn-beijing.aliyuncs.com/img1/202409121118999.png"
      },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
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