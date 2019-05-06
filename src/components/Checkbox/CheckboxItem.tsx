import React, { Component, ReactElement } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Animated
} from 'react-native'
import checkboxItemStyle from './styles'
import variables from '../../common/styles/variables'
import { FadeAnimated } from '../../common/animations'

const styles = StyleSheet.create<any>(checkboxItemStyle)
enum ICON_POSITION {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface CheckboxItemProps {
  style?: ViewStyle
  label?: string
  value?: any | null | undefined
  disabled?: boolean
  checked?: boolean
  iconPosition?: 'left' | 'right'
  onChange?: Function
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
  renderItem?: Function
}

export class CheckboxItem<T extends CheckboxItemProps, P > extends Component<T, any> {
  static displayName = 'CheckboxItem'
  static defaultProps = {
    style: {},
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    iconPosition: ICON_POSITION.LEFT,
    checkedIcon: null
  }
  animated: any

  constructor (props) {
    super(props)
    this.state = {
    }

    if (variables.checkboxEnableAnimated) {
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
    const { disabled, checked, value } = this.props
    if (this.props.disabled) {
      return
    }

    this.animated && this.animated.toIn()
    this.props.onChange && this.props.onChange(value, !checked)
  }

  renderIcon = () => {
    const { checked, iconPosition, checkedIcon, uncheckedIcon } = this.props
    const styleArray: any[] = []

    if (iconPosition === ICON_POSITION.LEFT) {
      styleArray.push(styles.iconLeftPosition)
    }

    const iconView = checked ? checkedIcon : uncheckedIcon

    let animatedStyle: any = {}
    if (variables.radioEnableAnimated) {
      animatedStyle = {
        transform: [{ scale: this.animated.getState().scale }],
        opacity: this.animated.getState().opacity
      }
    }

    return (
      <View style={styleArray}>
        <Animated.View style={animatedStyle}>
          {iconView}
        </Animated.View>
      </View>
    )
  }

  renderLabel () {
    const { label, checked } = this.props

    return (
      <Text
        style={[
          styles.checkboxLabel,
          checked ? { color: variables.mtdBrandPrimaryDark, fontWeight: 'bold' } : null
        ]}>
        {label}
      </Text>
    )
  }

  render () {
    const { style, disabled, iconPosition, checked, renderItem } = this.props

    return (
      <TouchableOpacity
        style={[
          {
            opacity: disabled ? variables.mtdOpacity : 1
          }
        ]}
        onPress={this.handlePress}
        activeOpacity={variables.mtdOpacity}>

        {
          typeof renderItem === 'function' ? renderItem(checked) :
          <View
            style={[
              styles.checkboxItemContainer,
              style,
              iconPosition === ICON_POSITION.RIGHT ? { flexDirection: 'row-reverse', justifyContent: 'space-between' } : null
            ]}>
            {this.renderIcon()}
            {this.renderLabel()}
          </View>
        }
      </TouchableOpacity>
    )
  }
}
