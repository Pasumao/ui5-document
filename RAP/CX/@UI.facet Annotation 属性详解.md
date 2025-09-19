### **4-1，@UI.facet Annotation 属性详解**

@UI.facet 是 SAP BTP RAP (Restful ABAP Programming) 开发中用于定义对象页面中 facet（分面/区域）的注解。以下是各个属性的详细说明：

#### 

#### **a，基本属性**

qualifier: 限定符，用于区分同类型的facet



feature: 关联的功能特性



id: facet的唯一标识符



purpose: facet的用途，常用值：



\#STANDARD - 标准facet



\#HEADER - 头部区域



\#DEFAULT - 默认facet



b，布局与可见性控制

parentId: 父facet的ID（用于嵌套结构）



position: facet在页面中的位置（数字决定显示顺序）



exclude: true/false - 是否从页面中排除此facet



hidden: true/false - 是否隐藏此facet（用户可通过个性化设置显示）



isPartOfPreview: true/false - 是否包含在预览中



isSummary: true/false - 是否为摘要facet



isMap: true/false - 是否为地图facet



#### **c，内容与显示**

importance: facet的重要性级别：



\#HIGH - 高重要性



\#MEDIUM - 中等重要性



\#LOW - 低重要性



label: facet的标题文本



type: facet的类型，常用值：



\#FIELDGROUP - 字段组



\#CHART - 图表



\#TABLE - 表格



\#LINEITEM - 行项目



\#IDENTIFICATION - 标识区域



#### **d，导航与交互**

targetElement: 目标元素（用于导航）



targetQualifier: 目标限定符



url: 关联的URL链接

#### 

#### **e，实际应用示例**

e-1. 标准字段组facet
```
@UI.facet: [{
   id: 'GeneralInfo',
   type: #FIELDGROUP,
   label: 'General Information',
   position: 10,
   purpose: #STANDARD
}]
```
e-2. 表格行项目facet
```
@UI.facet: [{
   id: 'OrderItems',
   type: #LINEITEM,
   label: 'Order Items',
   position: 20,
   targetElement: 'ItemsTable'
}]
```
e-3. 图表facet
```
@UI.facet: [{
   id: 'SalesChart',
   type: #CHART,
   label: 'Sales Performance',
   position: 30,
   purpose: #STANDARD
}]
```
e-4. 嵌套facet结构
```
@UI.facet: [{
   id: 'MainSection',
   label: 'Main Section',
   position: 10,
   type: #FIELDGROUP
}, {
   id: 'SubSection',
   label: 'Details',
   position: 20,
   parentId: 'MainSection',
   type: #FIELDGROUP
}]
```
e-5. 带重要性的facet
```
@UI.facet: [{
   id: 'CriticalInfo',
   label: 'Critical Information',
   position: 5,
   importance: #HIGH,
   type: #FIELDGROUP
}]
```
