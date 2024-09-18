---
title: Elasticsearch 自定义分词器
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
# 本文环境

 elasticsearch 7.4.0
 ik 7.4.0
 pinyin 7.4.0

# 安装ik分词器

https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v7.4.0

* 下载 elasticsearch-analysis-ik-7.4.0.zip

* 在es对应的plugins文件夹下面新建ik文件夹

* 解压zip到ik文件夹 unzip elasticsearch-analysis-ik-7.4.0.zip -d plugins/ik

# 安装pinyin分词器

https://github.com/medcl/elasticsearch-analysis-pinyin/releases/tag/v7.4.0

* 下载 elasticsearch-analysis-pinyin-7.4.0.zip

* 在es对应的plugins中新建pinyin文件夹

* 解压压缩包到pinyin文件夹 unzip elasticsearch-analysis-pinyin-7.4.0.zip -d plugins/pinyin


# 本demo搭建脚本参考

  如果启动不成功，修改es映射文件夹路径配置，保留一个plugins的映射即可，本地的plugins里面包含上面解压的两个分词器

version: '2.2'
services:
  cerebro:
    image: lmenezes/cerebro:0.8.3
    container_name: cerebro
    ports:
     - "9000:9000"
    command:
     - -Dhosts.0.host=http://elasticsearch:9200
    networks:
     - es74net
  kibana:
    image: docker.elastic.co/kibana/kibana:7.4.0
    container_name: kibana74
    environment:
      - I18N_LOCALE=zh-CN
      - XPACK_GRAPH_ENABLED=true
      - TIMELION_ENABLED=true
      - XPACK_MONITORING_COLLECTION_ENABLED="true"
    ports:
      - "5601:5601"
    networks:
      - es74net
  elasticsearch:
    image: elasticsearch:7.4.0
    container_name: es74
    environment:
      - cluster.name=docker-cluster
      - node.name=es74
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
      - discovery.seed_hosts=es74
      - cluster.initial_master_nodes=es74
      - path.repo=['my_backup_location']
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - es74data1:/usr/share/elasticsearch/data
      - my_backup_locaton:/usr/share/elasticsearch/my_backup_location
      - ./plugins:/usr/share/elasticsearch/plugins
    ports:
      - 9200:9200
      - 9300:9300
    networks:
      - es74net


volumes:
  es74data1:
    driver: local
  my_backup_locaton:
    driver: local


networks:
  es74net:
    driver: bridge

# 创建分词器配置

PUT index
{
    "settings" : {
        "analysis" : {
            "analyzer" : {
                "ik_smart_pinyin" : {
                    "tokenizer" : "ik_smart",
                    "filter" : "pinyin_first_letter_and_full_pinyin_filter"
                },
                "ik_max_pinyin" : {
                    "tokenizer" : "ik_max_word",
                    "filter" : "pinyin_first_letter_and_full_pinyin_filter"
                }
            },
            "filter" : {
                "pinyin_first_letter_and_full_pinyin_filter" : {
                    "type" : "pinyin",
                    "keep_separate_first_letter" : false,
                    "keep_full_pinyin" : true,
                    "keep_original" : true,
                    "limit_first_letter_length" : 16,
                    "lowercase" : true,
                    "remove_duplicated_term" : true
                }
            }
        }
    }
}

* curl 命令
curl -XPUT "http://elasticsearch:9200/index" -H 'Content-Type: application/json' -d'{    "settings" : {        "analysis" : {            "analyzer" : {                "ik_smart_pinyin" : {                    "tokenizer" : "ik_smart",                    "filter" : "pinyin_first_letter_and_full_pinyin_filter"                },                "ik_max_pinyin" : {                    "tokenizer" : "ik_max_word",                    "filter" : "pinyin_first_letter_and_full_pinyin_filter"                }            },            "filter" : {                "pinyin_first_letter_and_full_pinyin_filter" : {                    "type" : "pinyin",                    "keep_separate_first_letter" : false,                    "keep_full_pinyin" : true,                    "keep_original" : true,                    "limit_first_letter_length" : 16,                    "lowercase" : true,                    "remove_duplicated_term" : true                }            }        }    }}'


# 添加mappings

PUT index/_mapping/
{
  "properties": {
    "content": {
      "type": "text",
      "analyzer": "ik_smart_pinyin"
    }
  }
}

* curl 命令
curl -XPUT "http://elasticsearch:9200/index/_mapping/" -H 'Content-Type: application/json' -d'{  "properties": {    "content": {      "type": "text",      "analyzer": "ik_smart_pinyin"    }  }}'

# 添加测试数据

POST /index/_create/1
{"content":"我是刘德华"}

POST /index/_create/2
{"content":"我是郭富城"}

POST /index/_create/3
{"content":"我是明星"}

POST /index/_create/4
{"content":"我是林晨"}


* curl 命令

curl -XPOST "http://elasticsearch:9200/index/_create/1" -H 'Content-Type: application/json' -d'{"content":"我是刘德华"}'

# 搜索测试

此时使用汉字的拼音，首字母，汉字皆可检索到

GET index/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "content": "liu"
                    }
                }
            ],
            "must_not": [],
            "should": []
        }
    },
    "from": 0,
    "size": 10,
    "sort": [],
    "aggs": {}
}

* curl 命令 

curl -XGET "http://elasticsearch:9200/index/_search" -H 'Content-Type: application/json' -d'{    "query": {        "bool": {            "must": [                {                    "match": {                        "content": "w"                    }                }            ],            "must_not": [],            "should": []        }    },    "from": 0,    "size": 10,    "sort": [],    "aggs": {}}'



# 测试分词

POST index/_analyze
 
{
 
"analyzer":"ik_smart_pinyin",
 
"text":"我是Java程序员，我很牛逼" 
 
}

