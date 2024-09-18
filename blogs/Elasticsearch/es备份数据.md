
---
title: Elasticsearch 数据备份与还原
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
#  elasticsearch 6.5 操作 


## elasticsearch 快照还原

* 创建一个测试索引

```text

curl -X PUT "d.xiangyunkj.com:8214/my_index?pretty" -H 'Content-Type: application/json' -d'
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

```text

curl -X PUT "d.xiangyunkj.com:8214/_snapshot/my_index?pretty" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "my_index_location"
  }
}
'
```

* 创建指定索引的快照

```text
curl -X PUT "d.xiangyunkj.com:8214/_snapshot/my_index/snapshot_1?wait_for_completion=true&pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "note_file,note_deal_logger",
  "ignore_unavailable": true,
  "include_global_state": false
}
'
```

* 导出带日期的快照

```text
curl -X PUT "d.xiangyunkj.com:8214/_snapshot/my_index/%3Csnapshot-%7Bnow%2Fd%7D%3E?pretty"

```
* 读取带日期的快照

```text
curl -X GET "d.xiangyunkj.com:8214/_snapshot/my_index/snapshot-2020.06.22?pretty"
```
* 还原所有索引的快照
```text
curl -X POST "d.xiangyunkj.com:8214/_snapshot/my_index/snapshot-2020.06.22/_restore?pretty"
```
恢复指定索引的快照

```text
curl -X POST "d.xiangyunkj.com:8214/_snapshot/my_index/snapshot_2/_restore?pretty" -H 'Content-Type: application/json' -d'
{
  "indices": "my_index",
  "ignore_unavailable": true,
  "include_global_state": true,
  "rename_pattern": "index_(.+)",
  "rename_replacement": "restored_index_$1"
}
'
```

* 设置demo 数据

```text
curl -X POST "d.xiangyunkj.com:8214/_bulk?pretty" -H 'Content-Type: application/json' -d'
{ "index" : { "_index" : "my_index", "_type" : "_doc", "_id" : "1" } }
{ "title" : "标题1", "name":"name1","age":"1"}
{ "create" : { "_index" : "my_index", "_type" : "_doc", "_id" : "2" } }
{ "title" : "标题2", "name":"name2","age":"2"}
{ "create" : { "_index" : "my_index", "_type" : "_doc", "_id" : "3" } }
{ "title" : "标题3", "name":"name3","age":"3"}
'
```

* 读取数据

```text
curl -X GET "d.xiangyunkj.com:8214/my_index/_doc/1?pretty"
```
* 删除数据

```text
curl -X DELETE "d.xiangyunkj.com:8214/my_index/_doc/1?pretty"

```

## elasticsearch 数据备份还原,参考203 /home/xykj/micro-service/elasticsearch/elasticsearch-dump

* 备份

```text
sp=$(cd `dirname $0`; pwd)
docker run --rm -ti -v $sp/data:/tmp elasticdump/elasticsearch-dump \
  --input=http://d.xiangyunkj.com:8214/note_file \
  --output=/tmp/note_file_mapping.json \
  --type=data
```

* 还原

  ```text
    docker run --rm -ti -v $PWD/data:/tmp elasticdump/elasticsearch-dump \
  --input=/tmp/note_file_mapping.json \
  --output=http://d.xiangyunkj.com:8214/note_file_bak \
  --type=data
  ```
