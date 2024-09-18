---
title: Elasticsearch 异步检索理论与实战
date: 2019-01-01
tags:
 - Elasticsearch
categories:
 -  Elasticsearch
---
# 异步检索在 Elasticsearch 中的理论与实践

> https://www.elastic.co/guide/en/elasticsearch/reference/8.1/async-search.html#submit-async-search

## 引言

Elasticsearch 是一种强大的分布式搜索和分析引擎，它能够快速地存储、搜索和分析大量数据。在处理大规模数据时，性能和响应时间变得至关重要。为了提高搜索和查询操作的效率，Elasticsearch 支持异步检索。本文将深入探讨异步检索在 Elasticsearch 中的理论原理，展示如何在实践中使用它，并提供使用场景和注意事项。

## 什么是异步检索？

在传统的同步搜索中，当客户端发出一个查询请求后，它需要等待 Elasticsearch 返回所有匹配结果才能继续处理其他任务。而异步检索允许客户端发起一个查询请求后，不必等待搜索结果立即返回，而是可以继续执行其他操作。Elasticsearch 在后台处理这个查询请求，当查询完成后，客户端会得到一个响应。

异步检索的优点在于它能够显著提高搜索和查询操作的性能和响应时间，特别是在处理大量数据或复杂查询时。

## 添加测试数据

使用`python3`脚本完成，根据`github`修改而来

> ```javascript
> https://github.com/oliver006/elasticsearch-test-data
> ```

生成测试数据脚本见文章末尾

执行命令

```text
python3 es_test_data.py --es_url=http://127.0.0.1:9200 --count=1000000
```

## 如何使用异步检索？

### 1. 创建异步搜索任务

在 Elasticsearch 中，使用异步检索需要创建一个异步搜索任务。你可以通过发送一个异步搜索请求来创建任务。以下是一个使用 Elasticsearch 的 REST API 发起异步搜索请求的示例：

```http
POST /test_data/_async_search?size=0
{
  "sort": [
    { "last_updated": { "order": "asc" } }
  ],
  "aggs": {
    "sale_date": {
      "date_histogram": {
        "field": "last_updated",
        "calendar_interval": "1d"
      }
    }
  }
}
```

在上述示例中，我们向名为` test_data` 的索引提交了一个异步搜索请求，该请求使用简单的匹配查询来查找包含特定值的文档。

相应内容如下，注意`ID`的值即可

> 如果看不到`ID`的值，再加一部分数据量再次检索即可

```text
{
  "id" : "FjU0SDlRSFZ2UTdxZUpkaFdLSF9hOVEdZzBVS3hmd1FTWEc3VmpCc1gzZFZhdzo2NDI0Mzg=",
  "is_partial" : true,
  "is_running" : true,
  "start_time_in_millis" : 1690808656033,
  "expiration_time_in_millis" : 1691240656033,
  "response" : {
    "took" : 1001,
    "timed_out" : false,
    "terminated_early" : false,
    "num_reduce_phases" : 0,
    "_shards" : {
      "total" : 1,
      "successful" : 0,
      "skipped" : 0,
      "failed" : 0
    },
    "hits" : {
      "total" : {
        "value" : 0,
        "relation" : "gte"
      },
      "max_score" : null,
      "hits" : [ ]
    }
  }
}
```



### 2. 获取异步搜索结果

一旦创建了异步搜索任务，你可以轮询获取任务的结果。Elasticsearch 返回一个任务 ID（上一步返回的ID），你可以使用这个 ID 来检索结果。以下是获取异步搜索结果的示例：

```http
GET /_async_search/<task_id>

GET /_async_search/FjU0SDlRSFZ2UTdxZUpkaFdLSF9hOVEdZzBVS3hmd1FTWEc3VmpCc1gzZFZhdzo2NDI0Mzg=
```

在上述示例中，我们使用 `<task_id>` 来获取异步搜索任务的状态。

### 3. 获取异步搜索的状态

获取异步搜索结果后，可以对结果进行处理和解析。通常，结果会以 JSON 格式返回，其中包含搜索的匹配文档、聚合信息等。仅仅是在url中加入status

```text
GET /_async_search/status/FjU0SDlRSFZ2UTdxZUpkaFdLSF9hOVEdZzBVS3hmd1FTWEc3VmpCc1gzZFZhdzo2NDI0Mzg=
```

返回结果如下

```text
{
  "id" : "FjU0SDlRSFZ2UTdxZUpkaFdLSF9hOVEdZzBVS3hmd1FTWEc3VmpCc1gzZFZhdzo2NDI0Mzg=",
  "is_running" : false,
  "is_partial" : false,
  "start_time_in_millis" : 1690808656033,
  "expiration_time_in_millis" : 1691240656033,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "completion_status" : 200
}
```

