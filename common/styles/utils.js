import {
    StyleSheet,
} from 'react-native';
import { colors, padding } from './varibles';

const utils = StyleSheet.create({
    /**
     * Text align
     */
    textCenter: {
        textAlign: 'center',
    },

    textLeft: {
        textAlign: 'left',
    },

    textRight: {
        textAlign: 'right',
    },

    /**
     * Text color
     */
    textPrimary: {
        color: colors.brandPrimary,
    },

    textSuccess: {
        color: colors.brandSuccess,
    },

    textInfo: {
        color: colors.brandInfo,
    },

    textDanger: {
        color: colors.brandDanger,
    },

    textWarning: {
        color: colors.brandWarning,
    },

    /**
     * Layout
     */
    row: {
        marginHorizontal: - padding.horizontalBase
    },

    /**
     * hidden
     */
    hidden: {
        position: 'absolute',
        width: 0,
        height: 0,
    }

});

export default utils;