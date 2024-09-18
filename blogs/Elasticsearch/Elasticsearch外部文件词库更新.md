---
title: Elasticsearch 自定义分词器之外部文件词库动态更新
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
> 本文所使用的ES集群环境可在历史文章中获取，采用docker部署的方式。

Elasticsearch 是一个功能强大的搜索引擎，广泛用于构建复杂的全文搜索应用程序。在许多情况下，为了提高搜索引擎的性能和精度，我们可以使用外部词库来定制和扩展 Elasticsearch 的文本处理和搜索功能。本文将介绍外部词库的用途、优势以及如何在 Elasticsearch 中使用它们。

# 为什么需要外部词库？

Elasticsearch 默认提供了一套强大的文本处理工具，包括分词、标记过滤、同义词处理等。然而，在某些情况下，我们需要更多的控制权来适应特定的用例和需求。外部词库允许我们：

1. **自定义分词器**：通过使用外部词库，您可以创建自定义分词器，以根据特定需求定义文本分割规则。这对于处理不同语言或行业的文本非常有用。

2. **扩展停用词列表**：停用词（如`and`、`the`等）通常被排除在搜索索引之外。外部词库允许您将领域特定的停用词添加到索引中，以便更好地适应我们行业内的数据。

3. **同义词处理**：创建同义词词库可确保相关词汇在搜索时被正确映射，提高搜索结果的准确性。

4. **专业术语**：对于特定领域或行业，我们可以通过创建外部词库，以包含特定领域的专业术语，确保搜索引擎能够理解和处理这些术语。

# 使用外部词库的优势

使用外部词库有以下优势：

1. **提高搜索质量**：通过自定义分词和停用词，可以确保搜索引擎更好地理解和处理文本，提高搜索质量。

2. **适应特定需求**：外部词库允许根据特定用例和领域需求对搜索引擎进行定制，以满足工作要求。

3. **更好的用户体验**：通过包含专业术语和扩展的同义词映射，用户能够更轻松地找到他们需要的内容。

# 如何在 Elasticsearch 中使用外部词库

在 Elasticsearch 中使用外部词库通常涉及以下步骤：

1. **创建外部词库文件**：首先，我们需要准备一个外部词库文件，其中包含自定义的词汇、同义词或停用词列表。

2. **将词库上传到 Elasticsearch**：上传词库文件到 Elasticsearch

3. **配置索引**：将外部词库与索引相关联，以确保 Elasticsearch 在索引文档时使用这些词汇。

4. **搜索优化**：根据需要在搜索查询中应用外部词库，以扩展或定制搜索行为。

# 示例：使用自定义词库分词

本文在 `IK `分词器的基础上增加自定义分词，并配置本地词库文件，远程热更新词库文件。

## 本地词库

* 首先在启动的`ES`中对`醉鱼`两个字进行分词，`IK `默认分为两个汉字

  ```text
  GET _analyze
  {
    "analyzer": "ik_max_word",
    "text": ["醉鱼"]
  }
  ```

  结果如下

  ```text
  {
    "tokens" : [
      {
        "token" : "醉",
        "start_offset" : 0,
        "end_offset" : 1,
        "type" : "CN_CHAR",
        "position" : 0
      },
      {
        "token" : "鱼",
        "start_offset" : 1,
        "end_offset" : 2,
        "type" : "CN_CHAR",
        "position" : 1
      }
    ]
  }
  
  ```

  而我们的需求是让其能分为一次词语，而不是两个汉字，那么下面引入我们的自定义分词文件

* 在 `ES` 的 `plugins/ik/config` 目录下创建自定义词库文件 `zuiyu.dic`，文件内容如下，格式为一个词语为一行。

  ```text
  醉鱼
  ```
  
  

* 修改 `IK` 的配置，支持自定义分词文件 ，修改`plugins/ik/config` 目录下的`IKAnalyzer.cfg.xml`，修改其中`<entry key="ext_dict"></entry>`的值，为本地文件路径，配置为相对路径，直接填写上一步创建的`zuiyu.dic`，结果如下

  `<entry key="ext_dict">zuiyu.dic</entry>`

  ```text
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
  <properties>
  	<comment>IK Analyzer 扩展配置</comment>
  	<!--用户可以在这里配置自己的扩展字典 -->
  	<entry key="ext_dict">zuiyu.dic</entry>
  	 <!--用户可以在这里配置自己的扩展停止词字典-->
  	<entry key="ext_stopwords"></entry>
  	<!--用户可以在这里配置远程扩展字典 -->
  	<!--<entry key="remote_ext_dict"></entry>-->
  	<!--用户可以在这里配置远程扩展停止词字典-->
  	<!-- <entry key="remote_ext_stopwords">words_location</entry> -->
  </properties>
  
  ```

* 如果是启动的`ES`集群，需要复制当前两个文件到所有的集群中

  > 1、当前集群有三个节点，其中都配置本地词库文件，但是`node1`，`node2`中都没有增加`醉鱼`这词语，只有`node3`有，此时使用分词是无法达到预期效果的。
  >
  > 2、`node1`中配置正常的`<entry key="ext_dict">zuiyu.dic</entry>`，`zuiyu.dic`中也包含`醉鱼`这个词语。`node2`，`node3`都不配置`ext_dict`，此时当前这个环境是可以进行正确分词，达到预期的结果的。

