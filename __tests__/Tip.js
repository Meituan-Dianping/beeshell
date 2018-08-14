import 'react-native';
import React from 'react';
import Component from '../components/Modal/extensions/Tip';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        let instance;
        const component = renderer.create(
            <Component
                ref={(c) => { instance = c; }}
                body="注意注意注意！！！"
                cancelable={true}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        instance.open();
        instance.getContent();
        instance.close();
    });
});

