# Slider

滑块组件。

## Usage
### 全部引入

```js
import { Slider } from '@roo/roo-mobile-rn';
```

### 按需引入
```js
import { Slider } from '@roo/roo-mobile-rn/dist/components/Slider';
```

## Examples

![image](../images/Slider/1.gif)

## Code
[详细 Code](../../examples/Slider/index.tsx)

```js
import { Slider } from '@roo/roo-mobile-rn';

<Slider
    range
    trackColor={variables.mtdBrandPrimary}
    valueTrackColor={variables.mtdBrandSuccess}
    rangeValueTrackColor={variables.mtdBrandDanger}
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
| value | number | false | 0 | 当前值 |
| min | number | false | 0 | 最小值 |
| max | number | false | 1 | 最大值 |
| disabled | boolean | false | false | 是否禁用 |
| step | number | false | 0 | 设置该值后，slider滑动的时候将以最小单位为step的刻度滑动 |
| marks | string[] / ReactElement[] | false | null | 刻度对应的标记值，格式如：`['普通', '快速', '高速', '极速', '光速', <Text>123</Text>]` |
| trackColor | string | false | '#F8F8F8' | 滑轨的颜色 |
| valueTrackColor | string | false | '#FECB2E' | 滑块划过区域滑轨的颜色 |
| rangeValueTrackColor | string | false | '#FFA000' | 双滑块下另一个滑块划过区域滑轨的颜色 |
| disabledTrackColor | string | false | '#cccccc' | 滑轨禁用状态的颜色 |
| style | ViewStyle | false | null | slider 样式 |
| onChange | Function | false | null | 滑块值改变回调 |
| showTip | boolean | false | false | 是否显示tooltip提示 |
| renderToolTip | Function | false | null | 自定义tooltip显示 |
| renderThumb | Function | false | null | 自定义滑块的显示，回调参数isOther：标识当前为哪个滑块 |