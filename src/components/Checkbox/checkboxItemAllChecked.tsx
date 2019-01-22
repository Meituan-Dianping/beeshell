import React from 'react'
import {
  View
} from 'react-native'
import { Icon } from '../Icon'
import CheckboxItem from './CheckboxItem'
import styles from './styles'

enum ICON_POSITION {
  LEFT = 'left',
  RIGHT = 'right'
}

export default class CheckboxAllChecked extends CheckboxItem {

  static defaultProps = {
    label: '全选',
    trueValue: null,
    disabled: false,
    checked: false,
    hasLine: true,
    iconPosition: ICON_POSITION.LEFT,
    emitOneChange: () => { return },
    emitAllChange: () => { return }
  }

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      halfAllChecked: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked
      })
    }

    if (nextProps.halfAllChecked !== this.props.halfAllChecked) {
      this.setState({
        halfAllChecked: nextProps.halfAllChecked
      })
    }
  }

  /**
   * checkboxItem点击事件回调
   * @returns
   */
  handlePress = () => {
    if (this.state.disabled) return
    let shouldChecked = false
    let halfAllChecked = false

    // 默认反转状态
    shouldChecked = !this.state.checked

    // 如果半选强制变成 选择状态
    if (this.state.halfAllChecked) {
      shouldChecked = true
      halfAllChecked = false
    }

    this.setState({
      checked: shouldChecked,
      halfAllChecked: halfAllChecked
    }, () => {
      this.props.emitAllChange && this.props.emitAllChange(shouldChecked)
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
      iconView = renderIcon(disabled, checked)
    }
    return iconView
  }

  /**
   * 根据状态判断如何显示icon
   *
   * @param {bool} disabled
   * @param {bool} checked
   * @returns
   * @memberof CheckboxItem
   */
  renderStatusIcon = (disabled, checked, iconPosition) => {
    const styleArray: any[] = [styles.icon]
    const { halfAllChecked } = this.state
    // 获取自定义icon，如果没有返回null
    let iconView = this.renderCustomerIcon(disabled, checked)
    // 如果没有自定义icon，则添加默认样式
    if (!iconView) {
      styleArray.push(styles.iconDefault)
      if (disabled) {
        styleArray.push(styles.iconDisabled)
      }
      // 选中并且不是disabled 状态
      if (checked || halfAllChecked) {
        styleArray.push(styles.iconChecked)
      }
      if (iconPosition === ICON_POSITION.LEFT) {
        styleArray.push(styles.iconLeftPosition)
      }

      if (checked) {
        iconView = <View style={styles.iconView as any}><Icon type={'check'} size={13} tintColor={'#333'}/></View>
      } else if (!checked && halfAllChecked) {
        // halfAllChecked 放在后面判断
        iconView = <View style={styles.iconView as any}><Icon type={'minus'} size={13} tintColor={'#333'}/></View>
      }
    }

    return (
      <View style={styleArray}>
        {iconView}
      </View>
    )
  }

  render () {
    return super.render()
  }
}
