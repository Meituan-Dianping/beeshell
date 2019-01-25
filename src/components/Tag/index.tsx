import React from 'react'

import {
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import tagStyles from './styles'
export { tagStyles }
import variables from '../../common/styles/variables'

export interface TagProps {
  style?: any,
  type?: 'default' | 'primary' | 'danger' | 'info' | 'success' | 'warning'
  reverse?: boolean
  textColor?: string
}

export class Tag extends React.Component<TagProps, {}> {
  static defaultProps = {
    type: 'default',
    style: {},
    reverse: false,
    textColor: null
  }

  render () {
    const { type, style, children, reverse, textColor } = this.props

    const styleWrapper = tagStyles[type + 'Wrapper'] || tagStyles.defaultWrapper
    const styleText = tagStyles[type + 'Text'] || tagStyles.defaultText
    const textReverseStyle = reverse && type !== 'default' ? { color: variables.mtdGrayBase } : {}

    return (
      <View
        style={[
          styleWrapper,
          style
        ]}>
        <Text
          style={[
            styleText,
            textReverseStyle,
            textColor ? { color: textColor } : {}
          ]}>
          {children}
        </Text>
      </View>
    )
  }
}
