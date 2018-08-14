# Input

输入框组件。

## Install

```
npm --registry=http://r.npm.sankuai.com install @mfe/beeshell
```

## Usage

### 引入方式
#### 全部引入
```
import { Input } from '@mfe/beeshell';
```

#### 单独引入
```
import Input from '@mfe/beeshell/components/Input';
```

### Examples
![image](../images/Form/1.gif)


### Code

```js

import { Input } from '@mfe/beeshell';

<Input
    placeholder="请输入姓名"
    textAlign="left"
    value={this.state.name}
    onChange={() => {}}
/>
```

通常与 Form 一起使用，详见 [Form](./Form.md)


### Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| value | String | false | null | 输入信息 |
| textAlign | String | false | 'left' | 文本位置 `left` `right` |
| onChange | Function | false | null | 输入信息变化回调 |
| clearButtonMode | String | false | 'while-editing' | 清空按钮 |
