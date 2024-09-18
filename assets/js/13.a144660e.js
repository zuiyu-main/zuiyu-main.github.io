(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{420:function(e,s,n){"use strict";n.r(s);var a=n(2),t=Object(a.a)({},(function(){var e=this,s=e._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("p",[e._v("Elasticsearch 索引分片的分配策略说明")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/b197666d-f668-40c5-a970-5690cca5594c.png",alt:""}})]),e._v(" "),s("p",[e._v("在上一篇"),s("a",{attrs:{href:"https://mp.weixin.qq.com/s/ajhFp-xBU1dJm8a1dDdRQQ",target:"_blank",rel:"noopener noreferrer"}},[e._v("《索引生命周期管理ILM看完不懂你锤我\n》（https://mp.weixin.qq.com/s/ajhFp-xBU1dJm8a1dDdRQQ）"),s("OutboundLink")],1),e._v("中，我们已经学会了索引级别的分片分配过滤属性，也就是在配置文件中指定当前节点的属性值"),s("code",[e._v("node.attr.node_type: hot")]),e._v("，这个你还记得吗，不记得的话可以回去在复习一下哦。")]),e._v(" "),s("p",[e._v("这一篇文章中，我们主要学习一下索引分片的分配策略，也就是分片时是根据什么规则进行分配的呢？")]),e._v(" "),s("blockquote",[s("p",[e._v("版本：Elasticsearch 8.1")])]),e._v(" "),s("h1",{attrs:{id:"一、索引级自定义属性分片分配策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、索引级自定义属性分片分配策略"}},[e._v("#")]),e._v(" 一、索引级自定义属性分片分配策略")]),e._v(" "),s("p",[e._v("我们有 "),s("code",[e._v("5")]),e._v(" 个节点，"),s("strong",[e._v("node-1,node-2,node-3")]),e._v(" 增加属性 "),s("code",[e._v("node.attr.role: master")]),e._v("，"),s("strong",[e._v("node-4,node-5")]),e._v(" 增加属性 "),s("code",[e._v("node.attr.role: slave")]),e._v("。\n"),s("code",[e._v("elasticsearch.yml")]),e._v(" 文件中配置如下:")]),e._v(" "),s("p",[e._v("node-1,node-2,node-3")]),e._v(" "),s("div",{staticClass:"language-yml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# node-1,node-2,node-3")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("node.attr.role")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" master\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("node-4,node-5")]),e._v(" "),s("div",{staticClass:"language-yml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# node-4,node-5")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("node.attr.role")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" slave\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("定义索引"),s("code",[e._v("zfc-doc-000013")]),e._v("，指定"),s("code",[e._v("index.routing.allocation.include.role")]),e._v("为"),s("code",[e._v("slave")]),e._v("，意思就是该索引分片只分配到"),s("code",[e._v("node.attr.role")]),e._v("的值为"),s("code",[e._v("slave")]),e._v("的节点上。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT zfc-doc-000013\n{\n  "settings": {\n    "number_of_replicas": 0,\n    "number_of_shards": 3,\n    "index.routing.allocation.include.role":"slave"\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br")])]),s("p",[e._v("当前集群为 "),s("code",[e._v("5")]),e._v(" 个节点的集群，其中只有 "),s("code",[e._v("node-4")]),e._v("、"),s("code",[e._v("node-5")]),e._v(" 的 "),s("code",[e._v("role")]),e._v(" 为 "),s("code",[e._v("slave")]),e._v(" ，所以创建的索引 "),s("code",[e._v("zfc-doc-000013")]),e._v(" 只会在这两个节点 "),s("code",[e._v("node-4")]),e._v("、"),s("code",[e._v("node-5")]),e._v(" 中进行分配，而不会在 "),s("code",[e._v("node-1")]),e._v("、"),s("code",[e._v("node-2")]),e._v("、"),s("code",[e._v("node-3")]),e._v("中进行分配。")]),e._v(" "),s("h1",{attrs:{id:"二、节点离开时触发分配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、节点离开时触发分配"}},[e._v("#")]),e._v(" 二、节点离开时触发分配")]),e._v(" "),s("p",[e._v("当集群中的节点由于未知的原因或者已知的原因离开集群时，主节点会做出以下反应：")]),e._v(" "),s("ul",[s("li",[e._v("如果当前离开的节点上有主分片，会将其它的副本分片提升为主分片以替换该节点上的主分片；")]),e._v(" "),s("li",[e._v("如果有足够多的节点，分配副本分片来替代当前节点丢失的副本分片；")]),e._v(" "),s("li",[e._v("在剩余的节点之间进行重新平衡分片。")])]),e._v(" "),s("p",[e._v("通过上述的操作可以让我们尽可能的防止数据丢失，但是如果离开的节点很快就恢复那么这可能就是没有必要的操作了。所以哪怕我们在节点级别和集群级别"),s("strong",[e._v("限制并发恢复")]),e._v("，这种重新分配分片仍然会给系统带来大量的额外负载。")]),e._v(" "),s("p",[e._v("想象一下以下场景：")]),e._v(" "),s("ul",[s("li",[e._v("节点 "),s("code",[e._v("node-3")]),e._v(" 离开集群")]),e._v(" "),s("li",[e._v("主节点将节点 "),s("code",[e._v("node-3")]),e._v(" 上的主分片的副本分片提升为主分片")]),e._v(" "),s("li",[e._v("主节点将新的副本分配给集群中的其它节点")]),e._v(" "),s("li",[e._v("每个新副本都会通过网络创建主分片的完整副本")]),e._v(" "),s("li",[e._v("更多的分片被移动到不同的节点以重新分片分配达到平衡")]),e._v(" "),s("li",[e._v("几分钟之后节点 "),s("code",[e._v("node-3")]),e._v(" 返回加入集群")]),e._v(" "),s("li",[e._v("主分片将分片分配给节点 "),s("code",[e._v("node-3")]),e._v(" 以重新平衡集群")])]),e._v(" "),s("p",[e._v("集群初始分配状态")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/d7e0e09b-5358-4ee0-ace0-bab4ab918a52.png",alt:""}})]),e._v(" "),s("p",[e._v("停掉节点 "),s("code",[e._v("node-3")])]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/025ff484-107c-4077-9817-e4978a5acb42.png",alt:""}})]),e._v(" "),s("p",[e._v("默认等待"),s("code",[e._v("一分钟")]),e._v("之后，系统自动进行分片的重新分配")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/bff8a403-4e80-4829-b079-7c50b70bdb4e.png",alt:""}})]),e._v(" "),s("p",[e._v("节点恢复之后进行分片重新分配")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/a014eba9-77ba-47c4-a351-e5c71f7e2910.png",alt:""}})]),e._v(" "),s("p",[e._v("由于节点离开造成的未分配分片可以通过修改参数 "),s("code",[e._v("index.unassigned.node_left.delayed_timeout")]),e._v(" 动态设置延迟时间，默认 "),s("code",[e._v("1m")]),e._v("。")]),e._v(" "),s("p",[e._v("可以在单个索引或者全部索引上进行设置该参数。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('\nPUT zfc-doc-000013/_settings\n{\n  "settings": {\n    "index.unassigned.node_left.delayed_timeout": "2m"\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br")])]),s("blockquote",[s("p",[e._v("此设置不会影响副本分片升级为主分片，也不会影响之前未分配的副本的分配。需要注意的是，该设置在集群重启之后会失效。")])]),e._v(" "),s("h2",{attrs:{id:"_2-1、取消分片分配"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1、取消分片分配"}},[e._v("#")]),e._v(" 2.1、取消分片分配")]),e._v(" "),s("p",[e._v("如果延迟分配超时，主节点会将丢失的分片分配给另一个节点，该节点将开始恢复。\n如果离开的节点重新加入集群，并且其分片仍然具有与主分片相同的 "),s("code",[e._v("sync-id")]),e._v("，分片的重新分配将被取消，同步分片将恢复。\n因此默认超时设置为一分钟，即使分片重新分配已经开始，取消的成本也很低。")]),e._v(" "),s("p",[e._v("我们可以通过如下 API 查看集群健康状态。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("GET _cluster/health \n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("h2",{attrs:{id:"_2-2、节点永久离开"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2、节点永久离开"}},[e._v("#")]),e._v(" 2.2、节点永久离开")]),e._v(" "),s("p",[e._v("如果一个节点离开集群之后确定不会在返回，我们可以通过设置参数 "),s("code",[e._v("index.unassigned.node_left.delayed_timeout")]),e._v(" 为 "),s("code",[e._v("0")]),e._v(" 来让 Elasticsearch 马上分配未分配的分片。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT _all/_settings\n{\n  "settings": {\n    "index.unassigned.node_left.delayed_timeout": "0"\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("h1",{attrs:{id:"三、索引恢复优先级"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、索引恢复优先级"}},[e._v("#")]),e._v(" 三、索引恢复优先级")]),e._v(" "),s("p",[e._v("对于索引分片的重新分配，对于索引来说是有优先级的。")]),e._v(" "),s("p",[e._v("1、"),s("code",[e._v("index.priority")]),e._v("最高的优先")]),e._v(" "),s("p",[e._v("2、其次是索引的创建时间")]),e._v(" "),s("p",[e._v("对于如下例子，我们可以自己测试一下：")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT zfc-doc-index_1\n\nPUT zfc-doc-index_2\n\nPUT zfc-doc-index_3\n{\n  "settings": {\n    "index.priority": 10\n  }\n}\n\nPUT zfc-doc-index_4\n{\n  "settings": {\n    "index.priority": 5\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br"),s("span",{staticClass:"line-number"},[e._v("17")]),s("br")])]),s("ul",[s("li",[s("code",[e._v("zfc-doc-index_3")]),e._v(" 第一个被恢复，因为它的优先级 "),s("code",[e._v("index.priority")]),e._v(" 最高。")]),e._v(" "),s("li",[s("code",[e._v("zfc-doc-index_4")]),e._v(" 第二个被恢复，它的优先级仅次于索引 "),s("code",[e._v("zfc-doc-index_3")]),e._v("。")]),e._v(" "),s("li",[s("code",[e._v("zfc-doc-index_2")]),e._v(" 第三个被恢复，它是最近创建的。")]),e._v(" "),s("li",[s("code",[e._v("zfc-doc-index_1")]),e._v(" 最后被恢复。")])]),e._v(" "),s("h1",{attrs:{id:"四、节点总分片数限制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、节点总分片数限制"}},[e._v("#")]),e._v(" 四、节点总分片数限制")]),e._v(" "),s("p",[e._v("Elasticsearch 的集群在分配分片的时候，Elasticsearch 会尽可能的将单个索引的分片尽可能的分配在尽可能多的节点上，但是有时不是那么的均匀。我们可以通过以下设置修改允许每个节点上单个索引的分片总数的限制，"),s("code",[e._v("index.routing.allocation.total_shards_per_node")]),e._v(" 分配给单个节点的最大分片数，默认没有限制。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT zfc-doc-000013/_settings\n{\n  "settings":{\n    "index.routing.allocation.total_shards_per_node": 2\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("也可以在不考虑索引的情况下限制节点可以拥有的分片数量 "),s("code",[e._v("cluster.routing.allocation.total_shards_per_node")]),e._v(" 分配给每个节点的主分片和副本分片的最大数量，默认 "),s("code",[e._v("-1")]),e._v(" 没有限制。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT _cluster/settings?flat_settings=true\n{\n  "transient":{\n    "cluster.routing.allocation.total_shards_per_node":2\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("Elasticsearch 会在分片的重新分配期间进行校验该参数，有如下场景：\n一个 Elasticsearch 集群，有三个节点，"),s("code",[e._v("cluster.routing.allocation.total_shards_per_node")]),e._v(" 设置为100，并且具有如下的分片分布情况")]),e._v(" "),s("ul",[s("li",[e._v("节点1：100个分片")]),e._v(" "),s("li",[e._v("节点2：98个分片")]),e._v(" "),s("li",[e._v("节点3：1个分片")])]),e._v(" "),s("p",[e._v("如果"),s("strong",[e._v("节点3")]),e._v("发生故障，Elasticsearch 会将其分片重新分配到"),s("strong",[e._v("节点2")]),e._v("，并不会分配到"),s("strong",[e._v("节点1")]),e._v("，因为分配到"),s("strong",[e._v("节点1")]),e._v("会超过设置的"),s("code",[e._v("100")]),e._v("分片限制。")]),e._v(" "),s("blockquote",[s("p",[e._v("需要注意的是，如果我们设置了该参数，可能会导致部分分片无法进行分配。")])]),e._v(" "),s("p",[e._v("下面我们用个例子来说明，首先看如下是我本地 Elasitcsearch 集群的部分索引")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/632d1cbd-cbc1-4387-8801-ce30609e638b.png",alt:""}})]),e._v(" "),s("p",[e._v("我们通过使用 API 动态修改参数之后，让其重新进行分片分配会发生什么情况呢？")]),e._v(" "),s("p",[e._v("如下语句意思就是每个节点主分片加副本分片数量不能大于 "),s("code",[e._v("2")]),e._v("，所以在下次发生分片的重新分配时肯定会无法进行分配。")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT _cluster/settings?flat_settings=true\n{\n  "transient":{\n    "cluster.routing.allocation.total_shards_per_node":2\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("p",[e._v("停止 "),s("code",[e._v("node-3")]),e._v(" 节点之后，分片无法分配。")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/9c12d406-da9e-4a05-b0d1-0c73a77c520e.png",alt:""}})]),e._v(" "),s("blockquote",[s("p",[e._v("在上面更改集群的设置时，我们可能已经注意到了，使用的是 "),s("code",[e._v("transient")]),e._v(" ，还可以使用 "),s("code",[e._v("persistent")]),e._v(",他俩的区别就是"),s("code",[e._v("transient")]),e._v(" 的配置会在集群重启之后失效，"),s("code",[e._v("persistent")]),e._v("会持久化保存。")])]),e._v(" "),s("p",[e._v("不过这几个配置的优先级如下：")]),e._v(" "),s("p",[e._v("1、transient")]),e._v(" "),s("p",[e._v("2、persistent")]),e._v(" "),s("p",[e._v("3、elasticsearch.yml")]),e._v(" "),s("p",[e._v("4、设置的默认值")]),e._v(" "),s("h1",{attrs:{id:"五、索引级别数据层过滤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五、索引级别数据层过滤"}},[e._v("#")]),e._v(" 五、索引级别数据层过滤")]),e._v(" "),s("p",[e._v("索引级别过滤与前面的自定义属性分片分配类似，不过索引级别使用的是"),s("code",[e._v("_tier_preference")]),e._v(" 来控制索引分配到哪个数据层。")]),e._v(" "),s("blockquote",[s("p",[e._v("这块不是特别了解的可以参考文章开头引用的索引生命周期那篇文章，该文章内通过例子展示了索引的生命周期。")])]),e._v(" "),s("p",[e._v("我们还是用一个例子来说明\n首先在elasticsearch.yml 定义角色\nnode-1,node-2中定义 "),s("code",[e._v('node.roles: ["data_hot", "data_content"]')]),e._v("\nnode-3,node-4中定义 "),s("code",[e._v('node.roles: ["data_warm","data_content"]')]),e._v("\nnode-5中定义 "),s("code",[e._v('node.roles: ["data_cold","data_content"]')])]),e._v(" "),s("blockquote",[s("p",[e._v("关于节点角色的定义，可以参考官网：https://www.elastic.co/guide/en/elasticsearch/reference/8.1/modules-node.html#master-node")])]),e._v(" "),s("p",[e._v("集群按照上面的配置完成之后，启动如下")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/13b863e3-b297-4c45-9a38-bf0659a72924.png",alt:""}})]),e._v(" "),s("p",[e._v("通过 API 定义索引 "),s("code",[e._v("zfc-doc-index_1")]),e._v(" 的分片分配策略在 "),s("code",[e._v("data_warm")]),e._v(" 层")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('PUT zfc-doc-index_1\n{\n  "settings": {\n    "number_of_replicas": 2,\n    "number_of_shards": 3,\n    "index.routing.allocation.include._tier_preference": "data_warm"\n  }\n}\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br")])]),s("p",[e._v("按照预期的设定，索引的分片应该是分布在 "),s("code",[e._v("node-3")]),e._v(","),s("code",[e._v("node-4")]),e._v(" 中，结果如下：")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://files.mdnice.com/user/12687/0888193d-d986-4023-af27-0be457190659.png",alt:""}})]),e._v(" "),s("p",[e._v("可以看到，有分片是没有进行分配的，所以这也是修改分片分配策略时需要特别注意的一点。")]),e._v(" "),s("h1",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),s("p",[e._v("通过上面的学习，我们知道了：")]),e._v(" "),s("ul",[s("li",[e._v("可以通过自定义属性 "),s("code",[e._v("node.attr.[]")]),e._v(" 控制分片的分配")]),e._v(" "),s("li",[e._v("可以通过索引级别的角色 "),s("code",[e._v("index.routing.allocation.include._tier_preference")]),e._v(" 进行数据层的过滤分配")]),e._v(" "),s("li",[e._v("分片的分配过程中是可以通过 "),s("code",[e._v("index.priority")]),e._v(" 指定优先级的")]),e._v(" "),s("li",[e._v("可以通过 "),s("code",[e._v("index.routing.allocation.total_shards_per_node")]),e._v(" 控制每个节点上单个索引的分片数量")]),e._v(" "),s("li",[e._v("可以通过 "),s("code",[e._v("cluster.routing.allocation.total_shards_per_node")]),e._v(" 控制每个节点上所有主分片加副本分片的总数量")])])])}),[],!1,null,null,null);s.default=t.exports}}]);