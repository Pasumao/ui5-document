# ES6 to AMD(SAPUI5)

本篇讲介绍如何将ES6的js，ts代码转换成sapui5可用的AMD格式的代码。

[参考](https://blog.csdn.net/i042416/article/details/122620409)

# 1. 安装依赖包

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev @babel/preset-typescript babel-preset-transform-ui5
```

# 2. 在根目录创建一个配置文件

在 ui5 项目根目录新建一个文件 .babelrc.json，这个文件告诉 babel 需要具体执行的任务

```json
{
    "ignore": [
        "**/*.d.ts"
    ],
    "presets": [
        "transform-ui5",
        "@babel/preset-typescript"
    ]
}

```

# 3. 运行命令

如果没有效果，请在powershell试一下

```bash
npx babel webapp/controller/ANTLR4 --out-dir webapp/controller/ANTLR4_ui5 --extensions “.ts,.js”
```

webapp/controller/ANTLR4 是要编译的代码的文件夹路径
webapp/controller/ANTLR4_ui5 是编译后的代码存放的文件夹路径
