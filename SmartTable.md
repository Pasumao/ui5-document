# SmartTable

主要是SmartTable的公式化增删改查写法参考

## 1. 创建SmartTable

```xml
<smartTable:SmartTable id="idSmartTable" 
    entitySet="YBUTIL_DD_FILE" 
    enableAutoBinding="true"
    smartFilterId="idSmartFilterBar" 
    tableType="Table" 
    header="Template Files" 
    initiallyVisibleFields="FileGroup,Fileid,FilenName,FileType"
    class="sapUiResponsiveContentPadding" 
    enableAutoColumnWidth="true" >
    <smartTable:customToolbar>
        <OverflowToolbar design="Transparent">
            <ToolbarSpacer/>
            <Button text="Create" press="onCreateButtonPress"/>
            <Button text="Delete" press="onDeleteButtonPress"/>
            <Button text="Download" press="onDownloadButtonPress"/>
        </OverflowToolbar>
    </smartTable:customToolbar>
    <table:Table id="idTable" rowMode="Auto" rowActionCount="1">
        <table:columns>
            <!-- 如果是表中的字段的自定义显示 -->
            <table:Column >
                <table:customData>
                    <core:CustomData 
                        key="p13nData"
                        value='\{
                            "columnIndex": 10,
                            "columnKey": "FileGroup",
                            "leadingProperty": "FileGroup"
                        }'/>
                </table:customData>
                <Label text="File Group"></Label>
                <table:template>
                    <smartfield:SmartField 
                        editable="{ui>/editMode}"
                        value="{
                            path: 'FileGroup',
                            parameters: {
                                groupId: 'MainChange'
                            }
                        }"/>
                </table:template>
            </table:Column>
            <!-- 如果是表外的字段的自定义显示 -->
            <table:Column >
                <table:customData>
                    <core:CustomData 
                        key="p13nData"
                        value='\{
                            "columnIndex": 50, 
                            "width": "360px"
                        }'/>
                </table:customData>
                <Label text="Upload"></Label>
                <table:template>
                    <unified:FileUploader 
                        buttonOnly="true" 
                        buttonText="Upload" 
                        change="onFileUploaderChange"/>
                </table:template>
            </table:Column>
            <table:Column >
                <table:customData>
                    <core:CustomData 
                        key="p13nData"
                        value='\{
                            "columnIndex": 60, 
                            "width": "360px",
                            "columnKey": "Attachment",
                            "leadingProperty": "Attachment"
                        }'/>
                </table:customData>
                <Label text="Download"></Label>
                <table:template>
                    <Button text="Download" press="onDownloadButtonCellPress" />
                </table:template>
            </table:Column>
        </table:columns>
    </table:Table>
    <smartTable:layoutData>
        <FlexItemData growFactor="1" baseSize="0%"/>
    </smartTable:layoutData>
</smartTable:SmartTable>
```

要注意，如果没有调用对应的列，则oData在读取数据的时候不会读对应字段
字段解释

1. entitySet="YBUTIL_DD_FILE"  表示数据源
2. enableAutoBinding="true" 表示自动绑定
3. smartFilterId="idSmartFilterBar"  表示绑定的SmartFilterBar
4. tableType="Table"  表示表格类型,Table对应sap.ui.table.Table
5. header="Template Files" 表示表格标题
6. initiallyVisibleFields="FileGroup,Fileid,FilenName,FileType" 表示默认显示的字段
7. class="sapUiResponsiveContentPadding"  表示表格的样式
8. enableAutoColumnWidth="true" 表示自动列宽

## 2.Config

以下介绍两个方法

1. setDeferredGroups: 这个方法是用来阻断对应groupId的请求自动发送的，设置了这个的groupId的请求需要你手动发送请求，其中如果不设置特定groupId,则会走"changes"ID

2. setChangeGroups: 如果你有多个表需要分别配置请求，则需要这个方法，输入的键是EntityType，值是{groupId: string,changeSetId:? string,single:? boolean}[文档](https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.model.odata.v2.ODataModel.ChangeGroupDefinition)
注意：这将覆盖现有的变更组定义，包括默认的{“*”：{groupId： “更改”}}.

```js
_onInit() {
    const oModel = this.getmodel();
    oModel.setDeferredGroups(["MainChange", "FTypeChange", "FGroupChange"])
    oModel.setChangeGroups({
        "YBUTIL_DD_FILEType": {
            groupId: "MainChange"
        },
        "YBUTIL_DD_FTYPEType": {
            groupId: "FTypeChange"
        },
        "YBUTIL_DD_FGROUPType": {
            groupId: "FGroupChange"
        }
    })
}
```

