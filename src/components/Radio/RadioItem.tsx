import React, { Component, ReactElement } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ViewStyle
} from 'react-native'

import styles from './styles'
import variables from '../../common/styles/variables'
import styleUtils from '../../common/styles/utils'
import { FadeAnimated } from '../../common/animations'

interface RadioItemProps {
  style?: ViewStyle
  label?: string
  value: any
  disabled?: boolean
  checked?: boolean
  iconPosition?: 'left' | 'right'
  onChange: Function
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
  renderItem?: Function
}

export default class RadioItem extends Component<RadioItemProps> {
  static displayName = 'RadioItem'
  static defaultProps = {
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    iconPosition: 'right'
  }

  private animated: any
  constructor (props) {
    super(props)
    if (variables.radioEnableAnimated) {
      this.animated = new FadeAnimated({})
    }
  }

  componentDidMount () {
    this.animated && this.animated.toIn()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.animated && this.animated.toIn()
    }
  }

  handlePress = () => {
    if (this.props.disabled) {
      return
    }
    const value = this.props.value
    let checked = this.props.checked

    // 已经选中了就直接返回
    if (checked === true) {
      return
    }

    this.animated && this.animated.toIn()
    this.props.onChange && this.props.onChange(value)
  }

  renderIcon = (checked, iconPosition) => {
    const iconContainerStyle = {
      marginRight: iconPosition === 'left' ? 6 : null
    }

    const iconView = checked ? this.props.checkedIcon : this.props.uncheckedIcon
    let animatedStyle: any = {}
    if (variables.radioEnableAnimated) {
      animatedStyle = {
        transform: [{ scale: this.animated.getState().scale }],
        opacity: this.animated.getState().opacity
      }
    }

    return (
      <View style={iconContainerStyle}>
        <Animated.View
          style={animatedStyle}>
          {iconView}
        </Animated.View>
      </View>
    )
  }

  renderLabel = (checked) => {
    return (
      <Text
        style={[
          styles.radioItemLabel,
          checked ? [ styleUtils.textPrimaryDark, styleUtils.textBold ] : null
        ]}>
        {this.props.label}
      </Text>
    )
  }

  render () {
    const { disabled, checked, iconPosition, style, renderItem } = this.props

    return (
      <TouchableOpacity
        style={[
          style,
          {
            opacity: disabled ? variables.mtdOpacity : 1
          }
        ]}
        activeOpacity={variables.mtdOpacity}
        onPress={this.handlePress}>
        {
          typeof renderItem === 'function' ? renderItem(checked) :
          <View
            style={[
              styles.radioItemContainer,
              this.props.iconPosition === 'right' ? {
                flexDirection: 'row-reverse',
                justifyContent: 'space-between'
              } : null
            ]}
          >
            {this.renderIcon(checked, iconPosition)}
            {this.renderLabel(checked)}
          </View>
        }
      </TouchableOpacity>
    )
  }
}
