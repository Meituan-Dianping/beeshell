import {
    StyleSheet,
    PixelRatio,
} from 'react-native';

import { colors, padding, border, fontSize, button } from '../../common/styles/varibles';

const px = 1 / PixelRatio.get();

const defaultWrapper = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: button.paddingHorizontalBase,
    paddingVertical: button.paddingVerticalBase,

    borderWidth: 1 * px,
    borderColor: border.color,
    borderRadius: border.radiusBase,

    backgroundColor: '#fff',
};

const defaultText = {
    fontSize: fontSize.base,
    color: colors.grayDark,
};


const primaryWrapper = {
    ...defaultWrapper,
    borderColor: colors.brandPrimary,
    backgroundColor: colors.brandPrimary,
};

const primaryText = {
    ...defaultText,
    color: colors.grayBase,
};


const dangerWrapper = {
    ...defaultWrapper,
    borderColor: colors.brandDanger,
    backgroundColor: colors.brandDanger,
};

const dangerText = {
    ...defaultText,
    color: colors.grayBase,
};


const warningWrapper = {
    ...defaultWrapper,
    borderColor: colors.brandWarning,
    backgroundColor: colors.brandWarning,
};

const warningText = {
    ...defaultText,
    color: colors.grayBase,
};


const successWrapper = {
    ...defaultWrapper,
    borderColor: colors.brandSuccess,
    backgroundColor: colors.brandSuccess,
};

const successText = {
    ...defaultText,
    color: colors.grayBase,
};


const infoWrapper = {
    ...defaultWrapper,
    borderColor: colors.brandInfo,
    backgroundColor: colors.brandInfo,
};

const infoText = {
    ...defaultText,
    color: colors.grayBase,
};

const disabledWrapper = {
    ...defaultWrapper,
    borderColor: colors.grayLightest,
    backgroundColor: colors.grayLightest,
};

const disabledText = {
    ...defaultText,
    color: colors.grayLight,
};


const buttons = StyleSheet.create({
    defaultWrapper,
    defaultText,

    primaryWrapper,
    primaryText,

    dangerWrapper,
    dangerText,

    successWrapper,
    successText,

    warningWrapper,
    warningText,

    infoWrapper,
    infoText,

    disabledWrapper,
    disabledText,
});

export default buttons;