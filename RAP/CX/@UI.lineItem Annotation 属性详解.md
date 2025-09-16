### **2-1，@UI.lineItem Annotation 属性详解**

@UI.lineItem 是 SAP BTP RAP 开发中用于定义列表页(line item table)中列的显示属性和行为的注解。以下是各个属性的详细说明：



#### **a，基本显示属性**

qualifier: 限定符，用于区分同名字段



position: 列在表格中的位置(数字，决定显示顺序)



actionGroupId: 关联的操作组ID



exclude: true/false - 是否从列表中排除此列



hidden: true/false - 是否隐藏此列(用户可通过个性化设置显示)



inline: true/false - 是否内联显示(通常用于紧凑布局)



determining: true/false - 是否为决定性字段(影响其他字段显示)



importance: #HIGH/#MEDIUM/#LOW - 列的重要性级别



emphasized: true/false - 是否强调显示(通常加粗或高亮)



rowSpanForDuplicateValues: true/false - 相同值是否合并单元格显示



isPartOfPreview: true/false - 是否包含在预览中



#### **b，样式控制**

cssDefault: 默认CSS样式



width: 列宽度(如'100px'或'10rem')



#### **c，列类型与内容**

type: 列类型，常用值：



\#STANDARD - 标准列



\#WITH\_URL - 带链接的列



\#WITH\_INTENT - 带意图的列



\#FOR\_ACTION - 操作列



\#FOR\_INTENT\_BASED\_NAVIGATION - 基于意图导航的列



label: 列标题文本



iconUrl: 列标题旁显示的图标URL(如'sap-icon://alert')



criticality: 关键性指示：



\#CRITICAL/#ERROR - 错误/关键



\#WARNING - 警告



\#SUCCESS - 成功



\#INFORMATION - 信息



\#NONE - 无



criticalityRepresentation: 关键性表示方式：



\#WITH\_ICON - 带图标



\#WITHOUT\_ICON - 仅颜色



\#WITH\_TEXT - 带文本



#### **d，行为与交互**

dataAction: 关联的数据操作ID



isCopyAction: true/false - 是否为复制操作



navigationAvailable: true/false - 是否可用导航



requiresContext: true/false - 是否需要上下文



invocationGrouping: 调用分组方式：



\#ISOLATED - 独立



\#GROUPED - 分组



#### **e，语义对象与导航**

semanticObject: 语义对象名称(用于导航)



semanticObjectAction: 语义对象动作



semanticObjectBinding: 语义对象绑定配置



localParameter: 本地参数名



localElement: 本地元素名



element: 元素名



#### **f，值显示**

value: 显示的字段值



valueQualifier: 值限定符(如货币单位)



targetElement: 目标元素(用于导航)



url: 链接URL(当type为#WITH\_URL时使用)



#### **实际应用示例**

@UI.lineItem: \[{

&nbsp; position: 10,

&nbsp; label: 'Order ID',

&nbsp; type: #STANDARD,

&nbsp; emphasized: true,

&nbsp; importance: #HIGH,

&nbsp; width: '100px'

}, {

&nbsp; position: 20,

&nbsp; label: 'Customer',

&nbsp; type: #WITH\_URL,

&nbsp; url: '/Customer/{CustomerID}',

&nbsp; criticality: #INFORMATION,

&nbsp; criticalityRepresentation: #WITH\_ICON

}, {

&nbsp; position: 30,

&nbsp; label: 'Status',

&nbsp; type: #STANDARD,

&nbsp; criticality: {

&nbsp;   path: 'OverallStatus',

&nbsp;   criticalityRepresentation: #WITH\_ICON,

&nbsp;   values: {

&nbsp;     'C': #CRITICAL,

&nbsp;     'P': #WARNING,

&nbsp;     'D': #SUCCESS

&nbsp;   }

&nbsp; }

}]



