import React from 'react'

import {
  Text,
  TouchableOpacity,
  View,
  TextStyle,
  ViewStyle
} from 'react-native'
import tagStyles from './styles'
export { tagStyles }
import variables from '../../common/styles/variables'

export interface TagProps {
  style?: ViewStyle
  textStyle?: TextStyle
  type?: 'default' | 'primary' | 'danger' | 'info' | 'success' | 'warning'
  textColorInverse?: boolean
}

export class Tag extends React.Component<TagProps, {}> {
  static defaultProps = {
    type: 'default',
    style: {},
    textColorInverse: false,
    textStyle: {}
  }

  render () {
    const { type, style, children, textColorInverse, textStyle } = this.props

    const styleWrapper = tagStyles[type + 'Wrapper'] || tagStyles.defaultWrapper
    const styleText = tagStyles[type + 'Text'] || tagStyles.defaultText
    const reverseStyle = textColorInverse && type !== 'default' ? { color: variables.mtdGrayDarker } : {}

    return (
      <View
        style={[
          styleWrapper,
          style
        ]}>

        {
          React.isValidElement(children) ? children :
          <Text
            style={[
              styleText,
              reverseStyle,
              textStyle,
            ]}>
            {children}
          </Text>
        }
      </View>
    )
  }
}
