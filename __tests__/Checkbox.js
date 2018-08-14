import { View, Text } from 'react-native';
import React from 'react';
import Component from '../components/Checkbox';

import CheckboxAllChecked from '../components/Checkbox/checkbox-allChecked';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        let itemInstance;
        const component = renderer.create(
            <Component
                showAllChecked>
                <Component.Item ref={(c) => { itemInstance = c; }} label="1" trueValue="1"></Component.Item>
                <Component.Item label="2" trueValue="2"></Component.Item>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        const instance = component.getInstance();

        instance.handleValueChange(1, true);
        instance.handleAllChange(true);

        itemInstance.handlePress();
    });

    it('all check', () => {
        const component = renderer.create(
            <CheckboxAllChecked
                halfAllChecked={true}
                checked={false}
                label='全选'
                iconPosition={'left'} 
                hasLine={false}
                key={'all'}>
            </CheckboxAllChecked>
        );

        const instance = component.getInstance();
        instance.handlePress();
    });
});

