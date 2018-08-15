import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RadioItemPropTypes } from './PropTypes';
import styles from './styles';
import { colors, padding } from '../../common/styles/varibles';

const ICON_POSITION_LEFT = 'left'
const ICON_POSITION_RIGHT = 'right'

class RadioItem extends Component {
    static propTypes = RadioItemPropTypes;
    static displayName = 'RadioItem';
    static defaultProps = {
        label: '选项',
        trueValue: null,
        disabled: false,
        checked: false,
        hasLine: false,
        iconPosition: ICON_POSITION_RIGHT,
    }

    static contextTypes = {
        emitOneChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.disabled,
            checked: props.checked,
        }

        this.handlePress = this.handlePress.bind(this);
        this.renderStatusIcon = this.renderStatusIcon.bind(this)
        this.renderLabelText = this.renderLabelText.bind(this)
        this.dynamicStyle = this.getDynamicStyle();
    }

    componentDidMount() {
        const {checked, trueValue, label} = this.props;
        // checked 模式下触发 emitOneChange
        if (checked) {
            const _label = trueValue || label;          
            this.context.emitOneChange && this.context.emitOneChange(_label, checked);                      
        }
    }

  // TODO: 这里可能没有这么复杂了 没有了全选
    componentWillReceiveProps(nextProps) {
        if(nextProps.checked !== this.state.checked) {
            this.setState({
                checked: nextProps.checked 
            })
        }

        if(nextProps.disabled !== this.state.checked) {
            this.setState({
                disabled: nextProps.disabled 
            })
        }
    }

    handlePress() {
        if (this.state.disabled) return;

        let checked = this.state.checked;
        this.setState({
            checked: !checked
        }, () => {
            const label = this.props.trueValue == null ? this.props.label : this.props.trueValue;
            this.context.emitOneChange && this.context.emitOneChange(label, !checked);
        })
    }

    getDynamicStyle() {
        return StyleSheet.create({
            iconChecked: {
                borderColor: this.props.selectedColor,
            },
        })
    }

    /**
     * 根据状态判断如何显示icon
     * 
     * @param {bool} disabled 
     * @param {bool} checked 
     * @returns 
     * @memberof RadioItem
     */
    renderStatusIcon(disabled, checked, iconPosition) {
        let styleArray = [styles.icon];
        let iconView = checked ? <Image style={styles.checkedIcon} source={require('./radioCheckedIcon.png')} /> : null;

        if (disabled) {
            styleArray.push(styles.iconDisabled)
        } else {
            styleArray.push(styles.iconDefault)
        }

        // 选中并且不是disabled 状态
        if (checked && !disabled) {
            styleArray.push(this.dynamicStyle.iconChecked)
        }

        if (iconPosition === ICON_POSITION_LEFT) {
            styleArray.push({
                marginRight: padding.horizontalBase
            });
        }


        return (
            <View style={styleArray}>
                {iconView}
            </View>
        )
    }

    /**
     * 渲染Label 文字或者元素
     * 
     * @param {any} disabled 
     * @param {any} checked 
     * @returns 
     * @memberof RadioItem
     */
    renderLabelText(disabled, checked) {
        /**
         * label string or a ReactElement
         */
        const titleTextView = typeof this.props.label === 'string'
        ? <Text style={[
                styles.labelText,
                checked ? { color: this.props.color || colors.brandPrimary } : null,
                disabled ? { color: colors.grayLighter } : null,
            ]}>
                {this.props.label}
            </Text>
        : this.props.label
        
        return titleTextView;
    }

    render() {
        
        return (
            <View style={this.props.hasLine ? [styles.container, styles.hasLine, this.props.style] : [styles.container,this.props.style]}>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={[ styles.touchContainer, this.props.iconPosition === ICON_POSITION_RIGHT ? { flexDirection: 'row-reverse', justifyContent: 'space-between'} : null]}>
                        {this.renderStatusIcon(this.state.disabled, this.state.checked, this.props.iconPosition)}
                        <View style={styles.label}>
                            {this.renderLabelText(this.state.disabled, this.state.checked)}
                        </View>
                    </View> 
                </TouchableOpacity>
            </View>
        );
    }
}



export default RadioItem;