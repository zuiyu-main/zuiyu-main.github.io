---
title: Kibana学习
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---

# Kibana 启动

## 6.5

[参考链接](https://www.elastic.co/guide/en/kibana/6.5/docker.html#environment-variable-config)

* kibana.yml

  ```yaml
  elasticsearch.url: "http://（本机ip，docker 不要使用127或者local）:9200"
  server.host: "0"
  server.name: "kibana"
  ```

* docker-compose.yml

  ```yaml
  version: '2'
  services:
    kibana:
      ports:
      - "5601:5601"
      image: docker.elastic.co/kibana/kibana:6.5.4
      volumes:
      - ./kibana.yml:/usr/share/kibana/config/kibana.yml
  ```

  

* 使用环境变量方式 docker-compose.yml

  ```yaml
  version: '2'
  services:
    kibana:
      ports:
      - "5601:5601"
      image: docker.elastic.co/kibana/kibana:6.5.4
      environment:
  	  SERVER_NAME: 192.168.168.218
  	  ELASTICSEARCH_URL: http://192.168.168.218:9200
  
  ```

## 7.4

```text
// elasticsearch:elasticsearch 链接的容器id或者容器名称：alias，容器内部的别名
docker run --link elasticsearch:elasticsearch -p 5601:5601 --name kibana -d docker.elastic.co/kibana/kibana:7.4.0 

```