## 2.1 manifest.json

设置odata v2 model 需要设置
"defaultOperationMode": "Server",
"defaultBindingMode": "TwoWay",
"defaultCountMode": "Inline"
数据绑定设为双向绑定

```json
{
  "_version": "1.65.0",
  "sap.app": {
    ...
    "dataSources": {
      "OData_MainDataSource": {
        "uri": "/sap/opu/odata/sap/YBUTIL_SB_FILE",
        "type": "OData",
        "settings": {
          "annotations": [
            "localAnnotations"
          ],
          "odataVersion": "2.0"
        }
      }
    }
  },
  "sap.ui5": {
    ...
    "models": {
    ...
      "": {
        "dataSource": "OData_MainDataSource",
        "preload": true,
        "settings": {
          "defaultOperationMode": "Server",
          "defaultBindingMode": "TwoWay",
          "defaultCountMode": "Inline"
        }
      }
    },
```

## 3. Create

创建一行空数据

```js
onCreateButtonPress(oEvent) {
    const oTable = this.byId("idTable");
    const oBinding = oTable.getBinding("rows")
    const newRow = {
    };
    oBinding.create(newRow, {
        groupId: "MainChange" //如果你整个程序只有一个smarttable,或者不需要分步发送请求，则不需要特定groupId
    })

    // 新建行放到最顶部
    setTimeout(function () {
        if (oBinding && oBinding.getLength() > 0) {
            oTable.setFirstVisibleRow(oBinding.getLength() - 1);
        }
    }, 300);

    // 自动列宽，如果没有使用ui5-CustomClass可以跳过
    setTimeout(() => {
        this.__autoWidthTable(this.byId("idTable"))
    }, 200);
},
```

## 4.Delete

删除一行数据,如果context有oContext.oSyncCreatePromise则为临时创建的行

```js
onDeleteButtonPress(oEvent) {
    const oTable = this.byId("idTable");
    this._onDeleteButtonPress(oTable);
},

_onDeleteButtonPress(oTable) {
    const aSelection = oTable.getSelectedIndices();
    const oModel = this.getmodel();
    const MessageBox = sap.m.MessageBox;
    MessageBox.confirm("선택한 " + aSelection.length + "개 데이터를 삭제하시겠습니까?", {
        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
        emphasizedAction: MessageBox.Action.OK,
        onClose: (sAction) => {
            if (sAction === MessageBox.Action.OK) {
                const aCreatedRows = [];
                aSelection.forEach(async (select) => {
                    const oContext = oTable.getContextByIndex(select)
                    if (oContext.oSyncCreatePromise) {
                        //Temporary Row
                        aCreatedRows.push(oContext)
                    } else {
                        const sPath = oContext.getPath();
                        oModel.remove(sPath)
                    }
                })
                aCreatedRows.forEach(context => {
                    context.delete()
                })
            }
        }
    });
},
```

## 5.Save

保存修改和创建，如果没有设置groupId则使用"changes"

