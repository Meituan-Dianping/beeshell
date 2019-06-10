---
name: Switch
title: 开关
route: /components/Switch
---

# Switch

开关组件。

## Usage
### 全部引入

```js
import { Switch } from '@roo/roo-mobile-rn';
```

### 按需引入
```js
import { Switch } from '@roo/roo-mobile-rn/dist/components/Switch';
```

## Examples

![image](../images/Switch/1.gif)

## Code
[详细 Code](https://github.com/Meituan-Dianping/beeshell/tree/master/examples/Switch/index.tsx)

```js
import { Switch } from '@roo/roo-mobile-rn';

<Switch value={this.state.valueA} onChange={(value) => { this.setState({ valueA: value }) }}/>

```

## API
### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | {} | 样式 |
| value | boolean | false | false | 状态值 |
| disabled | boolean | false | false | 是否可以切换状态 |
| rockerSize | string | false | 'lg' | 滑块的尺寸，支持 'lg' 'sm' |
| activeColor | string | false | variable.mtdBrandPrimary | 打开状态颜色 |
| onChange | Function | false | null | 值变化回调 |