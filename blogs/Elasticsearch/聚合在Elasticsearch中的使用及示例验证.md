---
title: Elasticsearch 聚合操作教程
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
## 聚合在Elasticsearch中的使用及示例验证

### 什么是聚合？

在Elasticsearch中，聚合是一种功能强大的数据处理技术，它允许我们对索引中的数据进行多种计算和分析操作。聚合可以理解为对数据集进行分组，并在每个分组上执行各种指标计算，类似于SQL中的GROUP BY和聚合函数。

### 示例数据

为了验证聚合功能，我们将使用一个示例数据集，假设我们有一个存储了商品信息的索引，包含以下字段：

1. `product_name`：商品名称
2. `category`：商品分类
3. `price`：商品价格
4. `quantity`：商品数量
5. `manufacturer`：制造商
6. `timestamp`：记录时间戳

下面我们导入测试数据

创建索引

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
      "product_name":{
        "type":"keyword"
      },
      "category":{
        "type":"keyword"
      },
      "price":{
        "type": "integer"
      },
      "quantity":{
        "type": "integer"
      },
      "manufacturer":{
        "type": "keyword"
      },
      "timestamp":{
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis" 
      }
    }
  }
}
```

添加数据

```text
PUT _bulk
{"index":{"_index":"zfc-doc-000002","_id":"1"}}
{"product_name": "iPhone 12","category": "Electronics","price": 999,"quantity": 50,"manufacturer": "Apple","timestamp": "2023-07-24 10:00:00"}
{"index":{"_index":"zfc-doc-000002","_id":"2"}}
{"product_name": "Samsung Galaxy S21","category": "Electronics","price": 799,"quantity": 30,"manufacturer": "Samsung","timestamp": "2023-07-24 11:30:00"}
{"index":{"_index":"zfc-doc-000002","_id":"3"}}
{"product_name": "Sony Bravia 65-inch TV","category": "Electronics","price": 1499,"quantity": 20,"manufacturer": "Sony","timestamp": "2023-07-24 13:15:00"}
{"index":{"_index":"zfc-doc-000002","_id":"4"}}
{"product_name": "HP Spectre x360","category": "Electronics","price": 1299,"quantity": 25,"manufacturer": "HP","timestamp": "2023-07-24 15:45:00"}
{"index":{"_index":"zfc-doc-000002","_id":"5"}}
{"product_name": "Dell XPS 15", "category": "Electronics","price": 1399,"quantity": 15,"manufacturer": "Dell","timestamp": "2023-07-24 17:20:00"}
{"index":{"_index":"zfc-doc-000002","_id":"6"}}
{"product_name": "Nike Air Zoom Pegasus 38", "category": "Sports","price": 119,"quantity": 100,"manufacturer": "Nike","timestamp": "2023-07-24 09:30:00"}
{"index":{"_index":"zfc-doc-000002","_id":"7"}}
{"product_name": "Adidas Ultraboost 21","category": "Sports","price": 129,"quantity": 80,"manufacturer": "Adidas","timestamp": "2023-07-24 10:45:00"}
{"index":{"_index":"zfc-doc-000002","_id":"8"}}
{"product_name": "Canon EOS Rebel T7i","category": "Electronics","price": 699,"quantity": 10,"manufacturer": "Canon","timestamp": "2023-07-24 14:05:00"}
{"index":{"_index":"zfc-doc-000002","_id":"9"}}
{"product_name": "LG 55-inch 4K TV", "category": "Electronics","price": 899,"quantity": 30,"manufacturer": "LG","timestamp": "2023-07-24 16:30:00"}
{"index":{"_index":"zfc-doc-000002","_id":"10"}}
{"product_name": "Lenovo ThinkPad X1 Carbon", "category": "Electronics","price": 1599,"quantity": 18,"manufacturer": "Lenovo","timestamp": "2023-07-24 18:10:00"}

```



### 聚合示例

#### 1. 词条聚合（Terms Aggregation）

词条聚合是一种用于对文本字段进行分组的聚合方式，它会将相同值的文档分到同一个桶（Bucket）中，并计算每个桶中文档的数量。

示例查询：

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "category_count": {
      "terms": {
        "field": "category",
        "size": 10
      }
    }
  }
}
```

解释：

- `"size": 0`：表示只返回聚合结果，不返回实际文档数据。
- `"aggs"`：定义聚合操作。
- `"category_count"`：自定义的聚合名称，用于标识结果。
- `"terms"`：指定使用词条聚合。
- `"field": "category"`：指定要进行聚合的字段。

- 

#### 2. 嵌套聚合（Nested Aggregation）

