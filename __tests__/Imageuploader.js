import 'react-native';
import React from 'react';
import Component from '../modules/Imageuploader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

