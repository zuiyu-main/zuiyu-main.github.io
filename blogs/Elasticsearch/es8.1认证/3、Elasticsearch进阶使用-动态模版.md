总进度

[Elasticsearch 8.1 认证工程师学习路线](https://mp.weixin.qq.com/s/x7lMmMAo2563JysMJ8vgRQ)

今天我们来学习`Elasticsearch`中的动态模版，其实我们在第一课2.2.3章节中就已经学过了类似的了，链接如下

[根据给定的需求创建索引](https://mp.weixin.qq.com/s/OnXeESVMreYgBvbGGR4R0g)

但是今天咱们学点不一样的，上次只是简单的使用，这次咱要深入理解，完美掌控才是第一目标，废话少说，下面开始

# 什么是动态模版

动态模版允许我们控制动态字段映射规则之外的数据

动态字段的映射我们可以设置`dynamic`参数为`true`或者`runtime`来启用动态映射，也可以自定义动态映射模版自定义映射，自定义之后的模版就可以根据匹配规则应用于动态添加的字段。在上一节中，动态映射规则已经说过，本节直接搬过来，如下

| `JSON data type`           | `"dynamic":"true"`               | `"dynamic":"runtime"`        |
| -------------------------- | -------------------------------- | ---------------------------- |
| `null`                     | 不添加                           | 不添加                       |
| `true or false`            | `boolean`                        | `boolean`                    |
| `double`                   | `float`                          | `double`                     |
| `long`                     | `long`                           | `long`                       |
| `object`                   | `object`                         | 不添加                       |
| `array`                    | 根据数组中第一个非空的值判断     | 根据数组中第一个非空的值判断 |
| 日期类型的字符串           | `date`                           | `date`                       |
| 数字类型的字符串           | `float or long`                  | `double or long`             |
| 不是日期也不是数字的字符串 | `text`类型以及`.keyword`的字类型 | `keyword`                    |

其中自定义动态模版匹配规则方式有如下

* `match_mapping_type` 对`Elasticsearch`中检测到的数据类型进行操作，参考上方图表
* `match`与`unmatch` 可以使用模式匹配字段名
* `path_match`与`path_unmatch` 对字段的完整虚线路径进行操作
* 如果动态模版没有定义`march_mapping_type`、`match`或`path_match`，那么模版不会匹配任何一个字段。但是`_bulk `请求时可以通过模版名引用模版

也可以使用`{name}`和`{dynamic_type}`模版变量作为占位符，比如后文中使用占位符实现分词器的指定等

动态模版的定义是对象数组

```json
"dynamic_templates":[
  {
    "my_template_name":{#1
      ... 匹配条件 ...#2
      "mapping":{...}#3
    }
  },
  ...
]
```

1. 自定义模版名称，可以是任意的字符串
2. 模版的使用匹配条件可以是：`match_mapping_type`,`match`,`match_pattern`,`unmatch`,`path_match`,`path_unmatch`
3. 匹配字段应该使用的索引映射

通过上面的 学习，我们知道了动态模版的定义，既然定义好了就该有验证，毕竟定义好的模版能不能用，是否定义的正确性还是需要验证的

# 验证动态模版

如果定义的模版包含无效的映射片段则会返回错误。在`index`操作时应用动态模版进行验证，但是大多数情况下在动态模版更新的时候会进行验证。提供无效的映射片段可能造成在更新或者某些条件下动态模版的验证失败，比如：

* 如果没有指定`match_mapping_type`，但是这个模版提供了最少一个的有效映射，那么这个映射片段是有效的。但是如果将与模版匹配的字段映射为其他类型，则在index时返回验证错误。例如：配置一个动态模版，不包含`match_mapping_type`，这样就是一个有效的字符串类型，但是如果有一个字段匹配动态模版时被匹配为`long`，那么在`index`时将返回验证错误。建议就是将`match_mapping_type`配置为预期的`JSON`类型（参考开头的映射关系表）或者在`mapping`中配置好所需的类型
* 如果我们在`mapping`的片段中使用了`{name}`占位符，那么在动态模版的更新时是跳过验证的。这是因为当时的字段名还是不知道的，所以在`index`时进行验证

如果有多个模版同时匹配，按照顺序匹配规则处理，第一个匹配的模版具有最高的优先级；当通过`update mapping API`更新动态模版时，所有的现有模版将会被覆盖，这就允许在最初的创建动态模版之后可以重新排序或者删除它们

# 动态模版中映射运行时字段

在上一节中我们的本小节内容例子就是使用的这个，有兴趣的可以回过头再看一眼，链接放到文章开头了

如果我们想`Elasticsearch`将某一种类型的新字段动态映射为运行时字段，那么我们可以通过设置`"dynamic":"runtime"`,这些字段不会被编入索引，并且在查询时是从`_source`加载

或者我们使用默认的动态映射规则，然后创建动态模版，并将特定的字段映射为运行时字段。我们需要在`index mapping`中设置`"dynamic:"true",`然后创建一个动态模版，并将某种类型的新字段映射为运行时字段

举个例子，假设我们有一组数据，其中每个字段都是`_ip`开头的，根据动态映射规则，`Elasticsearch`会根据数值检测到的任何的字符串映射为`float`或者`long`，此时我们就可以创建一个动态模版，将这个新字符串映射为`ip`类型的运行时字段

下面是我们的一个例子，大概意思就是当`Elasticsearch`使用匹配模式是`ip*`的新字段时，它会将这些字段映射为`ip`类型的运行时字段。因为这些字段不是动态映射的，所以我们可以使用`"dynamic":"true"`或者`"dynamic":"runtime"`结合使用

```text
PUT my-dynamic-template-001/
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_ip": {
          "match_mapping_type": "string",
          "match": "ip*",
          "runtime": {
            "type": "ip"
          }
        }
      }
    ]
  }
}
```

结合`"dynamic":"true"`或者`"dynamic":"runtime"`使用

```text
PUT my-dynamic-template-001/
{
  "mappings": {
    "dynamic":"runtime",
    "dynamic_templates": [
      {
        "strings_as_ip": {
          "match_mapping_type": "string",
          "match": "ip*",
          "runtime": {
            "type": "ip"
          }
        }
      }
    ]
  }
}
```

上面的语句，我们会把符合匹配模式`ip*`的新字段映射为运行时字段，但是因为我们设置`"dynamic":"runtime"`,所以后面的新字段我们都会设置为运行时字段，也就是下面这个语句，其中`ip_req`,`ip_res`,符合动态模版`dynamic_templates`的匹配规则`ip*`，而`my_ip`使用索引开头设置的`"dynamic":"runtime"`也会加入到运行时字段

```text
PUT my-dynamic-template-001/_doc/1
{
  "ip_req":"127.0.0.1",
  "ip_res":"127.0.0.1",
  "my_ip":"locahost"
}

```

此时我们查看索引情况如下

```text
{
  "my-dynamic-template-001" : {
    "mappings" : {
      "dynamic" : "runtime",
      "dynamic_templates" : [
        {
          "strings_as_ip" : {
            "match" : "ip*",
            "match_mapping_type" : "string",
            "runtime" : {
              "type" : "ip"
            }
          }
        }
      ],
      "runtime" : {
        "ip_req" : {
          "type" : "ip"
        },
        "ip_res" : {
          "type" : "ip"
        },
        "my_ip" : {
          "type" : "keyword"
        }
      }
    }
  }
}

```

上面就是一个简单的使用，其中

* `match_mapping_type` 是`string`，也就是字段的值是字符串
* `match` 是`ip*` 即该字段名为`ip`开头的
* `runtime` 定义被映射的字段类型，在上面例子中，被映射为`runtime`，类型为`ip`



# match_mapping_type

`match_mapping_type` 是`JSON`解析器检测到的数据类型。因为`JSON`不区分`long`和`integer`，也不区分`double`和`float`，所以解析时`double`和`float`都会被认为是`double`，`integer`与`long`都会被认为是`long`

> 注意：当使用动态映射的时候，ELasticsearch将始终选择更广泛的数据类型，但是有个例外是`float`类型，它的需要的存储空间少于`double`，并且对于大多数的应用程序来说足够准确。但是运行时字段不支持`float`类型，所以这就是`"dynamic":"runtime"`使用`double`的原因

Elasticsearch 会自动检测数据类型，检测规则就是文章开头的那个表格内容，并且我们还可以使用`match_mapping_type`中使用通配符`*`来匹配所有的数据类型

举个例子，如果我们想把整数字段映射为`integer`而不是`long`类型，字符串字段匹配为`text`和`keyword`类型，我们可以使用如下模版

* 创建一个模版

```text
PUT my-dynamic-template-002
{
  "mappings": {
    "dynamic_templates": [
      {
        "integers": {
          "match_mapping_type": "long",
          "mapping": {
            "type": "integer"
          }
        }
      },
      {
        "strings": {
          "match_mapping_type": "string",
          "mapping": {
            "type": "text",
            "fields": {
              "raw": {
                "type":  "keyword",
                "ignore_above": 256
              }
            }
          }
        }
      }
    ]
  }
}



```

* 插入一条测试数据

  ```
  PUT my-dynamic-template-002/_doc/1
  {
    "my_integer": 5, 
    "my_string": "Some string" 
  }
  ```

  

* 查看生成的`mapping`

  ```text
  GET my-dynamic-template-002/_mapping
  ```

  返回结果如下，`my_integer`会被映射为`integer`，`my_string`会被映射为`text`和`keyword`

  ```text
  {
    "my-dynamic-template-002" : {
      "mappings" : {
        "dynamic_templates" : [
          {
            "integers" : {
              "match_mapping_type" : "long",
              "mapping" : {
                "type" : "integer"
              }
            }
          },
          {
            "strings" : {
              "match_mapping_type" : "string",
              "mapping" : {
                "fields" : {
                  "raw" : {
                    "ignore_above" : 256,
                    "type" : "keyword"
                  }
                },
                "type" : "text"
              }
            }
          }
        ],
        "properties" : {
          "my_integer" : {
            "type" : "integer"
          },
          "my_string" : {
            "type" : "text",
            "fields" : {
              "raw" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          }
        }
      }
    }
  }
  
  ```

# match与unmatch

`match` 使用模式匹配字段名称，`unmatch` 使用模式排除匹配字段

`match_pattern`可以通过设置此参数值调整`match`参数的行为，使`match`参数支持与字段名匹配的完整`Java`正则表达式来替代简单的通配符，如下

```text
  "match_pattern": "regex",
  "match": "^profit_\d+$"
```

如下示例，我们匹配名称以`long_`开头的所有字符串字段，排出以`_text`结尾的字符串字段，并将它们映射为`long`类型的字段

```text

PUT my-dynamic-template-003
{
  "mappings": {
    "dynamic_templates": [
      {
        "longs_as_strings": {
          "match_mapping_type": "string",
          "match":   "long_*",
          "unmatch": "*_text",
          "mapping": {
            "type": "long"
          }
        }
      }
    ]
  }
}

PUT my-dynamic-template-003/_doc/1
{
  "long_num": "5", 
  "long_text": "foo" 
}

GET my-dynamic-template-003/_mapping
```

在上面例子中，`long_num`被映射为`long`类型的字段，这是因为`match_mapping_type`为`string`类型，并且是`long_`开头的。`long_text`虽然是`long_`开头的，但是也是`_text`结尾的，符合`unmatch`条件，这样的话`long_text`就按照默认规则`string`进行映射，生成`text`及`keyword`字段

# path_match与path_unmatch

`path_match`和`path_unmatch`与`match`和`unmatch`原理类似，但是是对字段的完整虚线路径进行匹配，而不仅仅是最终名称，例如`some_object.*.some_field`

```text
PUT my-dynamic-template-004
{
  "mappings": {
    "dynamic_templates": [
      {
        "full_name": {
          "path_match":   "name.*",
          "path_unmatch": "*.middle",
          "mapping": {
            "type":       "text",
            "copy_to":    "full_name"
          }
        }
      }
    ]
  }
}

PUT my-dynamic-template-004/_doc/1
{
  "name": {
    "first":  "John",
    "middle": "Winston",
    "last":   "Lennon"
  }
}


```

如上所示，凡是`name`下的任何字段，除了以`middle`结尾的字段除外，都会被映射为`text`类型，并且`copy_to`带有`full_name`

执行如下命令查看

```text
GET my-dynamic-template-004/_mapping
```

显示结果如下

```text
{
  "my-dynamic-template-004" : {
    "mappings" : {
      "dynamic_templates" : [
        {
          "full_name" : {
            "path_match" : "name.*",
            "path_unmatch" : "*.middle",
            "mapping" : {
              "copy_to" : "full_name",
              "type" : "text"
            }
          }
        }
      ],
      "properties" : {
        "full_name" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        },
        "name" : {
          "properties" : {
            "first" : {
              "type" : "text",
              "copy_to" : [
                "full_name"
              ]
            },
            "last" : {
              "type" : "text",
              "copy_to" : [
                "full_name"
              ]
            },
            "middle" : {
              "type" : "text",
              "fields" : {
                "keyword" : {
                  "type" : "keyword",
                  "ignore_above" : 256
                }
              }
            }
          }
        }
      }
    }
  }
}

```

从上面的结果可知，我们能够看出来，`name`之下的`middle`没有`copy_to`，它的映射按照默认的`string`映射规则，生成`text`以及`keyword`

需要注意的是，除了`leaf`字段外，`path_match`与`path_unmatch`参数匹配对象路径，如下对文档索引将产生错误，因为`name.title`不能映射为文本类型

```text
PUT my-dynamic-template-004/_doc/2
{
  "name": {
    "first":  "Paul",
    "last":   "McCartney",
    "title": {
      "value": "Sir",
      "category": "order of chivalry"
    }
  }
}
```

报错如下

```text'
{
  "error" : {
    "root_cause" : [
      {
        "type" : "mapper_parsing_exception",
        "reason" : "failed to parse field [name.title] of type [text] in document with id '2'. Preview of field's value: '{category=order of chivalry, value=Sir}'"
      }
    ],
    "type" : "mapper_parsing_exception",
    "reason" : "failed to parse field [name.title] of type [text] in document with id '2'. Preview of field's value: '{category=order of chivalry, value=Sir}'",
    "caused_by" : {
      "type" : "illegal_state_exception",
      "reason" : "Can't get text on a START_OBJECT at 5:14"
    }
  },
  "status" : 400
}

```

# template variables （模版变量）

`{name}`和`{dynamic_type}`占位符在映射中被替换为字段名称和检测到的动态类型

如下示例，将所有的字符串字段使用与字段同名的分析器，并禁用所有不是字符串字段的`doc_values`

```text

PUT my-dynamic-template-005
{
  "mappings": {
    "dynamic_templates": [
      {
        "named_analyzers": {
          "match_mapping_type": "string",
          "match": "*",
          "mapping": {
            "type": "text",
            "analyzer": "{name}"
          }
        }
      },
      {
        "no_doc_values": {
          "match_mapping_type":"*",
          "mapping": {
            "type": "{dynamic_type}",
            "doc_values": false
          }
        }
      }
    ]
  }
}

PUT my-dynamic-template-005/_doc/1
{
  "english": "Some English text", 
  "count":   5 
}
GET my-dynamic-template-005/_mapping

```

在上面例子中，`{name} `被替换为`field name`，而`{dynamic_type}`被替换为有`JSON`解析器检测到的数据类型

`english`字段分析器设置为`english`，而`count`被检测为`long`类型，并且`doc_values`设置为`false`

# 动态模版的例子

## 结构化搜索

当我们设置`"dynamic":"true"`时，Elasticsearch会将字符串字段映射为`text`类型，并带有一个`keyword`类型的子字段，如果我们只是结构化的搜索，对全文检索不需要，那么我们就可以让Elasticsearch映射为`keyword`字段，但是这样做的话，必须搜索与索引完全相同的值才能搜索这些字段，也就是精确匹配

```text
PUT my-dynamic-template-006
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_keywords": {
          "match_mapping_type": "string",
          "mapping": {
            "type": "keyword"
          }
        }
      }
    ]
  }
}
```

## 字符串的纯文本映射

与上面结构化搜索相反，如果我们只关心全文检索，并且不会对字段进行聚合、排序和精确查找，那么我们让Elasticsearch将字符串映射为`text`类型

```text
PUT my-dynamic-template-007
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_text": {
          "match_mapping_type": "string",
          "mapping": {
            "type": "text"
          }
        }
      }
    ]
  }
}
```

对于最近版本增加的运行时字段，我们呢还可以创建一个动态模版，将字符串映射为运行时的`keyword`类型，虽说该字段不会被索引，但是它们的值是存在`_source`中，并且可以用于搜索、聚合、过滤和排序

例如如下示例，将创建一个动态模版，将`string`字段映射为`keyword`运行时字段，虽然`runtime`定义是空的，但是Elasticsearch会使用文章开头的匹配规则添加，任何一个未通过时间或者数字检测的字符串都会被映射为`keyword`类型

```text
PUT my-dynamic-template-008
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_keywords": {
          "match_mapping_type": "string",
          "runtime": {}
        }
      }
    ]
  }
}
```

此时我们索引一个文档

```text
PUT my-dynamic-template-008/_doc/1
{
  "english": "Some English text",
  "count":   5
}
```

查看映射关系时，可以看到`english`被映射为`keyword`类型的运行时字段

```text
GET my-dynamic-template-008/_mapping
```

```text
{
  "my-dynamic-template-008" : {
    "mappings" : {
      "dynamic_templates" : [
        {
          "strings_as_keywords" : {
            "match_mapping_type" : "string",
            "runtime" : { }
          }
        }
      ],
      "runtime" : {
        "english" : {
          "type" : "keyword"
        }
      },
      "properties" : {
        "count" : {
          "type" : "long"
        }
      }
    }
  }
}

```

## Disable norms 

如果我们不按照评分进行排序，那么可以禁用索引中的评分因子以节省空间

```text
PUT my-dynamic-template-009
{
  "mappings": {
    "dynamic_templates": [
      {
        "strings_as_keywords": {
          "match_mapping_type": "string",
          "mapping": {
            "type": "text",
            "norms": false,
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          }
        }
      }
    ]
  }
}
```

上面模版中出现的`keyword`的关键字字段是与动态映射的默认规则一致的，如果我们不需要可以按照上面的例子将其删除

## 时间序列

在使用Elasticsearch进行时间序列的分析时，通常会有很多的数字字段，但是这些数字字段一般不会进行过滤通常都是进行聚合。在这种情况下我们可以禁用这些字段的索引以节省磁盘空间，或许也可能获得一些索引的速度

```text
PUT my-dynamic-template-010
{
  "mappings": {
    "dynamic_templates": [
      {
        "unindexed_longs": {
          "match_mapping_type": "long",
          "mapping": {
            "type": "long",
            "index": false
          }
        }
      },
      {
        "unindexed_doubles": {
          "match_mapping_type": "double",
          "mapping": {
            "type": "float", 
            "index": false
          }
        }
      }
    ]
  }
}
```

与默认的动态规则一样，`double`被映射为`float`，因为他可以满足绝大多数的请求。并且只需要一半的磁盘空间



# 总结

好了关于动态模版的知识到这就结束了，从开始介绍什么是动态模版，其次是动态模版如何使用以及最后的动态模版的常用示例，那么你掌握了多少呢，快去尝试一下吧，下一篇预告《为时间序列索引定义索引生命周期策略ILM》敬请期待
