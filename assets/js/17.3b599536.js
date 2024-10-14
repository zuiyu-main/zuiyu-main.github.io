(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{434:function(s,e,a){"use strict";a.r(e);var t=a(2),n=Object(t.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("p",[s._v("原文链接："),e("a",{attrs:{href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.13/indices-split-index.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("indices-split-index API"),e("OutboundLink")],1)]),s._v(" "),e("h1",{attrs:{id:"环境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#环境"}},[s._v("#")]),s._v(" 环境")]),s._v(" "),e("ul",[e("li",[s._v("Elasticsearch 7.13")]),s._v(" "),e("li",[s._v("Mac 10.14.6")])]),s._v(" "),e("h1",{attrs:{id:"概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[s._v("#")]),s._v(" 概述")]),s._v(" "),e("p",[s._v("拆分索引API允许将现有索引拆分为新索引，其中每个原始的主分片被拆分为新索引中的两个或者多个主分片")]),s._v(" "),e("p",[s._v("索引可以拆分的次数(以及每个原始的主分片可以拆分成的分片数量)由"),e("code",[s._v("index.number_of_routing_shards")]),s._v("设置。路由分片的数量指定使用的hash空间，该空间内部使用"),e("code",[s._v("一致性hash")]),s._v("在分片之间分发文档。例如，一个5个分片的索引，其中"),e("code",[s._v("number_of_routing_shards")]),s._v("设置为"),e("code",[s._v("30")]),s._v("(5 x 2 x 3),可以按照2或者3的因子来拆分,换句话说可以按照如下方式：")]),s._v(" "),e("ul",[e("li",[s._v("5->10->30(split by 2, then by 3)")]),s._v(" "),e("li",[s._v("5->15->30(split by 3, then by 2)")]),s._v(" "),e("li",[s._v("5->30(split by 6)")])]),s._v(" "),e("p",[e("code",[s._v("index.number_of_routing_shards")]),s._v(" 是静态索引设置时的选项，并且只能在"),e("strong",[s._v("创建索引")]),s._v("时，或者"),e("strong",[s._v("索引关闭")]),s._v("时设置")]),s._v(" "),e("h1",{attrs:{id:"拆分操作流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#拆分操作流程"}},[s._v("#")]),s._v(" 拆分操作流程")]),s._v(" "),e("ol",[e("li",[s._v("首先创建一个与源索引定义相同的目标索引，但是这个新索引有更多的主分片数量")]),s._v(" "),e("li",[s._v("将数据段从源索引硬链接到目标索引（如果文件系统不支持硬链接，那就将所有的数据段复制到新索引，但是这个操作会消耗更多的时间）")]),s._v(" "),e("li",[s._v("根据文档的版本删除历史版本中的数据后再次hash所有的文档，以便删除属于不同分片的文档")]),s._v(" "),e("li",[s._v("恢复目标索引")])]),s._v(" "),e("h1",{attrs:{id:"为什么elasticsearch不支持增量重新分片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么elasticsearch不支持增量重新分片"}},[s._v("#")]),s._v(" 为什么Elasticsearch不支持增量重新分片")]),s._v(" "),e("p",[s._v("首先我们从n个分片到n+1个分片，增量重新分片确实是许多的键值存储支持的功能，添加一个新的分片并且仅将新的数据添加到新分片这不是一个可以参考的选项，为什么呢，首先这可能是一个索引的瓶颈，因为我们通过获取、删除和更新一个文档时都是需要"),e("code",[s._v("_id")]),s._v(",这样的话我们通过"),e("code",[s._v("_id")]),s._v("找到文档属于哪个分片就变的相当复杂了，也就是说我们需要一个不同的hash方案来重新平衡已经存在的数据")]),s._v(" "),e("p",[s._v("大多数的键值存储系统最有效的还是使用"),e("strong",[s._v("一致性hash算法")]),s._v("，当分片数量从N增加到N+1时，一致性hash算法只需要重新hash "),e("code",[s._v("1/N")]),s._v("的的数据，然后Elasticsearch的存储是面对Lucene索引的，这是一个面向搜索的数据的结构，是Lucene索引中重要的一部分，即使只有5%的文档，删除它们或者在另一个索引上索引它们的成本通常比键值存储高的多，当按照上面我们所说的通过乘法因子的方式来增加分片数量时，这个成本是可以接受的，这允许Elasticsearch执行本地的索引拆分，反过来也就是可以执行索引级别的拆分，而不是重新索引需要移动的文档以及使用硬连接的方式来进行有效的文件复制")]),s._v(" "),e("p",[s._v("对于一致性hash算法不了解的小伙伴可以看下这篇文章，非常清楚的描述了什么是一致性hash，以及为什么选用一致性hash而不是普通hash算法")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://mp.weixin.qq.com/s/1llJgU_lqMWXRVfWdivZzA",target:"_blank",rel:"noopener noreferrer"}},[s._v("一文理解一致性哈希算法"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v("如果仅仅是追加数据的话，可以通过创建一个新索引来向其新索引写入数据，同时创建一个别名，这个别名同时包含旧索引和新索引，假设新索引和旧索引分别具有M和N个分片，这与一个具有M+N个分片的搜索相比这是没有差别的")]),s._v(" "),e("h1",{attrs:{id:"监控拆分的过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#监控拆分的过程"}},[s._v("#")]),s._v(" 监控拆分的过程")]),s._v(" "),e("div",{staticClass:"language-bash line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[s._v("/_cat/recovery/"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("target"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n/_cat/recovery\n/_cluster/health/"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("target"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])]),e("h1",{attrs:{id:"前提条件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前提条件"}},[s._v("#")]),s._v(" 前提条件")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("如果elasticseach的安全功能已经启用，则必须具有索引的管理索引权限")])]),s._v(" "),e("li",[e("p",[s._v("在索引拆分前：")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("这个要拆分的索引必须时只读的")])]),s._v(" "),e("li",[e("p",[s._v("所在集群的状态必须时green")]),s._v(" "),e("p",[s._v("设置为只读可以使用下面语句")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -X PUT "localhost:9200/my_source_index/_settings?pretty" -H \'Content-Type: application/json\' -d\'\n{\n  "settings": {\n    "index.blocks.write": true \n  }\n}\n\'\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])])])]),s._v(" "),e("p",[s._v("当前写入索引的数据流不能被拆分，如果要拆分当前写入索引，这个数据流必须先进行反转以便创建一个新的写入索引，然后以前的写入索引就可以被拆分")])])]),s._v(" "),e("h1",{attrs:{id:"测试步骤"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#测试步骤"}},[s._v("#")]),s._v(" 测试步骤")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("创建索引")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XPUT "localhost:9200/test_split_index" -H \'Content-Type: application/json\' -d \'\n{\n  "settings": {\n        "index.number_of_shards" : 1,\n        "index.number_of_routing_shards" : 10,\n        "index.number_of_replicas": 2\n    }\n}\n\'\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("删除索引(根据自己需求使用)")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XDELETE "localhost:9200/test_split_index"\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("插入数据")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XPOST "localhost:9200/test_split_index/_bulk?pretty" -H \'Content-Type: application/json\' -d \'\n{ "index": {}}\n{  "user":"user1",  "age":"18"}\n{ "index": {}}\n{  "user":"user2",  "age":"19"}\n{ "index": {}}\n{  "user":"user3",  "age":"20"}\n{ "index": {}}\n{  "user":"user4",  "age":"21"}\n{ "index": {}}\n{  "user":"user5",  "age":"22"}\n\'\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("关闭索引")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XPOST "localhost:9200/test_split_index/_close"\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("防止切分数据时有数据写入")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XPUT "localhost:9200/test_split_index/_settings?pretty" -H \'Content-Type: application/json\' -d\'\n{\n"settings": {\n"index.blocks.write": true\n}\n}\n\'\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("打开索引")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XPOST "localhost:9200/test_split_index/_open"\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("拆分索引")]),s._v(" "),e("p",[e("strong",[s._v("test_split_index")]),s._v("为要准备拆分的索引")]),s._v(" "),e("p",[e("strong",[s._v("split_index_target")]),s._v("为要拆分的新的索引名称")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('curl -XPOST "localhost:9200/test_split_index/_split/split_index_target?pretty" -H \'Content-Type: application/json\' -d\'\n{\n  "settings": {\n    "index.number_of_shards": 10\n  }\n}\n\'\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("查看执行过程")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("curl http://localhost:9200/_cat/recovery?v\ncurl http://localhost:9200/_cluster/health/split_index_target\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])])]),s._v(" "),e("h1",{attrs:{id:"遇到的问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#遇到的问题"}},[s._v("#")]),s._v(" 遇到的问题")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("单机启动的集群环境，3个节点， 但是因为磁盘空间满了，造成"),e("strong",[s._v("副本分片无法分配")]),s._v("，此时可以通过以下方式进行解决")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("删除硬盘垃圾数据")])]),s._v(" "),e("li",[e("p",[s._v("修改es的磁盘利用率设置，默认是85%，具体怎么修改查看官网，地址如下")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("https://www.elastic.co/guide/en/elasticsearch/reference/7.13/modules-cluster.html#disk-based-shard-allocation\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])])])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);