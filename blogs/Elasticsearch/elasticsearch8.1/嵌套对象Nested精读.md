上一篇文章中，我们学习了`Join`类型的父子文档，今天继续学习一下嵌套文档，毕竟嵌套文档也是`Elasticsearch`推荐的，首先我们看下面这条语句

```text
PUT word_document/_doc/1
{
  "title" : "up",
  "user" : [ 
    {
      "name" : "honghong",
      "sex" :  "female",
      "numberOfLikes":500
    },
    {
      "name" : "mingming",
      "sex" :  "male",
      "numberOfLikes":50
    },
    {
      "name" : "lanlan",
      "sex" :  "male",
      "numberOfLikes":100
    }
  ]
}
```

对于上面这种格式的数据，`user`就是嵌套对象数组，那么`user`在`Elasticsearch`中是怎么存储的呢？如果我们要对嵌套的子对象进行检索，怎么才能检索出我们所需要的数据呢，下面我们就一起来研究下`Nested`数据类型

# 环境

* macos 10.14.6
* Elasticsearch 8.1
* Kibana 8.1

# Nested

开头我们还是先了解一下，什么是`Nested`类型，其实就是字面意思，`Nested`就是嵌套，也就是文章开头`user`数据类型那种，所以可以看为是一种特殊的`Object`类型。还是以文章开头的数据为例

```text
PUT word_document/_doc/1
{
  "title" : "up",
  "user" : [ 
    {
      "name" : "honghong",
      "sex" :  "female",
      "numberOfLikes":500
    },
    {
      "name" : "mingming",
      "sex" :  "male",
      "numberOfLikes":50
    },
    {
      "name" : "lanlan",
      "sex" :  "male",
      "numberOfLikes":100
    }
  ]
}
```

如果我们没有对`word_document`索引进行显示设置数据类型，在上面这个语句执行之后，Elasticsearch会默认推断数据类型，在Elasticsearch中内容会转换为可能如下的形式，扁平化的处理数据

```json
{
  "title":"up",
  "user.name":["honghong","mingming","lanlan"],
  "user.sex":["male","male","female"],
  "user.numberOfLikes":[500,50,100]
}
```

相信大家也看出来了，如果被`Elasticsearch`转换成上面的这种数据结构之后，我们的搜索结果是会被影响的，假如我们使用如下这个语句进行查询，我们想搜索`name`是`honghong`，`sex`是`male`，预期结果是没有匹配的文档，但是因为`Elasticsearch`对上述的结果进行了扁平化的处理，造成了错误的匹配

```text
GET word_document/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "user.name": "honghong" }},
        { "match": { "user.sex":  "male" }}
      ]
    }
  }
}
```

如何避免上述情况的发生呢，那就是使用`Elasticsearch`提供的`Nested`数据类型，`Nested` 数据类型保证了嵌套对象的独立性，也就是让我们可以对嵌套对象的内容进行检索，从而不会发生上述的这种情况

* 首先我们还是以上面文档为例，不过是这次我们优先创建索引，并指定`user`字段为`nested`

  ```text
  PUT word_document
  {
    "mappings": {
      "properties": {
        "title":{
          "type": "keyword"
          },
        "user": {
          "type": "nested" 
        },
        "numberOfLikes":{
          "type": "integer"
        }
      }
    }
  }
  ```

  

