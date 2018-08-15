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
import Radio from '../../components/Radio';


const screen = Dimensions.get('window');
const px = 1 / PixelRatio.get();

export default class Actionsheet extends ParentModal {
    static defaultProps = {
        ...ParentModal.defaultProps,
        width: screen.width,

        cancelable: true,
        heading: null,
        title: '标题',
        body: 'Hello world!',
        cancelCallback: null,
        confirmCallback: null,
    };

    static styles = StyleSheet.create({
        container: {
            backgroundColor: colors.bgGray,
        },
        heading: {
            borderBottomWidth: 1 * px,
            borderBottomColor: border.color,
            backgroundColor: '#fff',
        },

        title: {
            paddingVertical: padding.verticalBase,
            paddingHorizontal: padding.horizontalBase,

            textAlign:'center',
            fontSize: fontSize.base,
            color: colors.grayLighter,

        },

        body: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },

        item: {
            borderBottomWidth: 1 * px,
            borderBottomColor: border.color,
            backgroundColor: '#fff',
        },

        itemText: {
            paddingVertical: padding.verticalSmall,
            paddingHorizontal: padding.horizontalBase,

            fontSize: fontSize.h5,
            textAlign:'center',
            color: colors.gray,
        },

    });

    constructor(props) {
        super(props);
    }

    getHeading() {
        const styles = Actionsheet.styles;

        return (
                this.props.heading && React.isValidElement(this.props.heading) ?
                this.props.heading :
                <View style={styles.heading}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
        );
    }

    getBody() {
        const { options, textKey } = this.props;
        const styles = Actionsheet.styles;
        return (
            <View style={styles.body}>
                {
                    options.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.item]}
                                onPress={() => {
                                    this.close().then(() => {
                                        this.props.confirmCallback && this.props.confirmCallback(item, index);
                                    }).catch((e) => {
                                        console.log(e);
                                    });
                                }}>
                                <Text style={styles.itemText}>{item[textKey]}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }


    getContent() {
        const styles = Actionsheet.styles;
        const inner = <View style={styles.container}>
            {this.getHeading()}

            {this.getBody()}

            <TouchableOpacity
                style={[styles.item, { marginTop: 10 }]}
                onPress={() => {
                    this.close().then(() => {
                        this.props.cancelCallback && this.props.cancelCallback();
                    }).catch((e) => {
                        console.log(e);
                    });
                }}>
                <Text style={styles.itemText}>取消</Text>
            </TouchableOpacity>
        </View>;

        return ParentModal.prototype.getContent.call(this, inner);
    }
}