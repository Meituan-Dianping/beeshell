import {
    Text
} from 'react-native';
import React from 'react';
import Component from '../components/Modal/extensions/ConfirmModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        let instance;
        const component = renderer.create(
            <Component
                ref={(c) => {
                    instance = c;
                }}
                title="标题"
                body=""
                confirmCallback={() => {

                }}
                cancelCallback={() => {
                    
                }}>

                <Text>1111</Text>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        instance.getContent();
    });
});

