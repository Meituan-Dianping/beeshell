import 'react-native';
import React from 'react';
import Component from '../components/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component type="primary" responsive>
                Button
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

