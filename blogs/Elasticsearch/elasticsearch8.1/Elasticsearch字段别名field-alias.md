# 环境

* Elasticsearch 8.1
* Kibana 8.1
* MacOS 10.14.6

# 简介

首先我们还是先了解一下，**什么是字段别名？**大家可能听说过**索引别名**，通过索引的别名可以轻松的切换所需的数据来源与哪一个索引，那么什么是字段别名呢？所谓字段别名，就是索引mapping定义时的备用字段，通过字段别名可以替换搜索请求中的目标字段，字段别名可以用于`搜索`，`排序`，`聚合`，`高亮`，`docvalue_fields`，`stored_fields`，`suggestions`，下面我们一起来看一下字段别名的详细使用过程

# 使用

## 定义字段别名规范

* 必须是一个明确的字段，不能是一个对象或者指向另一个字段别名
* 在创建字段别名时，字段别名指向的目标字段必须已经存在
* 如果定义了嵌套的对象，则字段别名必须具有同样的嵌套范围

字段别名只能指向一个字段，不能同时指向多个字段；

但是可以通过修改`mapping`中的字段别名设置指向另一个新字段

## 不支持使用字段别名的API

* 首先是不能在写入数据的时候使用字段别名，因为本身字段别名是虚拟的，不存在的，所以不支持写入，同样也不能用于`copy_to`
* 因为字段的别名是不存在`_source`中的，所以搜索请求时的过滤字段也是不会生效的

# 测试

* 创建索引，定义字段别名

  其中创建了索引`blog1`和`blog2`,各自定义了两个字段别名`public_count`和`public_content`,在`blog1`索引中，`public_count`指向`doc.count`,`public_content`指向`doc.content`;在`blog2`索引中，`public_count`指向`doc_count`,`public_content`指向`doc_content`;

  ```text
  PUT blog1
  {
    "mappings": {
      "properties": {
        "doc": {
          "properties": {
            "count": {
              "type": "long"
            },
            "content": {
              "type": "text",
              "fields": {
                "keyword": {
                  "type": "keyword"
                }
              }
            }
          }
        },
        "creater": {
          "type": "keyword"
        },
        "public_count": {
          "type": "alias",
          "path": "doc.count"
        },
        "public_content": {
          "type": "alias",
          "path": "doc.content"
        }
      }
    }
  }
  
  
  PUT blog2
  {
    "mappings": {
      "properties": {
        "doc_count": {
          "type": "long"
        },
        "doc_content": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword"
            }
          }
        },
        "creater": {
          "type": "keyword"
        },
        "public_count": {
          "type": "alias",
          "path": "doc_count"
        },
        "public_content": {
          "type": "alias",
          "path": "doc_content"
        }
      }
    }
  }
  ```

* 插入测试数据

  ```text
  POST _bulk
  { "index":{"_index":"blog1","_id":"1"}}
  {"creater":"zuiyu1","doc.count":"100","doc.content":"zuiyu elasticsearch "}
  { "index":{"_index":"blog1","_id":"2"}}
  {"creater":"zuiyu2","doc.count":"200","doc.content":"zuiyu vue"}
  { "index":{"_index":"blog1","_id":"3"}}
  {"creater":"zuiyu3","doc.count":"300","doc.content":"java demo"}
  { "index":{"_index":"blog1","_id":"4"}}
  {"creater":"zuiyu4","doc.count":"300","doc.content":"java demo plus"}
  { "index":{"_index":"blog1","_id":"5"}}
  {"creater":"zuiyu5","doc.count":"300","doc.content":"java pro and elasticsearch"}
  { "index":{"_index":"blog2","_id":"1"}}
  {"creater":"zuiyu1","doc_count":"10","doc_content":"醉鱼ES小白入门课"}
  { "index":{"_index":"blog2","_id":"2"}}
  {"creater":"zuiyu2","doc_count":"550","doc_content":"醉鱼前端 vue 小白入门课"}
  { "index":{"_index":"blog2","_id":"3"}}
  {"creater":"zuiyu3","doc_count":"60","doc_content":"醉鱼java小白入门课"}
  { "index":{"_index":"blog2","_id":"4"}}
  {"creater":"zuiyu4","doc_count":"60","doc_content":"醉鱼MySQL8.0小白入门课"}
  { "index":{"_index":"blog2","_id":"5"}}
  {"creater":"zuiyu5","doc_count":"60","doc_content":"醉鱼Redis小白入门课"}
  
  ```

* 搜索测试、聚合、排序、高亮、建议

  目标是实现搜索索引`blog1`和`blog2`中`content`内容中包含`java`的文档,因为两个索引的`mapping`结构完全不一样，所以使用定义的相同名称的`public_count`和`public_content`

  * 聚合

    使用`public_count`字段搜索索引`blog1`和`blog2`中`public_count` 大于100的文档，对`public_count`进行聚合分桶

    ```text
    GET blog*/_search?size=0
    {
      "query": {
        "range": {
          "public_count": {
            "gte": 100
            }
        }
      },
      "aggs": {
        "all_agg": {
          "terms": {
            "field": "public_count"
          }
        }
      }
    }
    ```

  * 排序

    使用`public_count`字段搜索索引`blog1`和`blog2`中`public_count`结果大于100的文档,对`public_count`进行降序输出

    ```text
    GET blog*/_search
    {
      "query": {
        "range": {
          "public_count": {
            "gte": 100
            }
        }
      },
      "sort": [
        {
          "public_count": {
            "order": "desc"
          }
        }
      ]
    }
    ```

  * 高亮

    使用`public_content`字段搜索索引`blog1`和`blog2`中包含`java`的，高亮输出，结果前后加上`em`标签

    ```text
    GET blog*/_search
    {
      "query": {
        "wildcard": {
          "public_content": {
            "value": "*java*"
          }
        }
      },
      "highlight": {
        "fields": {
          "public_content": {
            "pre_tags": [
              "<em>"
            ],
            "post_tags": [
              "</em>"
            ]
          }
        }
      }
    }
    ```

    

  * 建议

    使用`public_count`字段搜索索引`blog1`和`blog2`中搜索`public_content`中包含`java`的文档，输入一个错误单词`jave`,建议返回`java`

    ```text
    GET blog*/_search
    {
      "query": {
        "wildcard": {
          "public_content": {
            "value": "*java*"
          }
        }
      },
      "suggest": {
        "YOUR_SUGGESTION": {
          "text": "jave",
          "term": {
            "field": "public_content"
          }
        }
      }
    }
    ```

  * `_source`测试

    使用`_source`测试返回字段`public_count`，`public_content`，因为字段别名是虚拟的，所以此时是没有返回结果的

    ```text
    GET blog*/_search
    {
      "query": {
        "wildcard": {
          "public_content": {
            "value": "*java*"
          }
        }
      },
      "_source": [
        "public_count",
        "public_content"
      ]
    }
    ```

  * 使用`docvalue_fields`请求字段获取

    ```text
    GET blog*/_search
    {
      "query": {
        "wildcard": {
          "public_content": {
            "value": "*java*"
          }
        }
      },
       "docvalue_fields": [
        "public_count"
      ]
    }
    ```

    

# 使用场景

简单总结一下字段别名的使用场景：

* 文中的例子，可以对同一个人在不同博客网站上写的内容进行统计
* 获取采集的日志信息，不同的数据源，索引的日志mapping不一样，统计时就可以使用字段别名进行统一的统计