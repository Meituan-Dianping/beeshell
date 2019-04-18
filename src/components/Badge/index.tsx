import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Text
} from 'react-native'

import styleObject from './styles'
const styles = StyleSheet.create<any>(styleObject)

export interface BadgeProps {
  style?: ViewStyle
  label?: string | number
  labelStyle?: TextStyle
}

export class Badge extends React.PureComponent<BadgeProps> {
  static defaultProps = {
  }
  constructor (props) {
    super(props)
  }
  render () {
    const { style, label, labelStyle } = this.props

    if (label != null) {
      return (
        <View style={[styles.wrapper, style]}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )
    } else {
      return (
        <View style={[styles.dot, style]}></View>
      )
    }
  }
}
