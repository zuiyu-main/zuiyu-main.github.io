2023年第一篇文章就这样水文了，拿出写了好久的《Elasticsearch查询请求时参数使用说明》水一次，懒惰了、兄弟们见谅，从发出来这篇文章开始，懒惰一去不回了兄弟们，让我们一起在新的一年更进一步。今年计划重心主要还是Elasticsearch与MySQL，如果你想补充一下其他方面的知识欢迎留言评论

今天给大家带来的是Elasticsearch检索请求的最详细参数说明，把检索请求中经常用到的与不经常用的都展现出来，下面跟我一起来学习下吧

# 环境

* macos10.14
* elasticsearch 8.1.3
* jdk8

# 添加测试数据

首先我们创建个索引

```text
PUT /zfc-doc-000001
{
  "settings": {
    "index":{
      "number_of_shards":3,
      "number_of_replicas":2
    }
  },
  "mappings": {
    "properties": {
      "title":{
        "type":"keyword"
      },
      "content":{
        "type":"text"
      },
      "createTime":{
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis" 
      },
      "agreeNum":{
        "type": "integer"
      },
      "comment":{
        "type": "nested",
        "properties": {
          "content":{
            "type":"text"
          },
          "name":{
            "type":"keyword"
          },
          "time":{
            "type":"date",
            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          }
        }
      }
    }
  }
}
```



加入测试数据

```text
{ "index" : { "_index" : "zfc-doc-000001", "_id" : "1" } }
{ "title" : "Java知识点大全","content":"java 泛型，基本类型有哪些","createTime": "2022-12-19","agreeNum":"99","comment":{"name":"张三","content":"学习java必备","time":"2022-12-19 09:00:00"} }
{ "index" : { "_index" : "zfc-doc-000001", "_id" : "2" } }
{ "title" : "MySQL必知必会","content":"mysql 索引、事务、锁","createTime": "2022-12-18","agreeNum":"500","comment":[{"name":"张三","content":"学习mysql通俗易懂","time":"2022-12-18 09:00:00"},{"name":"李四","content":"mysql 入门到精通必备的","time":"2022-12-18 10:00:00"}  ]}
{ "index" : { "_index" : "zfc-doc-000001", "_id" : "3" } }
{ "title" : "Redis运维实战","content":"redis的rdb与aof","createTime": "2022-12-18","agreeNum":"300","comment":[{"name":"小红","content":"redis的备份","time":"2022-12-18 09:00:00"},{"name":"李四","content": "redis 入门","time":"2022-12-18 15:00:00"}  ]}
{ "index" : { "_index" : "zfc-doc-000001", "_id" : "4" } }
{ "title" : "Elasticsearch","content":"ES crud","createTime": "2022-12-17","agreeNum":"300","comment":[{"name":"小红","content":"es的基础SQL语法","time":"2022-12-17 09:00:00"},{"name":"李四","content": "es 入门","time":"2022-12-18 16:00:00"}  ]}
{ "index" : { "_index" : "zfc-doc-000001", "_id" : "5" } }
{ "title" : "常见MQ知识点汇总","content":"rabbitmq kafka rockmq activemq","createTime": "2022-12-16","agreeNum":"260","comment":[{"name":"小红","content":"kafka的基础概念","time":"2022-12-18 09:00:00"},{"name":"李四","content": "事务消息","time":"2022-12-18 15:00:00"}  ]}
```

对于索引中**mapping**的字段为啥设置为**nested**类型，具体可以参考历史文章**nested**类型说明，具体链接给到下面

