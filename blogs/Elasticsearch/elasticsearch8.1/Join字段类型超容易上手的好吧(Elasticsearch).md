最近因为工作原因吗，比较忙，然后个人也比较懒，输出又慢下来了，后面会慢慢恢复的，定期保证周更吧，并且保证质量输出。

阅读本文需要一定的`Elasticsearch`基础哦，本文深度有，但是不深

# 概述

Elasticsearch中`Join`数据类型的字段相信大家也都用过，也就是口中常谈的父子文档。在Elasticsearch中`Join`不能跨索引和分片，所以保存文档信息时要保证父子文档使用**相同的路由参数**来保证父文档与子文档保存在同一个索引的同一个分片，那么都有哪些限制呢？

# 父子关系的限制

* 每个索引中只能有一个关系字段
* 父文档与子文档必须在同一个索引分片中，所以我们在对父子文档增加、删除、修改时要设置路由值，保证数据都在同一分片
* 一个父文档可以包含多个子文档，但是一个子文档只能有一个父文档
* 只能在`Join`类型的字段上建立关系
* 在保证当前文档是父文档的前提下可以增加子文档

# Global ordinals

翻译过来就是全局序数。什么是全局序数呢，官方文档中说明了，这就是一个加速查询的一个东西，使用了全局序数之后可以让数据更紧凑；详细的就不展开了，后面有机会再详细说明一下全局序数，具体的目前可以查看一下官方文档

对于我们本章节内容来说，我们知道父子文档`Join`类型是使用全局序数来加速查询的就可以了。默认情况下，全局序数基本是实时构建的，当索引发生变化，全局序数会重新构建。这个过程会增加`refresh`的时间，当然这个配置也是可以关闭的，但是关闭之后会在我们接下来遇到的第一个父连接或者聚合的查询时重新构建全局序数，这样这一部分的时间就反馈给了用户，官方也是不建议我们这样做的，感觉对用户来说不是那么的友好，主要还是在一个权衡。最坏的情况就是同时有多个写入，也就是同时有多个全局序数需要重新构建，也就会造成在单个`refresh`的时间间隔内要重新构建多个全局序数

当然如果关联字段使用的不是很频繁并且写入事件很多，禁用掉是值得推荐的，禁用方式如下

```text
PUT my-index-000001
{
  "mappings": {
    "properties": {
      "join_field": {
        "type": "join",
        "relations": {
           "goods": ["details","evaluate"],
           "evaluate":"vote"
        },
        "eager_global_ordinals": false
      }
    }
  }
}
```

当然，对于全局序数占用的堆大小情况可以使用如下语句查看

```text
# Per-index
GET my-index-000001/_stats/fielddata?human&fields=join_field#goods

# Per-node per-index
GET _nodes/stats/indices/fielddata?human&fields=join_field#goods
```



# 父子文档

* 首先我们还是创建一个正常的父子关系索引，**商品**作为父文档，**详情**作为子文档

  ```text
  DELETE my-index-000001
  PUT my-index-000001
  {
    "mappings": {
      "properties": {
        "id": {
          "type": "keyword"
        },
        "join_field": { 
          "type": "join",
          "relations": {
            "goods": "details" 
          }
        }
      }
    }
  }
  ```

  * **my-index-000001**：索引名称
  * **id**：文档主键
  * **join_field**：父子关系字段，`type`标记为`Join`为父子文档
  * **relations**:  定义父子关系，`goods`为父文档类型名称，`details`为子文档类型名称，后面插入数据，查询都会使用

* 插入几条测试数据，商品有**iphon**和**mac**，详情为颜色外观与内存配置等

  ```text
  PUT my-index-000001/_doc/1?refresh
  {
    "id": "1",
    "text": "iphone 14 pro max",
    "join_field": {
      "name": "goods" 
    }
  }
  
  PUT my-index-000001/_doc/2?refresh
  {
    "id": "2",
    "text": "macbook pro ",
    "join_field": {
      "name": "goods"
    }
  }
  
  PUT my-index-000001/_doc/3?routing=1&refresh 
  {
    "id": "3",
    "text": "512G 16核",
    "join_field": {
      "name": "details", 
      "parent": "1" 
    }
  }
  
  PUT my-index-000001/_doc/4?routing=1&refresh
  {
    "id": "4",
    "text": "粉/银/黑/抹茶绿",
    "join_field": {
      "name": "details",
      "parent": "1"
    }
  }
  PUT my-index-000001/_doc/5?routing=1&refresh 
  {
    "id": "5",
    "text": "1T 32G",
    "join_field": {
      "name": "details", 
      "parent": "2" 
    }
  }
  
  PUT my-index-000001/_doc/6?routing=1&refresh
  {
    "id": "6",
    "text": "银/黑",
    "join_field": {
      "name": "details",
      "parent": "2"
    }
  }
  ```

  

