import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import radioItemStyles from './radioItemStyles'
import variables from '../../common/styles/variables'
import styleUtils from '../../common/styles/utils'
import { Icon } from '../Icon'

interface RadioItemProps {
  label?: string
  value: any
  disabled?: boolean
  checked?: boolean
  iconPosition?: 'left' | 'right'
  onChange: Function
  renderItem: Function
}

export default class RadioItem extends Component<RadioItemProps> {
  static displayName = 'RadioItem'
  static defaultProps = {
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    iconPosition: 'right',
    renderItem: null
  }

  constructor (props) {
    super(props)
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

    this.props.onChange && this.props.onChange(value)
  }

  renderIcon = (checked, iconPosition) => {
    const fontSize = (StyleSheet.flatten(radioItemStyles.labelText) as any).fontSize
    let iconContainerStyles = {
      width: fontSize,
      marginRight: iconPosition === 'left' ? 6 : null
    }

    let iconView = checked ? (
      <Icon type='check' size={fontSize} tintColor={variables.mtdBrandPrimary} />
    ) : null

    return <View style={iconContainerStyles}>{iconView}</View>
  }

  renderLabelText = (checked) => {
    return (
      <Text
        style={[
          radioItemStyles.labelText,
          checked ? [ styleUtils.textPrimaryDark, styleUtils.textBold ] : null
        ]}>
        {this.props.label}
      </Text>
    )
  }

  render () {
    const { disabled, checked, iconPosition, renderItem } = this.props

    return (
      <View
        style={[
          radioItemStyles.container,
          {
            opacity: disabled ? variables.mtdOpacity : 1
          }
        ]}
      >
        <TouchableOpacity
          activeOpacity={ disabled ? 1 : variables.mtdOpacity}
          onPress={this.handlePress}>
          {
            renderItem ? renderItem(checked) :
            <View
              style={[
                radioItemStyles.touchContainer,
                this.props.iconPosition === 'right' ? {
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between'
                } : null
              ]}
            >
              {this.renderIcon(checked, iconPosition)}
              <View style={radioItemStyles.label}>
                {this.renderLabelText(checked)}
              </View>
            </View>
          }
        </TouchableOpacity>
      </View>
    )
  }
}
