import React from 'react'
import {
  View,
  Text,
  Animated,
} from 'react-native'
import { Icon } from '../Icon'
import { CheckboxItem, CheckboxItemProps } from './CheckboxItem'
import variables from '../../common/styles/variables'
import styles from './styles'

enum ICON_POSITION {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface CheckboxItemAllCheckProps extends CheckboxItemProps {
  checkedStatus?: number
}

export class CheckboxItemAllCheck extends CheckboxItem<CheckboxItemAllCheckProps, any> {
  static defaultProps = {
    ...CheckboxItem.defaultProps,
    label: '全选',
    disabled: false,
    checkedStatus: 1,
    iconPosition: ICON_POSITION.LEFT,
    checkedIcon: null
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checkedStatus !== this.props.checkedStatus) {
      this.toAnimated()
    }
  }

  handlePress = () => {
    const { disabled, checkedStatus } = this.props
    if (disabled) {
      return
    }
    let tmp
    if (checkedStatus === 1 || checkedStatus === 2) {
      tmp = 3
    }

    if (checkedStatus === 3) {
      tmp = 1
    }
    this.toAnimated()
    this.props.onChange && this.props.onChange(null, tmp, true)
  }

  renderLabel () {
    const { label, checkedStatus } = this.props

    return (
      <Text
        style={[
          styles.checkboxLabel,
          (checkedStatus === 3) ? { color: variables.mtdBrandPrimaryDark, fontWeight: 'bold' } : null
        ]}>
        {label}
      </Text>
    )
  }
  renderIcon = () => {
    const { checkedIcon, checkedStatus, iconPosition, uncheckedIcon } = this.props
    const styleArray: any[] = []

    if (iconPosition === ICON_POSITION.LEFT) {
      styleArray.push(styles.iconLeftPosition)
    }

    let iconView = null
    if (checkedStatus === 3) {
      iconView = checkedIcon
    } else {
      // TODO 半选状态
      // if (checkedStatus === 2) {
      // }
      iconView = uncheckedIcon
    }

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
}
