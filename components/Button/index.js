import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableHighlight,
    TouchableOpacity,
    PixelRatio,
    View,
} from 'react-native';
const px = 1 / PixelRatio.get();
import buttonsStyle from '../../common/styles/buttons';
import { fontSize, button } from '../../common/styles/varibles';

const fontSizeMap = {
    lg: fontSize.h5,
    md: fontSize.base,
    sm: fontSize.small,
};

const paddingMap = {
    lg: {
        paddingHorizontal: button.paddingHorizontalLarge,
        paddingVertical: button.paddingVerticalLarge,
    },
    md: {
        paddingHorizontal: button.paddingHorizontalBase,
        paddingVertical: button.paddingVerticalBase,
    },
    sm: {
        paddingHorizontal: button.paddingHorizontalSmall,
        paddingVertical: button.paddingVerticalSmall,
    }
};

export default class Button extends React.Component {
    static propTypes = {
    };
    static defaultProps = {
        type: 'default',
        size: 'md',
        style: {},
        textColorReverse: false,
        responsive: true,
        onPress: () => {},
    };

    render() {
        const styleWrapper = buttonsStyle[this.props.type + 'Wrapper'] || buttonsStyle.defaultWrapper;
        const styleText = buttonsStyle[this.props.type + 'Text'] || buttonsStyle.defaultText;

        return (
            <TouchableOpacity
                style={{
                    ...(typeof this.props.style == 'object' ? this.props.style : {}),
                    flexDirection: 'row',
                }}
                onPress={this.props.onPress}
                activeOpacity={0.3}>

                <View
                    style={[
                        styleWrapper,
                        { flex: this.props.responsive ? 1 : null },
                        {
                            ...(paddingMap[this.props.size] || paddingMap['md'])
                        }
                    ]}>

                    {
                        React.isValidElement(this.props.children) ?
                        this.props.children :
                        <Text
                            style={[
                                styleText,
                                {
                                    fontSize: fontSizeMap[this.props.size] || fontSizeMap['md'],
                                    color: this.props.textColorReverse ? '#fff' : undefined,
                                }
                            ]}>
                            {this.props.children}
                        </Text>
                    }
                </View>
            </TouchableOpacity>
        );
    }
}
