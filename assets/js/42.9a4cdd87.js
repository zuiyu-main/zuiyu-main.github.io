(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{448:function(e,s,t){"use strict";t.r(s);var n=t(2),a=Object(n.a)({},(function(){var e=this,s=e._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("p",[e._v("源码执行记录")]),e._v(" "),s("h1",{attrs:{id:"打印日志级别修改"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#打印日志级别修改"}},[e._v("#")]),e._v(" 打印日志级别修改")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("#home/config/slog4j2.properties\nrootLogger.level = info\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("h1",{attrs:{id:"服务启动绑定主机端口"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务启动绑定主机端口"}},[e._v("#")]),e._v(" 服务启动绑定主机端口")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Netty4HttpServerTransport#doStart()\nAbstractHttpServerTransport#bindServer()\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("h1",{attrs:{id:"服务启动流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#服务启动流程"}},[e._v("#")]),e._v(" 服务启动流程")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Elasticsearch#main\nCommand#main\nCommond#mainWithoutErrorHandling\nCommond#execute\nEnvironmentAwareCommand#execute\nElasticsearch#execute\nElasticsearch#init\nBootstrap#init\nNode#start\nNode#start(injector.getInstance(HttpServerTransport.class).start();)\nLifecycleComponent#start\nAbstractLifecycleComponent#start\nNetty4HttpServerTransport#doStart\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br")])]),s("h1",{attrs:{id:"通用调用过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#通用调用过程"}},[e._v("#")]),e._v(" 通用调用过程")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Netty4HttpRequestHandler\nAbstractHttpServerTransport\nRestController\nBaseRestHandler\nAbstractClient\nNodeClient\nTransportAction\nSecurityActionFilter\nTransportMainAction[具体执行类Action]\nRestMainAction[具体类的构建返回结果]\nRestBuilderListener\nRestResponseListener\nRestActionListener\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br")])]),s("h1",{attrs:{id:"uri"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#uri"}},[e._v("#")]),e._v(" URI")]),e._v(" "),s("h2",{attrs:{id:"http-localhost-9200"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-localhost-9200"}},[e._v("#")]),e._v(" http://localhost:9200/")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Netty4HttpRequestHandler#channelRead0\nAbstractHttpServerTransport#incomingRequest\nAbstractHttpServerTransport#handleIncomingRequest\nAbstractHttpServerTransport#dispatchRequest\nHttpServerTransport#dispatchRequest\nRestController#dispatchRequest\nRestController#tryAllHandlers\n// start uri 匹配handler\nRestController#getAllHandlers\nPathTrie#retrieveAll\nPathTrie#retrieve\n// end 匹配handler \nBaseRestHandler#handleRequest\nBaseRestHandler#prepareRequest\nRestMainAction#prepareRequest\nAbstractClient#execute\nNodeClient#doExecute\nTransportAction#execute\nSecurityActionFilter#apply\nTransportAction#proceed\nTransportMainAction#doExecute\nRestMainAction#prepareRequest\nRestBuilderListener#buildResponse\nRestResponseListener#processResponse\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br"),s("span",{staticClass:"line-number"},[e._v("17")]),s("br"),s("span",{staticClass:"line-number"},[e._v("18")]),s("br"),s("span",{staticClass:"line-number"},[e._v("19")]),s("br"),s("span",{staticClass:"line-number"},[e._v("20")]),s("br"),s("span",{staticClass:"line-number"},[e._v("21")]),s("br"),s("span",{staticClass:"line-number"},[e._v("22")]),s("br"),s("span",{staticClass:"line-number"},[e._v("23")]),s("br"),s("span",{staticClass:"line-number"},[e._v("24")]),s("br")])]),s("h1",{attrs:{id:"发送请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#发送请求"}},[e._v("#")]),e._v(" 发送请求")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("TransportService#sendRequest\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("h1",{attrs:{id:"nodeclient-值从哪里来"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nodeclient-值从哪里来"}},[e._v("#")]),e._v(" nodeClient 值从哪里来")]),e._v(" "),s("p",[e._v("NodeClient 创建《Node.java》")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("            client = new NodeClient(settings, threadPool);\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("actionModule new<Node.java>")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("ActionModule actionModule = new ActionModule(false, settings, clusterModule.getIndexNameExpressionResolver(),\n                settingsModule.getIndexScopedSettings(), settingsModule.getClusterSettings(), settingsModule.getSettingsFilter(),\n                threadPool, pluginsService.filterPlugins(ActionPlugin.class), client, circuitBreakerService, usageService, systemIndices);\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("h1",{attrs:{id:"node-启动时初始化所有的handle-node-java"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-启动时初始化所有的handle-node-java"}},[e._v("#")]),e._v(" node 启动时初始化所有的handle,<Node.java>")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("           \nactionModule.initRestHandlers(() -> clusterService.state().nodes());\n\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("p",[e._v("initRestHandlers中使用nodeClient传入处理的handle中使用")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("  ActionModule\n  // restController = new RestController(headers, restWrapper, nodeClient, circuitBreakerService, usageService);\n\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("h1",{attrs:{id:"自定实现一个netty项目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自定实现一个netty项目"}},[e._v("#")]),e._v(" 自定实现一个netty项目")]),e._v(" "),s("p",[e._v("接收请求，继承")]),e._v(" "),s("div",{staticClass:"language-text line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("SimpleChannelInboundHandler\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])])])}),[],!1,null,null,null);s.default=a.exports}}]);