# Checkbox

多选框组件。

## Usage

### 全部引入
```
import { Checkbox } from 'beeshell';
```

### 按需引入
```
import { Checkbox } from 'beeshell/dist/components/Checkbox';
```

## Examples

![image](../images/Checkbox/1.gif)

## Code
[详细 Code](../../examples/Checkbox/index.tsx)

```jsx
import { Checkbox } from 'beeshell'

<Checkbox
  value={this.state.value}
  onChange={(value) => {
    this.setState({
      value
    })
  }}>

  <Checkbox.Item label='选项一' value={1} />
  <Checkbox.Item label='选项二' value={2} />
  <Checkbox.Item label='选项三' value={3} />
</Checkbox>
```

## API

### Checkbox Props
| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | {} | 样式 |
| iconPosition | string | false | 'left' | 图标位置，支持 'left' 'right' |
| showAllCheck | boolean | false | false | 是否启用全选功能 |
| checkedIcon | ReactElement | false | `<Icon type={'check-circle'} />` | 选中的图标 |
| uncheckedIcon | ReactElement | false | 圆圈图标 | 未选中的图标 |
| value | any | false | null | 选中的值，与 Checkbox.Item 的 value 属性对应 |
| onChange | Function | false | null | 值变化的回调 |
| children | ReactChild/ReactChild[] | false | null | 子元素 |

### Checkbox.Item Props
| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| style | ViewStyle | false | {} | 单选项样式 |
| label | string | true | '选项' | 选项文案 |
| value | any | true | null | 选项值 |
| disabled | boolean | false | false | 禁用选项 |
| renderItem | Function | false | null | 自定义渲染项 |
