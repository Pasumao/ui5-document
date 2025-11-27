# ABAP CDS 注解

本文档对 ABAP CDS 注解进行了分类和说明。这些注解由 ABAP 运行时环境或特定框架进行评估。

## ABAP 运行时注解

这些注解由 ABAP 运行时环境进行评估。

### AbapCatalog 注解

与 ABAP 目录（字典）相关的设置。

- `AbapCatalog.sqlViewName`
  - **用途**: 为 CDS 视图定义数据库视图的名称。
  - **值**: 任何 16 个字符的值（自定义对象通常以 Z 开头）。
  - **注意**: 仅对 CDS 视图是必需的。

- `AbapCatalog.sqlViewAppendName`
  - **用途**: 为 CDS 视图扩展定义追加视图的名称。
  - **值**: 任何 16 个字符的值（自定义对象通常以 Z 开头）。
  - **注意**: 当 CDS 视图被扩展时需要。

- `AbapCatalog.viewEnhancementCategory[ ]`
  - **用途**: 指定 CDS 视图如何通过 CDS 视图扩展进行增强。
  - **值**:
    - `#GROUP_BY`
    - `#NONE`
    - `#PROJECTION_LIST`
    - `#UNION`

### AccessControl 注解

访问控制相关的设置。

- `AccessControl.authorizationCheck`
  - **用途**: 指定隐式访问控制行为。
  - **值**:
    - `#CHECK`
    - `#MANDATORY`
    - `#NOT_ALLOWED`
    - `#NOT_REQUIRED`
    - `#PRIVILEGED_ONLY`
  - **默认值**: `#NOT_REQUIRED`
  - **注意**: 对于测试 RAP 服务，建议使用默认值 `#NOT_REQUIRED`。

### ClientHandling 注解

客户端处理相关的设置。

- `ClientHandling.type`
  - **用途**: 指定客户端依赖性。
  - **值**:
    - `#CLIENT_DEPENDENT`
    - `#CLIENT_INDEPENDENT`
    - `#INHERITED`
  - **默认值**: `#INHERITED`
  - **注意**: 这不是强制性的，但可用于基于 DDIC 的视图和表函数。

### EndUserText 注解

最终用户文本相关的设置。

- `EndUserText.label`
  - **用途**: 提供短文本（标签）。
  - **注意**: 标签通常自动来自数据元素，但对于使用基本类型的情况，此注解非常有用。

- `EndUserText.quickInfo`
  - **用途**: 提供工具提示信息。

### Environment 注解

环境相关的设置，特别是系统字段。

- `Environment.systemField`
  - **用途**: 分配一个 ABAP 系统字段。
  - **值**:
    - `#CLIENT`
    - `#SYSTEM_DATE`
    - `#SYSTEM_LANGUAGE`
    - `#SYSTEM_TIME`
    - `#USER`
    - `#USER_DATE`
    - `#USER_TIMEZONE`
  - **注意**: 这些字段可用于为参数或列表分配默认的系统变量值。

### MappingRole 注解

映射角色相关的设置。

- `MappingRole`
  - **用途**: 指定将 CDS 角色分配给用户。
  - **默认值**: `true`
  - **注意**: 对于测试服务或学习目的，可以忽略此注解。

### Metadata 注解

元数据相关的设置。

- `Metadata.allowExtensions`
  - **用途**: 指定是否允许使用元数据扩展进行增强。
  - **默认值**: `true`

- `Metadata.ignorePropagatedAnnotations`
  - **用途**: 指定如何评估传播的注解。
  - **默认值**: `true`

- `Metadata.layer`
  - **用途**: 指定 CDS 元数据扩展中的层。
  - **值**:
    - `#CORE`
    - `#CUSTOMER`
    - `#INDUSTRY`
    - `#LOCALIZATION`
    - `#PARTNER`
  - **注意**: 通常使用值 `#CUSTOMER`。

---

## 框架特定注解

这些注解暴露给 OData 服务或在特定框架（如 Fiori）中使用。

### AccessControl 注解 (框架特定)

定义 CDS 实体的授权检查执行方式。

- `AccessControl.authorizationCheck`
  - **用途**: 定义授权检查的行为。
  - **值**:
    - `#NOT_REQUIRED`: 运行时，如果存在 DCL 角色则执行授权检查。开发时，激活实体不会产生警告。
    - `#NOT_ALLOWED`: 运行时，不执行授权检查。开发时，如果开发人员激活实体且该实体存在 DCL 角色，则会产生警告。
    - `#CHECK`: 运行时，如果存在 DCL 角色则执行授权检查。开发时，如果开发人员激活实体且该实体不存在 DCL 角色，则会产生警告。**这是默认值。**

