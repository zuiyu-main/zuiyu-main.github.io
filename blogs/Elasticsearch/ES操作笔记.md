---
title: Elasticsearch 常用操作记录
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
# 参考

[字段分析](https://www.elastic.co/guide/cn/elasticsearch/guide/current/_controlling_analysis.html)
 [mapping](https://www.elastic.co/guide/en/elasticsearch/reference/7.9/mapping-types.html)

# 测试

## 添加测试数据

```text

PUT /zfc-doc-000001
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 1
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "keyword"
      },
      "content": {
        "type": "text",
        "fields": {
          "suggest": {
            "type": "completion",
            "analyzer": "ik_max_word"
          }
        }
      },
      "createTime": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
      },
      "agreeNum": {
        "type": "integer"
      },
      "comment": {
        "type": "nested",
        "properties": {
          "content": {
            "type": "text"
          },
          "name": {
            "type": "keyword"
          },
          "time": {
            "type": "date",
            "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          }
        }
      }
    }
  }
}
DELETE zfc-doc-000001

DELETE test_suggest

POST _bulk
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

get zfc-doc-000001/_search?allow_no_indices=true
{
  "query": {
    "match_all": {}
  },
  "explain": true,
  "docvalue_fields": [],
  "fields": [
    "{field}"
  ],
  "stored_fields": [],
  "from": 0,
  "indices_boost": [
    {
      "INDEX": 1
    }
  ],

  "runtime_mappings": {
    "FIELD": {
      "type": "",
      "script": {}
    }
  },
  "seq_no_primary_term":false,
  "size":20,
  "_source": [],
  "stats": [],
  "terminate_after":100,
  "timeout": "1s",
  "version": true
}
```



# DSL


## 查看所有

```json
GET _search
{
  "query":{
    "match_all":{}
  }
}
```



## 创建索引 

```json
PUT /my_index/
{}
```

## 创建mapping（包含子类型）
```json
PUT /my_index/_mapping/
{
  "properties": {
       "field_name": {
           "type":  "text",
           "fields":{
           	"keyword":{
	           	"ignore_above": 256,
				      "type": "keyword"
           	}
           }
       }
   }
}
```

## 创建带mapping的索引

```json
PUT /my_index
{
  "mappings": {
    "properties": {
      "field_name1":    { "type": "integer" },  
      "field_name2":  { "type": "keyword"  }, 
      "field_name3":   { "type": "text"  }     
    }
  }
}
PUT /my_index_new
{
  "mappings": {
    "properties": {
      "field_name1":    { "type": "integer" },  
      "field_name2":  { "type": "keyword"  }, 
      "field_name3":   { 
        "type": "text" ,
        "fields":{
           	"keyword":{
	           	"ignore_above": 256,
				      "type": "keyword"
           	}
           }
      }     
    }
  }
}
```



## 创建单个类型
```json
PUT /my_index/_mapping/
{
  "properties": {
       "field_name": {
           "type":  "text"
       }
   }
}
```


## 保存一个文档
```json
POST /my_index/_doc/1
{
	"field_name3":"zuiyu"
}
```

## reIndex

```json
POST _reindex
{
  "source": {
    "index": "my_index"
  },
  "dest": {
    "index": "my_index_new"
  }
}

POST _reindex
 {
     "source": {
        "remote": {
            "host": "http://172.16.0.39:9200"
        },
        "index": "test1",
        "query": {
            "match": {
                "title": "elasticsearch"
            }
         }
     },
     "dest": {
         "index": "test2"
     }
 }
```

## 别名aliases

* 准备数据

```json
PUT l1/_doc/1
{
  "title":"我想要睡你"
}

PUT l2/_doc/1
{
  "title":"你却拿我当兄弟"
}

PUT l3/_doc/1
{
  "title":"不过，我不介意"
}

```

* 创建别名

  ```json
  POST _aliases
  {
    "actions": [
      {
        "add": {
          "index": "l1",
          "alias": "a1"
        }
      }
    ]
  }
  ```

  

*  查看别名

  ```json
  GET l1/_alias
  ```

* 删除别名

  ```json
  POST _aliases
  {
    "actions": [
      {
        "remove": {
          "index": "l1",
          "alias": "a1"
        }
      }
    ]
  }
  ```

* 重命名别名,别名指向另一个索引

  ```json
  POST _aliases
  {
    "actions": [
      {
        "remove": {
          "index": "l1",
          "alias": "a1"
        }
      },
      {
        "add": {
          "index": "l2",
          "alias": "a1"
        }
      }
    ]
  }
  ```

* 为多个索引指向同样的别名（证实为多个索引分组）

  ```json
  POST _aliases
  {
    "actions": [
      {"add": {"index": "l1", "alias": "a1"}},
      {"add": {"index": "l2", "alias": "a1"}},
      {"add": {"index": "l3", "alias": "a1"}}
    ]
  }
  ```

* 使用 indeices 数组语法在一个操作中为多个索引指向别名

  ```json
  POST _aliases
  {
    "actions": [
      {"add": {"indices": ["l1", "l2", "l3"], "alias": "a2"}}
    ]
  }
  ```

* 删除别名指向的多个索引

  ```json
  POST _aliases
  {
    "actions": [
      {"remove": {"indices": ["l1", "l2", "l3"], "alias": "a2"}}
    ]
  }
  ```

* 一个索引指向多个别名

  ```json
  POST _aliases
  {
    "actions": [
      {"add": {"index": "l1", "aliases": ["a1", "a2", "a3"]}}
    ]
  }
  ```

* 将别名关联到拥有公共名称的索引（将索引 l1 l2 l3 指向 f1 别名）

  ```json
  POST _aliases
  {
    "actions": [
      {"add": {"index": "l*", "alias": "f1"}}
    ]
  }
  ```

* **别名交换** 测试失败

  ```json
  POST _aliases
  {
    "actions": [
      {"add": {"index": "l1", "alias": "a1"}},
      {"remove_index":{"index":"a1"}}
    ]
  }
  
  // 就像删除a1别名
  ```

* 过滤器别名

  1. 自定义索引
  2.  插入数据
  3. 普通查询和根据别名查询

  ```json
  PUT l4
  {
    "mappings": {
        "properties":{
          "year":{
            "type":"integer"
          },
          "method":{
            "type":"keyword"
          }
        }
    }
  }
  
  
  PUT l4/_doc/1
  {
    "year":2019,
    "method":"GET"
  }
  PUT l4/_doc/2
  {
    "year":2018,
    "method":"POST"
  }
  PUT l4/_doc/3
  {
    "year":2019,
    "method":"POST"
  }
  
  POST _aliases
  {
    "actions": [
      {
        "add": {
          "index": "l4",
          "alias": "a4",
          "filter": {
            "term": {
              "year": 2019
            }
          }
        }
      }
    ]
  }
  
  GET l4/_search
  GET a4/_search
  ```
  
* 与路由连用

  ```json
  POST _aliases
  {
    "actions": [
      {
        "add": {
          "index": "l4",
          "alias": "a4",
          "routing": "2"
        }
      }
    ]
  }
  // 另一个
  POST _aliases
  {
    "actions": [
      {
        "add": {
          "index": "l4",
          "alias": "a4",
          "search_routing": "1,2",
          "index_routing": "1"
        }
      }
    ]
  }
  
  GET a4/_search?q=year:2019&routing=2
  # 取交集2
  ```

* 写索引（如果多个索引指向一个别名，通过别名写索引，不指定 es 不知道）

  ```json
  POST _aliases
  {
    "actions": [
      {
        "add": {
          "index": "l1",
          "alias": "a1",
          "is_write_index": true
        }
      },
      {
        "add": {
          "index": "l2",
          "alias": "a1"
        }
      }
    ]
  }
  ```

* 添加单个别名

  ```json
  PUT {index}/_alias/{name}
  PUT {index}/_alias/{name}?routing=user1
  // index，要为哪个索引添加别名。
  // name，别名的名称。
  // routing，可以与别名关联的路由。
  ```

* 删除别名

  ```json
  DELETE l1/_alias/a1
  DELETE l2/_aliases/a*
  ```

* 检索现有别名

  ```json
  GET l1/_alias/a*    # 查询索引l1指向以a开头的所有别名
  GET l1/_alias/*     # 查询索引l1所有的别名
  // 查询所有别名是a1
  GET /_alias/a1
  ```

* HEAD 检测别名是否存在

  ```json
  GET _cat/aliases
  HEAD _alias/a1
  ```




## 更新文档

对象合并在一起，存在的标量字段被覆盖，新字段被添加。

```json
POST /website/_doc/1
{
  "title":"title",
  "name":"name"
}

// 更新,此时本语句会新增tags字段，修改name字段值name=》name1
POST /website/_update/1
{
  "doc":{
    "tags":["test1","test2"],
    "name":"name1"
  }
}
```

## 删除数据

```text
POST /f_info_52/_delete_by_query
{
    "query": {
        "match_all": {
        }
    }
}
```

删除全部数据

```text
curl -H 'Content-Type:application/json' -d '{ "query":{"match_all":{}}}' -XPOST "http://192.168.168.66:9200/*/_delete_by_query"
```

## 自定义分词器设置

 tokenizer 切词，从什么地方开始分词，filter 过滤停用词大小写转换，char_filter 过滤字符

```text
DELETE custom_analysis
PUT custom_analysis
{
  "settings": {
    "analysis": {
      "char_filter": {
        "my_char_filter":{
          "type":"mapping",
          "mappings":[
            "&=>and",
            "|=>or"
            ]
        },
        "html_strip_char_filter":{
          "type":"html_strip",
          "escaped_tags":["a"]
        }
      },
      "filter": {
        "mystopword":{
          "type":"stop",
          "stopwords":[
            "a","an","the","is","in"
            ]
        }
      }, 
      "tokenizer": {
        "my_tokenizer":{
        "type":"pattern",
        "pattern":"[,.!?]"
        }
      },
      "analyzer": {
        "my_analyzer":{
          "type":"custom",
          "char_filter":["my_char_filter","html_strip_char_filter"],
          "tokenizer":"my_tokenizer",
          "filter":["mystopword","uppercase"]
        }
      }
    }
  }
}

GET custom_analysis/_analyze
{
  "analyzer":"my_analyzer",
  "text":"a the <a>s傻逼本非滚</a>,sf那地方&真难.whehr this the <p>mo YOU ARE SUCCESS s</p>?"
}
```





# 查询

```text
GET /bank/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "account_number": "asc" }
  ],
  "from": 10,
  "size": 10
}

```

# 嵌套聚合

```text
GET /bank/_search
{
  "size": 0,
  "aggs": {
    "group_by_state": {
      "terms": {
        "field": "state.keyword"
      },
      "aggs": {
        "average_balance": {
          "avg": {
            "field": "balance"
          }
        }
      }
    }
  }
}

```



# 修改索引

config/elasticsearch.yml设置禁止自动创建索引

```text
action.auto_create_index: false
```



# JAVA API

### RestApi

# 索引

## 创建索引

[参考链接](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index-settings.html)

## 删除索引

```text
curl -XDELETE -u elastic:changeme http://localhost:9200/*
```



# 疑难杂症

## 磁盘占用超过90%

 high disk watermark exceeded on one or more nodes, rerouting shards

* docker-compose.yml

```yml
  elasticsearch:
    environment:
      - cluster.routing.allocation.disk.threshold_enabled=false
```

* Elasticsearch.yml

  ```yml
  cluster.routing.allocation.disk.threshold_enabled: false
  ```

## Kibaba无法链接

删除.kibana索引，重启kibana容器

```yaml
curl -XDELETE http://localhost:9200/.kibana_1
```



# 排查问题

## 获取索引信息

```text
http://127.0.0.1:9200/_cat/indices
```





