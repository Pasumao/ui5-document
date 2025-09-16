### **3-1，@UI.selectionField Annotation 基本属性详解**

@UI.selectionField 是 SAP BTP RAP (Restful ABAP Programming) 开发中用于定义选择字段（筛选条件字段）的注解。以下是各个属性的详细说明：



#### **a，属性说明**

qualifier (可选)



类型: String



用途: 限定符，用于区分同名字段



示例: qualifier: 'CustomerFilter'



position (可选但推荐)



类型: Integer



用途: 定义选择字段在筛选栏中的显示位置（数字越小位置越靠前）



示例: position: 10



exclude (可选)



类型: Boolean



用途: 是否从筛选条件中排除此字段（true表示排除）



默认值: false



示例: exclude: true



element (可选但推荐)



类型: String



用途: 指定要作为筛选条件的CDS视图元素/字段名



示例: element: 'CustomerID'



#### **b，完整示例**

@UI.selectionField: \[{

&nbsp; position: 10,

&nbsp; element: 'SalesOrderID',

&nbsp; qualifier: 'OrderFilter'

}, {

&nbsp; position: 20,

&nbsp; element: 'CustomerName'

}, {

&nbsp; position: 30,

&nbsp; element: 'OrderDate',

&nbsp; exclude: false

}, {

&nbsp; position: 40,

&nbsp; element: 'DeliveryStatus',

&nbsp; qualifier: 'StatusFilter'

}]

