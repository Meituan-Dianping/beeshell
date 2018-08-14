# @mfe/react-native-input
---

## Install

```
npm --registry=http://r.npm.sankuai.com install @mfe/react-native-input
```

## Feature 说明
* clearButtonMode: Android 实现了改功能, 输入时 后面出现 x, 点击后清空.iOS 自带
* 对齐方式
* 结合Form.Item 校验数据
* 结合Form.Item 展示 更多布局, 后面可以追加单位等

## 示例

![image](https://s3.meituan.net/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/mnpm-demo-pic/input_20171026.gif)


### 1. 一般使用
```js
import Input from '@mfe/react-native-input';

handleInputAChange(values) {
  this.setState({
    InputAValues: values,
  });
}

// render 
<Input
  placeholder="请输入姓名"
  textAlign="left"
  value={this.state.model.name}
  onChange={this.handleInputAChange.bind(this)}
  clearButtonMode="while-editing"
/>

```

### 2. 配合Form.Item 的校验
```js
import Input from '@mfe/react-native-input';

// constructor
constructor(props) {
  super(props);
  this.state = {
    model: {
      name: '默认value',
    },
    // rules 配置详见: https://github.com/yiminghe/async-validator
    rules: {
      // 姓名
      name: [
        { type: 'string', required: true, message: '请输入姓名' },
        { type: 'string', required: true, max: 8, min: 2, message: '姓名2-8字' },
      ],
      // 加个
      price: [
        { type: 'number', required: true, message: '请输入价格' },
      ],
    },
  };
}

handleInputCChange(values) {
  this.setState({
    model: { ...this.state.model, price: parseFloat(values) },
  });
}

// render
<Form ref={(ref) => { this.form = ref; }} model={this.state.model} rules={this.state.rules}>
  <Form.Item prop="price" hasLine label="价格">
    <Input
      placeholder="请输入单价"
      textAlign="right"
      onChange={this.handleInputCChange.bind(this)}
      clearButtonMode="while-editing"
    />
    {<Text style={{ marginLeft: 10 }}>元</Text>}
  </Form.Item>
</Form>
```

## 注意

* ScrollView, ListView
一定要设置 keyboardShouldPersistTaps="always"  不然 Android 不能使用 clearButtonMode 属性

## TODO
- [ ] debounce 毫秒数
- [ ] 引入inputMask
- [x] 实现Android exitable 的小xx
- [ ] 各种组合使用的demo
- [ ] disabed, placeholder 等检查
- [ ] 实现默认的emitValueChange
- [x] Android 需要点击两次才能 delete word