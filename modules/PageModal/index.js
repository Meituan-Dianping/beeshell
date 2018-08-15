import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    PixelRatio,
    Animated,
    Dimensions,
} from 'react-native';
import ParentModal from '../../components/Modal/extensions/SlideModal';
import { colors, padding, border, fontSize } from '../../common/styles/varibles';
import styleUtils from '../../common/styles/utils';

const screen = Dimensions.get('window');
const px = 1 / PixelRatio.get();

export default class PageModal extends ParentModal {
    static defaultProps = {
        ...ParentModal.defaultProps,
        width: screen.width,

        cancelable: true,
        title: '标题',
        cancelCallback: null,
        confirmCallback: null,
        confirmText: '完成',
    };

    static styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
        },
        heading: {
            borderBottomWidth: 1 * px,
            borderBottomColor: border.color,
            flexDirection: 'row',
        },

        colSide: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        },

        colMiddle: {
            flex: 2
        },

        title: {
            paddingVertical: padding.verticalMiddle,
            paddingHorizontal: padding.horizontalBase,
            fontSize: fontSize.h5,
            textAlign:'center',
            color: colors.grayDark,
        },

        operator: {
            flex: 1,
            paddingVertical: padding.verticalSmall,
            paddingHorizontal: padding.horizontalBase,
            fontSize: fontSize.h5,
            color: colors.grayLighter,
        }
    });

    constructor(props) {
        super(props);
    }

    getHeading() {
        const styles = PageModal.styles;
        const { title, cancelCallback, confirmCallback, confirmText } = this.props;
        let hasTwoBtns = !!(confirmCallback && cancelCallback);

        let confirmVel = confirmCallback ?
                <TouchableHighlight
                    underlayColor={colors.bgBase}
                    onPress={() => {
                        this.close().then(() => {
                            confirmCallback();
                        });
                    }}>
                    <Text style={[styles.operator, styleUtils.textRight, styleUtils.textPrimary]} numberOfLines={1}>{confirmText}</Text>
                </TouchableHighlight> : null;

        let cancelVel = cancelCallback ?
            <TouchableHighlight
                underlayColor={colors.bgBase}
                onPress={() => {
                    this.close().then(() => {
                        cancelCallback();
                    });
                }}>
                <Text style={[styles.operator, styleUtils.textLeft]} numberOfLines={1}>取消</Text>
            </TouchableHighlight> : null;

        return (
            <View style={styles.heading}>
                <View style={styles.colSide}>
                    { cancelVel }
                </View>
                <View style={styles.colMiddle}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.colSide}>
                    { confirmVel }
                </View>
            </View>
        );
    }

    getBody() {
        return this.props.children;
    }


    getContent() {
        const styles = PageModal.styles;
        const inner = <View style={styles.container}>
            {this.getHeading()}

            {/* TouchableHighlight 没设置高度时 onPress 有问题*/}
            {this.getBody()}
        </View>;

        return ParentModal.prototype.getContent.call(this, inner);
    }
}