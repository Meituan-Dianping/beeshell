import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    PixelRatio,
} from 'react-native';
import Modal from '../../Modal';
import { colors, padding, border, fontSize, fontWeight } from '../../../../common/styles/varibles';
import buttons from '../../../../common/styles/buttons';
import mixins from '../../../../common/styles/mixins';


const px = 1 / PixelRatio.get();

export default class ConfirmModal extends Modal {
    static defaultProps = {
        ...Modal.defaultProps,

        flex: 1,
        marginHorizontal: 40,
        borderRadius: border.radiusBase,
        title: '标题',
        body: 'hello world',
        cancelable: true,
        autoCloseOnPress: true, // 点击按钮时默认自动关闭
        cancelCallback: null,
        cancelTitle: '取消',
        confirmCallback: null,
        confirmTitle: '确认',
    };

    static styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        heading: {
            alignItems: 'center',
            paddingTop: 30,
        },

        title: {
            fontSize: fontSize.h5,
            fontWeight: fontWeight.bold,
            color: colors.grayDark,
        },

        body: {
            flexDirection: 'row',
            paddingHorizontal: 30,
            paddingTop: 10,
            paddingBottom: 30,
            // paddingVertical: padding.verticalBase,
        },

        bodyText: {
            flex: 1,
            textAlign: 'center',
            color: colors.grayDark,

            ...mixins.adjustFont(14, 1.2),
            // fontSize: 14,
            // lineHeight: 14 * 1.2,
            // textAlignVertical: 'center',
        },


        footer: {
            flexDirection: 'row',
            alignItems: 'center',

            borderTopWidth: border.width,
            borderTopColor: border.color,
        },

        btnConfirmWrapper: {
            ...StyleSheet.flatten(buttons.primaryWrapper),

            borderWidth: 0,
            backgroundColor: '#fff',
        },

        btnConfirmText: {
            ...StyleSheet.flatten(buttons.primaryText),
            color: colors.brandPrimary,

            fontSize: fontSize.h5,
            fontWeight: 'bold',
        },

        btnCancelWrapper: {
            ...StyleSheet.flatten(buttons.defaultWrapper),
            borderWidth: 0,
        },

        btnCancelText: {
            ...StyleSheet.flatten(buttons.defaultText),
            fontSize: fontSize.h5,
        }

    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    getContent() {
        const { title } = this.props;
        const styles = ConfirmModal.styles;

        const inner = <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {this.getBody()}
            {this.getFooter()}
        </View>;

        return Modal.prototype.getContent.call(this, inner);
    }

    getBody() {
        const styles = ConfirmModal.styles;
        const { body } = this.props;
        const tmp = !!body ? String(body): null;

        // if (tmp) {
        //     return (
        //         <View style={styles.body}>
        //             <Text style={styles.bodyText} >{tmp}</Text>
        //         </View>
        //     );
        // }


        return (
            <View style={styles.body}>
                { tmp ? <Text style={styles.bodyText}>{tmp}</Text> : this.props.children}
            </View>
        );
    }

    getFooter() {
        const styles = ConfirmModal.styles;
        const { cancelCallback, confirmCallback, autoCloseOnPress } = this.props;
        let confirmVel = null,
            cancelVel = null,
            hasTwoBtns = !!(confirmCallback && cancelCallback);

        if (confirmCallback) {
            confirmVel = <TouchableHighlight
                key="confirm"
                underlayColor={colors.bgBase}
                style={[
                    styles.btnConfirmWrapper,
                    { borderLeftWidth: (hasTwoBtns ? 1 : 0) * px, borderLeftColor: border.color }
                ]}
                onPress={() => {
                    confirmCallback();
                    autoCloseOnPress && this.close();
                }}>
                <Text style={styles.btnConfirmText}>{this.props.confirmTitle}</Text>
            </TouchableHighlight>;
        }

        if (cancelCallback) {
            cancelVel = <TouchableHighlight
                key="cancel"
                underlayColor={colors.bgBase}
                style={styles.btnCancelWrapper}
                onPress={() => {
                    cancelCallback();
                    autoCloseOnPress && this.close();
                }}>
                <Text style={styles.btnCancelText}>{this.props.cancelTitle}</Text>
            </TouchableHighlight>;
        }

        return (
            <View style={styles.footer}>
                {cancelVel}
                {confirmVel}
            </View>
        );
    }

    render() {
        return null;
    }
}