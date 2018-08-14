import 'react-native';
import React from 'react';
import Component from '../components/Modal/extensions/SlideModal';

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
                offsetX={100}
                offsetY={100}
                direction="down"
                onOpen={() => {
                    console.log('open');
                }}
                onClose={() => {
                    console.log('closed');
                }}>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        instance.close();
    });
});

