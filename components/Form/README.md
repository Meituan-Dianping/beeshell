# Form

Form 表单组件，支持定义 async-validator 校验规则，自动校验表单域。

## Usage

```jsx
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import Form from '@mfe/react-native-form';

const FormItem = Form.Item;

// styles ...

// react-native 提供的 TextInput 实现没有 onValueChange 需要处理一下
// 其他原生组件如 Switch/Slider 提供 onValueChange 可直接使用 Form.enhance 拓展
const WrappedInput = props => {
  const handleChangeText = text => {
    if (typeof props.onChangeText) {
      props.onChangeText(text);
    }
    if (typeof props.onValueChange) {
      props.onValueChange(text);
    }
  };
  return <TextInput {...props} onChangeText={handleChangeText} />;
};

// 提供高阶组件代理 onValueChange (& onBlur) 实现自动通信
const Input = Form.enhance(WrappedInput);

class FormDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Form.Item 值从 Form 的 model 中获取
      model: {
        name: '',
        email: '',
      },
      // 规则配置采用 async-validator 定义
      rules: {
        name: [
          // 添加 trigger 属性可以加上校验规则的触发时机
          { type: 'string', required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        email: [
          { type: 'string', required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', /* default trigger: 'change,blur' */ },
        ],
      },
    };

    this.form = null;

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  // handleNameChange & handleEmailChange ...

  handleSubmit() {
    // 调用 Form 实例的 validate 方法，手动触发校验
    // callback 参数为一 bool 值，表示是否通过校验
    this.form.validate((pass) => {
      if (pass) {
        // do submit
      }
    });
  }

  render() {
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        <Form ref={form => this.form = form} model={this.state.model} rules={this.state.rules}>
          <FormItem prop="name" label="姓名" hasLine>
            <Input value="this.state.name" onValueChange={this.handleNameChange} />
          </FormItem>
          <FormItem prop="email" label="邮箱">      
            <Input value="this.state.email" onValueChange={this.handleEmailChange} />
          </FormItem>
        </Form>
      </ScrollView>
    );
  }
}
```

### Form Props

| 参数    | 说明                                  | 类型     | 默认值  | required |
| ----- | ----------------------------------- | ------ | ---- | -------- |
| model | 表单 field 值集合。                       | Object | null | true     |
| rules | 表单 field 校验规则。key 为 field 名，值为对象数组。 | Object | null | true     |

### Form.Item Props

| 参数              | 说明                                       | 类型               | 默认值    | required |
| --------------- | ---------------------------------------- | ---------------- | ------ | -------- |
| prop            | 表单 field 名称。用于从 Form 获取 field 的值和校验规则。   | string           | ''     | false    |
| label           | 左侧 label 文案。                             | node             | ''     | false    |
| align           | 对齐方式。                                    | 'left' / 'right' | 'left' | false    |
| hasLine         | 下方是否划线。在连续的 Form.Item 间画 1px 线，仅在 isBlock = false 时有意义。 | boolean          | false  | false    |
| redStar         | 是否在 label 左侧显示红色的 *。                     | boolean          | false  | false    |
| isBlock         | 是否为 block 模式。需要显示 checkbox 这类大块输入控件时使用，无 label，仅在错误时在下方显示一行红字。 | boolean          | false  | false    |
| showValidation  | 是否在 显示下方绝对定位的校验信息                        | boolean          | true  | false    |
| validateOnMount | 是否在 mount 时校验初始值。                        | boolean          | false  | false    |
| labelWidth      | label 的宽度                                | number           | 80     | false    |

### 输入控件

**约定：输入控件的 props 需提供 onValueChange 回调，和可选的 onBlur 回调 (如果输入控件有对应事件的话)。**

自动校验实现原理：Form、Form.Item、以及 Form.Item 包含的输入控件通过 React 的 context API 建立起关联。输入控件需在实现中调用 context.emitValueChange 来通知 Form.Item 值改变触发校验。

Form的rules配置 完整支持 [async-validator](https://github.com/yiminghe/async-validator), 无论是校验数组还是,func或者单纯的对象.

```jsx
class CustomSelect extends Componet {
  // 子组件需定义 contextTypes，不然获取到的 context 为空对象
  static contextTypes = {
    // Select 组件实际上没有 blur 事件, 不过Input有
    emitValueBlur: PropTypes.func
    emitValueChange: PropTypes.func,
  };

  // ...

  handleOptionClick(val) {
    // ...

    if (this.props.onValueChange) {
      this.props.onValueChange(val);
    }

    // 通知输入值改变
    if (this.context.emitValueChange) {
      this.context.emitValueChange();
    }
  }
}
```

#### 高阶组件

Form.enhance 接收一个按约定实现的组件（含有 onValueChange 和 onBlur 的组件）作为参数，并返回一个新的组件。

高阶组件代理了原组件的 onValueChange 和 onBlur props，自动从 context 获取 emitValueChange 和 emitValueBlur 并调用。

```jsx
import { Switch as NativeSwitch } from 'react-native';

// 新的 Switch 组件和原本的 NativeSwitch 组件用法上完全相同
// 但 Switch 值变化时可以自动触发 FormItem 校验。
const Switch = Form.enhance(NativeSwitch);
```

### 样式

// todo: 块级

## TODO

- [x] 远端校验
- [x] async-validator 集成
- [x] 样式不着急实现, 做做骨架和验证
- [x] 为 validation 扩充 trigger 属性, 'blur', 'submit'
- [x] Form.Item 如果获取 input 的 onblur 事件
- [ ] Form.Item 如果有错误如何通知给子组件, context
- [x] checkbox, radio 的样式, 需要告知设计
- [x] validation 的 message 放置位置
- [x] getChildContext context 传递和更新实验
- [x] 寻找更好的移动端Form表单UI/UE 样式, 已经设计完毕
- [x] demo 组合度 
- [x] demo validator 覆盖度编写