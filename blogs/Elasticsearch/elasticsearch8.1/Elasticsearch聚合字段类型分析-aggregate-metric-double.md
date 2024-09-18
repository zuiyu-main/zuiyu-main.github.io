> **https://www.elastic.co/guide/en/elasticsearch/reference/8.1/aggregate-metric-double.html**

# 环境信息

* Elasticsearch 8.1
* Kibana 8.1
* MacOS 10.14.6

# 描述

今天我们学习一下Elasticsearch的聚合字段类型，所谓聚合字段类型，类型设置为`aggregate_metric_double`作为一个对象，子字段可以有`min`,`max`,`sum`,`value_count`,当我们对字段设置为`aggregate_metric_double`类型的字段做聚合时，它能够直接使用子字段的值进行聚合，比如最大值就可以直接去子对象中`max`的值比较

# 参数

`aggregate_metric_double`类型的字段支持以下三个参数的设置

* metrics

  必填、数组值、最少包含以下值的一个**[min,max,sum,value_count]**

* default_metric

  聚合子字段查询，script的字段设置，字符串，必须是`metrics`数组中的一个

* time_series_metric

  可选，字符串值，默认为空，支持`counter`,`gauge`,`summary`中的某一个。当前版本为预览功能，最新版参考

  > https://www.elastic.co/guide/en/elasticsearch/reference/master/tsds.html#time-series-metric
  >
  > https://www.elastic.co/guide/en/elasticsearch/reference/master/aggregate-metric-double.html

# 使用

* min 使用子字段的`min`字段进行聚合统计

* max 使用子字段的`max`字段进行聚合统计
* sum 使用子字段的`sum`字段进行聚合统计
* value_count 使用子字段的`value_count`字段进行聚合统计
* avg 这个比较特殊，他没有子字段，他使用`sum`和`value_count`两个字段聚合的结果，也就是说聚合字段的子对象必须同时包含`sum`与`value_count`

# 验证

如下是测试的例子，参考如下

* 首先我们还是通过Kibana 创建一个索引，索引中就包含一个`aggregate_metric_double`类型的一个对象字段

  ```text
  PUT my-index-006
  {
    "mappings": {
      "properties": {
        "zuiyu_agg_metric_field":{
          "type":"aggregate_metric_double",
          "metrics":["min","max","sum","value_count"],
          "default_metric":"max"   
          }
      }
    }
  }
  ```

  

* 下面是插入测试数据

  ```text
  POST _bulk
  {"index":{"_index":"my-index-006","_id":"1"}}
  {"zuiyu_agg_metric_field":{"min":100.00,"max":1000.00,"sum":5000.00,"value_count":10}}
  {"index":{"_index":"my-index-006","_id":"2"}}
  {"zuiyu_agg_metric_field":{"min":-10.00,"max":30.00,"sum":70.00,"value_count":8}}
  {"index":{"_index":"my-index-006","_id":"3"}}
  {"zuiyu_agg_metric_field":{"min":-90.00,"max":300.00,"sum":200.00,"value_count":5}}
  
  ```

  

* 搜索聚合统计验证(?size=0 不反悔查询结果只返回聚合结果)

  ```text
  GET my-index-006/_search?size=0
  {
    "aggs": {
      "zuiyu_min": {
        "min": {
          "field": "zuiyu_agg_metric_field"
        }
      },
      "zuiyu_max": {
        "max": {
          "field": "zuiyu_agg_metric_field"
        }
      },
      "zuiyu_sum": {
        "sum": {
          "field": "zuiyu_agg_metric_field"
        }
      },
      "zuiyu_value_count": {
        "value_count": {
          "field": "zuiyu_agg_metric_field"
        }
      },
      "zuiyu_avg": {
        "avg": {
          "field": "zuiyu_agg_metric_field"
        }
      }
    }
  }
  ```

* 测试`default_metric`字段对查询时的默认匹配与排序

  ```text
  GET my-index-006/_search
  {
    "query": {
      "term": {
        "zuiyu_agg_metric_field": {
          "value": "30"
        }
      }
    }
  }
  
  GET my-index-006/_search
  {
    "query": {
      "match_all": {}
    },
    "sort": [
      {
        "zuiyu_agg_metric_field": {
          "order": "asc"
        }
      }
    ]
  }
  ```



# 总结

字段类型为`aggregate_metric_double`的字段，可以设置`metrics`,支持`min`，`max`，`sum`，`value_count`，`avg`五中，其中`avg`不显示设置，`avg`取值`sum`和`value_count`。设置字段之后我们之后的聚合操作可以直接使用类型为`aggregate_metric_double`字段的子对象中对应的`max`,`min`,`sum`,`value_count`进行聚合





