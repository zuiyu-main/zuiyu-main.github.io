Elasticsearch 基本概念

https://developer.aliyun.com/article/706979

https://juejin.cn/post/6844904178242813960

官网记录

# 设置ES

## 安装es

## 配置es

### 导入es配置

### 安全设置

### 审核安全设置

### 断路器设置

### 集群分配和路由策略设置

### 跨集群复制设置

### 发现和集群设置

### 字段数据缓存设置

### 索引生命周期管理设置

### 索引管理设置

### 索引恢复设置

### 索引缓冲区设置

### License 设置

### 本地网关设置

### logging

### 机器学习设置

### 监控设置

### 节点

### 网络

### 节点查询缓存

### 搜索设置

### 安全设置

### 分片请求缓存设置

### 快照生命周期设置

### 转换设置

### 线程池设置

### 观察者设置

### 高级配置

## 重要的系统配置

### 配置系统设置

### 禁用swap

### 文件描述符

### 虚拟内存

### 线程数

### DNS缓存

### JNA临时目录

### TCP重连超时

## BootStrap 检查

### Heap Size

### 文件描述符

### 内存锁

### 最大线程数

### 最大文件大小

### 最大虚拟内存

### 最大map计算

### 客户端JVM检查

### 使用串行收集器检查

### 系统调用过滤器检查

### OnError和OnOutOfMemoryError

### 提前检查

### G1GC检查

### 许可检查

### 发现配置检查

## BootStrap检查x-pack

## 启动ES

## 停止ES

## 发现和集群形成

### 发现

### 基于法定数量的决策

### 投票配置

### 引导集群

### 发布集群状态

### 集群故障检测

## 在集群中添加和删除节点

## 全集群重新启动和滚动启动

## 远程集群

## 设置X-Pack

## 配置X-Pack Java客户端

## 插件



# 升级ES

## 滚动升级

## 集群完成重新启动升级

## 升级前reindex

### 本地重新reindex

### 远程重新reindex

# 索引模块

## 分析

## 碎片索引分配

### 索引级碎片分配筛选

### 节点离开时延迟分配

### 索引恢复优先级

### 每个节点的碎片总数

### 索引级数据层分配筛选

## 索引块

## Mapper

## Merge

## 相似模块

## 慢查询日志

## 存储

### 预加载数据到系统缓存中

## Translog

## 历史记录

## 索引排序

### 使用索引排序来加速链接

## 索引压力

# Mapping

## 动态mapping

### 动态mapping字段映射

### 动态mapping模版

## 显式映射

## 运行时字段

### 映射运行时字段

### 在搜索请求中定义运行时字段

### 查询时覆盖字段值

### 检索运行时字段

### 索引运行时字段

### 使用运行时字段探索数据

## 字段数据类型

### 总量

### 别名

### 数组

### 二进制

### 布尔

### 时间

### 时间纳秒

### 矢量

### 扁平

### GEO定位

### GEO地形图

### 直方图

### IP

### 连接join

### 关键字

### 嵌套

### 数字

### 对象

### 滤器

### 点

### 范围

### 等级特征

### 等级特征复数

### 随意搜索

### 形状

### 稀疏矢量

### 文本

### token 数量

### 未定义长度

### 版本

## 元数据字段

### _doc_count

### _field_names

### _ignored

### _id

### _index

### _meta

### _routing

### _source

### _tier

### _type

## mapping 参数

### analyzer

### boost

### coerce

### Copy_to

### doc_values

### dynamic

### Eager_global_ordinals

### enabled

### format

### Ignore_above

### Ignore_malformed

### index

### Index_options

### Index_phrases

### Index_prefixes

### meta

### fields

### norms

### null_values

### Position_increment_gap

### properties

### Search_analyzer

### similarity

### store

### Term_vector

## mapping限制设置

## 移除mapping类型

















