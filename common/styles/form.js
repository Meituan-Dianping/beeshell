import {
    StyleSheet,
    PixelRatio,
    Platform,
} from 'react-native';

import { colors, padding, border, fontSize, fontWeight, formControl } from '../../common/styles/varibles';

const px = 1 / PixelRatio.get();


const form = StyleSheet.create({
    label: {
        width: 90,
        height: formControl.labelHeight,
        marginRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        fontSize: fontSize.h5,

        // lineHeight: 20,
    },

    indicator: {
        paddingLeft: padding.horizontalBase,
    }
});

export default form;