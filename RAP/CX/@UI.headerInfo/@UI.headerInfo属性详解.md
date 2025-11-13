### **1-1，headerInfo Annotation 属性说明**

@UI.headerInfo 是 SAP Business Technology Platform (BTP) RAP (Restful ABAP Programming) 开发中用于定义对象页面头部信息的注解。以下是各个属性的含义：

#### **目录**
- [a，顶级属性](#a顶级属性)
- [b，title 对象 (标题部分)](#btitle-对象-标题部分)
- [c，description 对象 (描述部分)](#cdescription-对象-描述部分)
- [实例](#实例)



#### **a，顶级属性**

> [typeName](#typename) :对象类型的单数名称（如"Product"）
> 
> [typeNamePlural](#typenameplural): 对象类型的复数名称（如"Products"）
> 
> [typeImageUrl](#typeimageurl): 对象类型的图标URL
> 
> [imageUrl](#imageurl): 对象特定实例的图片URL



#### **b，title 对象 (标题部分)**
> [title](#title-and-description)
> 
> type: 标题类型，通常为 #STANDARD
> 
> label: 标题的标签文本
> 
> iconUrl: 标题旁显示的图标URL
> 
> criticality: 关键性指示（如高/中/低重要性）
> 
> criticalityRepresentation: 关键性表示方式，#WITHOUT\_ICON 表示不显示图标
> 
> value: 标题的实际值
> 
> valueQualifier: 值的限定符（如货币单位等）
> 
> targetElement: 目标元素（用于导航等）
> 
> url: 相关URL链接

#### **c，description 对象 (描述部分)**

> [description](#title-and-description)
描述部分的属性与title部分完全相同，用于定义对象页面的描述信息：
> 
> type: 描述类型，通常为 #STANDARD
> 
> label: 描述的标签文本
> 
> iconUrl: 描述旁显示的图标URL
> 
> criticality: 关键性指示
> 
> criticalityRepresentation: 关键性表示方式
> 
> value: 描述的实际内容
> 
> valueQualifier: 值的限定符
> 
> targetElement: 目标元素
> 
> url: 相关URL链接



#### **实例**
```
@UI.headerInfo: {
   typeName: 'Product',
   typeNamePlural: 'Products',
   typeImageUrl: 'sap-icon://product',
   imageUrl: 'https://example.com/images/prod_123.jpg',

   title: {
     type: #STANDARD,
     label: 'Product Name',
     iconUrl: 'sap-icon://nutrition-activity',
     criticality: #HIGH,
     criticalityRepresentation: #WITHOUT_ICON,
     value: 'Ultra HD Television',
     valueQualifier: '',
     targetElement: '',
     url: ''
   },

   description: {
     type: #STANDARD,
     label: 'Description',
     iconUrl: 'sap-icon://detail-view',
     criticality: #MEDIUM,
     criticalityRepresentation: #WITH_ICON,
     value: '65-inch 4K Smart TV with HDR',
     valueQualifier: '',
     targetElement: '',
     url: ''
   }
}
```


```
@UI.headerInfo: {
  typeName: 'Main typeName',
  typeNamePlural: 'Main typeNamePlural',
  typeImageUrl: 'sap-icon://sales-order',
  title:{
    value: 'ValueHelpId',
    type:#STANDARD
  },
  description:{
    value:'ValueHelpId',
    type:#STANDARD,
    label:'Main entity'
  }
}
  
```
## **typeNamePlural**
![alt text](<PNG/typeNamePlural 2025-09-23 145641.png>)

## **typeName**
![alt text](<PNG/typeName 2025-09-23 150531.png>)

## **typeImageUrl**
![alt text](<PNG/typeImageUrl 2025-09-23 151133.png>)

## **title and description**
![alt text](<PNG/title and description 2025-09-23 151655.png>)

## **imageUrl**
```
@UI.headerInfo: {
    typeName: 'Object Page - Root',
    typeNamePlural: 'Root Entities (#ListTableTitle)', // Search Term #ListTableTitle
    typeImageUrl: 'sap-icon://sales-order',
    imageUrl: 'ImageUrl',
    title: {
        value: 'StringProperty',
        type: #STANDARD
    },
    description: {
        label: 'Root entity',
        type: #STANDARD,
        value: 'StringProperty'
    }
}
```
imageUrl这属性填入表中字段(ImageUrl) ,表中字段ImageUrl的值是图片url

[回到顶部](#)