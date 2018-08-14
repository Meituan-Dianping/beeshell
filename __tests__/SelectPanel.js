import 'react-native';
import React from 'react';
import Component from '../modules/SelectPanel';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component
                selectPanelInfo={[
                    {
                        "id": 1,
                        "text": "创建时间由近到远",
                        "isSelected": true
                    },
                    {
                        "id": 2,
                        "text": "创建时间由远到近",
                        "isSelected": false
                    },
                    {
                        "id": 3,
                        "text": "拜访时间由近到远",
                        "isSelected": false
                    },
                ]}
                onSelected={(selectedChoice, selectPanelInfo) => {
                }}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

