import 'react-native';
import React from 'react';
import Component from '../components/Tab';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component
                options={[
                    {label: 1},
                    {label: 2}
                ]}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('threshold use', () => {
        const component = renderer.create(
            <Component
                threshold={4}
                options={[
                    {label: 1},
                    {label: 2},
                    {label: 3},
                    {label: 4},
                    {label: 5},
                ]}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

