# `eslint-config-sealui`

> SealUI ESLint 规则适用于 React/Vue/Typescript 项目的 ESLint 配置规范，而且也是你配置个性化 ESLint 规则的参考。

## 使用方法

### 内置规则
```
npm install --save-dev eslint babel-eslint @sealui/eslint-config-sealui
```
在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：
```js
module.exports = {
  extends: [
    'sealui',
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  }
};
```

### Vue
```
npm install --save-dev eslint babel-eslint vue-eslint-parser eslint-plugin-vue eslint-config-sealui
```
在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  extends: [
    'sealui',
    'sealui/vue',
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  }
};
```
### TypeScript
```
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-sealui
```
在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
  extends: [
    'sealui',
    'sealui/typescript',
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
  }
};
```
## VSCode 中的 autoFixOnSave 没有效果
如果需要针对 `.vue、.ts` 和 `.tsx` 文件开启 `ESLint` 的 `autoFix`，则需要配置成：

```json
{
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "vue",
        "autoFix": true
    },
    {
        "language": "typescript",
        "autoFix": true
    },
    {
        "language": "typescriptreact",
        "autoFix": true
    }
  ]
}
```

## 如何结合 Prettier 使用
下面给出一个 `.prettierrc.js` 配置，仅供参考：

```js
// .prettierrc.js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 4 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
};
```
