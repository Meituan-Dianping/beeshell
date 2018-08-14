import {
    Text,
    TextInput
} from 'react-native';
import React from 'react';
import Component from '../components/Form';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    const rules = {
        // 姓名
        name: [
          { type: 'string', required: true, pattern: /^\D*$/, message: '请填写姓名,不允许数字' },
          { type: 'string', required: true, max: 8, min: 2, message: '姓名2-8字' },
        ],
        // 邮箱
        email: [
          { type: 'string', required: true, message: '请填写邮箱(加载时校验)' },
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'change' },
        ],
        deliveryTime:
          { type: 'array', required: true, max: 2, min: 1, message: '送餐时间段必填, 而且不能多于2个' },
        // 店铺名
        store(rule, value, callback, source, options) {
            const errors = [];
            if (!/^[\u4E00-\u9FA5]{3,20}$/.test(value)) {
              errors.push(new Error('店铺名必须是3-20个中文字'));
            }
            callback(errors);
        },
    };

    it('basic use', () => {
        
        class Xa extends React.Component {
            render() {
                return <Text>111</Text>;
            }
        }

        const XaWrapper = Component.enhance(Xa);
    
        let xaWrapperInstance;
        let formInstance;
        let formItemInstance;
        let formItemInputInstance;
        let formItemRuleSingleInstance;
        let formItemRuleFuncInstance;
        const component = renderer.create(
            <Component
                ref={(c) => {
                    formInstance = c;
                }}
                rules={rules}
                >
                <Component.Item
                    ref={(c) => {
                        formItemInstance = c;
                    }}
                    prop={'name'}
                >
                    <XaWrapper
                        ref={(c) => {
                            xaWrapperInstance = c;
                        }}
                    />
                </Component.Item>
                <Component.Item
                    ref={(c) => {
                        formItemInputInstance = c;
                    }}
                    prop={"email"} 
                >
                    <TextInput
                        value={'ddd'}   
                        onChange={() => {}}
                    />
                </Component.Item>
                <Component.Item
                    ref={(c) => {
                        formItemRuleSingleInstance = c;
                    }}
                    prop={"deliveryTime"} 
                >
                    <TextInput
                        value={'ddd'}   
                        onChange={() => {}}
                    />
                </Component.Item>
                <Component.Item
                    ref={(c) => {
                        formItemRuleFuncInstance = c;
                    }}
                    prop={"store"} 
                >
                    <TextInput
                        value={'ddd'}   
                        onChange={() => {}}
                    />
                </Component.Item>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        xaWrapperInstance.handleBlur();
        xaWrapperInstance.handleValueChange();


        formInstance.validate(() => {
            console.log('validate end');
        });

        formInstance.addField('1');
        formInstance.removeField('1');
        formItemInstance.fieldValue();

        formItemInputInstance.validate('change', () => {
            console.log('validate end');
        });

        formItemInputInstance.getFilteredRules('change');

        formItemInputInstance.getFilteredRules(null);
        // 触发单独 rules
        formItemRuleSingleInstance.getFilteredRules('change');
        // 触发 function rules
        formItemRuleSingleInstance.getFilteredRules('change');

        formInstance.setState({rules})

    });
});

