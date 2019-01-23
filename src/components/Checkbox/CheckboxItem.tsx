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

export interface CheckboxItemProps {
  label?: Function | string,
  value?: any | null | undefined
  disabled?: boolean
  checked?: boolean
  iconPosition?: 'left' | 'right'
  onChange?: Function
}


const styles = StyleSheet.create<any>(checkboxItemStyle)

export class CheckboxItem<T extends CheckboxItemProps, P > extends Component<T, any> {
  static displayName = 'CheckboxItem'
  static defaultProps = {
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    iconPosition: ICON_POSITION.LEFT
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  /**
   * checkboxItem点击事件回调
   * @returns
   */
  handlePress = () => {
    const { disabled, checked, value } = this.props
    if (this.props.disabled) {
      return
    }

    this.props.onChange && this.props.onChange(value, !checked)
  }

  renderStatusIcon = () => {
    const { disabled, checked, iconPosition } = this.props
    const styleArray: any[] = [styles.icon]
    styleArray.push(styles.iconDefault)
    if (checked) {
      styleArray.push(styles.iconChecked)
    }
    if (iconPosition === ICON_POSITION.LEFT) {
      styleArray.push(styles.iconLeftPosition)
    }

    let iconView = null
    if (checked) {
      iconView = <View style={styles.iconView}><Icon type={'check'} size={variables.checkboxIconSize} tintColor={'#333'}/></View>
    }

    return (
      <View style={styleArray}>
        {iconView}
      </View>
    )
  }

  renderLabelText () {
    const { label, disabled, checked } = this.props

    return (
      <Text
        style={[
          styles.labelText,
          checked ? { color: variables.mtdBrandPrimaryDark } : null
        ]}>
        {label}
      </Text>
    )
  }

  render () {
    const { disabled, iconPosition, checked, label } = this.props

    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            opacity: disabled ? variables.mtdOpacity : 1
          }
        ]}
        onPress={this.handlePress}
        activeOpacity={variables.mtdOpacity}>

        {
          typeof label === 'function' ? label.call(null, checked) :
          <View
            style={[
              styles.touchContainer,
              iconPosition === ICON_POSITION.RIGHT ? { flexDirection: 'row-reverse', justifyContent: 'space-between' } : null
            ]}>
            {this.renderStatusIcon()}
            <View>
              {this.renderLabelText()}
            </View>
          </View>
        }
      </TouchableOpacity>
    )
  }
}
