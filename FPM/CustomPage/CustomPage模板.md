# CustomPage简单模板

```xml
<mvc:View 
    xmlns:core="sap.ui.core" 
    xmlns:mvc="sap.ui.core.mvc" 
    xmlns="sap.m" 
    xmlns:f="sap.f" 
    xmlns:macrosTable="sap.fe.macros.table"
    xmlns:macros="sap.fe.macros"
    xmlns:my="gd00301.ext.CC.Control.xml"
    controllerName="gd00301.ext.main.Main">
    <f:DynamicPage id="idMainDynamicPage" title="{i18n>MainTitle}">
        <f:title>
            <f:DynamicPageTitle>
                <f:heading>
                    <Title text="Message Log"/>
                </f:heading>
            </f:DynamicPageTitle>
        </f:title>
        <f:header>
            <f:DynamicPageHeader>
                <macros:FilterBar
                    id="idFilterBar"
                    metaPath="/FilterBar/@com.sap.vocabularies.UI.v1.SelectionFields"
                >
                </macros:FilterBar>
            </f:DynamicPageHeader>
        </f:header>
        <f:content>
            <macros:Table
                id="idTable"
                filterBar="idFilterBar"
                rowCountMode="Auto"
                metaPath="/Menu/@com.sap.vocabularies.UI.v1.LineItem">
                <macros:columns>
                    <macrosTable:Column
                        header="주석입력 상태"
                        importance="High"
                        width="10em"
                        key="myColumnKey1"
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
                </macros:columns>
            </macros:Table>
        </f:content>
    </f:DynamicPage>
</mvc:View>
```
