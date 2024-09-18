`ES(8.1)`认证工程师考题大纲参考如下

```
https://mp.weixin.qq.com/s/x7lMmMAo2563JysMJ8vgRQ
```

# 1、题目

今天咱们讨论的是《索引模板的创建与使用》

大体思路如下：分两部分处理、第一部分是先创建索引模板、第二部分使用索引模板。在创建索引模板之前我们先理解一下什么是索引模板、然后我们带着以下几个问题进行阅读本文

* 什么是索引模版

* 索引模版有什么用，使用场景有哪些

* 索引模版如何创建

* 如何使用索引模版

# 2、解答

## 2.1、什么是索引模版

索引模版是创建索引时自动应用提前设置好的`settings`、`mappings`和`aliases`，通过索引的名称进行匹配

对索引模版的更改时不会影响目前已经根据索引模版创建的索引

## 2.2、索引模版有什么用，使用场景有哪些

使用索引模版可以省去创建索引时再次指定`settings`、`mappings`、`aliases`的步骤，具体的应用场景比较常用的就有日志索引。

需求如下：查询日志索引名称为`log`，每天根据当天日期生成索引（`log-20221022`），所有的索引使用相同的`settings`和`mappings`，且`alias`指向最新日期的`log索引`那么我们就可以使用`索引模版`来实现，索引模版如何创建呢，其实很简单，与普通的创建索引差别不大，具体如下

## 2.3、索引模版创建

创建索引需要参数，那么创建索引模版也有参数控制，可以使用的参数如下

* `index_patterns`: 必须的参数，使用通配符定义匹配索引的规则

* `priority`：可选的参数，索引模版的匹配优先级，如果不填默认`0（最低优先级）`，多个模版时，优先匹配优先级高的模版

* `template`：可选参数，但是我认为是必须的，少了这个参数，索引模版的意义在哪呢是不是，可以说是核心参数。可以配置索引的`settings`，`mappings`，`aliases`

  * `settings`

    索引的`settings`设置，可参考上一篇文章中`settings`的部分**(关注微信公众号《醉鱼Java》获取)**

  * `mappings`

    索引的`mappings`设置，可参考上一篇文章中`mappings`的部分**(关注微信公众号《醉鱼Java》获取)**

  * `aliases`

    对象形式，`key`是别名的`名称`，并且还支持如下参数

    * `filter`

      可选，对象类型，限制别名能访问的文档

    * `index_routing`

      可选，字符串，索引操作时的路由值，如果指定会覆盖`routing`的值

    * `is_hidden`

      可选，布尔类型，如果设置为`true`，隐藏别名。默认`false`，该别名指定的所有索引必须有相同的`is_hidden`值

    * `is_write_index`

      可选，布尔类型，如果设置为`true`，该索引为别名的写索引

    * `routing`

      可选，字符串，索引和搜索操作时的路由值

    * `search_routing`

      可选，字符串，搜索操作时的路由值，如果指定会覆盖`routing`的值

* `version`

  索引模版的版本号，`Elasticsearch`不会自动生成

* `composed_of`

  可选，字符串数组，可选可使用的组件模版的有序数组。按照数组中组件模版的顺序合并，最后一个模版具有最高的优先级
  
* `data_stream`

  可选，对象类型，如果索引模版中包含该该对象，可以是空对象，则使用模版创建索引数据流和支持的索引
  
  支持如下参数
  
  * `hidden`：可选，布尔类型，如果为`true`，数据流隐藏，默认`false`
  * `allow_custom_routing`： 可选，布尔类型，如果为`true`，则数据流支持自定义路由，默认`false`
  
* `_meta`

  可选，对象类型，该索引模版的用户元数据配置
  

通过上面几个参数即可创建一个可用的索引模版，创建一个基础可用的索引模版只需要必选参数即可，例如：

```text
PUT /_index_template/log_template
{
  "index_patterns": "log*",
  "priority": "1",
  "template": {
    "settings": {
      "number_of_shards": "1",
      "number_of_replicas": "1"
    },
    "mappings": {
      "properties": {
        "creater":{
          "type":"keyword"
        },
        "module":{
          "type":"keyword"
        },
        "content":{
          "type":"text",
          "fields":{
            "keyword":{
              "type":"keyword"
            }
          }
        },
        "createtime": {
          "type": "date",
          "format": "strict_date_optional_time||epoch_millis"
        }
      }
    },
    "aliases":{
      "log":{}
    }
  }
}  
```

## 2.4、使用索引模版

### 2.4.1、通过索引模版创建索引

以上面创建的索引模版为例，索引名以log开头的索引都会自动使用索引模版创建

```text
PUT /log-2022-10-22-01
```

此时查看生成的索引`log-2022-10-22-01`如下

