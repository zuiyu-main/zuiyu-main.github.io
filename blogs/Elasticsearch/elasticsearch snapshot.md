
---
title: Elasticsearch snapshots快照使用教程
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
#  elasticsearch 6.5 操作 

* [阅读原文](https://www.elastic.co/guide/en/elasticsearch/reference/6.8/modules-snapshots.html)
* 启动es 配置 elasticsearch.yml
```text
path.repo: ["my_backup_location"]
启动容器可以直接映射出来
-v $sp/my_backup_location:/usr/share/elasticsearch/my_backup_location \


```
* 创建一个测试索引
```text

curl -X PUT "localhost:9200/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "_doc": { 
      "properties": { 
        "title":    { "type": "text"  }, 
        "name":     { "type": "text"  }, 
        "age":      { "type": "integer" },  
        "created":  {
          "type":   "date", 
          "format": "strict_date_optional_time||epoch_millis"
        }
      }
    }
  }
}
'
```

* 创建快照

curl -X PUT "localhost:9200/_snapshot/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "my_index_location"
  }
}
'


* 创建指定索引的快照

curl -X PUT "localhost:9200/_snapshot/my_index/snapshot_2?wait_for_completion=true&pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "my_index",
  "ignore_unavailable": true,
  "include_global_state": false
}
'

* 导出带日期的快照


curl -X PUT "localhost:9200/_snapshot/my_index/%3Csnapshot-%7Bnow%2Fd%7D%3E?pretty"


* 读取带日期的快照

curl -X GET "localhost:9200/_snapshot/my_index/snapshot-2020.06.22?pretty"
curl -X GET "localhost:9200/_snapshot/my_index/snapshot-2020.06.22/_status?pretty"

* 还原，任选一个

 代码解释
 my_index 为要还原的索引名称，这个名称要与创建快照的名称相同
 snapshot-2020.06.22 创建的日期快照

curl -X POST "localhost:9200/_snapshot/my_index/snapshot-2020.06.22/_restore?pretty"


index_1,需要还原快照的索引名称 ，根据快照状态获取indices信息查看快照的信息

curl -X POST "localhost:9200/_snapshot/my_index/snapshot-2020.06.22/_restore?pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "index_1,index_2",
  "ignore_unavailable": true,
  "include_global_state": true,
  "rename_pattern": "index_(.+)",
  "rename_replacement": "restored_index_$1"
}
'

* 获取还原状态

curl -X GET "localhost:9200/_snapshot/my_index/snapshot-2020.06.22/_status?pretty"


* 设置demo 数据

curl -X POST "localhost:9200/_bulk?pretty" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "my_index", "_type" : "_doc", "_id" : "1" } }
{ "title" : "标题1", "name":"name1","age":"1"}
{ "create" : { "_index" : "my_index", "_type" : "_doc", "_id" : "2" } }
{ "title" : "标题2", "name":"name2","age":"2"}
{ "create" : { "_index" : "my_index", "_type" : "_doc", "_id" : "3" } }
{ "title" : "标题3", "name":"name3","age":"3"}
'


* 读取数据

curl -X GET "localhost:9200/my_index/_doc/1?pretty"

* 删除数据

curl -X DELETE "localhost:9200/my_index/_doc/1?pretty"