### Consumption 注解

定义通过特定领域框架消费 CDS 内容时的特定行为。

#### 过滤器

- `Consumption.filter.defaultValue`: 为视图元素的过滤器指定默认值。
- `Consumption.filter.defaultValueHigh`: 与 `defaultValue` 结合使用，为视图元素的过滤器指定默认间隔。
- `Consumption.filter.hidden`: 指定过滤器是否隐藏。
- `Consumption.filter.mandatory`: 强制用户输入值（即使存在默认值）。
- `Consumption.filter.multipleSelections`: 允许在过滤器输入中输入多个值。
- `Consumption.filter.selectionType`: 定义值的输入方式。
  - **可能值**: `#SINGLE`, `#INTERVAL`, `#RANGE`, `#HIERARCHY_NODE`

#### 元素 / 属性

- `Consumption.hidden`: 防止字段通过 OData 暴露。
- `Consumption.defaultValue`: 为通过 UI 消费的动作导入参数定义默认值。
- `Consumption.semanticObject`: 用于跨应用程序的互操作性。必须指定在 Fiori Launchpad 中定义的语义对象。
  - **注意**: SAP Fiori 引入了基于意图导航的概念，其中意图是 `<semanticObject> <action>` 的组合。此注解在 SAP Fiori UI 中用于动态派生出注解视图作为源的导航目标。

#### 值帮助
- [Consumption.valueHelpDefinition](@Consumption.valueHelpDefinition属性详解.md)
- `Consumption.valueHelpDefinition.distinctValues`: 指定值帮助结果列表是否只包含不同的值。
- `Consumption.valueHelpDefinition.entity[element, name]`
  - `name`: 指定包含提供值帮助的元素的实体。
  - `element`: 在 `name` 引用的实体中，提供值帮助的元素。
- `Consumption.valueHelpDefinition.label`: 包含用于标记值列表的依赖于语言的文本。
- `Consumption.valueHelpDefinition.useForValidation`: 标记应用于验证用户输入的值帮助。
- `Consumption.ranked`: 此注解使值帮助视图中的搜索结果能够按搜索分数自动排序。

### ObjectModel 注解

对象模型相关的设置。

- `ObjectModel.filter.enabled`: 根据 `true` 或 `false` 值将实体元素设置为可过滤或不可过滤。
- `ObjectModel.sort.enabled`: 根据 `true` 或 `false` 值将实体元素设置为可排序或不可排序。
- `ObjectModel.text.association`: 定义提供文本描述的关联视图。
- `ObjectModel.text.element[ ]`: 将字段与其描述性的、与语言无关的文本连接起来。
- `ObjectModel.usageType.sizeCategory`: 用于支持 HANA 内的资源消耗。
  - **值**:
    - `S`: 预期行数 < 1,000
    - `M`: 预期行数在 1,000 到 99,999 之间
    - `L`: 预期行数在 100,000 到 9,999,999 之间
    - `XL`: 预期行数在 10,000,000 到 99,999,999 之间
    - `XXL`: 预期行数 >= 100,000,000
- `ObjectModel.query.implementedBy`: 引用非托管查询的查询实现类。
- `ObjectModel.virtualElementCalculatedBy`: 引用已注解虚拟元素的计算类。

### OData 注解

定义 OData 特定属性。

- `OData.action`: 表示动作的外部名称。
- `OData.entitySet.name`: 表示实体集的外部名称。
- `OData.entityType.name`: 表示实体类型的外部名称。
- `OData.etag`: 在行为定义中声明 ETag。
  - **注意**: 根据 SAP 文档，**不应使用此注解**。

### Search 注解

搜索相关的设置。

- `Search.searchable`: 定义 CDS 实体是否通常与搜索场景相关。
  - **值**: 布尔值（`true`, `false`）
- `Search.defaultSearchElement`: 指定在未指定列的自由风格搜索中应考虑该元素。
  - **值**: 布尔值（`true`, `false`）
- `Search.ranking`: 指定元素的值对排名的重要性。
  - **值**:
    - `HIGH`: 元素具有高相关性
    - `MEDIUM`: 元素具有中等相关性
    - `LOW`: 虽然元素与自由风格搜索相关，但在此元素中的命中对排名没有真正意义
- `Search.fuzzinessThreshold`: 指定最低模糊度级别。
  - **值格式**: Decimal (3,2)，值在 0 到 1 之间（例如 0.8）。
  - **注意**: 0.7 到 0.99 之间的值最有用。1 表示精确匹配。

### Semantics 注解