### 4. 删除异步检索

```text
DELETE /_async_search/FjU0SDlRSFZ2UTdxZUpkaFdLSF9hOVEdZzBVS3hmd1FTWEc3VmpCc1gzZFZhdzo2NDI0Mzg=
```



## 使用场景

异步检索在以下场景中特别有用：

1. **大数据量搜索：** 当索引包含大量数据时，同步搜索可能会导致请求阻塞并增加响应时间。异步检索能够提高搜索性能，让客户端可以并发处理其他任务。

2. **复杂查询：** 复杂的搜索查询可能需要更长的处理时间。通过使用异步检索，可以避免客户端长时间等待，提高用户体验。

3. **定时任务：** 如果你需要定期执行一些查询，并将结果导出或进行其他操作，异步检索可以让你更加灵活地处理这些任务。

## 使用注意事项

虽然异步检索提供了很多好处，但在使用时也需要注意以下事项：

1. **任务状态管理：** 确保正确地管理异步搜索任务的状态。任务可能处于不同的状态，包括运行中、完成和失败。及时清理已经完成或失败的任务，避免资源浪费。

2. **任务结果有效性：** 确保处理异步搜索结果时，对结果进行有效性验证和解析。避免因错误处理结果而导致数据不一致或错误的分析。

3. **资源限制：** 异步检索仍然占用服务器资源，特别是在处理大量并发任务时。确保服务器资源足够以支持异步检索的需求。

4. **超时和重试：** 考虑到网络或其他故障可能导致异步搜索请求失败，需要合理设置超时时间并实现重试机制，以确保请求的可靠性。

## 结论

异步检索是 Elasticsearch 中一个强大且实用的特性，可以显著提高搜索和查询操作的性能，特别在处理大规模数据或复杂查询时。在使用异步检索时，注意合理管理任务状态、验证结果有效性，并注意资源限制和错误处理。合理地应用异步检索，能为我们的应用程序带来更高效的搜索和分析功能。

# 测试脚本

