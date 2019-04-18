import React, { Component, ReactChild, ReactElement } from 'react'
import { View } from 'react-native'
import styles from './styles'
import { Icon } from '../Icon'
import variables from '../../common/styles/variables'

interface RadioProps {
  style?: any
  iconPosition?: 'left' | 'right'
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
  value?: any
  onChange?: Function
  children?: ReactChild[] | ReactChild
}

export default class Radio extends Component<RadioProps> {
  static Item?: any // 选项子元素
  static displayName = 'Radio'
  static defaultProps = {
    style: {},
    value: undefined,
    onChange: null,
    iconPosition: 'left',
    checkedIcon: <Icon type='check' size={variables.mtdFontSizeM} tintColor={variables.mtdBrandPrimaryDark} />,
    uncheckedIcon: <View style={{ width: variables.mtdFontSizeM, height: variables.mtdFontSizeM }}></View>
  }

  constructor (props) {
    super(props)
  }

  handleChange = (value) => {
    this.props.onChange && this.props.onChange(value)
  }

  /**
   * 检查是否选中
   */
  verifyChecked (props) {
    let { value } = props
    return this.props.value === value ? true : false
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
          onChange: this.handleChange,
          checkedIcon: this.props.checkedIcon,
          uncheckedIcon: this.props.uncheckedIcon
        })
      } else {
        return React.cloneElement((child as any))
      }
    })
  }

  render () {
    return (
      <View style={[styles.radioContainer, this.props.style]}>
        { this.renderChildren() }
      </View>
    )
  }
}