* 使用`parent_id`查询父子文档，以上面插入的测试数据查询，查找`mac`的详情信息语句如下，前提是知道父文档的`id`

  ```text
  GET my-index-000001/_search
  {
    "query": {
      "parent_id": {
        "type": "details",
        "id":"2"
      }
    },
    "sort":["id"]
  }
  ```

  

* 大部分情况上面是不能满足我们的查询请求的，所以我们还可以使用`has_parent`或者`has_child`查询

  * 使用`has_parent`查询：父文档`goods`中所有包含`macbook`的子文档（后文的孙子文档也可以查询）

    ```text
    GET my-index-000001/_search
    {
      "query": {
        "has_parent": {
          "parent_type": "goods",
          "query": {
            "match": {
              "text": "macbook"
            }
          }
        }
      }
    }
    ```

    

  * 使用`hash_child`查看`details`子文档中有`1T`关键字的所有父文档

    ```text
    GET my-index-000001/_search
    {
      "query": {
        "has_child": {
          "type": "details",
          "query": {
            "match": {
              "text": "1T"
            }
          }
        }
      }
    }
    ```

* 使用`parent-join `查询或者聚合

  `Elasticsearch`在使用`Join`类型数据类型时，会自动创建一个附加的字段，结构为`Join`的字段名加`#号`加父类型，以上文为例，创建一个附加字段(`join_field#goods`)，如下是使用`parent-join`字段查询聚合的一个例子，参考自官网，应用了`8.1版本`的新特性**运行时字段**

  ```text
  GET my-index-000001/_search
  {
    "query": {
      "parent_id": { 
        "type": "details",
        "id": "1"
      }
    },
    "aggs": {
      "parents": {
        "terms": {
          "field": "join_field#goods", 
          "size": 10
        }
      }
    },
    "runtime_mappings": {
      "my_parent_field": {
        "type": "long",
        "script": """
          emit(Integer.parseInt(doc['join_field#goods'].value)) 
        """
      }
    },
    "fields": [
      { "field": "my_parent_field" }
    ]
  }
  ```

* `Join`类型的父子文档，上面我们演示了一个父文档对应一种子文档类型的例子，`Join`类型也支持一个父类型有多个子类型，以上文为基础，加入下面语句测试

  ```text
  DELETE my-index-000001
  PUT my-index-000001
  {
    "mappings": {
      "properties": {
        "id": {
          "type": "keyword"
        },
        "join_field": { 
          "type": "join",
          "relations": {
            "goods": ["details","evaluate"] 
          }
        }
      }
    }
  }
  PUT my-index-000001/_doc/7?routing=1&refresh
  {
    "id": "7",
    "text": "运行流程，无卡顿，待机时间长",
    "join_field": {
      "name": "evaluate",
      "parent": "1"
    }
  }
  PUT my-index-000001/_doc/8?routing=1&refresh
  {
    "id": "8",
    "text": "体重轻，携带方便，编码利器",
    "join_field": {
      "name": "evaluate",
      "parent": "2"
    }
  }
  ```

  

* 同样的，细心的同学已经看到了，上文已经标记了孙子文档，对的，你没看错就是孙子文档，三级的层级，级别可以更深，但是`Elasticsearch`不建议很深的层次，毕竟`Join`很消耗性能的，层级再深点没法用了,下面就是多级别的语句测试，此时他们三者的关系就如下所示

  ![image-20220915232907370](/Users/cxt/Documents/personal/wechataccount/doc/database/elasticsearch/Join字段类型超容易上手的好吧(Elasticsearch).assets/image-20220915232907370.png)

  ```text
  DELETE my-index-000001
  PUT my-index-000001
  {
    "mappings": {
      "properties": {
        "id": {
          "type": "keyword"
        },
        "join_field": { 
          "type": "join",
          "relations": {
            "goods": ["details","evaluate"],
            "evaluate":"vote"
          }
        }
      }
    }
  }
  PUT my-index-000001/_doc/9?routing=1&refresh
  {
    "id": "9",
    "text": "这是投票信息：我买iphone是因为性价比高，保值",
    "join_field": {
      "name": "vote",
      "parent": "1"
    }
  }
  PUT my-index-000001/_doc/10?routing=1&refresh
  {
    "id": "10",
    "text": "这是投票信息：我买mac是因为轻，携带方便，没有流氓软件",
    "join_field": {
      "name": "vote",
      "parent": "2"
    }
  }
  ```

  

# 总结

相信大家也看出来了，官方都不建议使用父子文档的，毕竟性能是一大问题，相信大家用`Elasticsearch`肯定大部分都是图速度快，用了`Join`字段变慢了，这谁能同意呢是吧，有利有弊吧，看大家选择，下一篇带给大家的算是`Elasticsearch`推荐`Join`字段替代类型`Nested`





