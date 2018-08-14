import 'react-native';
import React from 'react';
import Component from '../modules/Toast';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        Component.show('底部 3s 自动消失', 3000, 'bottom');
        Component.hide();
    });
});

