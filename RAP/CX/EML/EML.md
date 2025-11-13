## EML ( Entity Manipulation Language )


> 简单来说：
> 
> EML是ABAP语言中的一个新语法，专门用于在RAP框架内部对业务对象进行创建、读取、更新、删除等操作。你可以把它理解为RAP世界里的“专用SQL”。
>
> 详细解释：
> 在传统的ABAP编程中，如果你想操作数据库数据，你会使用INSERT、UPDATE、DELETE等Open SQL语句。但在RAP模型中，你不再直接操作底层的数据库表（INSERT ztable...），而是操作更高层次的业务对象。
>
> 业务对象封装了数据和业务逻辑（比如验证validation 、授权、决定determination）。为了与这些业务对象进行交互，你需要一种专门的语言——这就是EML。


## READ
```
" 1. 读取当前数据
READ ENTITIES OF YCX_R_TEST_001  IN LOCAL MODE
ENTITY YCX_R_TEST_001
    FIELDS ( OperandA OperandB Operator CalcResult )
    WITH CORRESPONDING #( keys )
    RESULT DATA(calculators).
```

## MODIFY
> 使用MODIFY ENTITIES语句进行数据操作（如创建，更新）时，不需要手动执行 COMMIT WORK
> 
> 但需要满足一下条件：
> 
> 1.行为定义已启用事务：在行为定义中必须启用 managed 事务模式  ( managed implementation in class ...;  // 自动事务管理 )
>

但在 if_oo_adt_classrun~main 中 需要手动保存方法
```
" 在 MODIFY ENTITY 后触发保存序列
    COMMIT ENTITIES
      RESPONSE OF Z04_DV_Travel_M
      FAILED   FINAL(it_failed)
      REPORTED FINAL(it_reported).
```

```
MODIFY ENTITIES OF YCX_R_TEST_001 IN LOCAL MODE
ENTITY YCX_R_TEST_001
UPDATE FIELDS ( CalcResult )
WITH VALUE #(
FOR calc IN calculators
( %tky   = calc-%tky
    CalcResult = calc-CalcResult )
).
REPORTED DATA(reported)
FAILED DATA(failed).
```

> READ ENTITIES - RAP 业务对象的规范，通常对应于对象的根节点。
> 
> ENTITY - 要从 RAP 对象读取的实体的指定，实体的别名在这里尤为重要。
> 
> FIELDS - 指定要读取为表的字段、字段或所有字段的表达式。
> 
> WITH - 将键传递给读取函数，表定义为“TABLE FOR READ IMPORT”。
> 
> RESULT - 包含读取数据的表，可以使用内联声明创建，类型为“TABLE FOR READ RESULT”。
> 
> FAILED - 如果读取不起作用，则错误条目的键。
> 
> REPORTED - 在读取出现问题时包含错误消息。

#### **CREATE**
> 这里简单创建一条数据，有两个字段PartnerName和Country
#### 例1
> 通过添加 FIELDS，我们定义了应该填写的字段。在 WITH 之后，我们指定一个表并填写我们定义的两个字段。
> 
eml
```
MODIFY ENTITIES OF ZBS_I_RAPPartner
       ENTITY Partner CREATE FIELDS ( PartnerName Country )
       WITH VALUE #( ( PartnerName = 'TEST: WITH'
                       Country     = 'US' ) ).
```

#### 列2
> 不用 FIELDS 话就必须得用 %control 来告诉框架需要用到那些字段
> 
eml
```
MODIFY ENTITIES OF ZBS_I_RAPPartner
       ENTITY Partner CREATE
       FROM VALUE #( ( PartnerName          = 'TEST: FROM'
                       Country              = 'US'
                       %control-PartnerName = if_abap_behv=>mk-on
                       %control-Country     = if_abap_behv=>mk-on ) ).
```
#### **UPDATE**
> 写法与create差不多只需吧create例子中的 CREATE 换成 UPDATE

## GET PERMISSIONS


## SET LOCKS


## COMMIT ENTITIES


## ROLLBACK ENTITIES


## Common Response Parameters

#### REPORTED DATA(reported) 和 FAILED DATA(failed).
> %tky 包含 %key 和草稿指标 %is_draft 作为组件，特别适用于草稿场景
> 
> 创建作执行时没有错误，因此不会返回 FAILED 结构的任何键。提交 但是，由于尚未为旅行实例提供结束日期，因此无法执行作