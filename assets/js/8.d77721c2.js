(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{423:function(a,e,s){a.exports=s.p+"assets/img/image-20220321210331275.c18958da.png"},424:function(a,e,s){a.exports=s.p+"assets/img/image-20220321210428828.7f11fff9.png"},425:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211004360.9e6641be.png"},426:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211247410.a94bb77b.png"},427:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211314101.53a81801.png"},428:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211607282.175436a3.png"},429:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211756337.eb1964be.png"},430:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211905970.a39f6ae3.png"},431:function(a,e,s){a.exports=s.p+"assets/img/image-20220321211939322.8e9c9648.png"},449:function(a,e,s){"use strict";s.r(e);var t=s(2),i=Object(t.a)({},(function(){var a=this,e=a._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",{attrs:{id:"elasticsearch-7-4-3-源码编译记录"}},[a._v("Elasticsearch 7.4.3 源码编译记录")]),a._v(" "),e("ul",[e("li",[a._v("建议：不要使用本机装的gradle，编译时会自动下载匹配版本的gradle")])]),a._v(" "),e("h1",{attrs:{id:"环境"}},[a._v("环境")]),a._v(" "),e("ul",[e("li",[a._v("Macos 10.4")]),a._v(" "),e("li",[a._v("idea 2019")]),a._v(" "),e("li",[a._v("jdk12")]),a._v(" "),e("li",[a._v("elasticsearch7.4 代码")])]),a._v(" "),e("h1",{attrs:{id:"编译过程"}},[a._v("编译过程")]),a._v(" "),e("ul",[e("li",[e("p",[a._v("1、克隆代码")]),a._v(" "),e("p",[a._v("https://github.com/elastic/elasticsearch/tree/7.4")])]),a._v(" "),e("li",[e("p",[a._v("2、编译idea,这一步会自动下载对应版本的gradle，需要设置好java版本为jdk12")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("cd elasticsearch\n./gradlew idea\n")])])])]),a._v(" "),e("li",[e("p",[a._v("3、导入idea，选择导入")]),a._v(" "),e("p",[e("img",{attrs:{src:s(423),alt:"image-20220321210331275"}})]),a._v(" "),e("p",[a._v("选中 build.gradle ，idea会提示是否导入gradle项目，选择是")]),a._v(" "),e("p",[e("img",{attrs:{src:s(424),alt:"image-20220321210428828"}})])]),a._v(" "),e("li",[e("p",[a._v("4、打包对应版本的发行版文件，为一会启动做准备.这一步参考elasticsearch/TESTING.assciidoc文件")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("cd elasticsearch\n./gradlew assemble\n")])])])]),a._v(" "),e("li",[e("p",[a._v("5、打包成功之后，到elasticsearch/distribution/packages下找到自己对应系统的发行版文件")])])]),a._v(" "),e("p",[e("img",{attrs:{src:s(425),alt:"image-20220321211004360"}})]),a._v(" "),e("ul",[e("li",[e("p",[a._v("6、解压elasticsearch-oss-7.4.3-SNAPSHOT-x86_64.rpm,然后在elasticsearch 同级别目录下新建文件夹home,并把解压后的文件放到home文件夹下\n"),e("img",{attrs:{src:s(426),alt:""}}),a._v(" "),e("img",{attrs:{src:s(427),alt:""}})])]),a._v(" "),e("li",[e("p",[a._v("7、找到elasticsearch/server/build.gradle,修改 compileOnly 改为compile,详细信息查看下面")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("// compileOnly project(':libs:elasticsearch-plugin-classloader'),compileOnly 改为compile\n")])])])]),a._v(" "),e("li",[e("p",[a._v("8、idea设置项目JDK与gradle版本")]),a._v(" "),e("p",[e("img",{attrs:{src:s(428),alt:"image-20220321211607282"}})]),a._v(" "),e("p",[a._v("gradle版本与项目jdk保持一致")]),a._v(" "),e("p",[e("img",{attrs:{src:s(429),alt:"image-20220321211756337"}})])]),a._v(" "),e("li",[e("p",[a._v("9、指定刚才新建的home文件夹地址中的配置文件与数据存放地址，参数内容如下")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("-Des.path.conf=/cxt/codework/github/elasticsearch/7.4/home/config\n-Des.path.home=/cxt/codework/github/elasticsearch/7.4/home\n-Djava.security.policy=/cxt/codework/github/elasticsearch7.4/home/config/java.policy\n-Dlog4j2.disable.jmx=true\n")])])]),e("p",[a._v("Java.policy 文件内容如下")]),a._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('grant {\n    permission java.lang.RuntimePermission "createClassLoader";\n};\n')])])]),e("p",[e("img",{attrs:{src:s(430),alt:"image-20220321211905970"}})]),a._v(" "),e("p",[e("img",{attrs:{src:s(431),alt:"image-20220321211939322"}})])]),a._v(" "),e("li",[e("p",[a._v("10、到这，如果还不能启动，那就尽情的谷歌与百度吧，也欢迎留言一起讨论")])])]),a._v(" "),e("h1",{attrs:{id:"遇到的报错"}},[a._v("遇到的报错")]),a._v(" "),e("h2",{attrs:{id:"报错一"}},[a._v("报错一")]),a._v(" "),e("p",[a._v("ERROR: the system property [es.path.conf] must be set")]),a._v(" "),e("p",[a._v("解决方案参考第九步")]),a._v(" "),e("h2",{attrs:{id:"报错二"}},[a._v("报错二")]),a._v(" "),e("p",[a._v("Caused by: java.lang.ClassNotFoundException: org.elasticsearch.plugins.ExtendedPluginsClassLoader")]),a._v(" "),e("p",[a._v("解决参考第七步")]),a._v(" "),e("h1",{attrs:{id:"总结"}},[a._v("总结")]),a._v(" "),e("p",[a._v("编译失败的原因很大一部分是")]),a._v(" "),e("p",[a._v("1、gradle版本问题，jdk版本问题，所以多看代码中自带的CONTRIBUTING.md,README.textile,TESTING.asciidoc,确认当前版本所依赖的环境版本要求，起码能少踩很多的坑")]),a._v(" "),e("p",[a._v("2、本身如果安装了gradle，确保安装的gradle不要对项目生效，尽量使用代码中elasticsearch/gradle中文件夹指定的gradle，如果要使用本机安装的gradle，请确保gradle版本对项目版本兼容")]),a._v(" "),e("p",[a._v("3、把上面第七步，第九步的参数都配置基本问题不大了，实在打包不成功，也可以去官网下载发行版")]),a._v(" "),e("h1",{attrs:{id:"原文链接"}},[a._v("原文链接")]),a._v(" "),e("p",[a._v("https://mp.weixin.qq.com/s?__biz=MzIwNzYzODIxMw==&mid=2247484788&idx=1&sn=6eed8b35adbdc18a70a540d0284d0074&chksm=970e1edea07997c8cd43a02c375b0008b8227dd7c7e77db712dea55fe4548606bf981cc13cde#rd")]),a._v(" "),e("h1",{attrs:{id:"参考链接"}},[a._v("参考链接")]),a._v(" "),e("p",[a._v("https://elasticsearch.cn/question/8243")])])}),[],!1,null,null,null);e.default=i.exports}}]);