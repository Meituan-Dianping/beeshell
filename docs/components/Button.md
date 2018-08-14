# Button

按钮组件。

## Install

```
npm install @mfe/beeshell --registry=http://r.npm.sankuai.com
```

## Usage

### 引入方式
#### 全部引入
```
import { Button } from '@mfe/beeshell';
```

#### 单独引入
```
import Button from '@mfe/beeshell/components/Button';
```


### Examples

![image](../images/Button/1.gif)


### Code

```js

import React from 'react';
import { Button } from '@mfe/beeshell';

class App extends React.Component {
    render() {
        return (
            <View>
                <Button type="primary" size="md" responsive={false}>首选项 primary</Button>

                <Button type="primary" size="md" responsive={false}>
                    <View>
                        <Text>自定义</Text>
                        <Text>支持组件</Text>
                    </View>
                </Button>
            </View>
        );
    }
}

```

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| type | String | true | null | 指明按钮的预定义样式，`default` `primary` `success` `info` `warning` `danger` `disabled`  |
| size | String | false | 'md' | 尺寸，`lg` `md` `sm` |
| responsive | Boolean | false | false | 是否拉伸至父组件 100% 宽度 |
| onPress | Function | false | null | 点击回调 |
