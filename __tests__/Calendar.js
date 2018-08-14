import { View, Text } from 'react-native';
import React from 'react';
import Component from '../components/Calendar';
import moment from 'moment';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const component = renderer.create(
            <Component
                date={'2018-05-20'}
                startDate={'2018-04-11'}
                endDate={'2018-06-22'}

                onChange={(date) => {
                    console.log
                }}>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const instance = component.getInstance();

        instance.changeDate('days', 'add');

        instance.selectDate({
            dateModel: moment()
        })
    });
});

