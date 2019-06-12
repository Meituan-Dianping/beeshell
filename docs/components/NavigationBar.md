---
name: NavigationBar
title: 导航条
route: /components/NavigationBar
---

# NavigationBar
导航条组件。

## Usage

### 全部引入
```
import { NavigationBar } from 'beeshell';
```

### 按需引入
```
import { NavigationBar } from 'beeshell/dist/components/NavigationBar';
```

## Examples
![image](../images/NavigationBar/1.gif)

## Code
[详细 Code](https://github.com/Meituan-Dianping/beeshell/tree/master/examples/NavigationBar/index.tsx)

```jsx
import { NavigationBar } from 'beeshell';

<NavigationBar
  title='标题'
  backLabelText='返回'
  forwardLabelText='下一步'
  onPressBack={() => {
  }}
  onPressForward={() => {
  }}
/>
```

## API

### Props
| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | {} | 自定义样式 |
| titleContainer | ReactElement | false | null | 中间区域展示内容 |
| title | string | false | '标题' | 中间区域标题 |
| backLabel | ReactElement | false | null | 左边区域展示内容 |
| backLabelText | string | false | '返回' | 左边区域文案 |
| backLabelTextStyle | TextStyle | false | {} | 左边区域文案样式 |
| backLabelIcon | ReactElement | false | angel-left 图标 | 左边区域图标 |
| forwardLabel | ReactElement | false | null | 右边区域展示内容 |
| forwardLabelText | string | false | '下一步' | 右边区域文案 |
| forwardLabelTextStyle | TextStyle | false | {} | 右边区域文案样式 |
| onPressBack | Function | false | null | 左边区域点击回调 |
| onPressForward | Function | false | null | 右边区域点击回调 |
| proportion | number[] | false | [1, 2, 1] | 渲染区域布局占比 |
| renderItem | Function | false | null | 自定义每个渲染区域 |