[Nested嵌套对象类型还挺实用](https://mp.weixin.qq.com/s/Fwk68NuPxu5ASWccVDHa2w)

下面还是简单的先学习一下`_search` API的使用，

# Search API

```text
GET zfc-doc-000001/_search
```

`_search` API 支持如下几种方式

`GET /<_target>/_search`

`GET /_search`

`POST /<_target>/_search`

`POST /_search`

其中`<_target>`是要检索的索引名称，要检索全部索引可以忽略此参数或者设置为`*`或者`_all`

# 支持的参数

参数有两种设置方式，一种是在**请求路径**参数中设置，另一种是在**请求体**中设置。如果两种都设置，则以**请求路径参数**为准

## 请求路径参数

* **`allow_no_indices`**

  布尔值，使用模糊匹配或者索引别名搜索时，当目标索引不存在时，如果为`true`，返回空数据；如果为`false`，返回异常内容

  举例如下

  ```text
  GET zfdc*/_search?allow_no_indices=true
  ```

  ` zfdc `开头的索引进行检索，我们是没有该索引的，但是`allow_no_indices=true`，索引会返回空数据

  ```text
  {
    "took" : 0,
    "timed_out" : false,
    "_shards" : {
      "total" : 0,
      "successful" : 0,
      "skipped" : 0,
      "failed" : 0
    },
    "hits" : {
      "total" : {
        "value" : 0,
        "relation" : "eq"
      },
      "max_score" : 0.0,
      "hits" : [ ]
    }
  }
  ```

  修改**`allow_no_indices=false`**，返回报错内容

  ```text
  GET zfdc*/_search?allow_no_indices=false
  
  
  # 返回如下
  {
    "error" : {
      "root_cause" : [
        {
          "type" : "index_not_found_exception",
          "reason" : "no such index [zfdc*]",
          "resource.type" : "index_or_alias",
          "resource.id" : "zfdc*",
          "index_uuid" : "_na_",
          "index" : "zfdc*"
        }
      ],
      "type" : "index_not_found_exception",
      "reason" : "no such index [zfdc*]",
      "resource.type" : "index_or_alias",
      "resource.id" : "zfdc*",
      "index_uuid" : "_na_",
      "index" : "zfdc*"
    },
    "status" : 404
  }
  
  ```

  

* **`allow_partial_search_results`**

  可选布尔值，如果为`true`，则在分片搜索超时时返回已经搜索的部分结果，如果为`false`，返回异常的报错

* **`analyzers`**

  可选字符串，用于查询字符串的分析器。**仅当`q`参数同时使用才有效**

* **`analyze_wildcard`**

  可选布尔值，如果为`true`，则会分析通配符或者前缀值，默认`false`；**仅当`q`参数同时使用才有效；**

* **`batched_reduce_size`**

  可选的整数值，协调节点上控制的分片数量，如果请求中存在大量的碎片，可以用该值当作保护机制，减少搜索请求的内存开销，默认值`512`

* **`ccs_minimize_roundtrips`**

  可选布尔值，跨集群检索时协调节点与远程集群之间的网络往返，如果为`true`，网络往返将最小化

* **`default_operator`**

  可选字符串，查询字符串时的默认运算符，支持`AND`和`OR`，默认`OR`,**仅当`q`参数同时使用才有效；**

* **`df`**

  可选字符串，查询字符串时未制定字段前缀的情况下用做的默认值的字段，**仅当`q`参数同时使用才有效；**

* **`docvalue_fields`**

  可选字符串，以逗号分隔的字段列表，返回文档值字段指定

* **`expand_wildcards`**

  可选字符串、通配符模式下可以匹配的索引类型；默认`open`，支持`all`，`open`，`closed`，`hidden`，`none`

* **`explain`**

  可选布尔值，默认`false`，如果为`true`，可以返回计分的相关详细信息，类似**mysql**的**explain**关键字

* **`from`**

  可选、整数值，非负数，从**0**开始。也就是分页参数，默认情况下使用**from**+**size**两个参数控制，但是最大值是`10000`，如果超过`10000`可以使用`search_after api` 查询或者修改该参数值

* **`ignore_throttled`**

  可选布尔值，默认`true`，如果为`true`，则在冻结时忽略具体索引、扩展索引或者别名索引

* **`ignore_unavailable`**

  可选布尔值，默认`false`，如果是`false`，则在请求不存在的索引或者关闭的索引时返回错误

* **`lenient`**

  可选布尔值，默认`false`，如果为`true`，将忽略查询字符串中基于格式的查询失败（例如向数字字段提供文本）

* **`max_concurrent_shard_requests`**

  可选整数值，定义该请求同时执行的每个节点的并发分片请求数，这个值用于限制在集群中搜索的影响，限制并发分片请求的数量，默认**`5`**

* **`pre_filter_shard_size`**

  可选整数值，定义一个阈值，如果搜索请求超过这个阈值就开启提前过滤分片

  我们查询数据有两个阶段，查询阶段和取回阶段，开启之后分为三个阶段，预过滤阶段、查询阶段和取回阶段

  例如，按照时间每天生成的索引，`log-年月日`，我们想查询当天的日志，开启之后，很多分片上根本不存在当天的数据，所以不需要去检索，也就是说在对分片检索之前先对分片进行检查一下是否包含被查询的数据范围，如果查询范围与分片持有的数据范围没有交集，就跳过该分片

* **`preference`**

  可选字符串，用于搜索的节点和分片

  * **`_only_local`**：仅在本地节点上执行检索
  * **`_local`**：在本地节点的分片上进行检索，如果没有指定的节点可用、使用默认方法选择分片
  * **`_only_nodes:<node-id>,<node-id>`**：仅对指定的节点id上进行检索，如果没有指定的节点可用使用默认方法选择分片
  * **`_prefer_nodes:<node-id>,<node-id>`**：如果可能对指定的节点id上进行检索，如果没有节点可用使用默认方法选择分片
  * **`_shards:<shard>,<shard>`**：仅对指定的分片上进行检索，可以将此值与其他的首选项组合使用，但是`_shards`的值必须在前面，例如：`_shards:2,3|_local`
  * **`<custom-string>`**：自定义的字符串值，任何一个不以`—`开头的字符串。如果集群的状态或者选中的分片没有发生改变，则使用与`<custom-string>`相同的值使用同样的顺序路由到相同的分片上

* **`q`**

  可选的请求参数查询字符串

  `q`参数会覆盖请求体中的查询参数，如果同时指定，请求体中的查询无效

  如果不指定字段名就是全部字段中检索

  ```text
  /_search?q=字段名:值 
  ```

* **`request_cache`**

  可选的布尔值，如果为`true`的话，则为**size**等于**0**的请求结果进行缓存，默认为索引的级别设置

* **`rest_total_hits_as_int`**

  可选的布尔值，对响应结果`hits.total`在相应中是整数值还是对象的形式展现，默认`false`

* **`routing`**

  可选字符串，根据自定义值将操作路由到特定的分片

* **`scroll`**

  可选时间值，保留`scroll`搜索上下文的时间值

  默认情况下，该值不能超过**`1d`(24h)**，可以使用`search.max_keep_alive`修改集群中该设置

* **`search_type`**

  可选字符串，设置搜索类型，计算相关评分的分布频率

  * **`query_then_fetch`**：默认值，搜索的更快，但是可能评分不太精确
  * **`dfs_query_then_fetch`**：全局所有分片检索，提高了评分的准确性，但是相应耗时增加了，导致搜索速度变慢

* **`seq_no_primary_term`**

  可选布尔值，可以用作乐观锁，如果为`true`，则返回每个命中请求的最后一次修改的序列号和主键

* **`size`**

  可选整数值，定义返回文档数量，默认`10`

  默认情况下，分页查询使用`from`和`size`配合使用，默认最大返回`10000`条记录，如果要查询更多的官方建议是使用`search_after`

* **`sort`**

  可选字符串，排序值，以逗号分割的`<field>:<direction>`列表

* **`_source`**

  可选，指匹配的文档要返回的源文档字段设置，这些字段在相应的`hits._source`中展示，默认为true

  * `true`：返回全部的源字段
  * `false`：不返回
  * `<string>`：以逗号分隔要返回的字段的列表，支持通配符`*`

* **`_source_excludes`**

  可选字符串，使用逗号分隔的要排除的字段列表

  如果`_source`为false，该值会被忽略

* **`_source_includes`**

  可选字符串，要在响应结果中显示用逗号分隔的字段列表

* **`stats`**

  用于日志记录和统计目的的请求的`tag`

* **`stored_fields`**

  逗号分隔的存储字段的列表，在文档被命中时返回的字段，如果未指定字段，则响应中不包含存储的字段

  如果指定了该字段，`_source`的值为false，那我们可以使`_source`的值为true，来使响应中返回源字段和响应字段

* **`suggest_field`**

  可选字符串，用于建议的字段

* **`suggest_mode`**

  指定建议的模式，默认**`missing`**

  * `always`
  * `missing`
  * `popular`

  只有当指定来`suggest_field`和`suggest_text`查询字符串参数时该参数才能生效

* **`suggest_size`**

  可选整数值，要返回的建议数

  只有当指定来``suggest_field``和`suggest_text`查询字符串参数时该参数才能生效

* **`suggest_text`**

  可选字符串，返回建议的源文本，也就是根据该字段的值去建议

  仅当指定了**`suggest_field`**查询字符串参数时，才能使用此参数。

* **`terminate_after`**

  可选整数值，每个分片要收集到的最大文档数，如果查询达到此限制，Elasticsearch 会提前终止查询。并且该操作是在排序前收集文档

  默认值**`0`**，这不会提前终止查询执行

  >  我们应该谨慎使用此参数，Elasticsearch将此参数用于所有的分片，推荐是让Elasticsearch自动执行提前终止。我们应该避免为跨多个数据层以备份索引为目标数据流的请求指定此参数

* **`timeout`**

  可选时间单位，指定每个分片最大响应时间，如果超时之后没有收到响应，则请求失败并返回错误，默认为不超时

* **`track_scores`**

  可选布尔值，如果为`true`，则计算并返回文档分数，即使分数不用于排序，默认`false`

* **`track_total_hits`**

  可选整数或布尔值，匹配查询以准确命中数量，默认`10000`

  如果为`true`则以性能为代价返回准确的命中数量，如果为`false`，则响应不包含与查询匹配的命中总数

* **`typed_keys`**

  可选布尔值，如果为`true`，则聚合或者建议名称则在相应中以其各自的类型作为前缀，默认`true`

* **`version`**

  可选布尔值，如果为`true`，则返回文档版本

## 请求体参数

* **`docvalue_fields`**

  可选字符串或者数组对象，指定返回响应结果中`hits.fields`的字段值

  * **field**：必须字符串，通配符模式，请求返回与此模式匹配的字段名的**doc**值
  * **format**：可选字符串，返回文档值的格式，对于日期字段可以指定日期格式，对于数字字段可以指定**DecimalFormat**模式，对于其他字段数据类型不支持此参数

* **`fields`**

  可选字符串或者数组对象，指定返回响应结果中`hits.fields`的字段值

  * **`field`**：必选字符串，支持通配符`*`

  * **`format`**：可选字符串，日期和地理空间字段的格式，其他字段数据类型暂不支持此参数。**date**和**date_nanos**接受日期格式。

    **`geo_point`**和**`geo_shape`**接受如下：

    * **`geojson`**：默认
    * **`wkt`**
    * **`mvt(<zoom>/<x>/<y>@<extent>)` 或者`mvt(<zoom>/<x>/<y>)`**

    `mvt`的参数如下：

    **`<zoom>`**：必选整数，缩放级别，`0-29`

    **`<x>`**：必选整数，x坐标

    **`<y>`**：必选整数，y坐标

    **`<extent>`**：可选整数，平铺一侧的大小，以像素为单位，矢量平铺是四边相等的正方形，默认`4096`

* **`stored_fields`**

  （可选，字符串）以逗号分隔的存储字段列表，作为命中的一部分返回。如果未指定字段，则响应中不包含存储的字段

   如果指定了该字段，`_source`的值为false，那我们可以使`_source`的值为true，来使响应中返回源字段和响应字段

  

* **`explain`**

  （可选布尔值），如果为`true`返回计分的相关信息

* **`from`**

  （可选整数），非负数，文档开始的偏移量，默认`0`

    默认情况下，分页查询使用**from**和**size**配合使用，默认最大返回**`10000`**条记录，如果要查询更多的官方建议是使用**`search_after`**

* **`indices_boost`**

  （可选对象数组），从指定索引中提升计分

  **`<index>: <boost-value>`**：索引或者索引别名，支持通配符

  **`boost-value`**：是计分的因子，如果想提高计分就设置**大于1**，如果在0-1之间会降低分数

* **`min_score`**

  可选，浮点类型，匹配文档的最小分数值，低于该值的文档不返回

* **`pit`**

  可选、对象，将搜索限制为时间点（PIT），如果我们指定了PIT，则在请求路径中不能指定`<target>`

  时间点需要使用API显示读取一个，具体可查阅官网，也可等待本号后续文章的推出

  * **`id`**:：必选，要搜索的**PIT**的**id**
  * **`keep_alive`**：可选，时间值，延长PIT寿命的时间值

* **`query`**

  查询语句，搜索条件都在此

* **`runtime_mappings`**

  可选，嵌套对象，在查询时可以定义一个或者多个运行时字段，这些字段的优先级高于同名的映射字段

  **`<field-name>`**：字段名称，配置运行时字段必选的

  * **`type`**：必选字符串，支持（**`boolean，composite，date，double，geo_point，ip，keyword，long`**）
  * **`script`**：可选字符串，在查询时可以执行的脚本，脚本可以访问文档的全部上下文，包括`_source`字段以及映射的所有字段及值。该脚本必须用**`emit`**以返回计算值

* **`seq_no_primary_term`**

  可选布尔值，可以用作乐观锁，如果为`true`，则返回每个命中请求的最后一次修改的序列号和主键

* **`size`**

  返回的文档数量设置，默认`10`，一般使用**from**与**size**配置使用，最多返回**10000**条记录，如果超过**10000**，官方推荐使用**search_after** 查询

* **`_source`**

  可选，指定返回哪些字段

  * **`true`**：返回全部
  * **`false`**：不返回
  * **`<wildcard_pattern>`**：字符串或者字符串数组，通配符模式匹配字段返回
  * **`<object>`**
    * **`excludes`**：要排除的字段，支持通配符
    * **`includes`**：要返回的字段，支持通配符

* **`stats`**

  用于日志记录和统计目的的请求的tag

* **`terminate_after`**

  可选整数值，每个分片要收集到的最大文档数，如果查询达到此限制，Elasticsearch会提前终止查询。并且该操作是在排序前收集文档

  默认值**`0`**，这不会提前终止查询执行

  >  我们应该谨慎使用此参数，Elasticsearch将此参数用于所有的分片，推荐是让Elasticsearch自动执行提前终止。我们应该避免为跨多个数据层以备份索引为目标数据流的请求指定此参数

* **`timeout`**

  可选时间单位，指定每个分片最大响应时间，如果超时之后没有收到响应，则请求失败并返回错误，默认为不超时

* **`version`**

  可选布尔值，如果为`true`，则返回文档版本

## 响应参数

* **`_scroll_id`**

  该搜索的全文标识符，可以使用此**ID**与**scroll API**配置使用，进行滚动检索，只有在请求中加入了 参数，返回时才会继续返回该参数值用于下一次检索

* **`took`**

  执行该此请求所花费的毫秒数，计算从协调节点收到请求到协调节点准备发送响应之间的时间

  其中包括协调节点和数据节点之间的通信时间，请求在搜索线程池中等待执行的时间，实际的执行时间

  不包括向Elasticsearch发送请求所需的时间，序列化JSON响应所需的时间，向客户端发送响应所需的时间

  

* **`timed_out`**

  如果为`true`，则请求在完成之前超时，会返回部分结果或者返回空

* **`_shard`**

  用于请求的分片计数

  * **`total`**：用于查询的分片总数，包括未分配的分片
  * **`successful`**：成功执行的分片数量
  * **`skipped`**：跳过请求的分片数量，一般就是预过滤时会发生
  * **`failed`**：执行失败的分片数量

* **`hits`**

  返回的文档以及元数据

  * **`total`**：文档总数

  * **`max_score`**：返回文档的最高计分，对于不按照_score排序的请求该值是空

  * **`hits`**：返回的文档对象数组

    * **`_index`**：包含返回文档的索引名称

    * **`_id`**：返回文档的唯一标识符

    * **`_score`**：文档的相关性计分

    * **`_source`**：文档的原始JSON体，可以使用`_source`指定是否要返回或者自定义返回字段

    * **`fields`**：包含文档的字段值，必须在请求中使用如下参数指定一个或者多个

      `fields`，`docvalue_fields`，`script_fields`，`stored_fields`，仅当设置了如上的参数才会返回该属性

  

通过上面的参数学习，我们已经学会了搜索请求所需要的参数，以及响应的参数内容，下面就自己尝试练习一下吧，下一篇将开启新的写作模式

补充：Elasticsearch除了上述的参数外，还有校验参数等，后面会着重介绍，2023年第一篇文章就这样草草开始了，新的一轮发文已经起航





# 参考

https://www.elastic.co/guide/en/elasticsearch/reference/8.1/search-search.html







