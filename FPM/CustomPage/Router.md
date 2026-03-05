# Router in FPM

## 定义

```js
this.Router = this.getExtensionAPI().getRouting();
```

## 跳转

menifest.json

```json
    "routing": {
      "config": {},
      "routes": [
        {
          "name": "MenuDetailPage",
          "pattern": "Menu({MenuKey}):?query:",
          "target": "MenuDetailPage"
        }
```

跳转代码

```js
this.Router.navigateToRoute("MenuDetailPage", {
    MenuKey: `FormId='${sFormId}',MenuId='${sMenuId}'`,
    "?query": {
        FiscalYear: qFiscalYear.oValue1,
        FiscalPeriod: qFiscalPeriod.oValue1,
        ConsolidationUnit: qConsolidationUnit.oValue1
    }
})
```

结果会调转到这个路径上

```
http://localhost:8080/test/flp.html?sap-language=KO&sap-ui-xx-viewCache=false#app-preview&/Menu(FormId='ASPN01',MenuId='MENU403')/?FiscalYear=2025&FiscalPeriod=012&ConsolidationUnit=T100
```

## 跳转事件

由于他这个router类是没有事件的，所以只能自己写eventbus，包括路径解析也得手写，以下是示例

```js
        parseSpecialUrl: function () {
            const urlStr = window.location.href;
            const hashIndex = urlStr.indexOf('#');
            const hashContent = urlStr.substring(hashIndex + 1);
            const lastSlashIndex = hashContent.lastIndexOf('/');

            const pathPart = hashContent.substring(0, lastSlashIndex);
            const queryPart = hashContent.substring(lastSlashIndex + 1);

            const menuRegex = /Menu\((.*?)\)/;
            const match = pathPart.match(menuRegex);

            if (match && match[1]) {
                const paramsStr = match[1];
                const paramPairs = paramsStr.split(',');

                paramPairs.forEach(pair => {
                    const [keyRaw, valueRaw] = pair.split('=');
                    if (keyRaw && valueRaw) {
                        const key = keyRaw.trim();
                        const value = valueRaw.trim().replace(/^'|'$/g, '');

                        this.setmodelproperty("filterbar", key, value)
                    }
                });
            }

            if (queryPart.startsWith('?')) {
                const queryString = queryPart.substring(1);
                const fields = queryString.split('&');

                fields.forEach(field => {
                    if (!field) return;

                    const [pathName, valuesStr] = field.split('=');

                    this.setmodelproperty("filterbar", pathName, valuesStr);
                });
            }
        },
```

路由事件上可以这么写

```js
        onAfterRendering() {
            this._eventRouterHandler()
            this.EventBus.subscribe("rout", "detail", this._eventRouterHandler.bind(this))
        },

        _eventRouterHandler: function () {
            this.setmodeldata("filterbar", {
                FormId: "",
                MenuId: "",
                FiscalYear: "",
                FiscalPeriod: "",
                ConsolidationUnit: ""
            })
            this.setmodeldata("tableData", {
                data: []
            })
            const oTable = this.byId("idDetailTable")
            this._Table2DController = new Table2DController(oTable, this.getmodel("tableData"));
            this.parseSpecialUrl()
        },
```

然后在跳转的地方写

```js
            this.Router.navigateToRoute("MenuDetailPage", {
                MenuKey: `FormId='${sFormId}',MenuId='${sMenuId}'`,
                "?query": {
                    FiscalYear: qFiscalYear.oValue1,
                    FiscalPeriod: qFiscalPeriod.oValue1,
                    ConsolidationUnit: qConsolidationUnit.oValue1
                }
            })
            setTimeout(() => {
                this.EventBus.publish("rout", "detail")
            }, 0);
```

可以实现和路由事件差不多的效果
