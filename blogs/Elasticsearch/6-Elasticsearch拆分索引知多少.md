---
title: Elasticsearch拆分索引知多少
date: 2022-04-08
tags:
  - Elasticsearch
  - 源码编译
categories:
  - Elasticsearch
---
原文链接：[indices-split-index API](https://www.elastic.co/guide/en/elasticsearch/reference/7.13/indices-split-index.html)

# 环境

* Elasticsearch 7.13
* Mac 10.14.6

# 概述

拆分索引API允许将现有索引拆分为新索引，其中每个原始的主分片被拆分为新索引中的两个或者多个主分片

索引可以拆分的次数(以及每个原始的主分片可以拆分成的分片数量)由`index.number_of_routing_shards`设置。路由分片的数量指定使用的hash空间，该空间内部使用`一致性hash`在分片之间分发文档。例如，一个5个分片的索引，其中`number_of_routing_shards`设置为`30`(5 x 2 x 3),可以按照2或者3的因子来拆分,换句话说可以按照如下方式：

* 5->10->30(split by 2, then by 3)
* 5->15->30(split by 3, then by 2)
* 5->30(split by 6)

`index.number_of_routing_shards` 是静态索引设置时的选项，并且只能在**创建索引**时，或者**索引关闭**时设置

# 拆分操作流程

1. 首先创建一个与源索引定义相同的目标索引，但是这个新索引有更多的主分片数量
2. 将数据段从源索引硬链接到目标索引（如果文件系统不支持硬链接，那就将所有的数据段复制到新索引，但是这个操作会消耗更多的时间）
3. 根据文档的版本删除历史版本中的数据后再次hash所有的文档，以便删除属于不同分片的文档
4. 恢复目标索引

# 为什么Elasticsearch不支持增量重新分片

首先我们从n个分片到n+1个分片，增量重新分片确实是许多的键值存储支持的功能，添加一个新的分片并且仅将新的数据添加到新分片这不是一个可以参考的选项，为什么呢，首先这可能是一个索引的瓶颈，因为我们通过获取、删除和更新一个文档时都是需要`_id`,这样的话我们通过`_id`找到文档属于哪个分片就变的相当复杂了，也就是说我们需要一个不同的hash方案来重新平衡已经存在的数据

大多数的键值存储系统最有效的还是使用**一致性hash算法**，当分片数量从N增加到N+1时，一致性hash算法只需要重新hash `1/N`的的数据，然后Elasticsearch的存储是面对Lucene索引的，这是一个面向搜索的数据的结构，是Lucene索引中重要的一部分，即使只有5%的文档，删除它们或者在另一个索引上索引它们的成本通常比键值存储高的多，当按照上面我们所说的通过乘法因子的方式来增加分片数量时，这个成本是可以接受的，这允许Elasticsearch执行本地的索引拆分，反过来也就是可以执行索引级别的拆分，而不是重新索引需要移动的文档以及使用硬连接的方式来进行有效的文件复制

对于一致性hash算法不了解的小伙伴可以看下这篇文章，非常清楚的描述了什么是一致性hash，以及为什么选用一致性hash而不是普通hash算法

[一文理解一致性哈希算法](https://mp.weixin.qq.com/s/1llJgU_lqMWXRVfWdivZzA)

如果仅仅是追加数据的话，可以通过创建一个新索引来向其新索引写入数据，同时创建一个别名，这个别名同时包含旧索引和新索引，假设新索引和旧索引分别具有M和N个分片，这与一个具有M+N个分片的搜索相比这是没有差别的

# 监控拆分的过程

* /_cat/recovery/<target>
* /_cat/recovery
* /_cluster/health/<target>

# 前提条件

* 如果elasticseach的安全功能已经启用，则必须具有索引的管理索引权限

* 在索引拆分前：

  * 这个要拆分的索引必须时只读的

  * 所在集群的状态必须时green

    设置为只读可以使用下面语句

    ```text
    curl -X PUT "localhost:9200/my_source_index/_settings?pretty" -H 'Content-Type: application/json' -d'
    {
      "settings": {
        "index.blocks.write": true 
      }
    }
    '
    ```

  当前写入索引的数据流不能被拆分，如果要拆分当前写入索引，这个数据流必须先进行反转以便创建一个新的写入索引，然后以前的写入索引就可以被拆分

# 测试步骤

* 创建索引

  ```text
  curl -XPUT "localhost:9200/test_split_index" -H 'Content-Type: application/json' -d '
  {
    "settings": {
          "index.number_of_shards" : 1,
          "index.number_of_routing_shards" : 10,
          "index.number_of_replicas": 2
      }
  }
  '
  ```

* 删除索引(根据自己需求使用)

  ```text
  curl -XDELETE "localhost:9200/test_split_index"
  ```

* 插入数据

  ```text
  curl -XPOST "localhost:9200/test_split_index/_bulk?pretty" -H 'Content-Type: application/json' -d '
  { "index": {}}
  {  "user":"user1",  "age":"18"}
  { "index": {}}
  {  "user":"user2",  "age":"19"}
  { "index": {}}
  {  "user":"user3",  "age":"20"}
  { "index": {}}
  {  "user":"user4",  "age":"21"}
  { "index": {}}
  {  "user":"user5",  "age":"22"}
  '
  ```
  
* 关闭索引

  ```text
  curl -XPOST "localhost:9200/test_split_index/_close"
  ```

* 防止切分数据时有数据写入

  ```text
  curl -XPUT "localhost:9200/test_split_index/_settings?pretty" -H 'Content-Type: application/json' -d'
  {
  "settings": {
  "index.blocks.write": true
  }
  }
  '
  ```

* 打开索引

  ```text
  curl -XPOST "localhost:9200/test_split_index/_open"
  ```

* 拆分索引

  **test_split_index**为要准备拆分的索引

  **split_index_target**为要拆分的新的索引名称

  ```text
  curl -XPOST "localhost:9200/test_split_index/_split/split_index_target?pretty" -H 'Content-Type: application/json' -d'
  {
    "settings": {
      "index.number_of_shards": 10
    }
  }
  '
  ```

* 查看执行过程

  ```text
  curl http://localhost:9200/_cat/recovery?v
  curl http://localhost:9200/_cluster/health/split_index_target
  ```
  

# 遇到的问题

* 单机启动的集群环境，3个节点， 但是因为磁盘空间满了，造成**副本分片无法分配**，此时可以通过以下方式进行解决

  * 删除硬盘垃圾数据

  * 修改es的磁盘利用率设置，默认是85%，具体怎么修改查看官网，地址如下

    ```text
    https://www.elastic.co/guide/en/elasticsearch/reference/7.13/modules-cluster.html#disk-based-shard-allocation
    ```

    

    