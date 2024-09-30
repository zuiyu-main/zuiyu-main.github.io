(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{462:function(s,a,t){"use strict";t.r(a);var n=t(2),e=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[a("img",{attrs:{src:"%E7%A7%91%E6%99%AE%E4%B8%80%E4%B8%8BElasticsearch%E4%B8%ADBM25%E7%AE%97%E6%B3%95%E7%9A%84%E4%BD%BF%E7%94%A8.assets%5Cimage-20230716162434175.png",alt:""}}),s._v("\n首先还是先了解几个概念，Elasticsearch是一个开源的分布式搜索和分析引擎，它使用一系列算法来计算文档的相关性分数（relevance score）。这些算法用于确定查询与文档的匹配程度，以便按相关性对搜索结果进行排序。以下是Elasticsearch中常用的算分算法：")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("词频（Term Frequency，TF）：TF算法根据查询词在文档中出现的频率来计算分数。出现频率越高，分数越高。")])]),s._v(" "),a("li",[a("p",[s._v("逆文档频率（Inverse Document Frequency，IDF）：IDF算法根据查询词的全局频率来计算分数。对于在许多文档中都出现的常见词，IDF值较低，分数较低；而对于在少数文档中出现的罕见词，IDF值较高，分数较高。")])]),s._v(" "),a("li",[a("p",[s._v("字段长度（Field Length）：字段长度算法根据文档中字段的长度来计算分数。较短的字段可能更相关，因此分数较高。")])]),s._v(" "),a("li",[a("p",[s._v("文档频率（Document Frequency）：文档频率算法根据查询词在文档集合中出现的文档数来计算分数。在较少的文档中出现的词可能更相关，因此分数较高。")])]),s._v(" "),a("li",[a("p",[s._v("向量空间模型（Vector Space Model）：向量空间模型算法将文档和查询表示为向量，并计算它们之间的相似度。通过计算余弦相似度等度量，可以得到文档与查询的相关性分数。")])]),s._v(" "),a("li",[a("p",[s._v("BM25（Best Match 25）：BM25是一种基于TF和IDF的改进算法，它考虑了词频和文档频率，并引入了一些调整参数，以提高搜索结果的质量。")])])]),s._v(" "),a("p",[s._v("下面展示修改修改BM25相关参数")]),s._v(" "),a("p",[s._v("要调整BM25算法的参数，您可以通过修改Elasticsearch索引的相关性设置来实现。下面是一个示例，展示了如何使用Elasticsearch的API来调整BM25算法的参数：")]),s._v(" "),a("ol",[a("li",[a("p",[s._v("设置BM25的参数：需要注意的是，设置该操作时，索引必须是关闭状态")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://mp.weixin.qq.com/s/OnXeESVMreYgBvbGGR4R0g",target:"_blank",rel:"noopener noreferrer"}},[s._v("这块不了解的可以参考之前的一篇关于Elasticsearch索引相关设置的文章，这篇文章详细介绍了哪些是静态索引设置，动态索引设置"),a("OutboundLink")],1)]),s._v(" "),a("blockquote",[a("p",[s._v("Elasticsearch 创建一个索引怎么也这么复杂：https://mp.weixin.qq.com/s/OnXeESVMreYgBvbGGR4R0g")])])])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("POST your_index/_close\nPUT /your_index/_settings\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"index"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"similarity"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"default"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"type"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"BM25"')]),s._v(",\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"b"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.2"')]),s._v(",  // 调整参数b\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"k1"')]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.0"')]),s._v("  // 调整参数k1\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[s._v('在上面的示例中，我们使用PUT请求来更新索引的设置。将"b"参数设置为1.2，将"k1"参数设置为1.0。这些参数可以根据您的需求进行调整。参数"b"控制文档长度的影响，较大的值会增加文档长度的权重；参数"k1"控制词频的影响，较大的值会增加词频的权重。')]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[s._v("验证参数设置：")])]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("GET /your_index/_settings\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("使用GET请求获取索引的设置，确保参数已成功设置。")]),s._v(" "),a("p",[s._v('请注意，以上示例中的"your_index"是您要调整设置的索引名称。您可以根据实际情况替换为您的索引名称。')]),s._v(" "),a("p",[s._v("通过调整BM25算法的参数，您可以根据具体需求优化搜索结果的相关性评分。您可以尝试不同的参数值，观察搜索结果的变化，并根据实际情况进行调整。")]),s._v(" "),a("p",[s._v("Elasticsearch是一款流行的开源搜索引擎，广泛应用于信息检索、全文搜索、日志分析等领域。在Elasticsearch中，BM25是一种常用的文本相似度评分算法，用于计算查询和文档之间的相关性。本文将对BM25算法进行介绍，包括算法原理、使用场景、优缺点以及与其他算法的比较。")]),s._v(" "),a("h1",{attrs:{id:"一、bm25算法简介"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、bm25算法简介"}},[s._v("#")]),s._v(" 一、BM25算法简介")]),s._v(" "),a("p",[s._v("BM25算法（Best Matching 25）是一种基于统计学的文本相似度评分算法，用于计算查询和文档之间的相关性。BM25算法结合了向量空间模型（VSM）和概率检索模型（PRM）的优点，能够对文档进行更准确的评分。BM25算法在Elasticsearch中被广泛应用于搜索引擎、信息检索、全文搜索等领域。")]),s._v(" "),a("h1",{attrs:{id:"二、bm25算法原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、bm25算法原理"}},[s._v("#")]),s._v(" 二、BM25算法原理")]),s._v(" "),a("p",[s._v("BM25算法的核心思想是根据查询词项在文档中出现的频率和文档中的词汇分布来计算文档的相关性。具体来说，BM25算法将文档和查询表示为向量，然后计算两个向量之间的余弦相似度。BM25算法的公式如下：")]),s._v(" "),a("p",[s._v("$$\nscore(q, d) = \\sum_{i=1}^{n} IDF(q_i) * \\frac{f(q_i, d) * (k_1 + 1)}{f(q_i, d) + k_1 * (1 - b + b * \\frac{|d|}{avgdl})}\n$$")]),s._v(" "),a("p",[s._v("其中，$q$表示查询，$d$表示文档，$n$表示查询中包含的词项数，$f(q_i, d)$表示查询词项$q_i$在文档$d$中出现的频率，$k_1$和$b$是BM25算法的超参数，$|d|$表示文档$d$的长度，$avgdl$表示所有文档的平均长度，$IDF(q_i)$表示查询词项$q_i$的逆文档频率，定义如下：")]),s._v(" "),a("p",[s._v("$$\nIDF(q_i) = log \\frac{N - n(q_i) + 0.5}{n(q_i) + 0.5}\n$$")]),s._v(" "),a("p",[s._v("其中，$N$表示文档总数，$n(q_i)$表示包含查询词项$q_i$的文档数。")]),s._v(" "),a("h1",{attrs:{id:"三、bm25算法优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、bm25算法优缺点"}},[s._v("#")]),s._v(" 三、BM25算法优缺点")]),s._v(" "),a("ol",[a("li",[s._v("优点：")])]),s._v(" "),a("p",[s._v("（1）BM25算法能够对文档进行更准确的评分，能够得到更好的搜索结果。")]),s._v(" "),a("p",[s._v("（2）BM25算法具有良好的可调节性，可以通过调整超参数$k_1$和$b$来适应不同的数据集和查询需求。")]),s._v(" "),a("p",[s._v("（3）BM25算法的计算速度较快，适用于大规模文本数据的处理。")]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[s._v("缺点：")])]),s._v(" "),a("p",[s._v("（1）BM25算法对于长文档和短查询的情况下，可能会出现评分偏低的问题。")]),s._v(" "),a("p",[s._v("（2）BM25算法没有考虑词项之间的关联性，可能会导致评分不准确的情况。")]),s._v(" "),a("h1",{attrs:{id:"四、bm25算法应用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、bm25算法应用场景"}},[s._v("#")]),s._v(" 四、BM25算法应用场景")]),s._v(" "),a("p",[s._v("BM25算法适用于各种信息检索场景，包括搜索引擎、全文搜索、日志分析等。在Elasticsearch中，BM25算法被广泛用于文本搜索和相关性排序，能够实现快速、准确和可扩展的搜索功能。")]),s._v(" "),a("h1",{attrs:{id:"五、bm25算法与其他算法的比较"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、bm25算法与其他算法的比较"}},[s._v("#")]),s._v(" 五、BM25算法与其他算法的比较")]),s._v(" "),a("ol",[a("li",[s._v("TF-IDF算法")])]),s._v(" "),a("p",[s._v("TF-IDF算法是一种常用的文本相似度评分算法，用于计算查询和文档之间的相关性。与BM25算法相比，TF-IDF算法没有考虑文档长度和查询长度的影响，因此在处理长文档和短查询时可能会出现评分偏低的问题。但是TF-IDF算法计算速度较快，并且在处理短文本和长查询时表现较好。在Elasticsearch中，TF-IDF算法也被广泛应用于文本搜索和相关性排序。")]),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[s._v("Okapi算法")])]),s._v(" "),a("p",[s._v("Okapi算法是一种基于概率检索模型的文本相似度评分算法，与BM25算法类似。与BM25算法相比，Okapi算法考虑了词项之间的关联性，因此在处理长文档和短查询时具有优势。但是Okapi算法计算复杂度较高，因此在处理大规模文本数据时可能会出现性能问题。")]),s._v(" "),a("h1",{attrs:{id:"六、结论"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、结论"}},[s._v("#")]),s._v(" 六、结论")]),s._v(" "),a("p",[s._v("BM25算法是一种常用的文本相似度评分算法，能够对文档进行更准确的评分，适用于各种信息检索场景。BM25算法具有良好的可调节性和计算速度，但也存在一些缺点，例如在处理长文档和短查询时可能会出现评分偏低的问题。与其他算法相比，BM25算法具有自己的优劣势，需要根据具体场景选择合适的算法。在Elasticsearch中，BM25算法被广泛应用于搜索引擎、信息检索、全文搜索等领域，能够实现快速、准确和可扩展的搜索功能。")])])}),[],!1,null,null,null);a.default=e.exports}}]);