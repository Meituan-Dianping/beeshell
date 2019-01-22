import React, { Component, ReactElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  RegisteredStyle
} from 'react-native'
import { Icon } from '../Icon'
import checkboxItemStyle from './styles'
import variables from '../../common/styles/variables'

enum ICON_POSITION {
  LEFT = 'left',
  RIGHT = 'right'
}

interface Props {
  // 显示文本
  label: string | ((checked: any, disabled: any) => ReactElement<any> | string),
  // 选中时的值, 默认label
  trueValue: any,
  // 是否禁用
  disabled?: boolean,
  // 是否勾选
  checked?: boolean,
  halfAllChecked?: boolean,
  // 是否显示下划线
  hasLine?: boolean,
  iconPosition?: 'left' | 'right',
  style?: ViewStyle | RegisteredStyle<ViewStyle>,
  emitOneChange?: (label: any, checked: any) => void,
  emitAllChange?: (shouldChecked: any) => void,
  renderContent?: (checked: boolean, disabled: boolean, index?: number) => ReactElement<any>
  renderIcon?: (checked: boolean, disabled: boolean) => ReactElement<any>
}

interface State {
  checked?: boolean,
  disabled?: boolean,
  halfAllChecked?: boolean
}

const styles = StyleSheet.create<any>(checkboxItemStyle)

export default class CheckboxItem extends Component<Props, State> {

  displayName: string

  static displayName = 'CheckboxItem'
  static defaultProps = {
    label: '选项',
    trueValue: null,
    disabled: false,
    checked: false,
    hasLine: false,
    iconPosition: ICON_POSITION.LEFT,
    emitOneChange: () => { return },
    emitAllChange: () => { return }
  }

  constructor (props) {
    super(props)
    this.state = {
      disabled: props.disabled,
      checked: props.checked
    }
  }

  componentDidMount () {
    const { checked, trueValue } = this.props
    // checked 模式下触发 emitOneChange
    if (checked) {
      this.props.emitOneChange && this.props.emitOneChange(trueValue, checked)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked
      })
    }

    if (nextProps.disabled !== this.state.checked) {
      this.setState({
        disabled: nextProps.disabled
      })
    }
  }

  /**
   * checkboxItem点击事件回调
   * @returns
   */
  handlePress = () => {
    if (this.state.disabled) return

    let checked = this.state.checked
    this.setState({
      checked: !checked
    }, () => {
      this.props.emitOneChange && this.props.emitOneChange(this.props.trueValue, !checked)
    })
  }

  /**
   * 自定义icon
   * @param {bool} disabled
   * @param {bool} checked
   * @returns
   * @memberof CheckboxItem
   */
  renderCustomerIcon = (disabled, checked) => {
    const { renderIcon } = this.props
    let iconView = null
    if (renderIcon) {
      iconView = renderIcon(checked, disabled)
    }
    return iconView
  }

  /**
   * 根据状态判断如何显示icon
   * @param {bool} disabled
   * @param {bool} checked
   * @returns
   * @memberof CheckboxItem
   */
  renderStatusIcon = (disabled, checked, iconPosition) => {
    const styleArray: any[] = [styles.icon]
    // 获取自定义icon，如果没有返回null
    let iconView = this.renderCustomerIcon(disabled, checked)
    // 如果没有自定义icon，则添加默认样式
    if (!iconView) {
      styleArray.push(styles.iconDefault)
      if (disabled) {
        styleArray.push(styles.iconDisabled)
      }
      // 选中并且不是disabled 状态
      if (checked) {
        styleArray.push(styles.iconChecked)
      }
      if (iconPosition === ICON_POSITION.LEFT) {
        styleArray.push(styles.iconLeftPosition)
      }
    }
    if (!iconView && checked) {
      iconView = <View style={styles.iconView}><Icon type={'check'} size={13} tintColor={'#333'}/></View>
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
  renderLabelText (disabled, checked) {
    const { label } = this.props
    const titleTextView = typeof label === 'string'
    ? <Text style={[
      styles.labelText,
      checked ? { color: variables.mtdBrandPrimary } : null,
      disabled ? { color: variables.mtdGrayBase } : null
    ]}>
        {label}
      </Text>
    : label(checked, disabled)
    return titleTextView
  }

  render () {
    const { style, hasLine, iconPosition, renderContent } = this.props
    const { disabled, checked } = this.state
    if (renderContent) {
      return <TouchableOpacity onPress={this.handlePress} activeOpacity={1}>
        {renderContent(checked, disabled)}
      </TouchableOpacity>
    }
    return (
      <View style={[styles.container, hasLine ? styles.hasLine : {}, style]}>
        <TouchableOpacity onPress={this.handlePress} activeOpacity={1}>
          <View style={[ styles.touchContainer, iconPosition === ICON_POSITION.RIGHT ? { flexDirection: 'row-reverse', justifyContent: 'space-between' } : null]}>
            {this.renderStatusIcon(disabled, checked, iconPosition)}
            <View>
              {this.renderLabelText(disabled, checked)}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
