import {
    Text
} from 'react-native';
import React from 'react';
import Component from '../components/Alert';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        Component.alert(
            '标题',
            <Text>111</Text>,
            [
                {
                    text: '取消',
                    onPress: () => {
                        console.log('handlePress2 NO');
                    }
                },
                {
                    text: '确认'
                }
            ],
            { autoCloseOnPress: true }
        );

        Component.close();
    });
});

