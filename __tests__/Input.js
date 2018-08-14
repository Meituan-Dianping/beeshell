import 'react-native';
import React from 'react';
import Component from '../components/Input';

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
                onChange={(value) => {
                    console.log(value);
                }}

                onBlur={() => {
                    console.log('blur');
                }}

                onFocus={() => {
                    console.log('focus');
                }}

                throttleCallback={(value) => {
                    console.log(value);
                }}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        instance.handleChange('123');
        instance.handleFocus();
        instance.handleBlur();

        instance.renderAndroid();
    });
});

