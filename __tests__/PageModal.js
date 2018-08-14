import {
    Text
} from 'react-native';
import React from 'react';
import Component from '../modules/PageModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        let instance;
        const component = renderer.create(
            <Component
                ref={(c) => { instance = c; }}
                title="选择品类"
                cancelable={true}
                cancelCallback={() => {
                }}
                confirmCallback={() => {
                }}>

                <Text>ref 获取组件实例</Text>
                <Text>title="标题"</Text>
                <Text>cancelCallback={'{'}() => {'{'}{'}'} {'}'} '取消'回调</Text>
                <Text>confirmCallback={'{'}() => {'{'}{'}'} {'}'} '确认'回调</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        instance.open();
        instance.getContent();
        instance.close();
    });
});

