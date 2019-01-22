import React, { Component, ReactElement, ReactChild } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  RegisteredStyle
  } from 'react-native'
import CheckboxAllChecked from './CheckboxItemAllChecked'
import checkboxStyle from './styles'
import variables from '../../common/styles/variables'
import CheckboxItem from './CheckboxItem'
import { FormItemConsumer } from '../Form/formItemContext'

interface Props {
  // 标题
  label?: string | PropTypes.ReactNodeLike,
  // 预先设定的选中值
  checkedValues?: any[],
  // label对齐方式
  iconPosition?: 'left' | 'right',
  // min 最少可选数量
  min?: number,
  // max 最多可选数量
  max?: number,
  // onChange(Array) 有数值变化的回调,参数是数组
  onChange?: (values: any[]) => void,
  // 是否有全选按钮
  showAllChecked?: boolean,
  children: ReactChild[] | ReactChild,
  style?: ViewStyle | RegisteredStyle<ViewStyle>,
  renderItem?: (checked: boolean, disabled: boolean, index: number) => ReactElement<any>,
  renderItemIcon?: (checked: boolean, disabled: boolean, index: number) => ReactElement<any>
}

interface State {
  checkedValues: any[],
  halfAllChecked: boolean,
  allChecked: boolean
}

const styles = StyleSheet.create<any>(checkboxStyle)

export default class Checkbox extends Component<Props, State> {

  checkedValues: any[]
  initItemValus: any[]
  childCount: number
  formItemContext = null
  static displayName = 'Checkbox'
  static Item: any

  static defaultProps = {
    label: null,
    checkedValues: [],
    showAllChecked: false,
    onChange: () => { return },
    iconPosition: 'left',
    min: 0,
    max: undefined,
    selectedColor: variables.mtdBrandPrimary
  }

  constructor (props) {
    super(props)
    this.state = {
      checkedValues: props.checkedValues,
      halfAllChecked: false, // 全选半选
      allChecked: false // 全选不选中
    }
    this.checkedValues = []
    this.initItemValus = []
  }

  componentDidMount () {
    this.childCount = 0
    React.Children.map(this.props.children,(child) => {
      if ((child as any).type.displayName === 'CheckboxItem') {
        this.checkValueRepeat((child as ReactElement<CheckboxItem>).props)
        this.childCount ++
      }
    })
    if (this.props.showAllChecked) {
      this.refreshAllCheckedOrHalf()
    }
  }

