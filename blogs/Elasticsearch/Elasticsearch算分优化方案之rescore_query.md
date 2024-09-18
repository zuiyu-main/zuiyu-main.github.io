---
title: Elasticsearch 算分优化方案rescore_query
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
# 简介

今天来说一说**Elasticsearch** 的重新评分，即在检索出来一次结果的基础上在进行检索提升数据排序效果，但是仅对查询或者post_filter阶段返回的前多少条进行二次查询。在每个分片上进行二次检索的文档数量时可以通过`window_size `控制的，该参数默认`10`。

默认情况下，原来的查询语句与二次查询的份数将线性组合以生成文档的最终得分`_score`,原始查询语句的权重通过`query_weight`控制，重新二次查询的权重通过`rescore_query_weight`控制，他们默认都是`1`。

在Elasticsearch中，`rescore_query`是一种用于改进搜索结果排序的查询。它可以在原始查询结果的基础上重新计算得分，并重新排序搜索结果。

`rescore_query`通常用于在搜索过程的后期阶段对搜索结果进行优化。它可以根据特定的需求和业务规则，对原始查询结果进行二次排序，以提高最相关的文档的排名。

`rescore_query`可以在分布式搜索中非常有用，因为它仅在原始查询的结果上执行计算，而不需要重新执行整个查询过程。这可以提高搜索速度并减轻系统负载。

通过使用`rescore_query`，可以根据不同的评分算法、过滤器或其他上下文信息，对搜索结果进行个性化的定制排序。它可以根据文档的属性、时间戳、地理位置等进行排序，以获得更加准确和有用的搜索结果。

总而言之，`rescore_query`是一种用于改进搜索结果排序的查询，可以根据不同的规则和需求重新计算得分并重新排序搜索结果，以提高搜索准确性和实用性。

# 实战

## 搭建ES环境

```text
version: '3.8'
services:
  cerebro:
    image: lmenezes/cerebro:0.8.3
    container_name: cerebro
    ports:
     - "9000:9000"
    command:
     - -Dhosts.0.host=http://eshot:9200
    networks:
     - elastic
  kibana:
    image: docker.elastic.co/kibana/kibana:8.1.3
    container_name: kibana
    environment:
      - I18N_LOCALE=zh-CN
      - XPACK_GRAPH_ENABLED=true
      - TIMELION_ENABLED=true
      - XPACK_MONITORING_COLLECTION_ENABLED="true"
      - ELASTICSEARCH_HOSTS=http://eshot:9200
      - server.publicBaseUrl=http://192.168.160.234:5601
    ports:
      - "5601:5601"
    networks:
      - elastic
  eshot:
    image: elasticsearch:8.1.3
    container_name: eshot
    environment:
      - node.name=eshot
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=eshot,eswarm,escold
      - cluster.initial_master_nodes=eshot,eswarm,escold
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
      - node.attr.node_type=hot
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - D:\zuiyuftp\docker\es8.1\eshot\data:/usr/share/elasticsearch/data
      - D:\zuiyuftp\docker\es8.1\eshot\logs:/usr/share/elasticsearch/logs
      - D:\zuiyuftp\docker\es8.1\eshot\plugins:/usr/share/elasticsearch/plugins
    ports:
      - 9200:9200
    networks:
      - elastic
  eswarm:
    image: elasticsearch:8.1.3
    container_name: eswarm
    environment:
      - node.name=eswarm
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=eshot,eswarm,escold
      - cluster.initial_master_nodes=eshot,eswarm,escold
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
      - node.attr.node_type=warm
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - D:\zuiyuftp\docker\es8.1\eswarm\data:/usr/share/elasticsearch/data
      - D:\zuiyuftp\docker\es8.1\eswarm\logs:/usr/share/elasticsearch/logs
      - D:\zuiyuftp\docker\es8.1\eshot\plugins:/usr/share/elasticsearch/plugins
    networks:
      - elastic
  escold:
    image: elasticsearch:8.1.3
    container_name: escold
    environment:
      - node.name=escold
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=eshot,eswarm,escold
      - cluster.initial_master_nodes=eshot,eswarm,escold
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - xpack.security.enabled=false
      - node.attr.node_type=cold
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - D:\zuiyuftp\docker\es8.1\escold\data:/usr/share/elasticsearch/data
      - D:\zuiyuftp\docker\es8.1\escold\logs:/usr/share/elasticsearch/logs
      - D:\zuiyuftp\docker\es8.1\eshot\plugins:/usr/share/elasticsearch/plugins
    networks:
      - elastic

# volumes:
#   eshotdata:
#     driver: local
#   eswarmdata:
#     driver: local
#   escolddata:
#     driver: local

networks:
  elastic:
    driver: bridge

```



