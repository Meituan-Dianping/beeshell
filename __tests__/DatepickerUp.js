import { View, Text } from 'react-native';
import React from 'react';
import Component from '../modules/DatepickerUp';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component
                startYear={2010}
                numberOfYears={10}
                date={'2016-03-30'}
                onChange={(data) => {
                    console.log(data);
                }}>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const instance = component.getInstance();

        instance.onChange(0, 0);
    });
});

