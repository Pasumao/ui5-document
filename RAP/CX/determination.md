### **determination DetName on modify/save { CRUD1; CRUD2; ... } | { field Field1, Field2, ... ; }**

### 

* ###### Modify

当我们需要根据触发条件计算几个字段的值并在保存前向用户显示计算值时。在保存之前和保存时，只要满足触发条件，都会触发确定。



* ###### Example:

determination DetName on modify { field layover;create; }



* ###### Save

当我们需要根据触发条件计算几个字段的值并在保存后向用户显示计算值时。这可能包含在 UI 级别隐藏但用于某些内部计算的字段。仅在满足触发条件时才会在保存时触发确定。



* ###### Example:

determination DetName on save { field layover; }







### 括号内部触发条件 Create / Update / Delete / Field



* ###### Create

创建 -> 每当创建实例时，即根据确定级别创建新记录/新行项目时，它都会触发确定。



* ###### Update

更新 -> 每当实例更新时，即更新任何字段值，它都会触发确定。



* ###### Delete

删除 -> 每当删除实例时，即根据确定级别删除记录/行项目时，它都会触发确定。



* ###### Field

字段 -> 每当更新该特定字段（字段）的值时，它都会触发确定。



* ###### Example:

determination DetName on modify { field layover;create; update; }

determination DetName on save { field layover; delete; }