* 重启 `ES`

* 测试分词效果，使用同样的分词语句

  ```text
  GET _analyze
  {
    "analyzer": "ik_max_word",
    "text": ["醉鱼"]
  }
  ```

  结果如下

  ```text
  {
    "tokens" : [
      {
        "token" : "醉鱼",
        "start_offset" : 0,
        "end_offset" : 2,
        "type" : "CN_WORD",
        "position" : 0
      }
    ]
  }
  ```
  
  一般来说，词语肯定不是固定的，随着工作的长期积累，不断地发现新的专业术语，那么热更新，动态更新词库，不在每次更新词库之后重启`ES`就是非常有必要的了，下面来看一下热更新词库。
  
  

## 远程词库（热更新）

热更新词库的区别就是`IKAnalyzer.cfg.xml`文件中的一个配置的问题。不过核心还是需要一个词库文件，刚才是通过路径访问的，但是无法热更新，所以现在需要改为`URL`访问，也就是 `HTTP` 请求可以读取到的形式。一个词语一行返回即可。

此处使用 `Nginx` 来做演示。`Nginx` 中的配置如下

* `nginx.conf`

  ```text
          location /dic/zuiyu.dic {
              alias   html/dic/zuiyu.dic;   
          }
  ```

  

* `zuiyu.dic` 文件内容如下

  ```text
  醉鱼
  ```

* `IKAnalyzer.cfg.xml`配置修改如下,`IP`为部署的 `Nginx` 的 `IP` ，端口也是根据自己 `Nginx` 监听的端口修改

  ```text
  <entry key="remote_ext_dict">http://192.168.30.240:8088/dic/zuiyu.dic</entry>
  ```

  完整的配置如下

  ```text
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
  <properties>
  	<comment>IK Analyzer 扩展配置</comment>
  	<!--用户可以在这里配置自己的扩展字典 -->
  	<entry key="ext_dict">zuiyu.dic</entry>
  	 <!--用户可以在这里配置自己的扩展停止词字典-->
  	<entry key="ext_stopwords"></entry>
  	<!--用户可以在这里配置远程扩展字典 -->
  	<entry key="remote_ext_dict">http://192.168.30.240:8088/dic/zuiyu.dic</entry>
  	<!--用户可以在这里配置远程扩展停止词字典-->
  	<!-- <entry key="remote_ext_stopwords">words_location</entry> -->
  </properties>
  
  ```

* 验证`URL`访问结果，使用浏览器或者`postman`等工具访问 `http://192.168.30.240:8088/dic/zuiyu.dic` 可以返回我们的文件内容即可，也是一个词语一行的形式。

* 复制`IKAnalyzer.cfg.xml` 到集群的每个节点中

* 重启`ES`

* 测试对 `醉鱼` 分词，可以看到与上面本地词库时是同样的效果

  ```text
  {
    "tokens" : [
      {
        "token" : "醉鱼",
        "start_offset" : 0,
        "end_offset" : 2,
        "type" : "CN_WORD",
        "position" : 0
      }
    ]
  }
  ```

  

* 测试对`我爱你醉鱼`进行分词

  ```text
  GET _analyze
  {
    "analyzer": "ik_max_word",
    "text": ["我爱你醉鱼"]
  }
  ```

  结果如下

  ```text
  {
    "tokens" : [
      {
        "token" : "我爱你",
        "start_offset" : 0,
        "end_offset" : 3,
        "type" : "CN_WORD",
        "position" : 0
      },
      {
        "token" : "爱你",
        "start_offset" : 1,
        "end_offset" : 3,
        "type" : "CN_WORD",
        "position" : 1
      },
      {
        "token" : "醉鱼",
        "start_offset" : 3,
        "end_offset" : 5,
        "type" : "CN_WORD",
        "position" : 2
      }
    ]
  }
  ```

  

* 在`zuiyu.dic`中增加`我爱你醉鱼`，最终的文件内容如下

  ```text
  醉鱼
  我爱你醉鱼
  ```

  

* 增加完成之后，这5个字已经成为一个词语，分词结果如下

  ```text
  {
    "tokens" : [
      {
        "token" : "我爱你醉鱼",
        "start_offset" : 0,
        "end_offset" : 5,
        "type" : "CN_WORD",
        "position" : 0
      },
      {
        "token" : "我爱你",
        "start_offset" : 0,
        "end_offset" : 3,
        "type" : "CN_WORD",
        "position" : 1
      },
      {
        "token" : "爱你",
        "start_offset" : 1,
        "end_offset" : 3,
        "type" : "CN_WORD",
        "position" : 2
      },
      {
        "token" : "醉鱼",
        "start_offset" : 3,
        "end_offset" : 5,
        "type" : "CN_WORD",
        "position" : 3
      }
    ]
  }
  ```

  > 仅在一个节点 `node1` 中配置了远程词库，`node2` 与 `node3` 都没有配置任何的词库，此时当前环境**无法达到**我们的预期分词效果

# 总结

通过上面我们的试验，可以发现结合 `IK`分词器，使用自定义词库，可以满足我们专业内的词语分词，实现更好的分词效果，再加上动态词库的更新，对我们的工作还是很有必要的，配置过程是不是很简单，下面就赶紧用起来吧。