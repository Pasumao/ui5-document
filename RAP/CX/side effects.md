* ### **side effects**

可以在 RAP 业务对象的行为定义 ( behavior definition ) 中配置副作用。
Side effects 会重新加载屏幕，但不会重新加载整个屏幕 

这里做个简单的计算应用程序。
![alt text](<GIF/屏幕录制 2025-09-18 084910.gif>)

behavior definition中
```
    side effects {
        field OperandA affects field CalcResult;
        field OperandB affects field CalcResult;
        field Operator affects field CalcResult;
    }

    determination CalculateCalcResult on modify { field OperandA, OperandB, Operator; }
 ```



OperandA  输入端a

OperandB  输入端b

Operator    输入运算符号

CalcResult  输出结果



可以在其括号内部列出哪个字段影响另一个字段
```
side effects
{

}
```


在行为投影中，您必须通过添加
```
use side effects;
```




* #### **Table**

```
@EndUserText.label : 'ycxpocket'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table ycxpocket {
  key client            : abap.clnt not null;
  key calc_uuid         : sysuuid_x16 not null;
  operand_a             : abap.int4;
  operand_b             : abap.int4;
  operator              : abap.char(1);
  calc_result           : abap.fltp;
  created_at            : abp_creation_tstmpl;
  created_by            : abp_creation_user;
  last_changed_by       : abp_lastchange_user;
  last_changed_at       : abp_lastchange_tstmpl;
  local_last_changed_at : abp_locinst_lastchange_tstmpl;
}
```




* #### Classes

```
METHOD CalculateCalcResult.
    " 1. 读取当前数据
    READ ENTITIES OF YCX_R_TEST_001  IN LOCAL MODE
    ENTITY YCX_R_TEST_001
      FIELDS ( OperandA OperandB Operator CalcResult )
      WITH CORRESPONDING #( keys )
      RESULT DATA(calculators).

    " 2. 计算结果
    LOOP AT calculators ASSIGNING FIELD-SYMBOL(<calc>).
      CASE <calc>-Operator.
        WHEN '+'.
          <calc>-CalcResult = <calc>-OperandA + <calc>-OperandB.
        WHEN '-'.
          <calc>-CalcResult = <calc>-OperandA - <calc>-OperandB.
        WHEN '*'.
          <calc>-CalcResult = <calc>-OperandA * <calc>-OperandB.
        WHEN '/'.
          IF <calc>-OperandB <> 0.
            <calc>-CalcResult = <calc>-OperandA / <calc>-OperandB.
          ELSE.
            <calc>-CalcResult = 0.
          ENDIF.
        WHEN OTHERS.
          <calc>-CalcResult = 0.
      ENDCASE.
    ENDLOOP.

    " 3. 更新结果字段
    "MODIFY ENTITIES OF YCX_R_TEST_001 IN LOCAL MODE
     " ENTITY YCX_R_TEST_001
      "UPDATE SET FIELDS WITH VALUE #(
       " FOR calc IN calculators
        "( %tky   = calc-%tky
         " CalcResult = calc-CalcResult )
      ").

      MODIFY ENTITIES OF YCX_R_TEST_001 IN LOCAL MODE
      ENTITY YCX_R_TEST_001
      UPDATE FIELDS ( CalcResult )
      WITH VALUE #(
        FOR calc IN calculators
        ( %tky   = calc-%tky
          CalcResult = calc-CalcResult )
      ).

  ENDMETHOD.
```


