import React, { Component, ReactChild } from 'react'
import { View } from 'react-native'
import radioStyles from './radioStyles'
import { FormItemConsumer } from '../Form/formItemContext'

interface RadioProps {
  // 对齐方式
  iconPosition?: 'left' | 'right',
  onChange: Function,
  children: ReactChild[],
  checkedValue: any
}

export default class Radio extends Component<RadioProps> {
  static Item = null
  static displayName = 'Radio'
  static defaultProps = {
    checkedValue: undefined,
    onChange: null,
    iconPosition: 'left'
  }

  formItemContext = null

  constructor (props) {
    super(props)
  }

  handleChange = (value) => {
    this.props.onChange && this.props.onChange(value)
    // 通知Form.Item改变
    if (this.formItemContext && this.formItemContext.emitValueChange) {
      this.formItemContext.emitValueChange(value)
    }
  }

  /**
   * 检查是否选中
   */
  verifyChecked (props) {
    let { value } = props
    return this.props.checkedValue === value ? true : false
  }

  renderChildren () {
    return React.Children.map(this.props.children, (child, index) => {
      // 需要子组件自己定义了 displayName
      if ((child as any).type.displayName === 'RadioItem') {
        const checked = this.verifyChecked((child as any).props)
        return React.cloneElement((child as any), {
          key: index,
          iconPosition: this.props.iconPosition,
          checked,
          onChange: this.handleChange
        })
      } else {
        return React.cloneElement((child as any))
      }
    })
  }

  render () {
    return (
      <View style={[radioStyles.container]}>
        <FormItemConsumer>
          { (contextObject) => {
            this.formItemContext = contextObject
            return (null)
          }}
        </FormItemConsumer>
        <View style={radioStyles.children}>
          { this.renderChildren() }
        </View>
      </View>
    )
  }
}
