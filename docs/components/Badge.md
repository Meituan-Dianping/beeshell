---
name: Badge
title: 徽章
route: /components/Badge
sidebar: true
---


# Badge

徽章组件。

## Usage

### 全部引入
```js
import { Badge } from '@roo/roo-mobile-rn';
```

### 按需引入
```js
import { Badge } from '@roo/roo-mobile-rn/dist/components/Badge';
```

## Examples

![image](../images/Badge/1.gif)

## Code
[详细 Code](https://github.com/Meituan-Dianping/beeshell/tree/master/examples/Badge/index.tsx)

```jsx
<Badge label='99+'/>
<Badge />
```

## API

### Props
| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | {} | 样式 |
| label | string/number | false | null | 展示的文案 |
| labelStyle | TextStyle | false | {} | 文案样式 |
