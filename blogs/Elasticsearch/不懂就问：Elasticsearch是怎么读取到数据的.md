---
title: Elasticsearch 是怎么读取到数据的
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
源码执行记录

# 打印日志级别修改

```text
#home/config/slog4j2.properties
rootLogger.level = info
```



# 服务启动绑定主机端口

```text
Netty4HttpServerTransport#doStart()
AbstractHttpServerTransport#bindServer()
```



# 服务启动流程

```text
Elasticsearch#main
Command#main
Commond#mainWithoutErrorHandling
Commond#execute
EnvironmentAwareCommand#execute
Elasticsearch#execute
Elasticsearch#init
Bootstrap#init
Node#start
Node#start(injector.getInstance(HttpServerTransport.class).start();)
LifecycleComponent#start
AbstractLifecycleComponent#start
Netty4HttpServerTransport#doStart
```



# 通用调用过程

```text
Netty4HttpRequestHandler
AbstractHttpServerTransport
RestController
BaseRestHandler
AbstractClient
NodeClient
TransportAction
SecurityActionFilter
TransportMainAction[具体执行类Action]
RestMainAction[具体类的构建返回结果]
RestBuilderListener
RestResponseListener
RestActionListener
```



# URI

## http://localhost:9200/

```text
Netty4HttpRequestHandler#channelRead0
AbstractHttpServerTransport#incomingRequest
AbstractHttpServerTransport#handleIncomingRequest
AbstractHttpServerTransport#dispatchRequest
HttpServerTransport#dispatchRequest
RestController#dispatchRequest
RestController#tryAllHandlers
// start uri 匹配handler
RestController#getAllHandlers
PathTrie#retrieveAll
PathTrie#retrieve
// end 匹配handler 
BaseRestHandler#handleRequest
BaseRestHandler#prepareRequest
RestMainAction#prepareRequest
AbstractClient#execute
NodeClient#doExecute
TransportAction#execute
SecurityActionFilter#apply
TransportAction#proceed
TransportMainAction#doExecute
RestMainAction#prepareRequest
RestBuilderListener#buildResponse
RestResponseListener#processResponse
```

# 发送请求

```text
TransportService#sendRequest
```

# nodeClient 值从哪里来

NodeClient 创建《Node.java》

```text
            client = new NodeClient(settings, threadPool);
```



actionModule new<Node.java>

```text
ActionModule actionModule = new ActionModule(false, settings, clusterModule.getIndexNameExpressionResolver(),
                settingsModule.getIndexScopedSettings(), settingsModule.getClusterSettings(), settingsModule.getSettingsFilter(),
                threadPool, pluginsService.filterPlugins(ActionPlugin.class), client, circuitBreakerService, usageService, systemIndices);
```



# node 启动时初始化所有的handle,<Node.java>

```text
           
actionModule.initRestHandlers(() -> clusterService.state().nodes());

```

initRestHandlers中使用nodeClient传入处理的handle中使用

```text
  ActionModule
  // restController = new RestController(headers, restWrapper, nodeClient, circuitBreakerService, usageService);

```

 

# 自定实现一个netty项目

接收请求，继承

```text
SimpleChannelInboundHandler
```

