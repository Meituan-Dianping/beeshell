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
  style?: any
  title?: string | number
  type?: 'text' | 'dot' | 'triangle'
  textWrapperStyle?: ViewStyle
  textContentStyle?: TextStyle
  triangleStyle?: ViewStyle
  textTriangleStyle?: TextStyle
  dotStyle?: ViewStyle
}

export class Badge extends React.PureComponent<BadgeProps> {
  static defaultProps = {
    type: 'text'
  }
  constructor (props) {
    super(props)
  }
  render () {
    const { style, title, type, textWrapperStyle, textContentStyle, triangleStyle, textTriangleStyle, dotStyle } = this.props
    return (
      <View style={[styles.wrapper, style]}>
        {type === 'text' ? <View style={[styles.textWrapper, textWrapperStyle]}>
          {title ? <Text style={[styles.textContent, textContentStyle]}>{title}</Text> : null}
          {this.props.children}
        </View> : null}

        {type === 'dot' ? <View style={[styles.dot, dotStyle]}></View> : null}

        {type === 'triangle' ? <View style={[styles.triangle, triangleStyle]}>
          {title ? <Text style={[styles.textTriangle, textTriangleStyle]}>{title}</Text> : null}
          {this.props.children}
        </View> : null}
      </View>
    )
  }
}
