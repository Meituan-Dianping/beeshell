# Checkbox
复选框组件。

## Install

```
npm --registry=http://r.npm.sankuai.com install @mfe/beeshell
```

## Usage

### 引入方式
#### 全部引入
```
import { Checkbox } from '@mfe/beeshell';
```

#### 单独引入
```
import Checkbox from '@mfe/beeshell/components/Checkbox';
```

### Examples
![image](../images/Form/1.gif)


### Code

```js

import { Checkbox } from '@mfe/beeshell';

<Checkbox checkedValues={this.state.deliveryTime} onChange={() => {}}>
    <Checkbox.Item key={'a'} label="百度" trueValue="1" />
    <Checkbox.Item key={'b'} label="阿里" trueValue="2" />
    <Checkbox.Item key={'c'} label="腾讯" trueValue="3" />
</Checkbox>
```

通常与 Form 一起使用，详见 [Form](./Form.md)

### Checkbox Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| checkedValues | Array | false | null | 默认选中的值，其中的值就是 Checkbox.Item 的 label 或者 trueValue（优先级高），再次被设置时会相应改变, 并联动全选状态的改变 |
| showAllChecked | Boolean | false | false | 是否展示全选按钮 |
| onChange | Function | false | null | 选项变化回调 |
| iconPosition | String | false | 'left' | 选项扭 icon 位置 |

### Checkbox.Item Props
| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| label | String | true | null | 选项文案 |
| trueValue | Any | false | null | 选项值 |
| disabled | Boolean | false | false | 禁用选项 |
| checked | Boolean | false | false | 选中 |