```pyth
#!/usr/bin/python

import nest_asyncio
nest_asyncio.apply()

import json
import csv
import time
import logging
import random
import string
import uuid
import datetime

import tornado.gen
import tornado.httpclient
import tornado.ioloop
import tornado.options

try:
    xrange
    range = xrange
except NameError:
    pass

async_http_client = tornado.httpclient.AsyncHTTPClient()
headers = tornado.httputil.HTTPHeaders({"content-type": "application/json"})
id_counter = 0
upload_data_count = 0
_dict_data = None



def delete_index(idx_name):
    try:
        url = "%s/%s?refresh=true" % (tornado.options.options.es_url, idx_name)
        request = tornado.httpclient.HTTPRequest(url, headers=headers, method="DELETE", request_timeout=240, auth_username=tornado.options.options.username, auth_password=tornado.options.options.password, validate_cert=tornado.options.options.validate_cert)
        response = tornado.httpclient.HTTPClient().fetch(request)
        logging.info('Deleting index  "%s" done   %s' % (idx_name, response.body))
    except tornado.httpclient.HTTPError:
        pass


def create_index(idx_name):
    schema = {
        "settings": {
            "number_of_shards":   tornado.options.options.num_of_shards,
            "number_of_replicas": tornado.options.options.num_of_replicas
        },
        "refresh": True
    }

    body = json.dumps(schema)
    url = "%s/%s" % (tornado.options.options.es_url, idx_name)
    try:
        logging.info('Trying to create index %s' % (url))
        request = tornado.httpclient.HTTPRequest(url, headers=headers, method="PUT", body=body, request_timeout=240, auth_username=tornado.options.options.username, auth_password=tornado.options.options.password, validate_cert=tornado.options.options.validate_cert)
        response = tornado.httpclient.HTTPClient().fetch(request)
        logging.info('Creating index "%s" done   %s' % (idx_name, response.body))
    except tornado.httpclient.HTTPError:
        logging.info('Looks like the index exists already')
        pass


@tornado.gen.coroutine
def upload_batch(upload_data_txt):
    try:
        request = tornado.httpclient.HTTPRequest(tornado.options.options.es_url + "/_bulk",
                                                 method="POST",
                                                 body=upload_data_txt,
                                                 headers=headers,
                                                 request_timeout=tornado.options.options.http_upload_timeout,
                                                 auth_username=tornado.options.options.username, auth_password=tornado.options.options.password, validate_cert=tornado.options.options.validate_cert)
        response = yield async_http_client.fetch(request)
    except Exception as ex:
        logging.error("upload failed, error: %s" % ex)
        return

    result = json.loads(response.body.decode('utf-8'))
    res_txt = "OK" if not result['errors'] else "FAILED"
    took = int(result['took'])
    logging.info("Upload: %s - upload took: %5dms, total docs uploaded: %7d" % (res_txt, took, upload_data_count))


def get_data_for_format(format):
    split_f = format.split(":")
    if not split_f:
        return None, None

    field_name = split_f[0]
    field_type = split_f[1]

    return_val = ''

    if field_type == 'arr':
        return_val = []
        array_len_expr = split_f[2]
        if '-' in array_len_expr:
            (min,max) = array_len_expr.split('-')
            array_len = generate_count(int(min), int(max))
        else:
            array_len = int(array_len_expr)

        single_elem_format = field_name + ':' + format[len(field_name) + len(field_type) + len(array_len_expr) + 3 : ]
        for i in range(array_len):
            x = get_data_for_format(single_elem_format)
            return_val.append(x[1])

    elif field_type == "bool":
        return_val = random.choice([True, False])

    elif field_type == "str":
        min = 3 if len(split_f) < 3 else int(split_f[2])
        max = min + 7 if len(split_f) < 4 else int(split_f[3])
        length = generate_count(min, max)
        return_val = "".join([random.choice(string.ascii_letters + string.digits) for x in range(length)])

    elif field_type == "int":
        min = 0 if len(split_f) < 3 else int(split_f[2])
        max = min + 100000 if len(split_f) < 4 else int(split_f[3])
        return_val = generate_count(min, max)
    
    elif field_type == "ipv4":
        return_val = "{0}.{1}.{2}.{3}".format(generate_count(0, 245),generate_count(0, 245),generate_count(0, 245),generate_count(0, 245))

    elif field_type in ["ts", "tstxt"]:
        now = int(time.time())
        per_day = 24 * 60 * 60
        min = now - 30 * per_day if len(split_f) < 3 else int(split_f[2])
        max = now + 30 * per_day if len(split_f) < 4 else int(split_f[3])
        ts = generate_count(min, max)
        return_val = int(ts * 1000) if field_type == "ts" else datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%dT%H:%M:%S.000-0000")

    elif field_type == "words":
        min = 2 if len(split_f) < 3 else int(split_f[2])
        max = min + 8 if len(split_f) < 4 else int(split_f[3])
        count = generate_count(min, max)
        words = []
        for _ in range(count):
            word_len = random.randrange(3, 10)
            words.append("".join([random.choice(string.ascii_letters + string.digits) for x in range(word_len)]))
        return_val = " ".join(words)

    elif field_type == "dict":
        global _dict_data
        min = 2 if len(split_f) < 3 else int(split_f[2])
        max = min + 8 if len(split_f) < 4 else int(split_f[3])
        count = generate_count(min, max)
        return_val = " ".join([random.choice(_dict_data).strip() for _ in range(count)])

    elif field_type == "text":
        text = ["text1", "text2", "text3"] if len(split_f) < 3 else split_f[2].split("-")
        min = 1 if len(split_f) < 4 else int(split_f[3])
        max = min + 1 if len(split_f) < 5 else int(split_f[4])
        count = generate_count(min, max)
        words = []
        for _ in range(count):
            words.append(""+random.choice(text))
        return_val = " ".join(words)

    return field_name, return_val


def generate_count(min, max):
    if min == max:
        return max
    elif min > max:
        return random.randrange(max, min);
    else:
        return random.randrange(min, max);


def generate_random_doc(format):
    global id_counter

    res = {}

    for f in format:
        f_key, f_val = get_data_for_format(f)
        if f_key:
            res[f_key] = f_val

    if not tornado.options.options.id_type:
        return res

    if tornado.options.options.id_type == 'int':
        res['_id'] = id_counter
        id_counter += 1
    elif tornado.options.options.id_type == 'uuid4':
        res['_id'] = str(uuid.uuid4())

    return res


def set_index_refresh(val):

    params = {"index": {"refresh_interval": val}}
    body = json.dumps(params)
    url = "%s/%s/_settings" % (tornado.options.options.es_url, tornado.options.options.index_name)
    try:
        request = tornado.httpclient.HTTPRequest(url, headers=headers, method="PUT", body=body, request_timeout=240, auth_username=tornado.options.options.username, auth_password=tornado.options.options.password, validate_cert=tornado.options.options.validate_cert)
        http_client = tornado.httpclient.HTTPClient()
        http_client.fetch(request)
        logging.info('Set index refresh to %s' % val)
    except Exception as ex:
        logging.exception(ex)


def csv_file_to_json(csvFilePath):
    data = []

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for rows in csvReader:
            data.append(rows)

    return json.dumps(data)


@tornado.gen.coroutine
def generate_test_data():

    global upload_data_count

    if tornado.options.options.force_init_index:
        delete_index(tornado.options.options.index_name)

    create_index(tornado.options.options.index_name)

    # todo: query what refresh is set to, then restore later
    if tornado.options.options.set_refresh:
        set_index_refresh("-1")

    if tornado.options.options.out_file:
        out_file = open(tornado.options.options.out_file, "w")
    else:
        out_file = None

    if tornado.options.options.dict_file:
        global _dict_data
        with open(tornado.options.options.dict_file, 'r') as f:
            _dict_data = f.readlines()
        logging.info("Loaded %d words from the %s" % (len(_dict_data), tornado.options.options.dict_file))

    format = tornado.options.options.format.split(',')
    if not format:
        logging.error('invalid format')
        exit(1)

    ts_start = int(time.time())
    upload_data_txt = ""

    if tornado.options.options.data_file:
        json_array = ""
        if tornado.options.options.data_file.endswith(".csv"):
            json_array = json.loads(csv_file_to_json(tornado.options.options.data_file))
        else:
            with open(tornado.options.options.data_file, 'r') as f:
                json_array = json.load(f)
            logging.info("Loaded documents from the %s", tornado.options.options.data_file)

        for item in json_array:
            cmd = {'index': {'_index': tornado.options.options.index_name}}
                             # '_type': tornado.options.options.index_type}}
            if '_id' in item:
                cmd['index']['_id'] = item['_id']

            upload_data_txt += json.dumps(cmd) + "\n"
            upload_data_txt += json.dumps(item) + "\n"

        if upload_data_txt:
            yield upload_batch(upload_data_txt)
    else:
        logging.info("Generating %d docs, upload batch size is %d" % (tornado.options.options.count,
                                                                      tornado.options.options.batch_size))
        for num in range(0, tornado.options.options.count):

            item = generate_random_doc(format)

            if out_file:
                out_file.write("%s\n" % json.dumps(item))

            cmd = {'index': {'_index': tornado.options.options.index_name}}
                             # '_type': tornado.options.options.index_type}}
            if '_id' in item:
                cmd['index']['_id'] = item['_id']

            upload_data_txt += json.dumps(cmd) + "\n"
            upload_data_txt += json.dumps(item) + "\n"
            upload_data_count += 1

            if upload_data_count % tornado.options.options.batch_size == 0:
                yield upload_batch(upload_data_txt)
                upload_data_txt = ""

        # upload remaining items in `upload_data_txt`
        if upload_data_txt:
            yield upload_batch(upload_data_txt)

    if tornado.options.options.set_refresh:
        set_index_refresh("1s")

    if out_file:
        out_file.close()

    took_secs = int(time.time() - ts_start)

    logging.info("Done - total docs uploaded: %d, took %d seconds" % (tornado.options.options.count, took_secs))


if __name__ == '__main__':
    tornado.options.define("es_url", type=str, default='http://localhost:9200', help="URL of your Elasticsearch node")
    tornado.options.define("index_name", type=str, default='test_data', help="Name of the index to store your messages")
    tornado.options.define("index_type", type=str, default='test_type', help="Type")
    tornado.options.define("batch_size", type=int, default=1000, help="Elasticsearch bulk index batch size")
    tornado.options.define("num_of_shards", type=int, default=2, help="Number of shards for ES index")
    tornado.options.define("http_upload_timeout", type=int, default=3, help="Timeout in seconds when uploading data")
    tornado.options.define("count", type=int, default=100000, help="Number of docs to generate")
    tornado.options.define("format", type=str, default='name:str,age:int,last_updated:ts', help="message format")
    tornado.options.define("num_of_replicas", type=int, default=0, help="Number of replicas for ES index")
    tornado.options.define("force_init_index", type=bool, default=False, help="Force deleting and re-initializing the Elasticsearch index")
    tornado.options.define("set_refresh", type=bool, default=False, help="Set refresh rate to -1 before starting the upload")
    tornado.options.define("out_file", type=str, default=False, help="If set, write test data to out_file as well.")
    tornado.options.define("id_type", type=str, default=None, help="Type of 'id' to use for the docs, valid settings are int and uuid4, None is default")
    tornado.options.define("dict_file", type=str, default=None, help="Name of dictionary file to use")
    tornado.options.define("data_file", type=str, default=None, help="Name of the documents file to use")
    tornado.options.define("username", type=str, default=None, help="Username for elasticsearch")
    tornado.options.define("password", type=str, default=None, help="Password for elasticsearch")
    tornado.options.define("validate_cert", type=bool, default=True, help="SSL validate_cert for requests. Use false for self-signed certificates.")
    tornado.options.parse_command_line()

    tornado.ioloop.IOLoop.instance().run_sync(generate_test_data)
```

