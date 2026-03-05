# Table

## 定义

```xml
            <macros:Table
                id="idTable"
                selectionMode="Single"
                filterBar="idFilterBar"
                rowCountMode="Auto"
                readOnly="true"
                metaPath="/Menu/@com.sap.vocabularies.UI.v1.LineItem">
            </macros:Table>
```

/Menu是实例名/@com.sap.vocabularies.UI.v1.LineItem固定写法
filterBar="idFilterBar"要写绑定的macros:FilterBar的id绑定后搜索就会自动按条件过滤

## Aggregations

### columns macrosTable:Column

```xml

                <macros:columns>
                    <macrosTable:Column
                        key="RunningTime"
                        header="Running Time"
                        width="7rem"
                        importance="High"
                        horizontalAlign="Begin"
                        placement="After"
                        anchor="DataField::LogendLocal"
                    >
                        <Text text="{= ${Logend} - ${Logstart}}" />
                    </macrosTable:Column>
                    <macrosTable:Column
                        key="RunningTime"
                        header="Running Time"
                        width="7rem"
                        importance="High"
                        horizontalAlign="Begin"
                        placement="After"
                        anchor="DataField::LogendLocal"
                    >
                        <VBox alignItems="Center">
                            <my:Switch 
                                value="{
                                    parts: [
                                        'MenuId',
                                        'FormId'
                                    ],
                                    formatter: '.formatIcon'
                                }">
                                <my:Case value="true">
                                    <core:Icon color="#008000" src="sap-icon://color-fill"/>
                                </my:Case>
                            </my:Switch>
                        </VBox>
                    </macrosTable:Column>
                    <macrosTable:Column
                        header="개별 주석 입력"
                        importance="High"
                        width="10em"
                        key="myColumnKey2"
                    >
                        <VBox alignItems="Center">
                            <my:Switch 
                                value="{
                                    parts: [
                                        'MenuId',
                                        'FormId'
                                    ],
                                    formatter: '.formatButtonVisible'
                                }">
                                <my:Case value="true">
                                    <Button text="입력링크" press="onButtonPress"/> 
                                </my:Case>
                            </my:Switch>
                        </VBox>
                    </macrosTable:Column>
                </macros:columns>
```

### actions macrosTable:Action

```xml
                            <macros:actions>
                                <macrosTable:Action 
                                    xmlns:macrosTable="sap.fe.macros.table"
                                    key="CustomActionDelete"
                                    text="Delete"
                                    press="onDeleteButtonPress"
                                    >
                                </macrosTable:Action>
                            </macros:actions>
```
