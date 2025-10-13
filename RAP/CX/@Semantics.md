* @Semantics

> @Semantics 注解用于为字段赋予业务语义。它告诉底层框架（如 ABAP 或 CAP）和前端 Fiori Elements 如何解释和处理这个字段的数据，而不仅仅是知道它的数据类型（如 String, Decimal）。
> 简单来说，它的作用是：“这个字段不仅仅是一个数字/字符串，它代表的是金额、数量、日期、货币代码...”
> 


> @Semantics.address.* - 用于地址相关字段
> 
> @Semantics.currencyCode - 用于货币代码字段
> 
> @Semantics.amount.currencyCode - 用于金额字段（带货币）
> 
> @Semantics.language - 用于语言字段
> 

> 使用 @Semantics.address.label: true之后会给弹窗中的address赋值，但会覆盖 @Semantics.address.country: true，@Semantics.address.city: true等在address拼接之后的值
>
> @Semantics.eMail.type: [ #PREF ] - 会生成邮件链接
> 
> @Semantics.telephone.type: [ #PREF ] - 生成电话链接
>
> [@Semantics.quantity.unitOfMeasure : 'ycxmaintable.uom'](#semanticsquantityunitofmeasure)  - 语义注释允许对仅对消费方有影响的语义（例如货币代码表示和金额）进行标准化。






```
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'YCX_VH_VALUEHELP'


@ObjectModel : { resultSet.sizeCategory: #XS }
@UI.headerInfo: {
  typeName: 'ValueHelp',
  typeNamePlural: 'ValueHelps',
  title.value: 'Text',
  description.value: 'Text',
  typeImageUrl: 'sap-icon://blank-tag'
}

define view entity YCX_VH_VALUEHELP as select from ycxvaluehelp
{
  @UI.facet: [
    {
      type: #FIELDGROUP_REFERENCE,
      label: 'Value Help',
      targetQualifier: 'data',
      purpose: #QUICK_VIEW
    },
    {
      type: #IDENTIFICATION_REFERENCE,
      label: 'Value Help'
    }
  ]
  @UI.textArrangement: #TEXT_ONLY
  @Consumption.valueHelpDefault.display:false
  @ObjectModel.text.element: ['Text'] // Search Term #DisplayTextAndID
    key id as Id,
    
  @EndUserText.label : 'String Text'
  @UI: {
    multiLineText: true,
    fieldGroup: [{ qualifier: 'data', position: 10 }],
    lineItem: [{ position: 1 }],
    identification: [{ position: 1 }]
  }
    @Consumption.valueHelpDefault.display:true
    text as Text,
    @Consumption.valueHelpDefault.display:false
    createdby as Createdby,
    @Consumption.valueHelpDefault.display:false
    createdat as Createdat,
    @Consumption.valueHelpDefault.display:false
    locallastchangedby as Locallastchangedby,
    @Consumption.valueHelpDefault.display:false
    locallastchangedat as Locallastchangedat,
    @Consumption.valueHelpDefault.display:false
    lastchangedat as Lastchangedat,
    @Semantics.name.fullName: true
    name as Name,
    @Semantics.telephone.type: [#PREF]
    phone as Phone,
    @Consumption.valueHelpDefault.display:false
    building as Building,
    @Semantics.address.country: true
    country as Country,
    @Consumption.valueHelpDefault.display:false
    @Semantics.address.street: true
    street as Street,
    @Consumption.valueHelpDefault.display:true
    @Semantics.address.city: true
    city as City,
    @Consumption.valueHelpDefault.display:false
    postcode as Postcode,
    
    @Semantics.address.label: true
    @Consumption.valueHelpDefault.display:false
    address_label as AddressLabel,
    @Consumption.valueHelpDefault.display:false
    photo_url as PhotoUrl,
    
    @Consumption.valueHelpDefault.display:false
    @Semantics.eMail.type: [ #PREF ]
    email as Email
}
```





## @Semantics.quantity.unitOfMeasure

> 注意点：在 CDS 视图实体中，对于数据类型为 abap.quan 的所有元素和所有计算数量都是必需的。可用于其他数据类型的 CDS 数量字段。在所有其他 CDS 实体中是可选的。
> 
ycxmaintable表
```
  @Semantics.quantity.unitOfMeasure : 'ycxmaintable.uom'
  field_with_quantity            : abap.quan(15,3);
  uom                            : msehi;
```
> 这里需要用到 @UI.lineItem 和 @UI.fieldGroup
>
```
@UI:{
    lineItem: [
      {
        label: 'FieldWithQuantity',
        importance: #LOW,
        position: 92
      }
    ],
    fieldGroup: [{ qualifier: 'FIELD' ,label:'FieldWithQuantity'}]
}
FieldWithQuantity;
```

![alt text](PNG/Semantics.quantity.unitOfMeasure.png)
![alt text](PNG/Semantics.quantity.unitOfMeasure2.png)