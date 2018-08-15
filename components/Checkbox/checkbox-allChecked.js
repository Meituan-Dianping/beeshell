import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity, Dimensions } from 'react-native';
import { CheckboxItemPropTypes } from './PropTypes';
import CheckboxItem from './checkbox-item';
import styles from './styles';


const ICON_POSITION_LEFT = 'left'
const ICON_POSITION_RIGHT = 'right'

class CheckboxAllChecked extends CheckboxItem {
	static propTypes = CheckboxItemPropTypes;
	static displayName = 'CheckboxItem';
	static defaultProps = {
    label: '全选',
		trueValue: null,
		disabled: false,
		checked: false,
		hasLine: true,
		iconPosition: ICON_POSITION_LEFT,
	}

	static contextTypes = {
    emitAllChange: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
      checked: false,
      halfAllChecked: false,
		}

		this.handlePress = this.handlePress.bind(this);
	}

  componentWillReceiveProps(nextProps) {
    if(nextProps.checked !== this.props.checked) {
			this.setState({
				checked: nextProps.checked 
			})
    }
    
    if(nextProps.halfAllChecked !== this.props.halfAllChecked) {
			this.setState({
        halfAllChecked: nextProps.halfAllChecked
      })
		}
  }    
	handlePress() {
		if (this.state.disabled) return;
    // console.log('all checked handlePress');

    let shouldChecked,halfAllChecked=false

    // 默认反转状态
    shouldChecked = !this.state.checked;

    // 如果半选强制变成 选择状态
    if(this.state.halfAllChecked) {
      shouldChecked = true
      halfAllChecked = false
    }
    

		this.setState({
      checked: shouldChecked,
      halfAllChecked: halfAllChecked,
		}, () => {
			this.context.emitAllChange && this.context.emitAllChange(shouldChecked);			
		})
	}
	/**
	 * 根据状态判断如何显示icon
	 * 
	 * @param {bool} disabled 
	 * @param {bool} checked 
	 * @returns 
	 * @memberof CheckboxItem
	 */
	renderStatusIcon(disabled, checked) {
		let styleArray = [styles.icon];
		let iconView = checked ? <Image style={styles.checkedIcon} source={require('./checkedIcon.png')} /> : null;

		if (disabled) {
			styleArray.push(styles.iconDisabled)
		} else {
			styleArray.push(styles.iconDefault)
		}

		// 选中并且不是disabled 状态
		if (checked && !disabled) {
			styleArray.push(this.dynamicStyle.iconChecked)
    }

    // halfAllChecked 放在后面判断
    if(this.state.halfAllChecked) {
      iconView = <Image style={styles.checkedIcon} source={require('./halfCheckedIcon.png')} /> ;
      styleArray.push(this.dynamicStyle.iconChecked)
    }

		return (
			<View style={styleArray}>
				{iconView}
			</View>
		)
	}

  render() {
		return super.render()
	}
}



export default CheckboxAllChecked;