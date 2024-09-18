
---
title: Elasticsearch 8.x 读取原理分析
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
在上一篇文章中，我们学习了 Elasticsearch 的写入流程，今天我们来学习一下 Elasticsearch 的读取流程，当一个检索请求到达 Elasticsearch 之后是如何进行检索的呢？




下面先说一下一个总的检索流程。


1、客户端发送请求到任意一个节点，该节点就是协调节点。

2、协调节点将查询请求广播到每一个数据节点，这些数据节点的分片就会处理该查询请求。

3、每个分片进行数据查询、将符合条件的数据放在一个队列之中，将这些数据的**文档ID**，**节点**信息，**分片**信息返回给**协调节点**。

4、协调节点将所有的结果汇总、排序。

5、协调节点向包含这些**文档ID**的分片发送 `get` 请求，对应的分片将文档数据返回给协调节点，最后协调节点将数据整合返回给客户端。



# 单个文档



![](https://files.mdnice.com/user/12687/aad8c740-58a3-49a3-9b34-24ad38f44ece.png)

对于取回单个文档来说：

1、客户端向 `node1` 节点发送检索请求。

2、`node1` 节点通过对传入的文档的 `_id` 进行计算，确定文档属于`分片0`，但是`分片0`的副本分片在三个节点上都存在，在这里，Elasticsearch 将请求转发到了 `node2` 上（轮询-负载均衡）。

3、`node2` 节点将文档返回给 `node1` 。

4、`node1` 将文档返回给客户端。

> 在处理读取请求时，协调结点在每次请求的时候都会通过轮询所有的副本分片来达到负载均衡。

在文档被检索时，已经被索引的文档可能已经存在于主分片上但是还没有复制到副本分片。 在这种情况下，副本分片可能会报告文档不存在，但是主分片可能成功返回文档。 一旦索引请求成功返回给用户，文档在主分片和副本分片都是可用的。

上面是根据ID检索单个文档，流程相对简单，那么如果是多个文档，流程又回增加哪些步骤呢？

# 多个文档


![](https://files.mdnice.com/user/12687/ebac4214-d2cf-43e3-a5b2-702e09309d07.png)

> 简单一句话就是，在单个文档的请求中，Elasticsearch 知道该文档在哪个分片上。在多文档请求中，Elasticsearch 会将该请求拆分为多个文档的请求，并把它们并行的发送到对应的分片。

对于多个文档请求，`mget` 请求顺序：

1、客户端向 `node1` 发送 `mget` 请求。

2、`node1` 节点为每个分片构建多个文档的 `get` 请求。

3、并行转发这些请求到每个文档对应的主分片或者副本分片的节点上。

4、`node1` 根据收到的响应返回给客户端。


> 可以对文档设置单独的 `routing` 参数。



对于检索流程，看上去就简单很多了，没有那么多的数据一致性等相关限制的处理。

如果感觉本文写的还不错的话欢迎点个关注，后面继续来写代码中的检索实现。一起走进源码的世界。

![](https://img.soogif.com/M1Kl0Jtkaa2r8tlezmauhTqfRNyI880J.png?scope=mdnice)


如有错误也欢迎指出，一起成长。


# 参考链接

[https://www.elastic.co/guide/cn/elasticsearch/guide/current/distrib-read.html](https://www.elastic.co/guide/cn/elasticsearch/guide/current/distrib-read.html)

[https://www.elastic.co/guide/cn/elasticsearch/guide/current/distrib-multi-doc.html](https://www.elastic.co/guide/cn/elasticsearch/guide/current/distrib-multi-doc.html)