* 下面加入我们的测试数据，来验证我们的搜索语句

  ```text
  PUT word_document/_doc/1
  {
    "title" : "up",
    "user" : [ 
      {
        "name" : "honghong",
        "sex" :  "female",
        "numberOfLikes":500
      },
      {
        "name" : "mingming",
        "sex" :  "male",
        "numberOfLikes":50
      },
      {
        "name" : "lanlan",
        "sex" :  "male",
        "numberOfLikes":100
      }
    ]
  }
  PUT word_document/_doc/2
  {
    "title" : "up",
    "user" : [ 
        {
        "name" : "honghong",
        "sex" :  "female",
        "numberOfLikes":20
      },
      {
        "name" : "mingming",
        "sex" :  "male",
        "numberOfLikes":30
      },
      {
        "name" : "lanlan",
        "sex" :  "male",
        "numberOfLikes":50
      }
    ]
  }
  PUT word_document/_doc/3
  {
    "title" : "up",
    "user" : [ 
      {
        "name" : "honghong",
        "sex" :  "female",
        "numberOfLikes":50
      },
      {
        "name" : "mingming",
        "sex" :  "male",
        "numberOfLikes":50
      },
      {
        "name" : "lanlan",
        "sex" :  "male",
        "numberOfLikes":50
      }
    ]
  }
  ```

* 下面还是刚才那个搜索语句，此时就不会有匹配的文档返回，返回结果为空

  ```text
  GET word_document/_search
  {
    "query": {
      "nested": {
        "path": "user",
        "query": {
          "bool": {
            "must": [
              { "match": { "user.name": "honghong" }},
              { "match": { "user.sex":  "male" }} 
            ]
          }
        }
      }
    }
  }
  ```

  

* 那么对于嵌套文档我们可以怎么查询呢，那就是指定`nested`查询类型，使用普通的查询是查询不到的哦，`nested`查询语句如下所示，此时返回的就是我们

  ```text
  GET word_document/_search
  {
    "query": {
      "nested": {
        "path": "user",
        "query": {
          "bool": {
            "must": [
              { "match": { "user.name": "honghong" }},
              { "match": { "user.sex":  "female" }} 
            ]
          }
        },
        "inner_hits": { 
          "highlight": {
            "fields": {
              "user.name": {}
            }
          }
        }
      }
    }
  }
  ```

  

* 此外我们还可以根据嵌套对象中的字段进行排序，升序时获取嵌套对象中最小的值最为比较值，降序时获取嵌套对象最大的值作为比较值

  ```text
  GET word_document/_search
  {
    "query": {
      "nested": {
        "path": "user",
        "query": {
          "match": {
            "user.sex": "male"
          }
        }
      }
    },
    "sort":[
      {
        "user.numberOfLikes": {
          "order": "asc", 
          "nested": {
            "path":"user"
          }
        }
      }
      ]
  }
  ```

  返回如下

  ```text
  {
    "took" : 101,
    "timed_out" : false,
    "_shards" : {
      "total" : 1,
      "successful" : 1,
      "skipped" : 0,
      "failed" : 0
    },
    "hits" : {
      "total" : {
        "value" : 3,
        "relation" : "eq"
      },
      "max_score" : null,
      "hits" : [
        {
          "_index" : "word_document",
          "_id" : "2",
          "_score" : null,
          "_source" : {
            "title" : "up",
            "user" : [
              {
                "name" : "honghong",
                "sex" : "female",
                "numberOfLikes" : 20
              },
              {
                "name" : "mingming",
                "sex" : "male",
                "numberOfLikes" : 30
              },
              {
                "name" : "lanlan",
                "sex" : "male",
                "numberOfLikes" : 50
              }
            ]
          },
          "sort" : [
            20
          ]
        },
        {
          "_index" : "word_document",
          "_id" : "1",
          "_score" : null,
          "_source" : {
            "title" : "up",
            "user" : [
              {
                "name" : "honghong",
                "sex" : "female",
                "numberOfLikes" : 500
              },
              {
                "name" : "mingming",
                "sex" : "male",
                "numberOfLikes" : 50
              },
              {
                "name" : "lanlan",
                "sex" : "male",
                "numberOfLikes" : 100
              }
            ]
          },
          "sort" : [
            50
          ]
        },
        {
          "_index" : "word_document",
          "_id" : "3",
          "_score" : null,
          "_source" : {
            "title" : "up",
            "user" : [
              {
                "name" : "honghong",
                "sex" : "female",
                "numberOfLikes" : 50
              },
              {
                "name" : "mingming",
                "sex" : "male",
                "numberOfLikes" : 50
              },
              {
                "name" : "lanlan",
                "sex" : "male",
                "numberOfLikes" : 50
              }
            ]
          },
          "sort" : [
            50
          ]
        }
      ]
    }
  }
  
  ```

  

