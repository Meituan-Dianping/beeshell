# Badge/角标

## Usage

```javascript
// 引入
import { Badge } from '@ss/mtd-react-native'
```

## Examples

```javascript
import React from 'react'
import { View } from 'react-native'
import { Badge } from '@ss/mtd-react-native'

class App extends React.Component {
  render() {
    return (
      <View>
        <Badge title={'角标标题'}/>
      </View>
    )
  }
}
```

## API

### 属性
Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
title | string|number | true | | 角标中展示的文案
type | enum | false | | 角标类型  'text': 普通角标 'dot': 点角标 'triangle': 三角角标

### 可修改的模块样式
Property | Type | Description
:--- | :--- | :---  
textWrapperStyle | ViewStyle | 包裹容器样式
textContentStyle | TextStyle | 文案内容样式
triangleStyle | ViewStyle | 三角角标容器样式
textTriangleStyle | TextStyle | 三角角标文案样式
dotStyle | ViewStyle | 点角标样式
 

