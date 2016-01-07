# 行政区划代码处理器
用于将[官网最新](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/)行政区划数据转化为便于使用的格式。
`output_data.json`为最新版处理后的文件。

## 使用方法
- `$ npm install`  
- 将最新数据拷入`data.txt`文件(当前为[2014-10-31版](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201504/t20150415_712722.html))。  
- `$ node server.js`  
- 数据会被导出至`output_data.json`

## 特点
- 为便于对应，使用行政区化代码为 key
- 平级化
- 地名缩写：去除后缀放入`brief`字段，便于匹配更多情况，如:`北京市 -> 北京`
- 完整关系：将关系层级放入`desc`字段，用`/`分隔，如:`新疆维吾尔自治区/阿勒泰地区/吉木乃县`
- `level`标识层级
- `useless`标识部分从来不会被使用的地区，如:`市辖区`
