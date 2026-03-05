# ControllerExtension

ControllerExtension是sap.fe内暴露的扩展接口，可以用来覆盖和扩展原本的行为

有EditFlow，Routing，Share，CollaborativeDraft

## 定义

```json
{
  "sap.ui5": {
    "extends": {
      "extensions": {
        "sap.fe.templates.ListReport.ListReportController#com.aspn.zgd": {
          "controllerName": "com.aspn.zgd.ext.main.Main"
        }
      }
    }
  }
}
//如果是多条则不同
{
    "extends": {
      "extensions": {
        "sap.ui.controllerExtensions": {
          "sap.fe.templates.ListReport.ListReportController#com.aspn.zgd::FormList": {
            "controllerName": "com.aspn.zgd.ext.main.Main"
          },
          "sap.fe.templates.ObjectPage.ObjectPageController#com.aspn.zgd::FormObjectPage": {
            "controllerName": "com.aspn.zgd.ext.main.Object"
          }
        }
      }
    },
}
```

具体语法未探明，后在指定位置生成一个Main.js文件即可，需要继承'sap/ui/core/mvc/ControllerExtension'类

## EditFlow

提供编辑数据相关的流程接口

使用示例 在删除某条数节点数据前做验证是否有子数据如果有就弹窗询问

```js
sap.ui.define([
    'sap/ui/core/mvc/ControllerExtension',
    'sap/m/MessageBox'
], function (
    ControllerExtension,
    MessageBox
) {
    'use strict';

    return ControllerExtension.extend('com.aspn.zgd.ext.main.Main', {
        override: {
            editFlow: {
                onBeforeDelete: async function (oEvent) {
                    const aContexts = oEvent.contexts;
                    const oContext = aContexts[0];
                    const bMenu = await this._is_have_Menu(oContext.oModel, oContext.getPath())

                    if (bMenu) {
                        return new Promise((resolve, reject) => {
                            const fnClose = async function (sAction) {
                                if (sAction === MessageBox.Action.OK) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            }

                            MessageBox.confirm("此页面下有菜单，确定要全部删除吗？", {
                                actions: [
                                    MessageBox.Action.OK,
                                    MessageBox.Action.CANCEL
                                ],
                                onClose: fnClose.bind(this)
                            })
                        })
                    }
                }
            }
        },

        _is_have_Menu: function (oModel, sPath) {
            var oContext = oModel.bindList(sPath + "/_Menu");
            return new Promise((resolve, reject) => {
                oContext.requestContexts(0, 1).then(function (aContexts) {
                    resolve(aContexts.length === 1);
                });
            });
        },

        _get_Path: async function (oModel, sPath) {
            var oContext = oModel.bindList(sPath);
            const fGetODatav4 = (aData = [], iSkip = 0) => {
                return new Promise((resolve, reject) => {
                    oContext.requestContexts(iSkip, 100).then(function (aContexts) {
                        aContexts.forEach(function (oContext) {
                            aData.push(this.removeFormIdParam(oContext.getPath()));
                        });
                        if (aContexts.length === 100) {
                            iSkip += 100;
                            fGetODatav4(aData, iSkip).then(resolve, reject); // 继续请求下一页数据
                        } else {
                            resolve(aData);
                        }
                    });
                });
            };
            return await fGetODatav4();
        },

        removeFormIdParam: function (input) {
            // 匹配第一部分和第二部分
            const firstPartMatch = input.match(/^(.*?)\)(.*)$/);
            if (!firstPartMatch) return input;

            const [_, firstPart, secondPart] = firstPartMatch;

            // 匹配第二部分括号内的参数
            const paramsMatch = secondPart.match(/\((.*)\)/);
            if (!paramsMatch) return input;

            const params = paramsMatch[1];
            const paramList = params.split(',').filter(p => {
                const trimmedParam = p.trim();
                return !trimmedParam.toLowerCase().startsWith('formid=');
            });

            const newParams = paramList.join(',');
            const newSecondPart = secondPart.replace(/\([^)]*\)/, `(${newParams})`);

            return firstPart + ')' + newSecondPart;
        }

    });
});

```