嵌套聚合允许在一个桶内进行更深层次的聚合操作。例如，我们可以先按分类分组，然后在每个分类内再按制造商进行分组，并计算每个分类下的平均价格。

示例查询：

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "category_group": {
      "terms": {
        "field": "category",
        "size": 10
      },
      "aggs": {
        "avg_price": {
          "avg": {
            "field": "price"
          }
        }
      }
    }
  }
}
```

解释：

- `"aggs"`：定义聚合操作。
- `"category_group"`：自定义的聚合名称，用于标识结果。
- `"terms"`：指定使用词条聚合。
- `"field": "category"`：指定要进行聚合的字段。
- `"avg_price"`：自定义的聚合名称，用于标识结果。
- `"avg"`：指定使用平均值聚合。
- `"field": "price"`：指定要进行聚合的数值字段。



#### 3.直方图聚合示例（Histogram）

假设我们希望根据商品价格（`price`字段）创建一个价格区间的直方图，将商品按照价格范围进行分组，并统计每个价格区间内的商品数量。

示例查询：

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "price_histogram": {
      "histogram": {
        "field": "price",
        "interval": 200
      }
    }
  }
}
```

解释：

- `"aggs"`：定义聚合操作。
- `"price_histogram"`：自定义的聚合名称，用于标识结果。
- `"histogram"`：指定使用直方图聚合。
- `"field": "price"`：指定要进行聚合的数值字段，即商品价格。
- `"interval": 200`：指定直方图的间隔大小，这里设置为200表示将价格范围划分为200的区间，例如：0-200、200-400、400-600等。

#### 4.范围聚合示例(Range)

范围聚合允许我们根据指定的范围条件将文档分组，例如：按价格范围进行分组并统计每个价格范围内的商品数量。

示例查询：

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "from": 0, "to": 200 },
          { "from": 200, "to": 500 },
          { "from": 500, "to": 1000 },
          { "from": 1000 }
        ]
      }
    }
  }
}
```

解释：

- `"aggs"`：定义聚合操作。
- `"price_ranges"`：自定义的聚合名称，用于标识结果。
- `"range"`：指定使用范围聚合。
- `"field": "price"`：指定要进行聚合的数值字段，即商品价格。
- `"ranges"`：指定价格范围的条件数组。
  - `{ "from": 0, "to": 200 }`：表示价格从0到200之间的商品。
  - `{ "from": 200, "to": 500 }`：表示价格从200到500之间的商品。
  - `{ "from": 500, "to": 1000 }`：表示价格从500到1000之间的商品。
  - `{ "from": 1000 }`：表示价格大于等于1000的商品。



#### 5. 统计聚合（Stats Aggregation）

统计聚合可以对数值字段进行计算，包括最小值、最大值、平均值、总和和文档数量。

示例查询：

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "price_stats": {
      "stats": {
        "field": "price"
      }
    }
  }
}
```

解释：

- `"aggs"`：定义聚合操作。
- `"price_stats"`：自定义的聚合名称，用于标识结果。
- `"stats"`：指定使用统计聚合。
- `"field": "price"`：指定要进行聚合的数值字段。

我们上面在统计聚合中可以获取很多值，那么我们也可以细化单独获取某一个的聚合结果。

#### 6. 平均值聚合（Avg Aggregation）

```json

GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "avg_price": {
      "avg": {
        "field": "price"
      }
    }
  }
}
```

#### 7. 总和聚合（Sum Aggregation）

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "total_price": {
      "sum": {
        "field": "price"
      }
    }
  }
}
```

#### 8. 最小值聚合（Min Aggregation）

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "min_price": {
      "min": {
        "field": "price"
      }
    }
  }
}

```

#### 9. 最大值聚合（Max Aggregation）

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "max_price": {
      "max": {
        "field": "price"
      }
    }
  }
}

```

#### 10. 扩展统计聚合（Extended Stats Aggregation）

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "price_stats_extended": {
      "extended_stats": {
        "field": "price"
      }
    }
  }
}
```

#### 11. 百分位数聚合（Percentiles Aggregation）

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "price_percentiles": {
      "percentiles": {
        "field": "price",
        "percents": [25, 50, 75, 90]
      }
    }
  }
}
```





#### 12. 日期直方图聚合（Date Histogram Aggregation）

假设有一个名为`timestamp`的日期字段，我们可以进行日期直方图聚合，按照日期进行分组并统计每个时间段内的文档数量。

```json
GET zfc-doc-000002/_search
{
  "size": 0,
  "aggs": {
    "date_histogram_agg": {
      "date_histogram": {
        "field": "timestamp",
        "fixed_interval": "1h"
      }
    }
  }
}
```

