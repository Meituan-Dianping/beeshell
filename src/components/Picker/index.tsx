import React, { ReactElement } from 'react'

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ViewStyle
} from 'react-native'

import variables from '../../common/styles/variables'
import pickerStyles from './styles'
import { Icon } from '../Icon'
import { SlideModal, SlideModalProps } from '../SlideModal'

const window = Dimensions.get('window')

export interface PickerProps {
  style?: ViewStyle
  label?: any
  activeIcon?: ReactElement<any>
  inactiveIcon?: ReactElement<any>
  disabled?: boolean,
  cancelable?: boolean
  onToggle?: Function
}

export interface PickerState {
  active?: boolean,
  offsetY?: number
}

export class Picker extends React.Component<PickerProps, PickerState> {
  private slideModal = null
  private trigger = null
  static defaultProps = {
    label: '请选择',
    activeIcon: <Icon source={require(`../../common/images/icons/angle-up.png`)} size={12} tintColor={variables.mtdBrandPrimaryDark} />,
    inactiveIcon: <Icon source={require(`../../common/images/icons/angle-down.png`)} size={12} tintColor={variables.mtdGrayBase} />,
    disabled: false,
    cancelable: true,
    style: {},
    onToggle: null
  }

  constructor (props) {
    super(props)

    this.state = {
      active: false
    }
  }

  handleToggle = (active: boolean) => {
    const { disabled, onToggle } = this.props
    if (disabled) {
      return Promise.reject(new Error(`Picker 属性 disabled 为 true 不能${active ? '打开' : '关闭'}`))
    }
    return new Promise((resolve) => {
      this.setState({
        active
      }, () => {
        onToggle && onToggle(active)
        resolve(this.state.active)
      })
    })
  }

  handlePress = () => {
    if (this.props.disabled) {
      return
    }

    if (this.state.active) {
      this.close().catch((e) => {
        console.log(e)
      })
    } else {
      this.open().catch((e) => {
        console.log(e)
      })
    }
  }

  close () {
    if (this.props.disabled) {
      return Promise.reject(new Error('Picker 组件 disabled 属性为 true，不能关闭'))
    }

    if (!this.slideModal) {
      return Promise.reject(new Error('Picker 组件的 slideModal 属性不存在，无法关闭'))
    }

    return this.slideModal.close()
  }

  open () {
    if (this.props.disabled) {
      return Promise.reject(new Error('Picker 组件 disabled 属性为 true 不能打开'))
    }

    return new Promise((resolve, reject) => {
      if (!this.trigger) {
        return reject(new Error('Picker 组件的 trigger 属性不存在，无法打开'))
      }
      this.trigger.measure((fx, fy, width, height, px, py) => {
        this.setState({
          offsetY: py + height
        }, () => {
          this.slideModal.open().then(() => {
            return this.handleToggle(true)
          }).then((active) => {
            resolve(active)
          }).catch((e) => {
            // console.log(e)
            reject(e)
          })
        })
      })
    })
  }

  renderIcon (active) {
    return active ? this.props.activeIcon : this.props.inactiveIcon
  }

  render () {
    let { style, disabled, label, cancelable } = this.props
    const { active, offsetY } = this.state
    const fontSize = StyleSheet.flatten(pickerStyles.btnText).fontSize
    let fontColor = StyleSheet.flatten(pickerStyles.btnText).color

    if (active) {
      fontColor = variables.mtdBrandPrimaryDark
    }

    return (
      <View
        ref={(c) => {
          this.trigger = c
        }}
        style={[
          style
        ]}
        collapsable={false}>
        <TouchableOpacity
          onPress={this.handlePress}
          activeOpacity={disabled ? 1 : variables.mtdOpacity}>

          {
            typeof label === 'function' ? label(active) :
            <View
              style={[
                pickerStyles.btnWrapper,
                {
                  opacity: disabled ? 0.3 : 1
                }
              ]}>
              <Text
                style={[
                  pickerStyles.btnText,
                  {
                    fontSize,
                    color: fontColor,
                    marginRight: 3
                  }
                ]}>
                {label}
              </Text>
              { this.renderIcon(active) }
            </View>
          }
        </TouchableOpacity>

        <SlideModal<SlideModalProps>
          ref={c => {
            this.slideModal = c
          }}
          cancelable={cancelable}
          direction={'down'}
          offsetX={0}
          offsetY={offsetY}
          onClosed={() => {
            if (this.state.active) {
              this.handleToggle(false).catch((e) => {
                console.log(e)
              })
            }
          }}>
          <View
            style={{
              width: window.width
            }}>
            { this.props.children }
          </View>
        </SlideModal>
      </View>
    )
  }
}