* 我们也可以对嵌套对象进行聚合操作，如下我们获取索引中`user.name=honghong`,`user.sex=female`的所有文档，聚合统计`numberOfLikes`的最小值

  ```text
  GET word_document/_search
  {
    "query": {
      "nested": {
        "path": "user",
        "query": {
          "bool": {
            "must": [
              {
                "match": {
                  "user.name": "honghong"
                }
              },
              {
                "match": {
                  "user.sex": "female"
                }
              }
            ]
          }
        }
      }
    },
    "aggs": {
      "my_min_value": {
        "nested": {
          "path": "user"
        }, 
        "aggs": {
          "min_value": {
            "min": {
              "field": "user.numberOfLikes"
            }
          }
        }
      }
    }
  }
  ```

  

* 上面的聚合统计只是对外部的文档过滤，那如果我们有这么一个需求，聚合统计嵌套对象`user`内容`sex=male`的最小值，那么我们可以使用如下**filter**，下面这个语句优先过滤`title=up`的文档，聚合统计`user.sex=male`的`numberOfLikes`最小值

  ```text
  GET /word_document/_search?size=0
  {
    "query": {
      "match": {
        "title": "up"
      }
    },
    "aggs": {
      "my_user": {
        "nested": {
          "path": "user"
        },
        "aggs": {
          "filter_my_user": {
            "filter": {
              "bool": {
                "filter": [
                  {
                    "match": {
                      "user.sex": "male"
                    }
                  }
                ]
              }
            },
            "aggs": {
              "min_price": {
                "min": {
                  "field": "user.numberOfLikes"
                }
              }
            }
          },
          "no_filter_my_user":{
            "min": {
              "field": "user.numberOfLikes"
            }
          }
        }
      }
    }
  }
  ```

  

