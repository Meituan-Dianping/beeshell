# Cascader

级联选择组件。

## Usage

引入方式

```javascript
import { Cascader } from '@ss/mtd-react-native'
```

## Examples

```javascript
import React from 'react'
import { View } from 'react-native'
import { Cascader, Button } from '@mtd/react-native'

class App extends React.Component {
  render() {
    const options = [
      {
        label: '甜点饮品',
        value: 'sweet',
        children: [
          { label: '甜品', value: 'sweetie' },
          { label: 'icecream', value: 'icecream' }
        ]
      },
      {
        label: '美食',
        value: 'food',
        children: [
          {
            label: '火锅',
            value: 'hotpot',
            children: [
              { label: '四川火锅', value: 'sichuan' },
              { label: '云南火锅', value: 'yunnan' },
              { label: '羊蝎子火锅', value: 'sheep' }
            ]
          }
        ]
      }
    ]
    return (
      <View>
        <Cascader
          style={{ flex: 1, height: 200 }}
          options={options}
          onChange={(selectedChain) => {
            console.log(selectedChain)
          }}
        />
      </View>
    )
  }
}
```

## API

### Props
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | ---- | ---- | ---- | ---- |
| options | 数据源数组，是一个嵌套表示的树形结构 | Array | [{ label: '选项一', value: 1, children: [] }, { label: '选项二', value: 2 }] | [] |
| assignedOption | 选中节点的数组 | Array | [1, 2, 3] | [] |
| onConfirm | 选中最后一级节点的回调 | Function | null | null |
| onChange | 选中节点的回调 | Function | null | null |
| onSyncData | 异步调用数据接口  | Function | null | null |
| flexCols | 宽度占比  | Array | null | null |
| structKeys | 自定义选项的 key  | Array | ['name', 'value', 'child'] | ['label', 'value', 'children'] |
| style | 最外层容器的样式 | any | null | null |
| renderItem | 自定义选项 | Function | null | null |

### Methods
无

### 其他
无