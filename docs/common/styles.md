---
title: 定制主题
route: /common/styles
sidebar: true
---

# 定制主题

组件库提供了一套统一的样式变量，所有的组件的实现，都使用统一的样式变量。用户可以定制自己的样式变量。

## 直接使用主题变量

只支持按需引入。假如项目中有个 index.js 文件，使用主题变量的内容如下：

```js
import variables from 'beeshell/dist/common/styles/variables';

// 打印品牌主色，默认值为 '#FECB2E'
console.log(varialbes.mtdBrandPrimary);
```

## 自定义主题变量

首先，必须提供一个单独的文件，例如：customTheme.js，文件内容如下：

```js
import { useTheme } from 'beeshell/dist/common/styles/variables'

// 自定义主题变量
const customVariables = {
  mtdBrandPrimary: 'red',
  mtdGrayBase: '#333333',

  buttonBorderRadius: 30
}

// 自定义主题变量与默认主题变量 merge，并返回新的主题变量
const ret = useTheme(customVariables)
export default ret

```

然后，在 index.js 文件中引入使用，内容如下：

```js
import variables from './customTheme';

// 打印值为 'red'
console.log(varialbes.mtdBrandPrimary);
```

详细代码参考 [index 文件](https://github.com/Meituan-Dianping/beeshell/tree/master/examples/index.ts)和 [customTheme 文件](https://github.com/Meituan-Dianping/beeshell/tree/master/examples/customTheme.ts)


## 主题变量范围

支持定制的主题变量如下，这里只列出部分变量，详见 [varialbes 文件](https://github.com/Meituan-Dianping/beeshell/tree/master/src/common/styles/variables.ts)

```js

// 全局品牌色
mtdBrandPrimary: '#FECB2E',
mtdBrandPrimaryDark: '#FFA000',
mtdBrandSuccess: '#1CC678',
mtdBrandWarning: '#FF8C28',
mtdBrandDanger: '#FF5650',
mtdBrandInfo: '#4B88EB'

// 灰度
mtdGrayBase: '#111111',
mtdGrayDarker: '#333333',
mtdGrayDark: '#555555',
mtdGray: '#999999',
mtdGrayLight: '#aaaaaa',
mtdGrayLighter: '#cccccc',
mtdGrayLightest: '#ebebeb'

// 背景色
mtdFillBase: '#ffffff',
mtdFillGray: '#F5F5F5',
mtdFillBody: '#F8F8F8',
mtdFillBackdrop: 'rgba(0, 0, 0, .3)'

// FontSize
mtdFontSizeXS: 10,
mtdFontSizeS: 12,
mtdFontSizeM: 14,
mtdFontSizeL: 16,
mtdFontSizeXL: 18,
mtdFontSizeX2L: 20,
mtdFontSizeX3L: 22,
mtdFontSizeX4L: 24,
mtdFontSizeX5L: 28

// 水平间距
mtdHSpacingS: 4,
mtdHSpacingM: 8,
mtdHSpacingL: 12,
mtdHSpacingXL: 16,
mtdHSpacingX2L: 20,

// 垂直间距
mtdVSpacingXS: 2,
mtdVSpacingS: 4,
mtdVSpacingM: 8,
mtdVSpacingL: 10,
mtdVSpacingXL: 12,
mtdVSpacingX2L: 16,
mtdVSpacingX3L: 18,
mtdVSpacingX4L: 20

// 圆角
mtdRadiusXS: 2,
mtdRadiusS: 4,
mtdRadiusM: 6,
mtdRadiusL: 8

mtdBorderWidth: 1 * px,
mtdBorderColor: '#F5F5F5',
mtdBorderColorDark: '#e5e5e5'

// 默认透明度
mtdOpacity: 0.3

// ......
```