```text
GET /log-2022-10-22-01

# 返回如下
{
  "log-2022-10-22-01" : {
    "aliases" : {
      "log" : { }
    },
    "mappings" : {
      "properties" : {
        "content" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword"
            }
          }
        },
        "creater" : {
          "type" : "keyword"
        },
        "createtime" : {
          "type" : "date"
        },
        "module" : {
          "type" : "keyword"
        }
      }
    },
    "settings" : {
      "index" : {
        "routing" : {
          "allocation" : {
            "include" : {
              "_tier_preference" : "data_content"
            }
          }
        },
        "number_of_shards" : "1",
        "provided_name" : "log-2022-10-22-01",
        "creation_date" : "1666523830900",
        "number_of_replicas" : "1",
        "uuid" : "WouYSIukSIGucYs_grWkZw",
        "version" : {
          "created" : "8010399"
        }
      }
    }
  }
}

```

实际使用中不可能只有一个模版，那么我们创建索引时该怎么选择呢，下面咱们来一起测试下

### 2.4.2、同时匹配到多个索引模版怎么选择

* 首先在创建一个索引模版，匹配模式设置`*`，优先级设置`2`，该`my_log_template`模版`createtime`字段设置为`keyword`，上面`log_template`模版设置`createtime`为`date`类型，`Elasticsearch`如何选择测试即知

  ```text
  PUT /_index_template/my_log_template
  {
    "index_patterns":"*",
    "priority":"2",
    "template":{
      "mappings":{
        "properties":{
          "createtime":{
            "type":"keyword"
          },
          "my_test_field":{
            "type":"keyword"
          }
        }
      }
    }
  }
  ```

  

* 创建索引查看生成的`createtime`类型

  ```text
  PUT /log-2022-10-23-01
  GET /log-2022-10-23-01/_mapping
  
  # 返回如下
  {
    "log-2022-10-23-01" : {
      "mappings" : {
        "properties" : {
          "createtime" : {
            "type" : "keyword"
          },
          "my_test_field" : {
            "type" : "keyword"
          }
        }
      }
    }
  }
  
  ```

  可以看到后面创建的索引模版`my_log_template`优先级为`2`，索引匹配到多个模版时优先使用优先级高的模版

### 2.4.3、使用索引模版创建索引别名

在上面创建的索引模版`log_template`中，创建索引时会自动给索引添加别名`log`，别名操作的部分语句如下

```text
# 添加别名，对log开头的索引添加别名logs
POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "log-*",
        "alias": "logs"
      }
    }
  ]
}
# 删除别名，删除索引logs-nginx的别名logs
POST _aliases
{
  "actions": [
    {
      "remove": {
        "index": "logs-nginx",
        "alias": "logs"
      }
    }
  ]
}
```



### 2.4.4、组件模版创建

* 创建组件模版`settings`

  ```text
  PUT _component_template/zuiyu-settings
  {
    "template": {
      "settings": {
        "index.lifecycle.name": "my-lifecycle-policy"
      }
    },
    "_meta": {
      "description": "Settings for ILM",
      "my-custom-meta-field": "More arbitrary metadata"
    }
  }
  ```

  

* 创建组件模版`mappings`

  ```text
  PUT _component_template/zuiyu-mappings
  {
    "template": {
      "mappings": {
        "properties": {
          "@timestamp": {
            "type": "date",
            "format": "date_optional_time||epoch_millis"
          },
          "message": {
            "type": "wildcard"
          }
        }
      }
    },
    "_meta": {
      "description": "Mappings for @timestamp and message fields",
      "my-custom-meta-field": "More arbitrary metadata"
    }
  }
  ```

  

* 使用组件模版创建索引模版

  如下创建的为数据流模版，包含了空对象`data_stream`，具体数据流的使用可关注**公众号《醉鱼Java》**，获取后续文章的最新更新

  ```text
  PUT _index_template/zuiyu-index-template
  {
    "index_patterns": ["zuiyu-data-stream*"],
    "data_stream": { },
    "composed_of": [ "zuiyu-mappings", "zuiyu-settings" ],
    "priority": 500,
    "_meta": {
      "description": "Template for my time series data",
      "my-custom-meta-field": "More arbitrary metadata"
    }
  }
  ```

  

### 2.4.5、索引模版的删除

```text
DELETE /_template/<index-template>
# 例子中索引模版删除如下
DELETE /_index_template/log_template
```

### 2.4.6、校验索引模版是否存在

```text
# 存在返回200，不存在返回404
HEAD /_index_template/log_template
```

### 2.4.7、 查看索引模版

```text
GET /_template/<index-template>
GET /_template/log_template
```

# 3、总结

通过上面的学习，我们可以熟练的进行索引模版的创建，组件模版的创建以及模版优先级，数据流模版，组件模版优先级等，大大的满足了日常工作中的需要，如果还想了解更多参数的细节问题可以查阅官网。公众号《醉鱼Java》后续也会推出更底层的源码分析等内容，感兴趣的道友可以关注一波一起成长