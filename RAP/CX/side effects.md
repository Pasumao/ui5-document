* ### **side effects**

可以在 RAP 业务对象的行为定义 ( behavior definition ) 中配置副作用。

这里做个简单的计算应用程序。
![alt text](<GIF/屏幕录制 2025-09-18 084910.gif>)

behavior definition中

&nbsp; side effects {

&nbsp;   field OperandA affects field CalcResult;

&nbsp;   field OperandB affects field CalcResult;

&nbsp;   field Operator affects field CalcResult;

&nbsp; }



&nbsp; determination CalculateCalcResult on modify { field OperandA, OperandB, Operator; }



OperandA  输入端a

OperandB  输入端b

Operator    输入运算符号

CalcResult  输出结果



可以在其括号内部列出哪个字段影响另一个字段

side effects

{

}



在行为投影中，您必须通过添加

use side effects;





* #### **Table**



@EndUserText.label : 'ycxpocket'

@AbapCatalog.enhancement.category : #NOT\_EXTENSIBLE

@AbapCatalog.tableCategory : #TRANSPARENT

@AbapCatalog.deliveryClass : #A

@AbapCatalog.dataMaintenance : #RESTRICTED

define table ycxpocket {



&nbsp; key client            : abap.clnt not null;

&nbsp; key calc\_uuid         : sysuuid\_x16 not null;

&nbsp; operand\_a             : abap.int4;

&nbsp; operand\_b             : abap.int4;

&nbsp; operator              : abap.char(1);

&nbsp; calc\_result           : abap.fltp;

&nbsp; created\_at            : abp\_creation\_tstmpl;

&nbsp; created\_by            : abp\_creation\_user;

&nbsp; last\_changed\_by       : abp\_lastchange\_user;

&nbsp; last\_changed\_at       : abp\_lastchange\_tstmpl;

&nbsp; local\_last\_changed\_at : abp\_locinst\_lastchange\_tstmpl;



}





* #### Classes



METHOD CalculateCalcResult.

&nbsp;   " 1. 读取当前数据

&nbsp;   READ ENTITIES OF YCX\_R\_TEST\_001  IN LOCAL MODE

&nbsp;   ENTITY YCX\_R\_TEST\_001

&nbsp;     FIELDS ( OperandA OperandB Operator CalcResult )

&nbsp;     WITH CORRESPONDING #( keys )

&nbsp;     RESULT DATA(calculators).



&nbsp;   " 2. 计算结果

&nbsp;   LOOP AT calculators ASSIGNING FIELD-SYMBOL(<calc>).

&nbsp;     CASE <calc>-Operator.

&nbsp;       WHEN '+'.

&nbsp;         <calc>-CalcResult = <calc>-OperandA + <calc>-OperandB.

&nbsp;       WHEN '-'.

&nbsp;         <calc>-CalcResult = <calc>-OperandA - <calc>-OperandB.

&nbsp;       WHEN '\*'.

&nbsp;         <calc>-CalcResult = <calc>-OperandA \* <calc>-OperandB.

&nbsp;       WHEN '/'.

&nbsp;         IF <calc>-OperandB <> 0.

&nbsp;           <calc>-CalcResult = <calc>-OperandA / <calc>-OperandB.

&nbsp;         ELSE.

&nbsp;           <calc>-CalcResult = 0.

&nbsp;         ENDIF.

&nbsp;       WHEN OTHERS.

&nbsp;         <calc>-CalcResult = 0.

&nbsp;     ENDCASE.

&nbsp;   ENDLOOP.



&nbsp;   " 3. 更新结果字段

&nbsp;   "MODIFY ENTITIES OF YCX\_R\_TEST\_001 IN LOCAL MODE

&nbsp;    " ENTITY YCX\_R\_TEST\_001

&nbsp;     "UPDATE SET FIELDS WITH VALUE #(

&nbsp;      " FOR calc IN calculators

&nbsp;       "( %tky   = calc-%tky

&nbsp;        " CalcResult = calc-CalcResult )

&nbsp;     ").

&nbsp;     MODIFY ENTITIES OF YCX\_R\_TEST\_001 IN LOCAL MODE

&nbsp;     ENTITY YCX\_R\_TEST\_001

&nbsp;     UPDATE FIELDS ( CalcResult )

&nbsp;     WITH VALUE #(

&nbsp;       FOR calc IN calculators

&nbsp;       ( %tky   = calc-%tky

&nbsp;         CalcResult = calc-CalcResult )

&nbsp;     ).



&nbsp; ENDMETHOD.



