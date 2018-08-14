import 'react-native';
import React from 'react';
import Component from '../components/Modal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const instance = component.getInstance();
        instance.open();
        instance.handleMaskPress();
        instance.close();
    });
});

