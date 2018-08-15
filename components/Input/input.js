/*
 * @Author: mengqian02 
 * @Date: 2017-10-11 11:26:57 
 * @Last Modified by: mengqian02
 * @Last Modified time: 2018-04-23 17:17:40
 */

import React, { Component } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Platform, Keyboard } from 'react-native'
// maybe svg icon
import { InputPropTypes } from './PropTypes';
import PropTypes from 'prop-types';

import { colors, padding, border, fontSize, formControl } from '../../common/styles/varibles';
import styleUtils from '../../common/styles/utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputStyle: {
        height: formControl.labelHeight,
        padding: 0,
        fontSize: fontSize.base,
    },

    inputDel: {
        width: 30,
        height: formControl.labelHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputDelImg: {
        width: 16,
        height: 16,
    },
})

class InputItem extends Component {
    static propTypes = InputPropTypes;
    static displayName = 'Input';
    static defaultProps = {
        // 自己设定的
        checkedValue: undefined,
        onChange: () => { },
        textAlign: 'left',
        // TextInput 自带的
        autoFocus: false,
        placeholder: '',
        autoCorrect: true,
        keyboardType: 'default',
        maxLength: null,
        placeholderTextColor: '#c3c3c3',
        editable: true,
        clearButtonMode: 'while-editing',
        value: null,
        throttle: null,
        autoCapitalize: 'none',
    }

    static contextTypes = {
        emitValueChange: PropTypes.func,
        emitValueBlur: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            isediting: false
        };

        this.throttle = this.throttleMemoize(Number(this.props.throttle) || 0).bind(this);
        if (this.props.throttleCallback) {
            this.throttleCallback = this.throttle(this.props.throttleCallback);
        }

        this.delayIsediting = this.delayTaskMemoize(3000);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.value != null && this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    throttleMemoize(wait) {
        let timeoutId = null;

        return function (task) {

            return function () {
                const args = [].slice.call(arguments, 0);

                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    task.apply(null, args);
                }, wait);
            }
        }
    }

    handleChange(value) {
        this.setState({
            value: value
        });

        if(this.props.onChange) {
            this.props.onChange(value)
        }

        if (this.context.emitValueChange) {
            this.context.emitValueChange(value)
        }

        if (this.props.throttleCallback) {
            this.throttleCallback(value);
        }
    }

    handleBlur() {
        if(this.props.onBlur) {
            this.props.onBlur()
        }

        if (this.context.emitValueBlur) {
            this.context.emitValueBlur(this.state.value)
        }
    }

    handleFocus() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    delayTaskMemoize(duration) {
        let timeoutId;

        return {
            cancel() {
                clearTimeout(timeoutId);
            },

            delay(task) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    task();
                }, duration || 0);
            }
        }
    }

    getTextAlignStyle() {
        return {
            textAlign: this.props.textAlign
        };
    }

    renderiOS(){
        const textAlignStyle = this.getTextAlignStyle();

        return(
            <View style={[styles.container, {flexDirection: 'column', justifyContent: 'center'}]}>
                <TextInput
                    {...this.props}
                    style={[styles.inputStyle, textAlignStyle, this.props.style]}
                    onChange={() => {}}
                    value={this.state.value}
                    onChangeText={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                />
            </View>
        )
    }

    renderAndroid(){
        const textAlignStyle = this.getTextAlignStyle();

        return(
            <View style={[styles.container, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                    {...this.props}
                    style={[styles.inputStyle, textAlignStyle, { flex: 1}, this.props.style]}
                    onChange={() => {}}
                    value={this.state.value}
                    onChangeText={this.handleChange.bind(this)}

                    onFocus={() => {
                        this.handleFocus();
                        this.delayIsediting.cancel();
                        this.setState({
                            isediting: true
                        });
                    }}
                    onBlur={() => {
                        this.handleBlur();
                        this.delayIsediting.delay(() => {
                            this.setState({
                                isediting: false
                            });
                        });
                    }}
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                    style={[
                        styles.inputDel,
                        this.props.clearButtonMode && this.state.value && this.state.isediting ? null : styleUtils.hidden
                    ]}
                    onPress={() => {
                        console.log('press delete icon')
                        this.handleChange('');
                    }}>

                    <Image
                        style={[styles.inputDelImg, this.props.clearButtonMode && this.state.value && this.state.isediting ? null : styleUtils.hidden]}
                        resizeMode={'stretch'}
                        source={require('./img/fa-times-circle.png')}
                    />
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        if(Platform.OS === 'ios'){
            return this.renderiOS();
        } else {
            return this.renderAndroid();
        }
    }
}


export default InputItem;