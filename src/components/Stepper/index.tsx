import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ViewStyle
} from 'react-native'

import variables from '../../common/styles/variables'
import styles, { ConterStyle } from './styles'
const stepperStyles = StyleSheet.create<any>(styles)

export interface StepperProps {
  style?: ViewStyle
  operatorStyle?: ViewStyle
  operatorIconColor?: string

  min: number
  max: number
  value?: number | string | null | undefined
  step?: number
  editable?: boolean

  onChange?: Function
}
export interface StepperState {
}

export class Stepper extends Component<StepperProps, StepperState> {
  private textInputValue = ''
  static defaultProps = {
    operatorIconColor: variables.mtdGrayBase,
    step: 1,
    editable: false
  }
  constructor (props) {
    super(props)
  }

  onDecrease = () => {
    const { value, step, min } = this.props
    const newValue = this.isEmpty(value) ? (min + step) : value

    this.changeValue(newValue, -step, 'decrease')
  }
  onIncrease = () => {
    const { value, step, min } = this.props
    const newValue = this.isEmpty(value) ? min : value
    this.changeValue(newValue, step, 'increase')
  }

  onChangeText = (value) => {
    console.log('onChangeText', value)
    let newValue
    if (!value) {
      newValue = ''
    } else {
      newValue = Number(value)
      if (isNaN(newValue)) {
        newValue = ''
      }
    }

    this.changeValue(newValue, this.props.step, 'input')
  }

  changeValue = (value, step = 1, action) => {
    const { max, min } = this.props
    let newValue
    if (value === '') {
      newValue = ''
    } else {
      if (action === 'input') {
        newValue = value
      } else {
        newValue = value + step
      }

      if (newValue > max) {
        newValue = max
      }

      if (newValue < min) {
        newValue = min
      }
    }

    this.props.onChange && this.props.onChange(newValue, this.props.value, action)
  }
  isEmpty(value) {
    return value == null || value === ''
  }

  render () {
    let { value, editable, style, operatorStyle, operatorIconColor, max, min } = this.props
    let increasable
    let decreasable

    if (this.isEmpty(value)) {
      increasable = true
      decreasable = true
    } else {
      value = Number(value)
      if (isNaN(value)) {
        value = 0
      }
      increasable = Boolean(value < max)
      decreasable = Boolean(value > min)
    }

    let textInputValue = this.isEmpty(value) ? '' : String(value)

    if (textInputValue === this.textInputValue) {
      textInputValue += ' '
      this.textInputValue = textInputValue
    } else {
      this.textInputValue = textInputValue
    }

    return (
      <View style={[stepperStyles.container, style]}>
        <TouchableOpacity
          activeOpacity={variables.mtdOpacity}
          onPress={this.onDecrease}
          disabled={!decreasable}>

          <View
            style={[
              stepperStyles.ctrl,
              operatorStyle,
              !decreasable ? stepperStyles.disabled : null
            ]}>
            <View
              style={[
                stepperStyles.ctrlSymbolHor,
                { backgroundColor: operatorIconColor }
              ]}>
            </View>
          </View>
        </TouchableOpacity>

        <TextInput
          style={[
            stepperStyles.input,
          ]}
          value={textInputValue}
          onChangeText={this.onChangeText}
          editable={editable}
          keyboardType='numeric'
        />
        <TouchableOpacity
          activeOpacity={variables.mtdOpacity}
          onPress={this.onIncrease}
          disabled={!increasable}>
         <View
          style={[
            stepperStyles.ctrl,
            operatorStyle,
            !increasable ? stepperStyles.disabled : null
          ]}>
          <View style={[
            stepperStyles.ctrlSymbolHor,
            {
              backgroundColor: operatorIconColor
            }
          ]}></View>
          <View style={[
            stepperStyles.ctrlSymboVer,
            {
              backgroundColor: operatorIconColor
            }
          ]}></View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
}
