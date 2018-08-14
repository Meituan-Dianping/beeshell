import 'react-native';
import React from 'react';
import Component from '../components/Scrollpicker';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const list = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        const proportion = [2, 1, 1];

        const component = renderer.create(
            <Component
                list={list}
                value={[]}
                proportion={proportion}
                offsetCount={2}
                fontSize={14}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const instance = component.getInstance();

        const ret = instance.initialize({
            list,
            proportion
        });

        expect(ret.value.toString()).toBe('0,0,0');

        instance.resizeContainerHeight(20);

        instance.locateIndicator(20);

        instance.scrollTo(1, 1, false);

        instance.onScroll(1, 100);
    });
});

