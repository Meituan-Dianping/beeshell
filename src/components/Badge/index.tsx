import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Text
} from 'react-native'

import styleObject from './styles'
const Styles = StyleSheet.create<any>(styleObject)

export interface BadgeProps {
  title?: string | number,
  type?: 'text' | 'dot' | 'triangle',
  textWrapperStyle?: ViewStyle,
  textContentStyle?: TextStyle,
  triangleStyle?: ViewStyle,
  textTriangleStyle?: TextStyle,
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
    const { title, type, textWrapperStyle, textContentStyle, triangleStyle, textTriangleStyle, dotStyle } = this.props
    return (
      <View style={Styles.wrapper}>
        {type === 'text' ? <View style={[Styles.textWrapper, textWrapperStyle]}>
          {title ? <Text style={[Styles.textContent, textContentStyle]}>{title}</Text> : null}
          {this.props.children}
        </View> : null}

        {type === 'dot' ? <View style={[Styles.dot, dotStyle]}></View> : null}

        {type === 'triangle' ? <View style={[Styles.triangle, triangleStyle]}>
          {title ? <Text style={[Styles.textTriangle, textTriangleStyle]}>{title}</Text> : null}
          {this.props.children}
        </View> : null}
      </View>
    )
  }
}