  // 在刷新一次全选状态
  // selectAll 和 默认选中之间 时 全选状态调整
  refreshAllCheckedOrHalf = () => {
    if (this.initItemValus.length === this.childCount) {
      if (this.checkedValues.length < this.initItemValus.length) {
        if (this.checkedValues.length === 0) {
          this.setState({
            halfAllChecked: false,
            allChecked: false
          })
        } else {
          this.setState({
            halfAllChecked: true,
            allChecked: false
          })
        }
      } else {
        this.setState({
          halfAllChecked: false,
          allChecked: true
        })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    // 用户再次修改 props.checkedValues 的时候
    if (nextProps.checkedValues !== this.props.checkedValues) {
      this.setState({
        checkedValues: nextProps.checkedValues
      }, () => {
        this.checkedValues = nextProps.checkedValues
        if (this.props.showAllChecked) {
          this.refreshAllCheckedOrHalf()
        }
      })
    }
  }

  /**
   * 处理子元素的点击
   * @param {number} index
   * @param {bool} checked
   * @memberof Checkbox
   */
  handleValueChange = (value, checked) => {
    // 使用 this.checkedValues 因为 state.checkedValues 不是立即生效
    this.checkedValues = this.state.checkedValues.slice(0)
    const idx = this.checkedValues.indexOf(value)
    if (checked) {
      if (idx > -1) {
        // donothing
      } else {
        if (this.props.max && this.checkedValues.length + 1 > this.props.max) {
          // donothing
        } else {
          this.checkedValues.push(value)
        }
      }
    } else {
      if (idx > -1) {
        if (this.props.min && this.checkedValues.length - 1 < this.props.min) {
          // donothing
        } else {
          this.checkedValues.splice(idx, 1)
        }
      }
    }
    if (this.checkedValues.length === 0) {
      this.setState({
        allChecked: false,
        halfAllChecked: false
      })
    } else {
      if (this.checkedValues.length < this.initItemValus.length) {
        this.setState({
          halfAllChecked: true,
          allChecked: false
        })
      } else {
        this.setState({
          allChecked: true,
          halfAllChecked: false
        })
      }
    }

    // 更新UI
    this.setState({
      checkedValues: this.checkedValues
    })

    this.props.onChange && this.props.onChange(this.checkedValues)

    // 通知Form.Item改变
    if (this.formItemContext && this.formItemContext.emitValueChange) {
      this.formItemContext.emitValueChange(this.checkedValues)
    }
  }

  /**
   * 响应全选 / 全不选
   * 将初始化的全部值 => checkedValues
   * @param {any} allChecked
   * @memberof Checkbox
   */
  handleAllChange = (allChecked) => {
    // allChecked
    // 为了触发 render
    // 将初始化值 clone 赋予 checkedValues
    const _initItemValus = allChecked ? this.initItemValus.slice(0) : []

    this.setState({
      checkedValues: _initItemValus,
      halfAllChecked: false ,
      allChecked: allChecked
    })

    this.props.onChange && this.props.onChange(_initItemValus)
	  // 通知Form.Item改变
    if (this.formItemContext && this.formItemContext.emitValueChange) {
      this.formItemContext.emitValueChange(this.checkedValues)
    }
  }

  /**
   * 是否有重复的项目, one shot
   * 仅在执行一次
   * @param {any} props
   * @memberof Checkbox
   */
  checkValueRepeat (props) {
    const { label, trueValue } = props
    const _label = trueValue || label
    const idx = this.initItemValus.indexOf(_label)
    if (idx > -1) {
      throw new Error('Checkbox.Item has repeated label or trueValue')
    } else {
      this.initItemValus.push(_label)
    }
  }

  /**
   * 检查是否默认选中
   * @param {any} props
   * @returns
   * @memberof Checkbox
   */

  checkValueChecked (props) {
    // debugger;
    const { label, trueValue } = props
    const _label = trueValue || label
    const idx = this.state.checkedValues.indexOf(_label)
    return idx > -1 ? true : false
  }

  /**
   * 渲染TitleView
   * @returns
   * @memberof Radio
   */
  renderTitleView = () => {
    if (!this.props.label) {
      return null
    }
    // label string or a ReactElement
    const titleTextView = typeof this.props.label === 'string'
      ? <Text style={styles.titleText}>
          {this.props.label}
        </Text>
      : this.props.label

    return (
      <View style={styles.title}>
        {titleTextView}
      </View>
    )
  }

  render () {
    const {
      showAllChecked,
      iconPosition,
      children,
      style,
      renderItem,
      renderItemIcon
    } = this.props
    const { allChecked, halfAllChecked } = this.state
    let AllCheckedView = showAllChecked
      ? <View style={styles.allChecked}>
          <CheckboxAllChecked
            halfAllChecked={halfAllChecked}
            checked={allChecked}
            label='全选'
            trueValue=''
            iconPosition={iconPosition}
            hasLine={false}
            key={'all'}
            emitAllChange={this.handleAllChange}
            renderContent={renderItem ? (checked, disabled) => renderItem.call(this, checked, disabled, -1) : null}
            renderIcon={renderItemIcon ? (checked, disabled) => renderItemIcon.call(this, checked, disabled, -1) : null}
          />
        </View>
      : null
    return (
      <View style={[styles.container, style]}>
        <FormItemConsumer>
          { (contextObject) => {
            this.formItemContext = contextObject
            return (null)
          }}
        </FormItemConsumer>
        <View>
          {this.renderTitleView()}
          {AllCheckedView}
          <View style={styles.children}>
            {
              React.Children.map(children, (child, index) => {
                // 需要子组件自己定义了 displayName
                if ((child as any).type.displayName === 'CheckboxItem') {
                  const childProps = (child as any).props
                  const checked = this.checkValueChecked(childProps)
                  const {
                    renderContent,
                    renderIcon
                   } = childProps
                  return React.cloneElement((child as any), {
                    key: index,
                    checked,
                    iconPosition,
                    emitOneChange: this.handleValueChange,
                    renderContent: renderContent ? renderContent : (renderItem ? (checked, disabled) => renderItem.call(this, checked, disabled, index) : null),
                    renderIcon: renderIcon ? renderIcon : (renderItemIcon ? (checked, disabled) => renderItemIcon.call(this, checked, disabled, index) : null)
                  })
                } else {
                  return React.cloneElement((child as any))
                }
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
