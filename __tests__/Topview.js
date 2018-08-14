import {
    Text
} from 'react-native';
import React from 'react';
import Component from '../components/Topview';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        let instance;
        const component = renderer.create(
            <Component.Topview
                ref={(c) => {
                    instance = c;
                }}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        instance.add(<Text>111</Text>);
        instance.replace(<Text>2222</Text>, 1);
        instance.remove(1);
    });
});

