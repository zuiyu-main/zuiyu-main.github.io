---
title: Elasticsearch 索引命名空间的使用
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
# Elasticsearch 如何实现索引的伪·命名空间

# 环境说明

* jdk8
* elasticsearch7.4.0
* springboot 2.3.12.RELEASE
* spring-data-elasticsearch 4.0.9.RELEASE



注：本文不做特殊说明的情况下，client1与client2使用相同配置

# 应用场景

在公司内部资源紧张的情况下，多个项目使用同一个`elasticsearch`并且数据互不干扰，实现资源的最大化利用，节约成本

# 集成Elasticsearch 

## pom（client1与client2相同）

```text

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.12.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.data</groupId>
            <artifactId>spring-data-elasticsearch</artifactId>
            <version>4.0.9.RELEASE</version>
        </dependency>
    </dependencies>

```



## config（client1与client2相同）

```text
@Configuration
public class RestClientConfig extends AbstractElasticsearchConfiguration {
    @Bean
    @Override
    public RestHighLevelClient elasticsearchClient() {
        final ClientConfiguration clientConfiguration = ClientConfiguration.builder()
                .connectedTo("localhost:9200")
                .build();

        return RestClients.create(clientConfiguration).rest();
    }
}

```

## yml

### client1

```text
spring.data.elasticsearch.client.namespace=client1
server.port=8081
```

### client2

```
spring.data.elasticsearch.client.namespace=client2
server.port=8082
```

## 索引名定义(client1与client2相同)

* 定义变量获取

  ```text
  @Configuration
  public class EsConst {
      @Value("${spring.data.elasticsearch.client.namespace}")
      private String elasticsearchNamespace;
      @Bean
      public String getElasticsearchNamespace(){
          return elasticsearchNamespace;
      }
  }
  ```

  

* 新建User 实体类，指定索引名称为`namespace.user`

  ```text
  @Document(indexName = "#{@getElasticsearchNamespace}.user")
  public class User {
      @Field(type = FieldType.Text)
      private String id;
      @Field(type = FieldType.Text)
      private String name;
      @Field(type = FieldType.Text)
      private String phone;
      @Field(type = FieldType.Text)
      private String namespace;
  
  // 省略get/set ......
  }
  
  ```
  

## 增加测试方法findAll与save

### client1

* Dao

  ```text
  @Repository
  public interface UserDao extends CrudRepository<User,String> {
  }
  ```

* Service

  ```text
  @Service
  public class TestService {
      @Autowired
      private UserDao userDao;
      public void findAll(){
          Iterable<User> all = userDao.findAll();
  
          Iterator<User> iterator = userDao.findAll().iterator();
          User next1 = iterator.next();
  
          System.out.println(next1.toString());
      }
      public void save(){
          User user = new User();
          user.setId("1");
          user.setName("client1");
          user.setNamespace("elasticsearch:client1");
          user.setPhone("111");
          User save = userDao.save(user);
          System.out.println(save.toString());
      }
  }
  
  ```

  

* Test

  ```text
  @RunWith(SpringRunner.class)
  @SpringBootTest
  public class ClientApplicationTests {
      @Autowired
      private TestService testService;
      @Test
      public void findAll(){
          testService.findAll();
      }
      @Test
      public void save(){
          testService.save();
      }
  }
  
  ```

  

### client2

* Dao

  ```text
  @Repository
  public interface UserDao extends CrudRepository<User,String> {
  }
  ```

  

* Service

  ```text
  @Service
  public class TestService {
      @Autowired
      private UserDao userDao;
      public void findAll(){
          Iterable<User> all = userDao.findAll();
  
          Iterator<User> iterator = userDao.findAll().iterator();
          User next1 = iterator.next();
  
          System.out.println(next1.toString());
      }
      public void save(){
          User user = new User();
          user.setId("2");
          user.setName("client2");
          user.setNamespace("elasticsearch:client2");
          user.setPhone("222");
          User save = userDao.save(user);
          System.out.println(save.toString());
      }
  }
  ```

  

* Test

  ```text
  @RunWith(SpringRunner.class)
  @SpringBootTest
  public class DemoApplicationTests {
  	@Autowired
  	private TestService testService;
  	@Test
  	public void findAll(){
  		testService.findAll();
  	}
  	@Test
  	public void save(){
  		testService.save();
  	}
  }
  ```

  

# 测试验证

* 预期结果
  * 生成client1.user与client2.user索引
  * 访问8081返回client1用户信息，访问8082返回client2用户信息
  
* 实际结果

  ![image-20220408212339570](https://s2.loli.net/2022/04/08/xcwEirGK51YmQCS.png)

![image-20220408212429636](https://s2.loli.net/2022/04/08/9hV8zyrPIfGcQAp.png)

![image-20220408212455049](https://s2.loli.net/2022/04/08/152SgYdPmIXGRly.png)

# 总结

我们通过增加一个配置类来获取自定义的`namespace`,然后在类指定索引名时通过获取变量的形式去读取，这样生成的索引就会带一个前缀，也就是我们想要的`namespace·`，也就实现了我们最初的目标，复用同一个`elasticsearch`,达到节省服务器资源的目的

# 源码地址

* https://github.com/TianPuJun/es-demo

* https://download.csdn.net/download/C1041067258/85096340

# 参考链接

[SpringDataElasticsearch](https://docs.spring.io/spring-data/elasticsearch/docs/4.2.10/reference/html/#elasticsearch.clients.rest)

https://mp.weixin.qq.com/s?__biz=MzIwNzYzODIxMw==&mid=2247484835&idx=1&sn=9140a7a926a3e53c18ea55ec44bc3f6c&chksm=970e1e09a079971fac40682bafc1dbbe26e8636fd2541b4ac549cf7bc27e5d7c74b0952900db#rd

