# Message

## Message Classes

首先要创建Message Class 在包右键新建一个即可，然后写入你想要的Message文本和序号就行，可以使用&+任意数字的组合形成占位符。

## ABAP Class

然后是调用Message 形成消息弹窗在RAP上。

```abap
reported-ypsm0010_i_form = VALUE #(
    FOR ls_formid IN lt_formid (
        %msg = new_message(
            id = 'YPSM0010_AMC_01'
            number = 001
            v1 = ls_formid
            severity = if_abap_behv_message=>severity-warning )
        %delete = if_abap_behv=>mk-on
    )
).
```

你需要赋值到reported上的对应的cds上，然后往%msg这个字段里写，调用new_message方法其中v1就是占位符里的值，severity就是消息的级别，这里我写的是warning，然后%delete = if_abap_behv=>mk-on是指生成一个delete按钮，点击这个按钮会再调用这个方法以让你删除数据
