---
name: Rate
title: 评分
route: /components/Rate
sidebar: true
---

# Rate

评分组件。实现一套滑动评分的机制，支持定制任意图标。

## Usage

### 全部引入
```js
import { Rate } from '@roo/roo-mobile-rn';
```

### 按需引入
```js
import Rate from '@roo/roo-mobile-rn/dist/components/Rate';
```

## Examples
![image](../images/Rate/1.gif)

## Code
[详细 Code](https://github.com/Meituan-Dianping/beeshell/tree/master/examples/Rate/index.tsx)

```jsx
import { Rate } from '@roo/roo-mobile-rn'

<Rate
  total={3}
  value={1}
  iconSize={20}
  iconSpace={80}
  enableHalf={true}
  onChange={(value) => {
    console.log(value)
  }}
/>
```
## API

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | {} | 自定义样式 |
| value | number | false | 0 | 分数 |
| total | number | false | 5 | 总分数 |
| icons | object | false | {} | 图标元素集合 { empty: ReactElement, full: ReactElement, half?: ReactElement }  |
| iconSize | number| true | 20 | 图标的尺寸 |
| iconSpace | number| true | 4 | 图标的间隔 |
| enableHalf | boolean | false | true | 是否开启半分 |
| onChange | Function | false | null | 评分变化的回调函数 |