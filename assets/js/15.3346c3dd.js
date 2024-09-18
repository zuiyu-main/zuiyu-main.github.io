(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{424:function(s,e,a){"use strict";a.r(e);var n=a(2),t=Object(n.a)({},(function(){var s=this,e=s._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"elasticsearch-如何实现索引的伪·命名空间"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch-如何实现索引的伪·命名空间"}},[s._v("#")]),s._v(" Elasticsearch 如何实现索引的伪·命名空间")]),s._v(" "),e("h1",{attrs:{id:"环境说明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#环境说明"}},[s._v("#")]),s._v(" 环境说明")]),s._v(" "),e("ul",[e("li",[s._v("jdk8")]),s._v(" "),e("li",[s._v("elasticsearch7.4.0")]),s._v(" "),e("li",[s._v("springboot 2.3.12.RELEASE")]),s._v(" "),e("li",[s._v("spring-data-elasticsearch 4.0.9.RELEASE")])]),s._v(" "),e("p",[s._v("注：本文不做特殊说明的情况下，client1与client2使用相同配置")]),s._v(" "),e("h1",{attrs:{id:"应用场景"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#应用场景"}},[s._v("#")]),s._v(" 应用场景")]),s._v(" "),e("p",[s._v("在公司内部资源紧张的情况下，多个项目使用同一个"),e("code",[s._v("elasticsearch")]),s._v("并且数据互不干扰，实现资源的最大化利用，节约成本")]),s._v(" "),e("h1",{attrs:{id:"集成elasticsearch"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#集成elasticsearch"}},[s._v("#")]),s._v(" 集成Elasticsearch")]),s._v(" "),e("h2",{attrs:{id:"pom-client1与client2相同"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pom-client1与client2相同"}},[s._v("#")]),s._v(" pom（client1与client2相同）")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("\n    &lt;parent>\n        &lt;groupId>org.springframework.boot&lt;/groupId>\n        &lt;artifactId>spring-boot-starter-parent&lt;/artifactId>\n        &lt;version>2.3.12.RELEASE&lt;/version>\n        &lt;relativePath/> &lt;!-- lookup parent from repository --\x3e\n    &lt;/parent>\n    &lt;properties>\n        &lt;java.version>1.8&lt;/java.version>\n    &lt;/properties>\n    &lt;dependencies>\n        &lt;dependency>\n            &lt;groupId>org.springframework.boot&lt;/groupId>\n            &lt;artifactId>spring-boot-starter-web&lt;/artifactId>\n        &lt;/dependency>\n\n        &lt;dependency>\n            &lt;groupId>org.springframework.boot&lt;/groupId>\n            &lt;artifactId>spring-boot-starter-test&lt;/artifactId>\n            &lt;scope>test&lt;/scope>\n        &lt;/dependency>\n        &lt;dependency>\n            &lt;groupId>org.springframework.data&lt;/groupId>\n            &lt;artifactId>spring-data-elasticsearch&lt;/artifactId>\n            &lt;version>4.0.9.RELEASE&lt;/version>\n        &lt;/dependency>\n    &lt;/dependencies>\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br"),e("span",{staticClass:"line-number"},[s._v("24")]),e("br"),e("span",{staticClass:"line-number"},[s._v("25")]),e("br"),e("span",{staticClass:"line-number"},[s._v("26")]),e("br"),e("span",{staticClass:"line-number"},[s._v("27")]),e("br"),e("span",{staticClass:"line-number"},[s._v("28")]),e("br")])]),e("h2",{attrs:{id:"config-client1与client2相同"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#config-client1与client2相同"}},[s._v("#")]),s._v(" config（client1与client2相同）")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('@Configuration\npublic class RestClientConfig extends AbstractElasticsearchConfiguration {\n    @Bean\n    @Override\n    public RestHighLevelClient elasticsearchClient() {\n        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()\n                .connectedTo("localhost:9200")\n                .build();\n\n        return RestClients.create(clientConfiguration).rest();\n    }\n}\n\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])]),e("h2",{attrs:{id:"yml"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#yml"}},[s._v("#")]),s._v(" yml")]),s._v(" "),e("h3",{attrs:{id:"client1"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#client1"}},[s._v("#")]),s._v(" client1")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("spring.data.elasticsearch.client.namespace=client1\nserver.port=8081\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("h3",{attrs:{id:"client2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#client2"}},[s._v("#")]),s._v(" client2")]),s._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("spring.data.elasticsearch.client.namespace=client2\nserver.port=8082\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])]),e("h2",{attrs:{id:"索引名定义-client1与client2相同"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引名定义-client1与client2相同"}},[s._v("#")]),s._v(" 索引名定义(client1与client2相同)")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("定义变量获取")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('@Configuration\npublic class EsConst {\n    @Value("${spring.data.elasticsearch.client.namespace}")\n    private String elasticsearchNamespace;\n    @Bean\n    public String getElasticsearchNamespace(){\n        return elasticsearchNamespace;\n    }\n}\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("新建User 实体类，指定索引名称为"),e("code",[s._v("namespace.user")])]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('@Document(indexName = "#{@getElasticsearchNamespace}.user")\npublic class User {\n    @Field(type = FieldType.Text)\n    private String id;\n    @Field(type = FieldType.Text)\n    private String name;\n    @Field(type = FieldType.Text)\n    private String phone;\n    @Field(type = FieldType.Text)\n    private String namespace;\n\n// 省略get/set ......\n}\n\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br")])])])]),s._v(" "),e("h2",{attrs:{id:"增加测试方法findall与save"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#增加测试方法findall与save"}},[s._v("#")]),s._v(" 增加测试方法findAll与save")]),s._v(" "),e("h3",{attrs:{id:"client1-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#client1-2"}},[s._v("#")]),s._v(" client1")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("Dao")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("@Repository\npublic interface UserDao extends CrudRepository&lt;User,String> {\n}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Service")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('@Service\npublic class TestService {\n    @Autowired\n    private UserDao userDao;\n    public void findAll(){\n        Iterable&lt;User> all = userDao.findAll();\n\n        Iterator&lt;User> iterator = userDao.findAll().iterator();\n        User next1 = iterator.next();\n\n        System.out.println(next1.toString());\n    }\n    public void save(){\n        User user = new User();\n        user.setId("1");\n        user.setName("client1");\n        user.setNamespace("elasticsearch:client1");\n        user.setPhone("111");\n        User save = userDao.save(user);\n        System.out.println(save.toString());\n    }\n}\n\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br"),e("span",{staticClass:"line-number"},[s._v("23")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Test")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("@RunWith(SpringRunner.class)\n@SpringBootTest\npublic class ClientApplicationTests {\n    @Autowired\n    private TestService testService;\n    @Test\n    public void findAll(){\n        testService.findAll();\n    }\n    @Test\n    public void save(){\n        testService.save();\n    }\n}\n\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br")])])])]),s._v(" "),e("h3",{attrs:{id:"client2-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#client2-2"}},[s._v("#")]),s._v(" client2")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("Dao")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("@Repository\npublic interface UserDao extends CrudRepository&lt;User,String> {\n}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Service")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v('@Service\npublic class TestService {\n    @Autowired\n    private UserDao userDao;\n    public void findAll(){\n        Iterable&lt;User> all = userDao.findAll();\n\n        Iterator&lt;User> iterator = userDao.findAll().iterator();\n        User next1 = iterator.next();\n\n        System.out.println(next1.toString());\n    }\n    public void save(){\n        User user = new User();\n        user.setId("2");\n        user.setName("client2");\n        user.setNamespace("elasticsearch:client2");\n        user.setPhone("222");\n        User save = userDao.save(user);\n        System.out.println(save.toString());\n    }\n}\n')])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br"),e("span",{staticClass:"line-number"},[s._v("16")]),e("br"),e("span",{staticClass:"line-number"},[s._v("17")]),e("br"),e("span",{staticClass:"line-number"},[s._v("18")]),e("br"),e("span",{staticClass:"line-number"},[s._v("19")]),e("br"),e("span",{staticClass:"line-number"},[s._v("20")]),e("br"),e("span",{staticClass:"line-number"},[s._v("21")]),e("br"),e("span",{staticClass:"line-number"},[s._v("22")]),e("br")])])]),s._v(" "),e("li",[e("p",[s._v("Test")]),s._v(" "),e("div",{staticClass:"language-text line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("@RunWith(SpringRunner.class)\n@SpringBootTest\npublic class DemoApplicationTests {\n\t@Autowired\n\tprivate TestService testService;\n\t@Test\n\tpublic void findAll(){\n\t\ttestService.findAll();\n\t}\n\t@Test\n\tpublic void save(){\n\t\ttestService.save();\n\t}\n}\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br")])])])]),s._v(" "),e("h1",{attrs:{id:"测试验证"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#测试验证"}},[s._v("#")]),s._v(" 测试验证")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("预期结果")]),s._v(" "),e("ul",[e("li",[s._v("生成client1.user与client2.user索引")]),s._v(" "),e("li",[s._v("访问8081返回client1用户信息，访问8082返回client2用户信息")])])]),s._v(" "),e("li",[e("p",[s._v("实际结果")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://s2.loli.net/2022/04/08/xcwEirGK51YmQCS.png",alt:"image-20220408212339570"}})])])]),s._v(" "),e("p",[e("img",{attrs:{src:"https://s2.loli.net/2022/04/08/9hV8zyrPIfGcQAp.png",alt:"image-20220408212429636"}})]),s._v(" "),e("p",[e("img",{attrs:{src:"https://s2.loli.net/2022/04/08/152SgYdPmIXGRly.png",alt:"image-20220408212455049"}})]),s._v(" "),e("h1",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),e("p",[s._v("我们通过增加一个配置类来获取自定义的"),e("code",[s._v("namespace")]),s._v(",然后在类指定索引名时通过获取变量的形式去读取，这样生成的索引就会带一个前缀，也就是我们想要的"),e("code",[s._v("namespace·")]),s._v("，也就实现了我们最初的目标，复用同一个"),e("code",[s._v("elasticsearch")]),s._v(",达到节省服务器资源的目的")]),s._v(" "),e("h1",{attrs:{id:"源码地址"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#源码地址"}},[s._v("#")]),s._v(" 源码地址")]),s._v(" "),e("ul",[e("li",[e("p",[s._v("https://github.com/TianPuJun/es-demo")])]),s._v(" "),e("li",[e("p",[s._v("https://download.csdn.net/download/C1041067258/85096340")])])]),s._v(" "),e("h1",{attrs:{id:"参考链接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[s._v("#")]),s._v(" 参考链接")]),s._v(" "),e("p",[e("a",{attrs:{href:"https://docs.spring.io/spring-data/elasticsearch/docs/4.2.10/reference/html/#elasticsearch.clients.rest",target:"_blank",rel:"noopener noreferrer"}},[s._v("SpringDataElasticsearch"),e("OutboundLink")],1)]),s._v(" "),e("p",[s._v("https://mp.weixin.qq.com/s?__biz=MzIwNzYzODIxMw==&mid=2247484835&idx=1&sn=9140a7a926a3e53c18ea55ec44bc3f6c&chksm=970e1e09a079971fac40682bafc1dbbe26e8636fd2541b4ac549cf7bc27e5d7c74b0952900db#rd")])])}),[],!1,null,null,null);e.default=t.exports}}]);