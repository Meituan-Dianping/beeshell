# Alert

Alert 弹窗
---

## Install

```
npm --registry=http://r.npm.sankuai.com install @mfe/beeshell
```

## Usage

```
import { Alert } from '@mfe/beeshell';
```

```js
import { Alert } from '@mfe/beeshell';

// 示例1: 普通
Alert.alert(
    '梯田里添加卡利久里',
    '梯田里添加卡利久里梯田里添加卡利久里梯田里添加卡利久里梯田里添加卡利久里梯田里添加卡利久里梯田里添加卡利久里',
    [{ text: '取消' }, { text: '确认' }],
);

// 示例2: 自定义title和message组件，弱化确认按钮
Alert.alert(
    <View><Text>就是不想用默认的样式</Text></View>,
    <View><Text>就是不想用默认的样式，或者需要自定义内容：非文字，多段文字等等</Text></View>,
    [{ text: '取消' }, { text: '确认', type: 'dark'}],
);

// 示例3: 一个按钮
Alert.alert(
    '标题',
    '一个按钮一个按钮一个按钮一个按钮一个按钮一个按钮一个按钮',
    [{
        text: '一个按钮操作',
    }],
);

// 示例4: 点击蒙层弹窗消失
Alert.alert(
    '',
    '点击蒙层弹窗消失，cancelable=true',
    [{
        text: '取消',
    }, {
        text: '确认',
    }],
    { cancelable: true },
);

// 示例5: onPress promise 
handleChangeText(text) {
    this.setState({ text });
}

// TextInput 不要设置 value参数,不然会导致无法输入新的字符

Alert.alert(
    '请输入你的反馈',
    <TextInput
        style={{ height: 100, backgroundColor: '#f0f0f0', padding: 15 }}
        onChangeText={this.handleChangeText}
        placeholder={this.state.placeHolder}
        multiline
        numberOfLines={3}
    />,
    [
        {
            text: '取消',
        }, 
        {
            text: '提交',
            onPress: () => new Promise((resolve, reject) => {
                // 这里可以判断值也可以调用异步判断
                if (this.state.text) {
                    resolve();
                } else {
                    reject();
                }
            }),
        }
    ],
    { cancelable: true },
);
```

## API
Alert.alert(title, message, buttons, options);


| 参数       | 说明                                        | 类型      | 默认值  | 备注 |
|------------|--------------------------------------------|-----------|---------------|---------|
|  title    |   标题                             | string 或 element      |  null   | 
|  message |  弹框的主体                    | string 或 element    |  null | 
|  buttons |  按钮                            | array   | [{ text, type, onPress}] | 一个按钮type默认是'dark'，两个按钮分别默认是'default'和'primary'
|  options    |   配置项   | object |   {cancelable: false}, cancelable控制点击蒙层是否关闭弹框，默认是false |

## 注意

* button 按钮实体, { text, type, onPress} 中的 onPress 的返回值如果是一个 `ES6 Promise` 对象, 只有当你是resolve的时候,组件才会帮你关掉Alert, 不调用或reject的时候什么都不会发生. 详见示例5
* 如果message 里有TextInput, 请不要设置 value参数,不然会导致无法输入新的字符

Alert.close(); // 关闭弹窗
## License

@mfe/beeshell is released under the MIT license.
