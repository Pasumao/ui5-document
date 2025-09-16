### **1-1，headerInfo Annotation 属性说明**

@UI.headerInfo 是 SAP Business Technology Platform (BTP) RAP (Restful ABAP Programming) 开发中用于定义对象页面头部信息的注解。以下是各个属性的含义：



a，顶级属性

typeName: 对象类型的单数名称（如"Product"）



typeNamePlural: 对象类型的复数名称（如"Products"）



typeImageUrl: 对象类型的图标URL



imageUrl: 对象特定实例的图片URL



b，title 对象 (标题部分)

type: 标题类型，通常为 #STANDARD



label: 标题的标签文本



iconUrl: 标题旁显示的图标URL



criticality: 关键性指示（如高/中/低重要性）



criticalityRepresentation: 关键性表示方式，#WITHOUT\_ICON 表示不显示图标



value: 标题的实际值



valueQualifier: 值的限定符（如货币单位等）



targetElement: 目标元素（用于导航等）



url: 相关URL链接



c，description 对象 (描述部分)

描述部分的属性与title部分完全相同，用于定义对象页面的描述信息：



type: 描述类型，通常为 #STANDARD



label: 描述的标签文本



iconUrl: 描述旁显示的图标URL



criticality: 关键性指示



criticalityRepresentation: 关键性表示方式



value: 描述的实际内容



valueQualifier: 值的限定符



targetElement: 目标元素



url: 相关URL链接



实例

@UI.headerInfo: {

&nbsp; typeName: 'Product',

&nbsp; typeNamePlural: 'Products',

&nbsp; typeImageUrl: 'sap-icon://product',

&nbsp; imageUrl: 'https://example.com/images/prod\_123.jpg',

&nbsp; 

&nbsp; title: {

&nbsp;   type: #STANDARD,

&nbsp;   label: 'Product Name',

&nbsp;   iconUrl: 'sap-icon://nutrition-activity',

&nbsp;   criticality: #HIGH,

&nbsp;   criticalityRepresentation: #WITHOUT\_ICON,

&nbsp;   value: 'Ultra HD Television',

&nbsp;   valueQualifier: '',

&nbsp;   targetElement: '',

&nbsp;   url: ''

&nbsp; },

&nbsp; 

&nbsp; description: {

&nbsp;   type: #STANDARD,

&nbsp;   label: 'Description',

&nbsp;   iconUrl: 'sap-icon://detail-view',

&nbsp;   criticality: #MEDIUM,

&nbsp;   criticalityRepresentation: #WITH\_ICON,

&nbsp;   value: '65-inch 4K Smart TV with HDR',

&nbsp;   valueQualifier: '',

&nbsp;   targetElement: '',

&nbsp;   url: ''

&nbsp; }

}

