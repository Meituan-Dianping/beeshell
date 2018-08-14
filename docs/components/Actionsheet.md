# Actionsheet

继承自 [SlideModal](./SlideModal.md) 组件，属于 Modal 系列。

## Usage

### 引入方式
#### 全部引入
```
import { Actionsheet } from 'beeshell';
```

#### 单独引入
```
import Actionsheet from 'beeshell/modules/Actionsheet';
```

### Examples

![image](../images/Actionsheet/1.gif)


### Code

```jsx
import { Actionsheet } from 'beeshell';

class App extends React.Component {
    render() {
        <View>
            <TouchableOpacity
                onPress={() => {
                    this._actionSheet.open();
                }}>
                <Text>Actionsheet</Text>
            </TouchableOpacity>

            <Actionsheet
                ref={(c) => { this._actionSheet = c; }}
                title="选择品类"
                textKey="text"
                options={[
                    {
                        text: '选项1',
                        value: '1'
                    },
                    {
                        text: '选项2',
                        value: '2',
                    },
                    {
                        text: '选项3',
                        value: '3'
                    },
                ]}
                cancelable={false}
                confirmCallback={(item) => {
                    console.log('confirm');
                }}
                cancelCallback={() => {
                    console.log('cancel')
                }}>
            </Actionsheet>
        </View>
    }
}


```

### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| cancelable | Boolean | false | true | 点击蒙层是否消失 |
| title | String | false | '标题' | 标题 |
| heading | ReactElement | false | null | 自定义头部，默认情况下头部样式已经定义好，只需提供 title（在头部内部）即可。若头部样式不符合需求，可以使用 React 组件完全自定义头部，此时 title 配置会被忽略 |
| options | Array | true | [] | 数据源，数组中是对象 |
| textKey | String | true | '' | 要展示数据源中的对象 key |
| cancelCallback | Function | false | null | 取消按钮点击回调 |
| confirmCallback | Function | false | null | 确认回调 |

### Methods

#### .open()

打开弹窗。

```
this._actionSheet.open();
```

#### .close()

关闭弹窗。

```
this._actionSheet.close();
```

### 其他

继承 [SlideModal](./SlideModal.md) 组件的所有 Props、Methods。