## 创建索引

```text
PUT /zfc-doc-000006
{
  "mappings": {
    "properties": {
      "title":{
        "type": "text",
        "analyzer": "ik_max_word"
      },
      "content": {
        "type": "text",
        "analyzer": "ik_max_word"
      }
    }
  }
}
```



## 添加测试数据

```text
PUT _bulk
{"index":{"_index":"zfc-doc-000006","_id":"1"}}
{"title":"ES实战","content":"ES的实战操作，实战要领，实战经验"}
{"index":{"_index":"zfc-doc-000006","_id":"2"}}
{"title":"MySQL实战","content":"MySQL的实战操作"}
{"index":{"_index":"zfc-doc-000006","_id":"3"}}
{"title":"MySQL","content":"MySQL一定要会"}
```



## 检索验证

* 首先我们还是正常检索一下`content`字段中包含实战的文档

  ```text
  GET zfc-doc-000006/_search
  {
    "query": {
      "match": {
        "content": "实战"
      }
    }
  }
  ```

  按照我们的预期，因为`文档1`中包含`实战`有`3`次出现，所以`title`为`ES实战`的排名靠前，可以看到`文档1`的算分为`0.6`，位列第一，输出结果如下

  ```text
      "max_score" : 0.667102,
      "hits" : [
        {
          "_index" : "zfc-doc-000006",
          "_id" : "1",
          "_score" : 0.667102,
          "_source" : {
            "title" : "ES实战",
            "content" : "ES的实战操作，实战要领，实战经验"
          }
        },
        {
          "_index" : "zfc-doc-000006",
          "_id" : "2",
          "_score" : 0.5442147,
          "_source" : {
            "title" : "MySQL实战",
            "content" : "MySQL的实战操作"
          }
        }
      ]
  ```

  

* 然后对检索出来的实战的文档中，进行重新算分排序，包含`MySQL`的排名在前，增加算分

  ```text
  GET zfc-doc-000006/_search
  {
    "query": {
      "match": {
        "content": "实战"
      }
    },
    "rescore": {
      "query": {
        "rescore_query":{
          "match":{
            "title":"MySQL"
          }
        },
        "query_weight" : 0.7,
        "rescore_query_weight" : 1.2
      },
      "window_size": 50
    }
  }
  ```

  上述查询语句的意思就是查询`content`字段中包含`”实战“`的文档，权重为`0.7`。并对文档中`title`为`MySQL`的文档增加评分，权重为`1.2`，`window_size`为`50`，表示取分片结果的前`50`进行重新算分

  响应结果如下，可以看到`title`为`MySQL实战`的评分已经变为`0.9`，远远的超过了`title`为`ES实战`的文档

  ```text
      "hits" : [
        {
          "_index" : "zfc-doc-000006",
          "_id" : "2",
          "_score" : 0.9022989,
          "_source" : {
            "title" : "MySQL实战",
            "content" : "MySQL的实战操作"
          }
        },
        {
          "_index" : "zfc-doc-000006",
          "_id" : "1",
          "_score" : 0.46697137,
          "_source" : {
            "title" : "ES实战",
            "content" : "ES的实战操作，实战要领，实战经验"
          }
        }
      ]
  ```

# 总结

通过`rescore_query`我们可以对检索结果进行二次评分，增加自己更复杂的评分逻辑，提供更准确的结果排序，但是相应的也会增加查询的计算成本与响应时间。

在[《一篇文章让你学会Elasticsearch中的查询》](https://mp.weixin.qq.com/s/a2kCZdm5x8Sri-n-8AfpDg)一文中，我们学习了修改算分的几种方式，本文学习了如何在检索结果返回之后对检索结果进行更精细的二次评分排序。后面推出一篇专门修改算分的文章，以此来实现工作中的修改算分的需求。

如果感觉本文对你有所帮助欢迎点赞评论转发收藏。如果你想了解更多关于ES的骚操作，更多实战经验，欢迎关注。

