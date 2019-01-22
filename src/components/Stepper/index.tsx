import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ViewStyle
} from 'react-native'

import styleObject, { ConterStyle } from './styles'
const Styles = StyleSheet.create<any>(styleObject)

export interface StepperProps {
  type?: 'circularSolid' | 'squareSolid' | 'circularHollow' | 'squareHollow' | 'squareJoinHollow'
  min: number,
  max: number,
  value: number,
  step?: number,
  editable?: boolean,
  onInput?: Function,
  onChange?: Function,
  onOutOfRange?: Function
  styles?: ConterStyle,
  containerStyle?: ViewStyle,
  ctrlStyle?: ViewStyle,
  ctrlSymbolStyle?: ViewStyle,
  inputStyle?: ViewStyle
}
export interface StepperState {
  increasable: boolean,
  decreasable: boolean
}

export class Stepper extends Component<StepperProps, StepperState> {
  static defaultProps = {
    type: 'circularSolid',
    step: 1,
    editable: false,
    styles: Styles
  }
  constructor (props) {
    super(props)
    this.state = {
      decreasable: Boolean(this.props.value > this.props.min),
      increasable: Boolean(this.props.value < this.props.max)
    }
  }
  componentWillReceiveProps (newProps) {
    if (newProps.value !== this.props.value) {
      this.checkOperable(newProps.value)
    }
  }
  isValid = (value) => {
    const { min, max } = this.props
    return min <= value && max >= value
  }
  checkOperable = (value) => {
    this.setState({
      decreasable: Boolean(value > this.props.min),
      increasable: Boolean(value < this.props.max)
    })
  }
  onDecrease = () => {
    this.changeValue(this.props.value, -this.props.step, 'decrease')
  }
  onIncrease = () => {
    this.changeValue(this.props.value, this.props.step, 'increase')
  }
  changeValue = (value, step = 1, action) => {
    const newValue = value + step
    if (this.isValid(newValue)) {
      this.props.onChange && this.props.onChange(newValue, this.props.value, action)
    } else {
      this.props.onOutOfRange && this.props.onOutOfRange(newValue, this.props.value, action)
    }
  }
  render () {
    const { value, editable, styles, type,
            containerStyle, ctrlStyle, ctrlSymbolStyle, inputStyle } = this.props
    const { increasable, decreasable } = this.state
    return (
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          onPress={this.onDecrease}
          disabled={!decreasable}
          style={!decreasable ? styles.disabled : null}
        >
          <View
            style={[
              styles.ctrl,
              ctrlStyle,
              type === 'squareSolid' ? styles.squareSolid : null,
              type === 'circularHollow' ? styles.circularHollow : null,
              type === 'squareHollow' ? styles.squareHollow : null,
              type === 'squareJoinHollow' ? styles.squareJoinHollowLeft : null,
              !decreasable ? styles.disabled : null
            ]}
          >
            <View style={[
              styles.ctrlSymbolHor,
              ctrlSymbolStyle,
              (type === 'circularHollow' || type === 'squareHollow' || type === 'squareJoinHollow') ? styles.ctrlSymbolSolid : null
            ]}></View>
          </View>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            type === 'squareJoinHollow' ? styles.inputWithBorder : null
          ]}
          value={ String(value) }
          keyboardType={'numeric'}
          editable={editable}
        />
        <TouchableOpacity
          onPress={this.onIncrease}
          disabled={!increasable}
          style={!increasable ? styles.disabled : null}
        >
         <View
          style={[
            styles.ctrl,
            ctrlStyle,
            type === 'squareSolid' ? styles.squareSolid : null,
            type === 'circularHollow' ? styles.circularHollow : null,
            type === 'squareHollow' ? styles.squareHollow : null,
            type === 'squareJoinHollow' ? styles.squareJoinHollowRight : null,
            !increasable ? styles.disabled : null]}
        >
          <View style={[
            styles.ctrlSymbolHor,
            ctrlSymbolStyle,
            (type === 'circularHollow' || type === 'squareHollow' || type === 'squareJoinHollow') ? styles.ctrlSymbolSolid : null
          ]}></View>
          <View style={[
            styles.ctrlSymboVer,
            ctrlSymbolStyle,
            (type === 'circularHollow' || type === 'squareHollow' || type === 'squareJoinHollow') ? styles.ctrlSymbolSolid : null
          ]}></View>
        </View>
        </TouchableOpacity>
      </View>
    )
  }
}