* 最后还有一种就是反向嵌套聚合，通过嵌套对象聚合父文档，返回父文档信息

  首先我们还是先创建一个索引添加几条数据用来测试

  ```text
  PUT /issues
  {
    "mappings": {
      "properties": {
        "tags": { "type": "keyword" },
        "comments": {                            
          "type": "nested",
          "properties": {
            "username": { "type": "keyword" },
            "comment": { "type": "text" }
          }
        }
      }
    }
  }
  PUT /issues/_doc/1
  {
    "tags":"跳舞",
    "comments":[{
      "username":"小李",
      "comment":"小李想学跳舞"
    },
    {
      "username":"小红",
      "comment":"小红跳舞很有天赋"
    }
    ]
  }
  PUT /issues/_doc/2
  {
    "tags":"唱歌",
    "comments":[{
      "username":"小李",
      "comment":"小李会唱歌"
    },
    {
      "username":"小李",
      "comment":"小李唱歌有天赋"
    },
    {
      "username":"小红",
      "comment":"小红是歌手"
    }
    ]
  }
  PUT /issues/_doc/3
  {
    "tags":"跳舞",
    "comments":[
    {
      "username":"小红",
      "comment":"小红会跳舞"
    },
    {
      "username":"小红",
      "comment":"小红是舞神"
    }
    ]
  }
  PUT /issues/_doc/4
  {
    "tags":"唱歌",
    "comments":[
    {
      "username":"小李",
      "comment":"小李简直就是天生歌手"
    }
    ]
  }
  PUT /issues/_doc/5
  {
    "tags":"跳舞",
    "comments":[
    {
      "username":"小红",
      "comment":"小红舞姿很美"
    }
    ]
  }
  ```

  > issues  问题；tags 标签；username 名字；comment 评论；

  下面我们使用反向嵌套聚合父文档，需求如下：

  1、先聚合统计出评论最多的`username`

  2、在聚合统计`username`中`comment`最多的`tag`

  ```text
  GET /issues/_search?size=0
  {
    "query": {
      "match_all": {}
    },
    "aggs": {
      "comments": {
        "nested": {
          "path": "comments"
        },
        "aggs": {
          "top_usernames": {
            "terms": {
              "field": "comments.username"
            },
            "aggs": {
              "comment_to_issue": {
                "reverse_nested": {}, 
                "aggs": {
                  "top_tags_per_comment": {
                    "terms": {
                      "field": "tags"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ```

  结果如下，得出结论：`小红`评论次数最多，评论了`5次`，小红评论最多的标签是`跳舞`，有`3次`

  ```text
  {
    "aggregations" : {
      "comments" : {
        "doc_count" : 9,
        "top_usernames" : {
          "doc_count_error_upper_bound" : 0,
          "sum_other_doc_count" : 0,
          "buckets" : [
            {
              "key" : "小红",
              "doc_count" : 5,
              "comment_to_issue" : {
                "doc_count" : 4,
                "top_tags_per_comment" : {
                  "doc_count_error_upper_bound" : 0,
                  "sum_other_doc_count" : 0,
                  "buckets" : [
                    {
                      "key" : "跳舞",
                      "doc_count" : 3
                    },
                    {
                      "key" : "唱歌",
                      "doc_count" : 1
                    }
                  ]
                }
              }
            },
            {
              "key" : "小李",
              "doc_count" : 4,
              "comment_to_issue" : {
                "doc_count" : 3,
                "top_tags_per_comment" : {
                  "doc_count_error_upper_bound" : 0,
                  "sum_other_doc_count" : 0,
                  "buckets" : [
                    {
                      "key" : "唱歌",
                      "doc_count" : 2
                    },
                    {
                      "key" : "跳舞",
                      "doc_count" : 1
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
  
  ```

# Nested 支持的参数有哪些

`Nested`也只是特殊的`Object`的一种，也是有支持的几种参数

* `dynamic`: (可选参数) 是否允许在索引`mapping`文件未定义字段的情况下对新字段的处理，默认是加入到现有的嵌套对象中(`true`),还支持`false`，`strict`
* `properties`: (可选参数) 嵌套对象字段内容属性设置
* `include_in_parent`:(可选参数) 默认`false`，如果为`true`，嵌套对象的字段也会作为普通字段的形式(`flat`)添加到父文档
* `include_in_root`:(可选参数) 默认`false`，如果为`true`，嵌套对象的字段也会作为普通字段的形式(`flat`)添加到根文档

# Nested 类型的约束

通过前面的学习，我们也知道了nested类型可以作为一个单独的`Lucene`文档进行所有，当我们有`100`个嵌套对象的时候我们需要`101`个文档来存储映射关系，一个用于父文档，一个用于嵌套文档，所以这一部分的开销，`ELasticsearch`来通过一下设置进行了约束

* `index.mapping.nested_fields.limit`

  一个索引中，嵌套类型字段(nested)最多存在多个限制，默认`50个`，如我们上面的例子中，也就是只占用了一个

* `index.mapping.nested_objects.limit`

  一个索引中，单个嵌套类型字段包含的嵌套`JSON`对象的最大数量，默认`10000`

# 总结

通过上面的学习实践，我们可以知道`Nested`嵌套类型是`Elasticsearch`推荐的相对于`Join`类型，并且`Nested`可以实现查询，聚合，排序等，基本满足了工作的需要。好了，到这就结束吧，有什么需要深入了解的，留言哦，也可以去官网查看，毕竟官网还是一手资料，博主的也只能算是入门启蒙笔记，实践起来吧，加油！

[Join 字段的详解可以参考博主的这一篇文章哦](https://mp.weixin.qq.com/s/b6cjgMO-3JQzOWt-uofumA)





