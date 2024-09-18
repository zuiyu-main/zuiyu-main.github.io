# 环境
* idea 2022.1.3
* jdk17
* macos 10.14.6
* gradle 7.4.2(代码自动下载)

# 前置准备

* `idea` 设置`JDK17`
* `idea` 设置`gradle JVM`为`Project JVM`
* `gradle` 设置`aliyun`加速（可选）,有时设置了不如不设置更好

# 开始导入
* 导入项目
使用 `idea` open项目下的`build.gradle`，等待编译结束
* 编译`8.1`版本的发行包
这一步会下载所需的依赖`jdk`，如果报错可以多尝试几次，或者切换网络，执行该命令时，**注意终端jdk环境**
```sh
./gradlew localDistro
```
* 复制发行包到项目根目录同级目录新建`home`文件夹下，文件结构如下
```text
├── elasticsearch
│   ├── BUILDING.md
│   ├── CONTRIBUTING.md
│   ├── LICENSE.txt
│   ├── NOTICE.txt
│   ├── README.asciidoc
│   ├── README.md
│   ├── TESTING.asciidoc
│   ├── Vagrantfile
│   ├── benchmarks
│   ├── build
│   ├── build-conventions
│   ├── build-tools
│   ├── build-tools-internal
│   ├── build.gradle
│   ├── ccr
│   ├── checkstyle_ide.xml
│   ├── client
│   ├── dev-tools
│   ├── distribution
│   ├── docs
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── libs
│   ├── licenses
│   ├── modules
│   ├── plugins
│   ├── qa
│   ├── rest-api-spec
│   ├── server
│   ├── settings.gradle
│   ├── test
│   └── x-pack
├── home
│   ├── LICENSE.txt
│   ├── NOTICE.txt
│   ├── README.asciidoc
│   ├── bin
│   ├── config
│   ├── data
│   ├── jdk.app
│   ├── lib
│   ├── logs
│   ├── modules
└── └── plugins

```
* 启动
 找到` Elasticsearch.java` 运行`main`方法
* 报错1：`ERROR: the system property [es.path.conf] must be set`
```text
-Des.path.conf=/cxt/codework/github/elasticsearch/8.1/home/config
```
* 报错2：`path.home is not configured`
```text
-Des.path.home=/cxt/codework/github/elasticsearch/8.1/home
```
* 报错3：`main ERROR Could not register mbeans java.security.AccessControlException: access denied ("javax.management.MBeanTrustPermission" "register")`
* 创建一个`java.policy,`内容如下(完整内容在末尾获取)
```text
grant {
    permission javax.management.MBeanTrustPermission "register";
};
```
运行时指定

```text
-Djava.security.policy=/cxt/codework/github/elasticsearch/8.1/home/config/java.policy
```
* 报错4：`access denied ("java.lang.RuntimePermission" "createClassLoader")`
刚才的`java.policy`文件中增加如下(完整内容在末尾获取)
```text
    permission java.lang.RuntimePermission "createClassLoader";
```
* 报错5：`java.security.AccessControlException: access denied ("java.lang.RuntimePermission" "setContextClassLoader")`
  刚才的`java.policy`文件中增加如下(完整内容在末尾获取)
```text
    permission java.lang.RuntimePermission "setContextClassLoader";
```
* 报错6：`access denied ("org.elasticsearch.secure_sm.ThreadPermission" "modifyArbitraryThreadGroup")`
  刚才的`java.policy`文件中增加如下(完整内容在末尾获取)
```text
    permission org.elasticsearch.secure_sm.ThreadPermission "modifyArbitraryThreadGroup";
```
* 报错7：报错如下(完整内容在末尾获取)
```text
Caused by: java.lang.IllegalArgumentException: Unknown codebases [codebase.elasticsearch-plugin-classloader, codebase.elasticsearch, codebase.elasticsearch-secure-sm] in policy file [file:/cxt/codework/github/elasticsearch/8.1/elasticsearch/server/out/production/resources/org/elasticsearch/bootstrap/security.policy]

```
解决如下，找到 `server/src/main/resources/org/elasticsearch/bootstrap/security.policy`，注释掉一下三个
`[codebase.elasticsearch-plugin-classloader, codebase.elasticsearch, codebase.elasticsearch-secure-sm]`

```text
//grant codeBase "${codebase.elasticsearch-plugin-classloader}" {
  // needed to create the classloader which allows plugins to extend other plugins
  //permission java.lang.RuntimePermission "createClassLoader";
//};

//grant codeBase "${codebase.elasticsearch-secure-sm}" {
//  permission java.security.AllPermission;
//};

//// Elasticsearch core:
//// These are only allowed inside the server jar, not in plugins
//grant codeBase "${codebase.elasticsearch}" {
  // needed for loading plugins which may expect the context class loader to be set
//  permission java.lang.RuntimePermission "setContextClassLoader";
//};
```
# 总结

* 完整的启动参数设置如下

```text
-Des.path.conf=/cxt/codework/github/elasticsearch/8.1/home/config
-Des.path.home=/cxt/codework/github/elasticsearch/8.1/home
-Djava.security.policy=/cxt/codework/github/elasticsearch/8.1/home/config/java.policy
-Dlog4j2.disable.jmx=true
```
也可以在`Elasticsearch.main`方法执行前通过代码的形式指定环境变量(可选)

```text
System.setProperty("es.path.conf","/cxt/codework/github/elasticsearch/8.1/home/config");
System.setProperty("es.path.home", "/cxt/codework/github/elasticsearch/8.1/home");
System.setProperty("log4j2.disable.jmx", "true");    System.setProperty("java.security.policy","/cxt/codework/github/elasticsearch/8.1/home/config/java.policy");
```

* 完整的`java.policy`文件如下

```text
grant {
    permission javax.management.MBeanTrustPermission "register";
    permission java.lang.RuntimePermission "createClassLoader";
    permission java.lang.RuntimePermission "setContextClassLoader";
    permission org.elasticsearch.secure_sm.ThreadPermission "modifyArbitraryThreadGroup";
};
```
