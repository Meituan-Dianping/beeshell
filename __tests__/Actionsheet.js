import 'react-native';
import React from 'react';
import Component from '../modules/Actionsheet';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        let instance;
        const component = renderer.create(
            <Component
                ref={(c) => { instance = c; }}
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
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        instance.open();
        instance.getContent();
        instance.close();
    });
});

