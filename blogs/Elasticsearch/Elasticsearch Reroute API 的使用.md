---
title: Elasticsearch Reroute API使用教程
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
本文通过一个 Elasticsearch 集群中主分片分配不均衡的例子演示一下 Cluster reroute API 的使用。
> 对于 Elasticsearch 分片分配策略不了解的同学可以点一下关注，后面更文之后获取第一手资料。


![](https://files.mdnice.com/user/12687/f742474c-5167-409f-8fe1-2e971b6af785.png)

# 环境信息

Windows 10

Elasticsearch 8.1

JDK17


# 初始集群状态

**分片1**，**分片2**，**分片4** 都在 **node-2** 节点上


![](https://files.mdnice.com/user/12687/4aeba2e7-9743-4af1-aafb-0d78b8983ea1.png)


我们可以使用如下命令移动索引 **my-index-0000010** 在 **node-2** 节点上的 **主分片1** 移动到 **node-1** 节点上

```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "move": {
        "index": "my-index-0000010", "shard": 1,
        "from_node": "node-2", "to_node": "node-1"
      }
    }
  ]
}
```

移动完成之后结果如下。


![](https://files.mdnice.com/user/12687/f173cc36-d7fe-4e3e-ba37-516828659632.png)


下面我们看一个例子，如果我们索引 **my-index-0000010** 在 **node-2** 节点上的 **主分片4** 移动到 **node-4** 节点会发生什么情况呢，大家可以猜想一下，看一下是不是和你想得一样。

![](https://img.soogif.com/6SqmQRCKCmuM815jJRzOnZfdtj34o95w.gif?scope=mdnice)

如下命令是移动索引 **my-index-0000010** 在 **node-2** 节点上的 **主分片4** 到 **node-4** 节点上去。

```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "move": {
        "index": "my-index-0000010", "shard": 4,
        "from_node": "node-2", "to_node": "node-4"
      }
    }
  ]
}
```

返回结果如下所示，我们只需要关注`NO`的地方即可，我已经在下图标示出来了，提示的意思就是，**node-4** 节点上已经存在 **分片4** 的副本，不允许进行 `move` 操作


![](https://files.mdnice.com/user/12687/4cda6b80-f9a5-41ef-8429-fad177564369.png)


对于如上这种情况，那么我们该如何进行分片的迁移呢？

首先可以知道的是，如果我们把**节点`node-2`上的`分片4`移动到`node-4`节点上是不被允许的，因为`node-4`上面已经存在`分片4`的副本分片**，那么我们可以反过来思考，如果想让节点 **node-2** 上的分片可以均衡分配，只需要让 Elasticsearch 触发一下`正常的分片分配`即可，所以我们使用如下的语句，来让 Elasticsearch 进行 **node-2** 节点上 **主分片4** 的重新分配。

```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "cancel": {
        "index": "my-index-0000010",
        "shard": 4,
        "node": "node-2"
      }
    }
  ]
}
```

如果你执行完了上面的语句，你会发现，报错了
![](https://img.soogif.com/noMg1a7L5iyvnCAsp90wdqmuLGuCk9Kv.png?scope=mdnice)
那是因为 Elasticsearch 对于主分片的 `cancel` 操作，需要添加 `allow_primary` 属性，设置为`true` 即可，修改之后的语句如下所示。

```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "cancel": {
        "index": "my-index-0000010",
        "shard": 4,
        "node": "node-2",
        "allow_primary": true
      }
    }
  ]
}
```

返回如下结果代表执行成功。

```json
{
  "acknowledged" : true,
  "state" : {
    "cluster_uuid" : "dyCQnpMvSd2w3Hn9tcBTig"
  }
}
```

继续查看当前的 Elasticsearch 分片分配情况如下所示。可以看到 **主分片4** 已经到了节点 **node-4**上面了。


![](https://files.mdnice.com/user/12687/69992e55-7877-4441-85d6-81aca0f418fe.png)




对于节点 **node-5** 上面的 **分片2** 也可以执行同样的操作，执行完成之后，Elasticsearch 进行`默认的分片分配策略`进行重新分配，结果如下。

```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "cancel": {
        "index": "my-index-0000010",
        "shard": 2,
        "node": "node-5",
        "allow_primary": true
      }
    }
  ]
}
```


![](https://files.mdnice.com/user/12687/655f11fd-1bb1-4afc-81f6-74b66e34464d.png)

# 未分配分片进行分配

首先创建一个索引 **my-index-0000011**，分片数量为`1`，副本分片数量为`1`。
```text
PUT /my-index-0000011
{
  "settings": {
    "number_of_replicas": 1,
    "number_of_shards": 1
  }
}
```
通过页面可以看到 主分片分配到了 **node-5** 上，副本分片在 **node-2** 上。

![](https://files.mdnice.com/user/12687/32d4b142-ca9b-4985-b853-dff161b842a5.png)

添加一条测试数据
```text
PUT my-index-0000011/_doc/1
{
  "name":"zuiyu"
}
```

![](https://files.mdnice.com/user/12687/705fd150-e956-4b1f-94b1-bf2cd194efed.png)

我们同时停掉节点 **node-2** 与 **node-5**,观察索引 **my-index-0000011** 的分片分配情况。

可以看到因为两个节点的同时离开，造成了分片无法重新分配，这是因为该索引 **my-index-0000011** 的主分片与副本文件同时离开，Elasticsearch 集群无法找到有效的分片充当主分片，所以分片会无法分配。针对这种情况下的分片无法分配问题，可以使用如下方式进行解决，具体解决方式看业务来选择。


![](https://files.mdnice.com/user/12687/cd8f0c55-3695-4a5c-b4d2-1fab0330e2d6.png)
* 第一种方式就是重启异常的节点，等待恢复。
* 第二种就是手动触发分片分配，但是会造成`数据丢失`。

说到分片未分配，需要重新分配问题，那么就要提到我们的第三个命令 `allocate_replica`，用法如下：
```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "allocate_replica": {
        "index": "my-index-0000011",
        "shard": 0,
        "node":""
      }
    }
  ]
}
```
对于我们的情况就没法使用了，因为索引 **my-index-0000011** 的主分片与副本分片同时丢失，Elasticsearch 集群无法获取到正确的副本来进行恢复。此时就要用到另外的两个命令了。

需要注意的是，这另外的两个命令都会造成`数据丢失`。

会造成`数据丢失`。

会造成`数据丢失`。

所以需要一个另外的参数来清晰的告诉你，你在做什么，以后丢了数据是你允许的。参数就是 `accept_data_loss`, 当该参数为 `true` 时，表示如果丢了数据，我可不背这锅。

![](https://img.soogif.com/pG9GIXVSdeXU8SOV3XhfVkHeTMpWZ40j.gif?scope=mdnice)

> 如下两个命令为原始数据无法恢复且允许接收数据丢失的情况下使用
# allocate_stale_primary
该参数的意思就是，如果有该索引的副本分片存在(但是该分片是过时的，也就是说不是最新的副本分片)，Elasticsearch 会将主分片分配给该副本分片，所以这个情况下会造成数据丢失。显然对于我们目前的情况来说也是不合适的，下面我们来看另一个命令。

# allocate_empty_primary
该参数命令会为索引分配一个全新的空的主分片，相当于没有数据，也就造成数据丢失了，而且是完全丢失。当之后拥有数据副本的节点再次加入集群时，该分片的数据会被删除。
这个命令对我们这个情况来说是可以实现的，不过就是在数据不被需要的时候是可以使用的。所以使用场景就要看我们每个人的业务场景了。
用法如下所示：
```text
POST /_cluster/reroute?metric=none
{
  "commands": [
    {
      "allocate_empty_primary": {
        "index": "my-index-0000011",
        "shard": 0,
        "node":"node-3",
        "accept_data_loss":true
      }
    }
  ]
}
```

# 总结

对于分片未分配的问题，可以使用 API 来进行查看分片分配情况。使用 `move` 命令修改主分片的存储节点位置；使用 `cancel` 命令撤销主分片节点存储位置，使 Elasticsearch 重新分配索引分片；使用 `allocate_replica` 手动触发分片重新分配；使用 `allocate_stale_primary` 分配一个过时的副本分片来充当主分片；使用 `allocate_empty_primary` 生成一个新的空分片来充当主分片。

# 备注

使用如下命令获取索引分片分配情况，不加参数随机返回一个有问题的索引，加了参数就按照参数指定的来返回。

```text
GET _cluster/allocation/explain
{
  "index": "my-index-0000011",
  "shard": 0,
  "primary": true
}


