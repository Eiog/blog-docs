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
