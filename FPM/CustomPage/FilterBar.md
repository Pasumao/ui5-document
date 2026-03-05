# FilterBar

## 定义

```xml
                <macros:FilterBar xmlns:macros="sap.fe.macros"
                    id="idFilterBar"
                    metaPath="/FilterBar/@com.sap.vocabularies.UI.v1.SelectionFields"
                    core:require="{handler: 'com/aspn/tools/ybcpi0060/ext/filterBarCustom/CustomFilter'}"
                    afterClear="handler.afterClear"
           showClearButton="true"
                >
                </macros:FilterBar>
```

/FilterBar是实例名，后面/@com.sap.vocabularies.UI.v1.SelectionFields"是固定写法

afterClear事件，如果你有自定义的filter，那么可以用afterClear来清除这些自定义控件的值

## 常用方法

### setFilterValues

```js
oFilterBar.setFilterValues("FiscalPeriod", "EQ", oGlobalParam.FiscalPeriod)
```

直接设定某个字段的值

### getFilters

```js
const filters = oFilterBar.getFilters().filters[0].aFilters
```

### 触发搜索

```js
const oFilterBar = this.byId("idFilterBar");
oFilterBar.content._btnSearch.firePress();
```

获取所有的filter的实例

## Aggregations

### filterFields

#### 定义

可以用macros:FilterField也可以用filterBar:FilterField没有区别，macros:FilterField可以不用写label

```xml
                        <filterBar:FilterField xmlns:filterBar="sap.ui.comp.filterbar"
                            key="Id" 
                            label="Id">
                            <Input
                                value="{
                                    path: 'filterValues>',
                                    type: 'sap.fe.macros.filter.type.Value',
                                    formatOptions: { operator: 'com.aspn.tools.ybcpi0060.ext.CunstomFilter.CustomFilter.fnIdFormat' }
                                }"
                                showValueHelp="true"
                                showClearIcon="true"
                                valueHelpRequest="onMultiInputValueHelpRequest"
                                data:valuehelp='{
                                    key: "Id",
                                    title: "ID",
                                    supportRanges: true,
                                    select_one: true,
                                    table: {
                                        modelName: "VH",
                                        modelPath: "/Id",
                                        columns: [ 
                                            {text: "Id",key: "Id",width:"8rem"}
                                        ]
                                    }
                                }'/>
                        </filterBar:FilterField>
```

这里和普通filterfield一样，只不过在value里需要添加type和formatOptions
这里type有MultiValue，Value，Range

- Value
包括Input,ComboBox,DateTimePicker的使用用例

```js
sap.ui.define([
    "sap/ui/model/Filter"
], function (
    Filter
) {
    "use strict";
    function parseDateTime(input) {
        // 1. 按空格分割为日期部分和时间部分
        const [datePart, timePart] = input.split(' ');

        // 2. 处理日期部分
        const year = datePart.slice(0, 4); // 提取前四位为年份
        const remaining = datePart.slice(4); // 剩余部分处理月和日

        // 分割月和日（处理可能的分隔符）
        let month, day;
        const parts = remaining.split(/[^0-9]+/); // 用非数字字符分割
        if (parts.length >= 2) {
            month = parts[1];
            day = parts[2];
        } else {
            // 如果没有分隔符，按连续数字分割
            month = remaining.slice(0, 2);
            day = remaining.slice(2);
        }

        // 3. 处理时间部分
        const [hours, minutes, seconds] = timePart.split(':');

        // 返回结果对象
        return {
            year,
            month,
            day,
            hours,
            minutes,
            seconds
        };
    }

    function formatDateTime(date) {
        const month = date.month.padStart(2, "0"); // 月份从0开始，需加1
        const day = date.day.padStart(2, "0");

        return `${date.year}-${month}-${day}T${date.hours}:${date.minutes}:${date.seconds}.000Z`;
    }

    return {
        onDateTimePickerChangege(sValue) {
            var date = parseDateTime(sValue);
            return new Filter({ path: "LogstartLocal", operator: "GE", value1: formatDateTime(date) })
        },

        onDateTimePickerChangele(sValue) {
            var date = parseDateTime(sValue);
            return new Filter({ path: "LogstartLocal", operator: "LE", value1: formatDateTime(date) })
        },

        onDateTimePickerChangeege(sValue) {
            var date = parseDateTime(sValue);
            return new Filter({ path: "LogendLocal", operator: "GE", value1: formatDateTime(date) })
        },

        onDateTimePickerChangeele(sValue) {
            var date = parseDateTime(sValue);
            return new Filter({ path: "LogendLocal", operator: "LE", value1: formatDateTime(date) })
        },

        fnStatusFormat: function (sValue) {
            return new Filter({ path: "Customstatus", operator: "EQ", value1: sValue })
        },

        fnIdFormat: function (values) {
            return new Filter({ path: "Id", operator: "EQ", value1: values })
        },

    };
});
```

· 如果要使用range需要使用sap.m.RangeSlider控件而且不用写formatOptions改用change事件

```js
sap.ui.define(["sap/ui/model/FilterOperator", "sap/m/MessageBox"], function (FilterOperator, MessageBox) {
 "use strict";

 return {
  onRangeChanged: async function (oEvent) {
   var oRange_0 = oEvent.getParameter("range")[0];
   var oRange_1 = oEvent.getParameter("range")[1];
   var filterBar = this.byId("FilterBar");
   const selectionVariant = await filterBar.getSelectionVariant();
   if (!selectionVariant?.getSelectOption("CurrencyCode_code")) {
    MessageBox.warning("Please enter value for Currency", {
     title: "Warning",
     actions: [MessageBox.Action.OK],
     emphasizedAction: MessageBox.Action.OK
    });
   } else {
    filterBar.setFilterValues("TotalPrice", FilterOperator.BT, [oRange_0, oRange_1]);
   }
  },
    }
```