[Semantics注解](@Semantics.md)由核心引擎用于数据处理和数据消费。

#### 地址

- `Semantics.address.type [ ]`: 地址类型。
  - **值**: `#HOME` (家庭地址), `#WORK` (工作地址), `#PREF` (首选地址，默认), `OTHER` (其他地址)
- `Semantics.address.city`, `Semantics.address.country`, `Semantics.address.number`, `Semantics.address.postBox`, `Semantics.address.region`, `Semantics.address.zipCode`: 这些注解表示字段是地址的一部分，含义与注解名称一致。

#### 金额与单位

- `Semantics.amount.currencyCode`: 指定投影列表中的货币代码字段。
- `Semantics.currencyCode`: 指定该字段是货币。
- `Semantics.quantity.unitOfMeasure`: 指定投影列表中的计量单位字段。
- `Semantics.unitOfMeasure`: 指定该字段是计量单位。

#### 日历与日期时间

- `Semantics.calendar.dayOfMonth`, `Semantics.calendar.dayOfYear`, `Semantics.calendar.halfyear`, `Semantics.calendar.month`, `Semantics.calendar.quarter`, `Semantics.calendar.week`, `Semantics.calendar.year`: 注解字段的值据此进行编码。
- `Semantics.dateTime`: 标记包含日期时间值的字段。
- `Semantics.language`: 标识语言字段。

#### 系统与用户信息

- `Semantics.systemDateTime.createdAt`, `Semantics.systemDateTime.lastChangedAt`, `Semantics.systemDateTime.LocalInstanceLastChangedAt`, `Semantics.user.createdBy`, `Semantics.user.lastChangedBy`: 这些可用于注解实体内的变更日志和 ETag 字段。

### UI 注解

用于定义 Fiori UI 的行为和布局。**（注解数量过多，无法全部涵盖，请参阅 SAP 文档以获取完整列表）**

- [`UI.selectionField`](<@UI.selectionField Annotation 基本属性详解.md>): 允许过滤。
  - `UI.selectionField.position`: 指定选择字段的顺序。
- [`UI.lineItem`](<@UI.lineItem/@UI.lineItem Annotation 属性详解.md>): 表示列表或表格上有序的数据字段集合。
  - `UI.lineItem.position`: 指定顺序。
  - `UI.lineItem.importance`: `HIGH`, `MEDIUM`, `LOW`。
    - **注意**: 需要始终显示的列获得 `HIGH` 重要性，即使在较小屏幕上渲染应用程序时也会显示。
  - `UI.lineItem.label`: 包含依赖于语言的文本。
- [`UI.identification`](<@UI.lineItem/@UI.lineItem Annotation 属性详解.md>): 表示对象页面上特定数据字段的有序集合。
  - `UI.identification.position`, `UI.identification.importance`, `UI.identification.label` 与 `UI.lineItem` 类似，但作用于对象页面而不是列表。
- [`UI.facet`](<@UI.facet/@UI.facet Annotation 属性详解.md>): 设置部分在 UI 上的显示方式。
  - `id`: Facet 的标识符。
  - `purpose`: 指定 Facet 的用途。
    - **可能值**: `STANDARD`, `HEADER`, `QUICK_VIEW`, `QUICK_CREATE`, `FILTER` (默认: `STANDARD`)。
  - `parentId`: 标识父 Facet。
    - **注意**: `purpose` 和 `parentId` 不能同时为一个 Facet 指定。
  - `type`: 指定 Facet 的具体类型。
    - **可能值**: `COLLECTION`, `ADDRESS_REFERENCE`, `BADGE_REFERENCE`, `CHART_REFERENCE`, `CONTACT_REFERENCE`, `DATAPOINT_REFERENCE`, `HEADERINFO_REFERENCE`, `IDENTIFICATION_REFERENCE`, `LINEITEM_REFERENCE`, `STATUSINFO_REFERENCE`, `URL_REFERENCE`。

### Aggregation 注解

使用此注解指定元素的聚合行为。没有默认聚合或 `Aggregation.default: #NONE` 的元素将不会被聚合，并将在 GROUP BY 中使用。

- `Aggregation.default`
  - **用途**: 定义默认聚合行为。
  - **注意**: 仅允许在 `dataCategory` 为 `#CUBE`, `#FACT`, `#DIMENSION` 的视图中使用。
  - **默认值**: `#NONE`
- `Aggregation.exception`
  - **用途**: 异常聚合总是在默认聚合（不能等于 `#NONE`）之外执行。这意味着数据首先通过默认聚合按参考元素分组，然后通过异常聚合进行聚合。

---