```js
onSaveButtonPress() {
    const oTable = this.byId("idTable");
    this._onSaveButtonPress(oTable, "MainChange", ["Fileid"])
},

_onSaveButtonPress(oTable, sGroupId, aKeys) {
    const aSelectedIndices = oTable.getSelectedIndices();

    const MessageBox = sap.m.MessageBox;
    if (aSelectedIndices.length === 0) {
        MessageBox.confirm("선택된 행이 없습니다. 모든 변경사항을 저장하시겠습니까?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.OK,
            onClose: (sAction) => {
                if (sAction === MessageBox.Action.OK) {
                    this._saveAllChanges(oTable, sGroupId, aKeys);
                }
            }
        });
    } else {
        // 선택된 행이 있는 경우
        MessageBox.confirm("선택한 " + aSelectedIndices.length + "개 행만 저장하고 나머지 임시 데이터는 취소됩니다. 계속하시겠습니까?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            emphasizedAction: MessageBox.Action.OK,
            onClose: async (sAction) => {
                if (sAction === MessageBox.Action.OK) {
                    await this._saveSelectedChanges(oTable, sGroupId, aKeys);
                }
            }
        });
    }
},

_saveAllChanges(oTable, sGroupId, aKeys = []) {
    const oModel = this.getmodel();
    const oChange = oModel.getPendingChanges()
    const oBindingInfo = oTable.getBindingInfo("rows");
    const sPath = oBindingInfo.path;
    const sEntity = sPath.split("/")[1];
    const MessageBox = sap.m.MessageBox;

    //检测是否有对应cds实例的修改
    if (!Object.keys(oChange).find((key) => key.includes(sEntity))) {
        return;
    }

    //检测是否有创建行请求中主键未输入（默认odata无法阻挡空字符串为主键，即使你设置了not null）
    if (aKeys.length > 0) {
        for (const value of Object.values(oChange)) {
            if (value.__metadata && value.__metadata.created) {
                if (aKeys.some(key => value[key] === "" || value[key] === undefined)) {
                    return MessageBox.error("생성행 키필드가 입력되지 않았습니다. 확인해 주세요.");
                }
            }
        }
    }

    oModel.submitChanges({
        groupId: sGroupId,
        success: (oData) => {
            if (oData.__batchResponses) {
                var aErrors = [];
                oData.__batchResponses.forEach(function (oBatchResponse) {
                    if (oBatchResponse.response && oBatchResponse.response.statusCode >= 400) {
                        var oError = JSON.parse(oBatchResponse.response.body);
                        aErrors.push(oError);
                    }
                });
            }
            if (aErrors.length > 0) {
                var sErrorMessage = "다음 오류가 발생했습니다:\n\n";
                aErrors.forEach(function (oError, index) {
                    if (oError.error && oError.error.message) {
                        sErrorMessage += (index + 1) + ". " + oError.error.message.value + "\n";
                    } else {
                        sErrorMessage += "Unknown Error\n"
                    }
                });
                MessageBox.error(sErrorMessage, {
                    title: "저장 오류"
                });
            } else {
                sap.m.MessageToast.show("Save Success");
            }
        },
        error: (oError) => {
            sap.m.MessageToast.show("Save Failed:" + oError)
        }
    })

},

async _saveSelectedChanges(oTable, sGroupId, aKeys = []) {
    const oModel = this.getmodel();
    const aSelectedIndices = oTable.getSelectedIndices();
    const aSelectedContexts = [];
    aSelectedIndices.forEach((index) => {
        const oContext = oTable.getContextByIndex(index);
        if (oContext) {
            aSelectedContexts.push(oContext);
        }
    });

    const oChange = oModel.getPendingChanges()
    const oBindingInfo = oTable.getBindingInfo("rows");
    const sPath = oBindingInfo.path;
    const sEntity = sPath.split("/")[1];

    //先取消掉没有选择到的行的修改
    if (Object.keys(oChange).find((key) => key.includes(sEntity))) {
        const oBinding = oBindingInfo.binding;
        const aContext = oBinding.getAllCurrentContexts();
        const aCreatedRows = [];
        const aPath = [];
        aContext.forEach((context) => {
            if (aSelectedContexts.includes(context)) {
                return;
            }
            if (context.oSyncCreatePromise) {
                //Temporary Row
                aCreatedRows.push(context)
            } else {
                aPath.push(context.getPath())
            }
        })
        // reset changes
        await oModel.resetChanges(aPath, false, true)
        //  delete temporary row
        aCreatedRows.forEach(context => {
            context.delete()
        })
    }

    this._saveAllChanges(oTable, sGroupId, aKeys);
},
```

## 6.Cancel

取消当前页面的修改,并且改回不可编辑模式

```javascript
onCancelButtonPress(oEvent) {
    const oTable = this.byId("idTable");
    this._onCancelButtonPress(oTable);
    this.setmodelproperty("ui", "/editMode", false)
},

_onCancelButtonPress(oTable) {
    const oModel = this.getmodel();

    const oChange = oModel.getPendingChanges()
    const oBindingInfo = oTable.getBindingInfo("rows");
    const sPath = oBindingInfo.path;
    const sEntity = sPath.split("/")[1];

    if (Object.keys(oChange).find((key) => key.includes(sEntity))) {
        const oBinding = oBindingInfo.binding;
        const aContext = oBinding.getAllCurrentContexts();
        const aCreatedRows = [];
        const aPath = [];
        aContext.forEach((context) => {
            if (context.oSyncCreatePromise) {
                //Temporary Row
                aCreatedRows.push(context)
            } else {
                aPath.push(context.getPath())
            }
        })
        // reset changes
        aPath.forEach((path) => {
            oModel.resetChanges(path, false, true)
        })
        //  delete temporary row
        aCreatedRows.forEach(context => {
            context.delete()
        })
    }

    setTimeout(() => {
        this.__autoWidthTable(oTable)
    }, 50);
},
```
