(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{445:function(s,a,e){"use strict";e.r(a);var n=e(2),t=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("本文是《Elasticsearch索引生命周期管理ILM》中数据流索引补充篇，文章地址如下：")]),s._v(" "),a("blockquote",[a("p",[s._v("https://mp.weixin.qq.com/s/ajhFp-xBU1dJm8a1dDdRQQ")])]),s._v(" "),a("p",[s._v("并且在另一片Elasticsearch的进阶使用-动态模版中也提到了相关数据流索引的内容，有兴趣的可以回过头看一下，地址我也放下面")]),s._v(" "),a("blockquote",[a("p",[s._v("https://mp.weixin.qq.com/s/C22Zm514qq0gN7BNcnbzCQ")])]),s._v(" "),a("p",[s._v("所以本文着重介绍下数据流索引的使用")]),s._v(" "),a("h1",{attrs:{id:"数据流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据流"}},[s._v("#")]),s._v(" 数据流")]),s._v(" "),a("p",[s._v("数据流可以跨多个索引存储时间序列数据，同时提供一个用于请求的命名资源。数据流非常适合日志、指标、跟踪事件和持续生成的数据")]),s._v(" "),a("p",[s._v("我们可以将"),a("strong",[s._v("index")]),s._v("和"),a("strong",[s._v("search")]),s._v("请求直接提交到数据流，数据流自动将请求路由到存储流数据的索引。我们还可以使用索引生命周期管理（"),a("strong",[s._v("ILM")]),s._v("）来管理这些索引，例如，我们可以使用ILM来将比较老旧的数据移动到更便宜的硬件设备上并删除不需要的索引。随着数据的增长，"),a("strong",[s._v("ILM")]),s._v("策略可以降低成本和开销")]),s._v(" "),a("p",[s._v("数据流方案相较于其他的索引策略方案有如下几个优点")]),s._v(" "),a("ul",[a("li",[s._v("索引中字段数量减少：索引只存储数据的特定子集，也就是说不需要存储大量的字段索引，占用空间减少、更利于查询。并且在展示的时候只展示个别的相关字段")]),s._v(" "),a("li",[s._v("更精细的数据控制：文件系统日志、CPU、负载、网络等情况可以根据自己的安全策略定义自己的数据流索引，每个索引都有自己的滚动更新、是否保留和安全策略")]),s._v(" "),a("li",[s._v("灵活：可以使用自定义命名空间对我们的服务用例或者公司单位进行有意义的划分")]),s._v(" "),a("li",[s._v("所需的权限更少：摄取数据时只需要附加数据的权限即可")])]),s._v(" "),a("h1",{attrs:{id:"数据流命名方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#数据流命名方案"}},[s._v("#")]),s._v(" 数据流命名方案")]),s._v(" "),a("p",[a("strong",[s._v("Elastic Agent")]),s._v("使用"),a("strong",[s._v("Elastic")]),s._v(" 数据流命名方案来命名数据流，命名方案根据以下组件将数据拆分为不同的流")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("type")]),s._v("：描述数据的类型，例如："),a("code",[s._v("logs")]),s._v("、"),a("code",[s._v("metrics")]),s._v("、"),a("code",[s._v("traces")]),s._v("、"),a("code",[s._v("synthetics")])]),s._v(" "),a("li",[a("code",[s._v("dataset")]),s._v("：描述该数据流要在索引中摄取的数据范围，例如我们有一个进程指标数据集，其中一个字段是描述是否正在运行；另一个是磁盘I/O指标数据集，其中一个字段描述的是读取的字节数")]),s._v(" "),a("li",[a("code",[s._v("namespace")]),s._v("：用户可配置的任意分组，例如环境（"),a("code",[s._v("dev")]),s._v("、"),a("code",[s._v("prod")]),s._v("、"),a("code",[s._v("qa")]),s._v("）、公司或合作企业单位。"),a("code",[s._v("namespace")]),s._v("的最大长度是100个字节。通过使用命名空间可以更轻松的从给定的数据源中搜索数据。我们还可以在创建用户角色时使用匹配模式来授权用户访问的数据权限")])]),s._v(" "),a("p",[s._v("命名方案使用短线"),a("code",[s._v("-")]),s._v("来分割每个组件")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("&lt;type>-&lt;dataset>-&lt;namespace>\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("例如我们的生产环境集成了"),a("strong",[s._v("Nginx")]),s._v("，"),a("code",[s._v("namespace")]),s._v("使用"),a("code",[s._v("prod")]),s._v("，"),a("code",[s._v("dataset")]),s._v("使用"),a("code",[s._v("nginx.access")]),s._v("，类型使用"),a("code",[s._v("logs")]),s._v("，那么我们生成的数据流如下")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("logs-nginx.access-prod\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h1",{attrs:{id:"后备索引-数据流的组成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后备索引-数据流的组成"}},[s._v("#")]),s._v(" 后备索引（数据流的组成）")]),s._v(" "),a("p",[s._v("数据流由一个或多个"),a("strong",[s._v("隐藏的")]),s._v("、自动生成的索引组成")]),s._v(" "),a("p",[a("img",{attrs:{src:"/Users/cxt/Documents/personal/wechataccount/doc/database/elasticsearch/es8.1%E8%AE%A4%E8%AF%81/5%E3%80%81Elasticsearch%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%B5%81%E7%B4%A2%E5%BC%95.assets/image-20221206184842518.png",alt:"image-20221206184842518"}})]),s._v(" "),a("p",[s._v("数据流需要有匹配的索引模版，该模版配置索引支持的映射和设置")]),s._v(" "),a("p",[s._v("每个索引到数据流的文档都必须要包含一个字段"),a("code",[s._v("@timestamp")]),s._v("，映射为"),a("code",[s._v("date")]),s._v("或"),a("code",[s._v("date_nanos")]),s._v("字段类型，如果索引模版不指定"),a("code",[s._v("@timestamp")]),s._v("字段类型，则默认将映射为"),a("code",[s._v("date")]),s._v("类型的默认选项")]),s._v(" "),a("p",[s._v("同一个索引模版可以应用于多个数据流，如果当前索引模版已经被数据流使用，则不能被删除")]),s._v(" "),a("h1",{attrs:{id:"读请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#读请求"}},[s._v("#")]),s._v(" 读请求")]),s._v(" "),a("p",[s._v("当我们向数据流提交读请求时，该流会将请求路由到支持的所有索引上")]),s._v(" "),a("p",[a("img",{attrs:{src:"/Users/cxt/Documents/personal/wechataccount/doc/database/elasticsearch/es8.1%E8%AE%A4%E8%AF%81/5%E3%80%81Elasticsearch%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%B5%81%E7%B4%A2%E5%BC%95.assets/image-20221206190636027.png",alt:"image-20221206190636027"}})]),s._v(" "),a("h1",{attrs:{id:"写入请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#写入请求"}},[s._v("#")]),s._v(" 写入请求")]),s._v(" "),a("p",[s._v("最近最新创建的索引是数据流的写入索引，数据流仅将新文档写入到该索引。哪怕我们直接指定其他的索引，其他索引也会拒绝该请求")]),s._v(" "),a("p",[s._v("对于限制写入的其他索引，我们也不能进行如下操作："),a("code",[s._v("Clone")]),s._v("、"),a("code",[s._v("Delete")]),s._v("、"),a("code",[s._v("Shrink")]),s._v("、"),a("code",[s._v("Split")])]),s._v(" "),a("p",[a("img",{attrs:{src:"/Users/cxt/Documents/personal/wechataccount/doc/database/elasticsearch/es8.1%E8%AE%A4%E8%AF%81/5%E3%80%81Elasticsearch%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E6%B5%81%E7%B4%A2%E5%BC%95.assets/image-20221206190647654.png",alt:"image-20221206190647654"}})]),s._v(" "),a("h1",{attrs:{id:"rollover"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rollover"}},[s._v("#")]),s._v(" Rollover")]),s._v(" "),a("p",[s._v("创建数据流时，"),a("strong",[s._v("Elasticsearch")]),s._v("会自动的为流创建一个后备索引，并且这个索引是第一个写入索引。我们可以使用"),a("strong",[s._v("ILM")]),s._v("策略来进行管理数据流，也可以通过"),a("strong",[s._v("API")]),s._v("的形式手动管理数据流")]),s._v(" "),a("h1",{attrs:{id:"后备索引名称生成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后备索引名称生成"}},[s._v("#")]),s._v(" 后备索引名称生成")]),s._v(" "),a("p",[s._v("一个"),a("code",[s._v("六位数")]),s._v("使用"),a("code",[s._v("0")]),s._v("填充的整数，并且滚动累积增加记数，从"),a("code",[s._v("000001")]),s._v("开始")]),s._v(" "),a("p",[s._v("当后备索引创建时，使用如下命名规则")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v(".ds-&lt;data-stream>-&lt;yyyy.MM.dd>-&lt;generation>\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("code",[s._v("<yyyy.MM.dd>")]),s._v("表示后备索引创建的日期，日期更新的代表最新的数据")]),s._v(" "),a("p",[s._v("使用"),a("code",[s._v("shrink")]),s._v("或"),a("code",[s._v("restore")]),s._v("可以更改索引的名称，但是这些操作不会从数据流中删除后备索引")]),s._v(" "),a("h1",{attrs:{id:"仅追加"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#仅追加"}},[s._v("#")]),s._v(" 仅追加")]),s._v(" "),a("p",[s._v("数据流是仅追加数据的，专为很少更新现有数据（如果有的话）设计的。我们不能直接将更新或者删除请求直接发送到数据流，应该使用"),a("code",[s._v("update by query")]),s._v("或者"),a("code",[s._v("delete by query")]),s._v("来替代")]),s._v(" "),a("p",[s._v("如果我们需要删除数据，可以直接将请求发送到对应的后备索引中进行删除")]),s._v(" "),a("p",[s._v("但是删除更新操作频繁的话更推荐还是使用索引别名加索引模版的组合，而不是使用数据流")]),s._v(" "),a("h1",{attrs:{id:"示例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#示例"}},[s._v("#")]),s._v(" 示例")]),s._v(" "),a("p",[s._v("下面是数据流索引配置ILM策略的一个"),a("strong",[s._v("demo")]),s._v(" ，有兴趣的可以自行尝试一下（数据流使用ILM管理的测试例子见文章开头索引生命周期的文章）")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("创建ILM策略")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT _ilm/policy/zuiyu_policy\n{\n  "policy": {\n    "phases": {\n      "hot": {\n        "min_age": "0ms",\n        "actions": {\n          "rollover": {\n            "max_docs": 10\n          }\n        }\n      },\n      "warm": {\n        "min_age": "1m",\n        "actions": {\n          "allocate": {\n            "require": {\n              "data": "warm"\n            }\n          }\n        }\n      },\n      "cold": {\n        "min_age": "2m",\n        "actions": {\n          "allocate": {\n            "require": {\n              "data": "cold"\n            }\n          }\n        }\n      },\n      "delete": {\n        "min_age": "1d",\n        "actions": {\n          "delete": {\n            "delete_searchable_snapshot": true\n          }\n        }\n      }\n    }\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("创建索引模版")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT _index_template/zyds_template\n{\n  "index_patterns": [\n    "zyds-*"\n  ],\n  "data_stream": {},\n  "priority": 200,\n  "template": {\n    "settings": {\n      "number_of_shards": 3,\n      "number_of_replicas": 0,\n      "index.lifecycle.name": "zuiyu_policy",\n      "index.routing.allocation.require.node_type": "hot"\n    },\n    "mappings": {\n      "properties": {\n        "user": {\n          "type": "object"\n        },\n        "message": {\n          "type": "keyword"\n        }\n      }\n    }\n  }\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("创建一个"),a("code",[s._v("pipline")]),s._v("添加"),a("code",[s._v("@timestamp")]),s._v("字段")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('PUT _ingest/pipeline/add-timestamp\n{\n  "processors": [\n    {\n      "set": {\n        "field": "@timestamp",\n        "value": "{{_ingest.timestamp}}"\n      }\n    }\n  ]\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])])]),s._v(" "),a("li",[a("p",[s._v("创建一个数据流")]),s._v(" "),a("div",{staticClass:"language-text line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v('POST zyds-stream/_doc?pipeline=add-timestamp\n{\n  "user": {\n    "id": "zuiyu",\n    "name":"鱼"\n  },\n  "message": "zuiyu is successful!"\n}\n')])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])])])]),s._v(" "),a("p",[s._v("好了，结合前两篇文章的使用，数据流相关的到这就结束了，相信数据流这个概念大家也已经掌握，后面就是实操了，如果有疑问可在评论区告诉我，大家一起进步学习")]),s._v(" "),a("h1",{attrs:{id:"参考"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[s._v("#")]),s._v(" 参考")]),s._v(" "),a("p",[s._v("https://www.elastic.co/guide/en/elasticsearch/reference/8.1/data-streams.html")]),s._v(" "),a("p",[s._v("https://www.elastic.co/guide/en/fleet/8.1/data-streams.html")]),s._v(" "),a("p",[s._v("https://www.elastic.co/guide/en/elasticsearch/reference/8.1/set-up-a-data-stream.html")])])}),[],!1,null,null,null);a.default=t.exports}}]);