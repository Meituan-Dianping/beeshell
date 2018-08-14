import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CheckboxPropTypes } from './PropTypes'
import { View, Text, StyleSheet, PixelRatio } from 'react-native'
import CheckboxAllChecked from './checkbox-allChecked'
import { colors } from '../../common/styles/varibles'

const unit = {
  onePx: 1 / PixelRatio.get(),
};

const styles = StyleSheet.create({
	container: {
        flexDirection: 'column',
	},
	allChecked:{
		borderTopColor: colors.grayLightest,
		borderTopWidth: unit.onePx,
		backgroundColor: '#E0EEFF',		
	},
	children: {
		backgroundColor: '#fff',
		// borderTopColor: colors.grayLightest,
		// borderTopWidth: unit.onePx,
		// borderBottomColor: colors.grayLightest,
		// borderBottomWidth: unit.onePx,
	},
	title: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	titleText:{
		fontSize: 16,
		color: colors.grayDark,
	},
});

class Checkbox extends Component {
	static propTypes = CheckboxPropTypes;
	static displayName = 'Checkbox';
	static defaultProps = {
		label: null,
		checkedValues: [],
		showAllChecked: false,
		onChange: () => {},
		iconPosition: 'left',
		min: 0,
		max: undefined,
		selectedColor: colors.brandPrimary,
	}

	/**
	 * 实现和Form.Item的默认通讯
	 * 用户不用手动将 prop.onChange 和 Form.Item 
	 * 
	 * @static
	 * @memberof Checkbox
	 */
	static contextTypes = {
    emitValueChange: PropTypes.func,
  };

	// 需要主动触发的 event
	static childContextTypes = {
		emitOneChange: PropTypes.func.isRequired,
		emitAllChange: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			checkedValues: props.checkedValues,
			halfAllChecked: false, // 全选半选
			allChecked: false, // 全选不选中
		}
		this.checkedValues = [];
		this.initItemValus = [];
		this.handleValueChange = this.handleValueChange.bind(this);
		this.handleAllChange = this.handleAllChange.bind(this);
		this.refreshAllCheckedOrHalf = this.refreshAllCheckedOrHalf.bind(this);
		this.renderTitleView = this.renderTitleView.bind(this);
	}

	componentDidMount() {
		const self = this;
		self.childCount = 0;
		React.Children.map(this.props.children, function (child) {
			if (child.type.displayName === 'CheckboxItem') {
				self.checkValueRepeat(child.props);
				self.childCount ++;
			}
		});
		if(this.props.showAllChecked) {
			this.refreshAllCheckedOrHalf();
		}
	}

	// 在刷新一次全选状态
	// selectAll 和 默认选中之间 时 全选状态调整
	refreshAllCheckedOrHalf() {
		if(this.initItemValus.length === this.childCount) {
			if(this.checkedValues.length < this.initItemValus.length){
				this.setState({
					halfAllChecked: true,
					allChecked: false,					
				})			
			} else {
				this.setState({
					allChecked: true,
					halfAllChecked: false,			
				})
			}
		}
	}
	
	componentWillReceiveProps(nextProps) {
		const self = this;
		// 用户再次修改 props.checkedValues 的时候
		if(nextProps.checkedValues !== this.props.checkedValues ) {
			console.log('componentWillReceiveProps',nextProps.checkedValues);
			this.setState({
				checkedValues: nextProps.checkedValues
			}, (state) => {
				this.checkedValues = nextProps.checkedValues;
				if(this.props.showAllChecked) {
					this.refreshAllCheckedOrHalf();
				}
			})
		}
	}

	getChildContext() {
		return {
			emitOneChange: this.handleValueChange,
			emitAllChange: this.handleAllChange,
		};
	}

	/**
	 * 处理子元素的点击
	 * 
	 * @param {number} index 
	 * @param {bool} checked 
	 * @memberof Checkbox
	 */
	handleValueChange(value, checked) {
		// 使用 this.checkedValues 因为 state.checkedValues 不是立即生效

		this.checkedValues = this.state.checkedValues.slice(0);
		const idx = this.checkedValues.indexOf(value);
		if(checked) {
			if (idx > -1) {
				// donothing
			} else {
				if(this.props.max && this.checkedValues.length + 1 > this.props.max) {
					// donothing
				} else {
					this.checkedValues.push(value);									
				}
			}
		} else {
			if (idx > -1) {
				if(this.props.min && this.checkedValues.length - 1 < this.props.min){
					// donothing
				} else {
					this.checkedValues.splice(idx, 1);					
				}
			}
		}

		if (this.checkedValues.length === 0) {
			this.setState({
				allChecked: false,
				halfAllChecked: false,				
			})
		} else {
			if(this.checkedValues.length < this.initItemValus.length){
				this.setState({
					halfAllChecked: true,
					allChecked: false,					
				})			
			} else {
				this.setState({
					allChecked: true,
					halfAllChecked: false,			
				})
			}
		}

		// 更新UI
		this.setState({
			checkedValues: this.checkedValues,
		})

		this.props.onChange && this.props.onChange(this.checkedValues)
		
		// 通知Form.Item改变
    if (this.context.emitValueChange) {
      this.context.emitValueChange(this.checkedValues);
    }
	}

	/**
	 * 响应全选 / 全不选
	 * 将初始化的全部值 => checkedValues
	 * 
	 * @param {any} allChecked 
	 * @memberof Checkbox
	 */
	handleAllChange(allChecked){
		// allChecked
		// 为了触发 render 
		// 将初始化值 clone 赋予 checkedValues
		const _initItemValus = allChecked ? this.initItemValus.slice(0) : []

		this.setState({
			checkedValues: _initItemValus,
			halfAllChecked: false ,
			allChecked: allChecked,
		})

		this.props.onChange && this.props.onChange(_initItemValus)
		
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
	 * @memberof Checkbox
	 */
	checkValueRepeat(props) {
		const { label, trueValue } = props;
		const _label = trueValue || label;
		// TODO: 放在didMount 中 变成一次性的
		const idx = this.initItemValus.indexOf(_label);
		if(idx > -1){
			throw new Error('Checkbox.Item has repeated label or trueValue')			
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
	 * @memberof Checkbox
	 */

	checkValueChecked(props) {
		// debugger;
		const { label, trueValue } = props;
		const _label = trueValue || label;
		const idx = this.state.checkedValues.indexOf(_label);
		// console.log('checkValueChecked', _label, idx)
		return idx > -1 ? true : false;
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

		const childrenCount = React.Children.count(this.props.children);

		let AllCheckedView = this.props.showAllChecked 
			? <View style={styles.allChecked}>
					<CheckboxAllChecked 
						halfAllChecked={this.state.halfAllChecked}
						checked={this.state.allChecked}
						label='全选'
						iconPosition={this.props.iconPosition} 
						hasLine={false}
						key={'all'}
						selectedColor={this.props.selectedColor} />
				</View> 
			: null;
		return (
			<View style={[styles.container, this.props.style]}>
				{this.renderTitleView()}
				{AllCheckedView}
				<View style={styles.children}>
					{
						React.Children.map(this.props.children, function (child, index) {
							// 需要子组件自己定义了 displayName
							if (child.type.displayName === 'CheckboxItem') {
								const checked = self.checkValueChecked(child.props);
								return React.cloneElement(child, {
										key: index,
										checked: checked,
										iconPosition: self.props.iconPosition,
										selectedColor: self.props.selectedColor
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

Checkbox.propTypes = CheckboxPropTypes;

export default Checkbox;