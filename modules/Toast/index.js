import React from 'react';
import PropTypes from 'prop-types';

import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    PixelRatio,
} from 'react-native';


import Topview from '../../components/Topview';
import Tip from '../../components/Modal/extensions/Tip';
import { colors, padding, border, fontSize } from '../../common/styles/varibles';

const px = 1 / PixelRatio.get();

export default class Toast {
    // Toast使用tip 实现是个单例
    static tipInstance = null;

    static show = function (msg, duration, position) {

        Toast.tipInstance = new Tip({
            ...Tip.defaultProps,

            alignItems: position == 'top' ? 'flex-start' : (
                position == 'bottom' ? 'flex-end' : 'center'
            ),

            body: msg,
            cancelable: true,
            duration: Number(duration) || 2000,
        });

        Toast.tipInstance.open();
    };

    static hide = function () {
        Toast.tipInstance.close();
    }
}