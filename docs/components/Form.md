# Form

Form 表单组件。

## Install

```
npm  install beeshell
```

## Usage

### 引入方式
#### 全部引入
```
import { Form } from 'beeshell';
```

#### 单独引入
```
import Form from 'beeshell/components/Form';
```

### Examples
![image](../images/Form/1.gif)


### Code

```jsx

import { Form, Input } from 'beeshell';
const FormItem = Form.Item;

class App extends React.Component {
    render() {
        return (
            <ScrollView>
                <Form>
                    <FormItem prop="name" label="姓名" hasLine>
                        <Input value="" onChange={() => {}} />
                    </FormItem>
                    <FormItem prop="email" label="邮箱">      
                        <Input value="" onChange={() => {})} />
                    </FormItem>
                </Form>
            </ScrollView>
        );
    }
}
```

### Form Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| title | String | false | null | 表单标题 |

### Form.Item Props

| Name | Type | Required | Default | Description |
| ---- | ---- | ---- | ---- | ---- |
| label | String | false | null | 表单控件标签 |
| labelWidth | Number | false | 90 | 表单控件标签宽度 |
| hasLine | Boolean | false | false | 是否在控件下有横线 |
| disabled | Boolean | false | false | 禁用控件 |
