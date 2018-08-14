# Tip

继承自 [Modal](./Modal.md) 组件，属于 Modal 系列。

## Install

```
npm install beeshell  
```

## Usage

```
import { Tip } from 'beeshell';
```


### Examples
#### 基础
![image](../images/Toast/1.gif)



### Props

| Name     | Type   | Required | Default             | Description                                                 |
| -------- | ------ | -------- | ------------------- | -------------------------------------------- |
| msg      | String | false    | 'hello world'       | 提示文案                                              |
| duration | Number | false    | 1000                | 弹出后在 duration 指定的毫秒数后自动关闭 |
| posotion | String | false    | center 可选: center/top/bottom | 显示位置                                         |


### Methods

#### .open('文案内容', 持续时间, 位置)

打开弹窗。

```
Toast.show('操作成功')
Toast.show('顶部 3s 自动消失 我比较长会自动换行自动换行自动换行自动换行', 3000, 'top');
Toast.show('中部 5s', 5000, 'center');
```


### Code

1. 顶部显示 3 秒钟
```jsx
import { Toast } from 'beeshell';

class App extends React.Component {
    render() {
        <View>
            <TouchableOpacity
                onPress={() => {
                    Toast.show('顶部 3s 自动消失 我比较长会自动换行自动换行自动换行自动换行', 3000, 'top');
                }}>
                <Text style={styles.btnText}>顶部3s</Text>
            </TouchableOpacity>
        </View>
    }
}
```

2. 中部 5s, 但是2s后消失
```jsx
import { Toast } from 'beeshell';

class App extends React.Component {
    render() {
        <View>
            <TouchableOpacity
                onPress={() => {
                    Toast.show('中部 5s, 2s后消失', 5000, 'center');
                    setTimeout(() => {
                        Toast.hide();
                    }, 2000);
                }}>
                <Text style={styles.btnText}>中部 5s, 但是2s后消失</Text>
            </TouchableOpacity>
        </View>
    }
}

```
