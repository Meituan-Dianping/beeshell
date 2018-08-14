import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioPropTypes } from './PropTypes'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../../common/styles/varibles'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    children: {
        backgroundColor: '#ffffff',
        // borderTopColor: colors.grayLightest,
        // borderTopWidth: 1,
        // borderBottomColor: colors.grayLightest,
        // borderBottomWidth: 1,
    },
    title: {
        paddingLeft: 15,
        minHeight: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleText:{
        fontSize: 14,
        color: colors.grayLight,
    },
});

class Radio extends Component {
    static propTypes = RadioPropTypes;
    static displayName = 'Radio';
    static defaultProps = {
        label: null,
        checkedValue: undefined,
        onChange: () => {},
        iconPosition: 'left',
        selectedColor: colors.brandPrimary,
    }

    static contextTypes = {
        emitValueChange: PropTypes.func,
    }

    // 需要主动触发的 event
    static childContextTypes = {
        emitOneChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedValue: props.checkedValue,
        }

        this.initItemValus = [];
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    componentDidMount() {
        const self = this;
        React.Children.map(this.props.children, function (child) {
            if (child.type.displayName === 'RadioItem') {
                self.checkValueRepeat(child.props);
            }
        });
    }

    getChildContext() {
        return {
            emitOneChange: this.handleValueChange,
        };
    }

    /**
     * 处理子元素的点击
     * 
     * @param {number} index 
     * @param {bool} checked 
     * @memberof Radio
     */
    handleValueChange(value, checked) {
        // 因为单选,必须选择一项

        // 无论是否选中, 都是checked的值
        let _value = checked ? value : value

        this.setState({
            checkedValue: _value,
        });

        this.props.onChange && this.props.onChange(_value)

        // 通知Form.Item改变
        if (this.context.emitValueChange) {
            this.context.emitValueChange(this.checkedValues);
        }
    }


    /**
     * 是否有重复的项目, one shot 
     * 仅在执行一次
     * 
     * @param {any} props 
     * @memberof Radio
     */
    checkValueRepeat(props) {
        const { label, trueValue } = props;
        const _label = trueValue == null ? label : trueValue;

        // TODO: 放在didMount 中 变成一次性的
        const idx = this.initItemValus.indexOf(_label);
        if(idx > -1){
            throw new Error('Radio.Item has repeated label or trueValue')
        } else {
            this.initItemValus.push(_label);
        }
        // console.log('checkValueRepeat', _label)
    }

    /**
     * 检查是否默认选中
     * 
     * @param {any} props 
     * @returns 
     * @memberof Radio
     */

    checkValueChecked(props) {
        // debugger;
        const { label, trueValue } = props;
        const _label = trueValue == null ? label : trueValue;
        return this.state.checkedValue === _label  ? true : false;
    }

    /**
     * 渲染TitleView
     * 
     * @returns 
     * @memberof Radio
     */
    renderTitleView() {
        if(!this.props.label) {
            return null;
        }
        // label string or a ReactElement
        const titleTextView = typeof this.props.label === 'string'
            ? <Text style={styles.titleText}>
                    {this.props.label}
                </Text>
            : this.props.label;

        return (
            <View style={styles.title}>
                {titleTextView}
            </View>
        )
    }

    render() {
        const self = this;

        return (
            <View style={[styles.container, this.props.style]}>
                {this.renderTitleView()}
                <View style={styles.children}>
                    {
                        React.Children.map(this.props.children, function (child, index) {
                            // 需要子组件自己定义了 displayName
                            if (child.type.displayName === 'RadioItem') {
                                const checked = self.checkValueChecked(child.props);
                                    return React.cloneElement(child, {
                                            key: index,
                                            iconPosition: self.props.iconPosition,
                                            selectedColor: self.props.selectedColor,
                                            checked: checked,
                                    });
                            } else {
                                return React.cloneElement(child)
                            }
                        })
                    }
                </View>
            </View>
        );
    }
}

Radio.propTypes = RadioPropTypes;

export default Radio;