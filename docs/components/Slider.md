# Slider

滑块组件。

## Usage
### 全部引入

```js
import { Slider } from 'beeshell';
```

### 按需引入
```js
import { Slider } from 'beeshell/dist/components/Slider';
```

## Examples

![image](../images/Slider/1.gif)

## Code
[详细 Code](../../examples/Slider/index.tsx)

```js
import { Slider } from 'beeshell';

<Slider
  range
  max={1500}
  value={[500, 1000]}
  disabled={false}
  showTip={true}
/>
<Slider
  vertical
  max={1500}
  value={500}
  showTip={true}
/>

```

## API
### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | null | 样式 |
| value | number | false | 0 | 当前值 |
| min | number | false | 0 | 最小值 |
| max | number | false | 1 | 最大值 |
| disabled | boolean | false | false | 是否禁用 |
| step | number | false | 0 | 滑动最小单位 |
| marks | string[] / ReactElement[] | false | null | 刻度对应的标记值，格式如：`['普通', '快速', '高速', '极速', '光速', <Text>123</Text>]` |
| maxTrackColor | string | false | '#F8F8F8' | 最大一段滑轨的颜色 |
| minTrackColor | string | false | '#FECB2E' | 最小一段滑轨的颜色 |
| midTrackColor | string | false | '#FFA000' | 中间一段滑轨的颜色 |
| onChange | Function | false | null | 值改变回调 |
| showTip | boolean | false | false | 是否显示气泡 |
| renderTip | Function | false | null | 自定义气泡渲染内容，回调参数 isOther 标识当前为哪个滑块 |
| renderThumb | Function | false | null | 自定义滑块的显示，回调参数 isOther 标识当前为哪个滑块 |