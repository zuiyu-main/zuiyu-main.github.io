(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{443:function(s,a,n){"use strict";n.r(a);var e=n(2),t=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[a("code",[s._v("ES(8.1)")]),s._v("认证工程师考题大纲参考如下")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("https://mp.weixin.qq.com/s/x7lMmMAo2563JysMJ8vgRQ\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h1",{attrs:{id:"_1、题目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、题目"}},[s._v("#")]),s._v(" 1、题目")]),s._v(" "),a("p",[s._v("今天咱们讨论的是《索引模板的创建与使用》")]),s._v(" "),a("p",[s._v("大体思路如下：分两部分处理、第一部分是先创建索引模板、第二部分使用索引模板。在创建索引模板之前我们先理解一下什么是索引模板、然后我们带着以下几个问题进行阅读本文")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("什么是索引模版")])]),s._v(" "),a("li",[a("p",[s._v("索引模版有什么用，使用场景有哪些")])]),s._v(" "),a("li",[a("p",[s._v("索引模版如何创建")])]),s._v(" "),a("li",[a("p",[s._v("如何使用索引模版")])])]),s._v(" "),a("h1",{attrs:{id:"_2、解答"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、解答"}},[s._v("#")]),s._v(" 2、解答")]),s._v(" "),a("h2",{attrs:{id:"_2-1、什么是索引模版"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1、什么是索引模版"}},[s._v("#")]),s._v(" 2.1、什么是索引模版")]),s._v(" "),a("p",[s._v("索引模版是创建索引时自动应用提前设置好的"),a("code",[s._v("settings")]),s._v("、"),a("code",[s._v("mappings")]),s._v("和"),a("code",[s._v("aliases")]),s._v("，通过索引的名称进行匹配")]),s._v(" "),a("p",[s._v("对索引模版的更改时不会影响目前已经根据索引模版创建的索引")]),s._v(" "),a("h2",{attrs:{id:"_2-2、索引模版有什么用-使用场景有哪些"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2、索引模版有什么用-使用场景有哪些"}},[s._v("#")]),s._v(" 2.2、索引模版有什么用，使用场景有哪些")]),s._v(" "),a("p",[s._v("使用索引模版可以省去创建索引时再次指定"),a("code",[s._v("settings")]),s._v("、"),a("code",[s._v("mappings")]),s._v("、"),a("code",[s._v("aliases")]),s._v("的步骤，具体的应用场景比较常用的就有日志索引。")]),s._v(" "),a("p",[s._v("需求如下：查询日志索引名称为"),a("code",[s._v("log")]),s._v("，每天根据当天日期生成索引（"),a("code",[s._v("log-20221022")]),s._v("），所有的索引使用相同的"),a("code",[s._v("settings")]),s._v("和"),a("code",[s._v("mappings")]),s._v("，且"),a("code",[s._v("alias")]),s._v("指向最新日期的"),a("code",[s._v("log索引")]),s._v("那么我们就可以使用"),a("code",[s._v("索引模版")]),s._v("来实现，索引模版如何创建呢，其实很简单，与普通的创建索引差别不大，具体如下")]),s._v(" "),a("h2",{attrs:{id:"_2-3、索引模版创建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3、索引模版创建"}},[s._v("#")]),s._v(" 2.3、索引模版创建")]),s._v(" "),a("p",[s._v("创建索引需要参数，那么创建索引模版也有参数控制，可以使用的参数如下")]),s._v(" "),a("ul",[a("li",[a("p",[a("code",[s._v("index_patterns")]),s._v(": 必须的参数，使用通配符定义匹配索引的规则")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("priority")]),s._v("：可选的参数，索引模版的匹配优先级，如果不填默认"),a("code",[s._v("0（最低优先级）")]),s._v("，多个模版时，优先匹配优先级高的模版")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("template")]),s._v("：可选参数，但是我认为是必须的，少了这个参数，索引模版的意义在哪呢是不是，可以说是核心参数。可以配置索引的"),a("code",[s._v("settings")]),s._v("，"),a("code",[s._v("mappings")]),s._v("，"),a("code",[s._v("aliases")])]),s._v(" "),a("ul",[a("li",[a("p",[a("code",[s._v("settings")])]),s._v(" "),a("p",[s._v("索引的"),a("code",[s._v("settings")]),s._v("设置，可参考上一篇文章中"),a("code",[s._v("settings")]),s._v("的部分**(关注微信公众号《醉鱼Java》获取)**")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("mappings")])]),s._v(" "),a("p",[s._v("索引的"),a("code",[s._v("mappings")]),s._v("设置，可参考上一篇文章中"),a("code",[s._v("mappings")]),s._v("的部分**(关注微信公众号《醉鱼Java》获取)**")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("aliases")])]),s._v(" "),a("p",[s._v("对象形式，"),a("code",[s._v("key")]),s._v("是别名的"),a("code",[s._v("名称")]),s._v("，并且还支持如下参数")]),s._v(" "),a("ul",[a("li",[a("p",[a("code",[s._v("filter")])]),s._v(" "),a("p",[s._v("可选，对象类型，限制别名能访问的文档")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("index_routing")])]),s._v(" "),a("p",[s._v("可选，字符串，索引操作时的路由值，如果指定会覆盖"),a("code",[s._v("routing")]),s._v("的值")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("is_hidden")])]),s._v(" "),a("p",[s._v("可选，布尔类型，如果设置为"),a("code",[s._v("true")]),s._v("，隐藏别名。默认"),a("code",[s._v("false")]),s._v("，该别名指定的所有索引必须有相同的"),a("code",[s._v("is_hidden")]),s._v("值")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("is_write_index")])]),s._v(" "),a("p",[s._v("可选，布尔类型，如果设置为"),a("code",[s._v("true")]),s._v("，该索引为别名的写索引")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("routing")])]),s._v(" "),a("p",[s._v("可选，字符串，索引和搜索操作时的路由值")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("search_routing")])]),s._v(" "),a("p",[s._v("可选，字符串，搜索操作时的路由值，如果指定会覆盖"),a("code",[s._v("routing")]),s._v("的值")])])])])])]),s._v(" "),a("li",[a("p",[a("code",[s._v("version")])]),s._v(" "),a("p",[s._v("索引模版的版本号，"),a("code",[s._v("Elasticsearch")]),s._v("不会自动生成")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("composed_of")])]),s._v(" "),a("p",[s._v("可选，字符串数组，可选可使用的组件模版的有序数组。按照数组中组件模版的顺序合并，最后一个模版具有最高的优先级")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("data_stream")])]),s._v(" "),a("p",[s._v("可选，对象类型，如果索引模版中包含该该对象，可以是空对象，则使用模版创建索引数据流和支持的索引")]),s._v(" "),a("p",[s._v("支持如下参数")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("hidden")]),s._v("：可选，布尔类型，如果为"),a("code",[s._v("true")]),s._v("，数据流隐藏，默认"),a("code",[s._v("false")])]),s._v(" "),a("li",[a("code",[s._v("allow_custom_routing")]),s._v("： 可选，布尔类型，如果为"),a("code",[s._v("true")]),s._v("，则数据流支持自定义路由，默认"),a("code",[s._v("false")])])])]),s._v(" "),a("li",[a("p",[a("code",[s._v("_meta")])]),s._v(" "),a("p",[s._v("可选，对象类型，该索引模版的用户元数据配置")])])]),s._v(" "),a("p",[s._v("通过上面几个参数即可创建一个可用的索引模版，创建一个基础可用的索引模版只需要必选参数即可，例如：")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT /_index_template/log_template\n{\n  "index_patterns": "log*",\n  "priority": "1",\n  "template": {\n    "settings": {\n      "number_of_shards": "1",\n      "number_of_replicas": "1"\n    },\n    "mappings": {\n      "properties": {\n        "creater":{\n          "type":"keyword"\n        },\n        "module":{\n          "type":"keyword"\n        },\n        "content":{\n          "type":"text",\n          "fields":{\n            "keyword":{\n              "type":"keyword"\n            }\n          }\n        },\n        "createtime": {\n          "type": "date",\n          "format": "strict_date_optional_time||epoch_millis"\n        }\n      }\n    },\n    "aliases":{\n      "log":{}\n    }\n  }\n}  \n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br")])]),a("h2",{attrs:{id:"_2-4、使用索引模版"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4、使用索引模版"}},[s._v("#")]),s._v(" 2.4、使用索引模版")]),s._v(" "),a("h3",{attrs:{id:"_2-4-1、通过索引模版创建索引"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-1、通过索引模版创建索引"}},[s._v("#")]),s._v(" 2.4.1、通过索引模版创建索引")]),s._v(" "),a("p",[s._v("以上面创建的索引模版为例，索引名以log开头的索引都会自动使用索引模版创建")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("PUT /log-2022-10-22-01\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("此时查看生成的索引"),a("code",[s._v("log-2022-10-22-01")]),s._v("如下")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('GET /log-2022-10-22-01\n\n# 返回如下\n{\n  "log-2022-10-22-01" : {\n    "aliases" : {\n      "log" : { }\n    },\n    "mappings" : {\n      "properties" : {\n        "content" : {\n          "type" : "text",\n          "fields" : {\n            "keyword" : {\n              "type" : "keyword"\n            }\n          }\n        },\n        "creater" : {\n          "type" : "keyword"\n        },\n        "createtime" : {\n          "type" : "date"\n        },\n        "module" : {\n          "type" : "keyword"\n        }\n      }\n    },\n    "settings" : {\n      "index" : {\n        "routing" : {\n          "allocation" : {\n            "include" : {\n              "_tier_preference" : "data_content"\n            }\n          }\n        },\n        "number_of_shards" : "1",\n        "provided_name" : "log-2022-10-22-01",\n        "creation_date" : "1666523830900",\n        "number_of_replicas" : "1",\n        "uuid" : "WouYSIukSIGucYs_grWkZw",\n        "version" : {\n          "created" : "8010399"\n        }\n      }\n    }\n  }\n}\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br"),a("span",{staticClass:"line-number"},[s._v("51")]),a("br")])]),a("p",[s._v("实际使用中不可能只有一个模版，那么我们创建索引时该怎么选择呢，下面咱们来一起测试下")]),s._v(" "),a("h3",{attrs:{id:"_2-4-2、同时匹配到多个索引模版怎么选择"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-2、同时匹配到多个索引模版怎么选择"}},[s._v("#")]),s._v(" 2.4.2、同时匹配到多个索引模版怎么选择")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("首先在创建一个索引模版，匹配模式设置"),a("code",[s._v("*")]),s._v("，优先级设置"),a("code",[s._v("2")]),s._v("，该"),a("code",[s._v("my_log_template")]),s._v("模版"),a("code",[s._v("createtime")]),s._v("字段设置为"),a("code",[s._v("keyword")]),s._v("，上面"),a("code",[s._v("log_template")]),s._v("模版设置"),a("code",[s._v("createtime")]),s._v("为"),a("code",[s._v("date")]),s._v("类型，"),a("code",[s._v("Elasticsearch")]),s._v("如何选择测试即知")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT /_index_template/my_log_template\n{\n  "index_patterns":"*",\n  "priority":"2",\n  "template":{\n    "mappings":{\n      "properties":{\n        "createtime":{\n          "type":"keyword"\n        },\n        "my_test_field":{\n          "type":"keyword"\n        }\n      }\n    }\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("创建索引查看生成的"),a("code",[s._v("createtime")]),s._v("类型")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT /log-2022-10-23-01\nGET /log-2022-10-23-01/_mapping\n\n# 返回如下\n{\n  "log-2022-10-23-01" : {\n    "mappings" : {\n      "properties" : {\n        "createtime" : {\n          "type" : "keyword"\n        },\n        "my_test_field" : {\n          "type" : "keyword"\n        }\n      }\n    }\n  }\n}\n\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("p",[s._v("可以看到后面创建的索引模版"),a("code",[s._v("my_log_template")]),s._v("优先级为"),a("code",[s._v("2")]),s._v("，索引匹配到多个模版时优先使用优先级高的模版")])])]),s._v(" "),a("h3",{attrs:{id:"_2-4-3、使用索引模版创建索引别名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-3、使用索引模版创建索引别名"}},[s._v("#")]),s._v(" 2.4.3、使用索引模版创建索引别名")]),s._v(" "),a("p",[s._v("在上面创建的索引模版"),a("code",[s._v("log_template")]),s._v("中，创建索引时会自动给索引添加别名"),a("code",[s._v("log")]),s._v("，别名操作的部分语句如下")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('# 添加别名，对log开头的索引添加别名logs\nPOST _aliases\n{\n  "actions": [\n    {\n      "add": {\n        "index": "log-*",\n        "alias": "logs"\n      }\n    }\n  ]\n}\n# 删除别名，删除索引logs-nginx的别名logs\nPOST _aliases\n{\n  "actions": [\n    {\n      "remove": {\n        "index": "logs-nginx",\n        "alias": "logs"\n      }\n    }\n  ]\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br")])]),a("h3",{attrs:{id:"_2-4-4、组件模版创建"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-4、组件模版创建"}},[s._v("#")]),s._v(" 2.4.4、组件模版创建")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("创建组件模版"),a("code",[s._v("settings")])]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT _component_template/zuiyu-settings\n{\n  "template": {\n    "settings": {\n      "index.lifecycle.name": "my-lifecycle-policy"\n    }\n  },\n  "_meta": {\n    "description": "Settings for ILM",\n    "my-custom-meta-field": "More arbitrary metadata"\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("创建组件模版"),a("code",[s._v("mappings")])]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT _component_template/zuiyu-mappings\n{\n  "template": {\n    "mappings": {\n      "properties": {\n        "@timestamp": {\n          "type": "date",\n          "format": "date_optional_time||epoch_millis"\n        },\n        "message": {\n          "type": "wildcard"\n        }\n      }\n    }\n  },\n  "_meta": {\n    "description": "Mappings for @timestamp and message fields",\n    "my-custom-meta-field": "More arbitrary metadata"\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("使用组件模版创建索引模版")]),s._v(" "),a("p",[s._v("如下创建的为数据流模版，包含了空对象"),a("code",[s._v("data_stream")]),s._v("，具体数据流的使用可关注"),a("strong",[s._v("公众号《醉鱼Java》")]),s._v("，获取后续文章的最新更新")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT _index_template/zuiyu-index-template\n{\n  "index_patterns": ["zuiyu-data-stream*"],\n  "data_stream": { },\n  "composed_of": [ "zuiyu-mappings", "zuiyu-settings" ],\n  "priority": 500,\n  "_meta": {\n    "description": "Template for my time series data",\n    "my-custom-meta-field": "More arbitrary metadata"\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])])])]),s._v(" "),a("h3",{attrs:{id:"_2-4-5、索引模版的删除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-5、索引模版的删除"}},[s._v("#")]),s._v(" 2.4.5、索引模版的删除")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("DELETE /_template/&lt;index-template>\n# 例子中索引模版删除如下\nDELETE /_index_template/log_template\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"_2-4-6、校验索引模版是否存在"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-6、校验索引模版是否存在"}},[s._v("#")]),s._v(" 2.4.6、校验索引模版是否存在")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("# 存在返回200，不存在返回404\nHEAD /_index_template/log_template\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h3",{attrs:{id:"_2-4-7、-查看索引模版"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-7、-查看索引模版"}},[s._v("#")]),s._v(" 2.4.7、 查看索引模版")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("GET /_template/&lt;index-template>\nGET /_template/log_template\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h1",{attrs:{id:"_3、总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、总结"}},[s._v("#")]),s._v(" 3、总结")]),s._v(" "),a("p",[s._v("通过上面的学习，我们可以熟练的进行索引模版的创建，组件模版的创建以及模版优先级，数据流模版，组件模版优先级等，大大的满足了日常工作中的需要，如果还想了解更多参数的细节问题可以查阅官网。公众号《醉鱼Java》后续也会推出更底层的源码分析等内容，感兴趣的道友可以关注一波一起成长")])])}),[],!1,null,null,null);a.default=t.exports}}]);