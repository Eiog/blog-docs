# mongoose 系列之一 find 查询

```ts
Model.find(filter[, projection][, options][, callback])
```
## find()
```ts
Model.find(filter[, projection][, options][, callback])
```
参数一：filter
查询条件使用 JSON 文档的格式，JSON 文档的语法跟 MongoDB shell 中一致。
```ts
{ field1: value1, field2: { operator: value2 } ... }
```
1. 查找全部
```ts
Model.find()
Model.find({})
```
2. 精确查找
```ts
Model.find({ author: 'dora' })
```
3. 使用操作符

对比相关操作符

|符号|描述|
|----|----|
|$eq|与指定的值相等|
|$ne|与指定的值不相等|
|$gt|大于指定的值|
|$gte|大于等于指定的值|
|$lt|小于指定的值|
|$lte|小于等于指定的值|
|$in|与查询数组中指定的值中的任何一个匹配|
|$nin|与查询数组中指定的值中的任何一个都不匹配|
```ts
Model.find({ age: { $in: [16, 18] } })
```
>返回 age 字段等于 16 或者 18 的所有 document。

逻辑相关操作符

|符号	|描述|
|----|----|
|$and	|满足数组中指定的所有条件|
|$nor	|不满足数组中指定的所有条件|
|$or	|满足数组中指定的条件的其中一个|
|$not	|反转查询，返回不满足指定条件的文档|

```ts
// 相关语法
{$and:[ {expression1},{expression2}, ... ,{expressionN} ]}
{$nor:[ {expression1},{expression2}, ... ,{expressionN} ]}
{$or:[ {expression1},{expression2}, ... ,{expressionN} ]}
{field: { $not: { <operator-expression> }}}
```
>逻辑操作符中的比较包括字段不存在的情况。
```ts
Model.find({ age: { $not: { $lte: 16 } } })
// 返回 age 字段大于 16 或者 age 字段 不存在 的文档
```
字段相关操作符


|符号	|描述|
|----|----|
|$exists	|匹配存在指定字段的文档 { field: { $exists: <boolean> } }|
|$type	|返回字段属于指定类型的文档 {field: { $type: <BSON type> }}|

4. 嵌套对象字段的查找
   数据如下
```ts
{
  name: { first: "dora", last: "wang" }
}
```
>精确匹配，顺序、字段都必须一致。
```ts
Model.find({ name: { last: 'wang', first: 'dora' } })
// [] 找不到数据
```
>使用点语法，可匹配嵌套的字段，其中字段名必须用引号引起来。
```ts
Model.find({ 'name.last': 'wang' })
```
5. 数组字段的查找

|符号	|描述|
|----|----|
|$all	|匹配包含查询数组中指定的所有条件的数组字段|
|$elemMatch	|匹配数组字段中的某个值满足 $elemMatch 中指定的所有条件|
|$size	|匹配数组字段的 length 与指定的大小一样的 document|

数据如下
```ts
{ year: [2018, 2019] }
{ year: [2017, 2019, 2020] }
{ year: [2016, 2020] }
```
>查找数组中的至少一个值
>可使用精确查找写法 {field: value}
```ts
Model.find({ year: 2019 })
// { "_id" : ..., "year" : [ 2018, 2019 ] }
// { "_id" : ..., "year" : [ 2017, 2019, 2020 ] }
```
>查找数组中的多个值
>使用 $all 查找同时存在 2019 和 2020 的 document
```ts
Model.find({ year: { $all: [2019, 2020] } })
// { "_id" : ..., "year" : [ 2017, 2019, 2020 ] }
```
操作符组合查询
可使用操作符进行筛选，{<field>:{operator: value}}，比如 $in
```ts
Model.find({ year: { $in: [2018, 2020] } })
// { "_id" : ..., "year" : [ 2018, 2019 ] }
// { "_id" : ..., "year" : [ 2017, 2019, 2020 ] }
```
>使用操作符组合查询 {<field>:{operator1: value1, operator2: value2}}

```ts
Model.find({ year: { $gt: 2019, $lt: 2018 } })
// { "_id" : ..., "year" : [ 2017, 2019, 2020 ] }
// { "_id" : ..., "year" : [ 2016, 2020 ] }
```
>数组字段包含满足查询条件的元素，可以是不同元素分别满足条件也可以是同一个元素满足所有条件，如上例，是一个值满足大于2019的条件，另一个值满足小于2018的条件。
$elemMatch 单个字段值满足所有查询条件

$elemMatch 查找数组字段中的值同时满足所有条件的 document。

{field: { $elemMatch: { <query1>, <query2>, ... }}}
```ts
Model.find({ year: { $elemMatch: { $gt: 2016, $lt: 2018 } } })
// { "_id" : ..., "year" : [ 2017, 2019, 2020 ] }
```
数组下标查询
```ts
Model.find({ 'year.1': { $gt: 2019 } })
// { "_id" : ..., "year" : [ 2016, 2020 ] }
```
>数组 year 的第二个值大于2019。
1. 数组对象的查找
数据如下
```ts
{ author: [{ name: 'dora', age: 18 }, { name: 'wang', age: 16 }] }
```
精确查询

精确匹配，顺序、字段都必须一致。
```ts
Model.find({ author: { name: 'dora', age: 18 } })
```
点语法查询
```ts
Model.find({ 'author.age': { $gte: 18 } })
```
