import React from 'react'

import {
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle
} from 'react-native'
import buttonStyles from './styles'
export { buttonStyles }
import variables from '../../common/styles/variables'


const fontSizeMap = {
  lg: variables.buttonLFontSize,
  md: variables.buttonMFontSize,
  sm: variables.buttonSFontSize
}

const paddingMap = {
  lg: {
    paddingHorizontal: variables.buttonLHSpacing,
    paddingVertical: variables.buttonLVSpacing
  },
  md: {
    paddingHorizontal: variables.buttonMHSpacing,
    paddingVertical: variables.buttonMVSpacing
  },
  sm: {
    paddingHorizontal: variables.buttonSHSpacing,
    paddingVertical: variables.buttonSVSpacing
  }
}

export interface ButtonProps {
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  textColorInverse?: boolean
  type?: 'default' | 'primary' | 'danger' | 'info' | 'success' | 'warning' | 'text'
  size?: 'sm' | 'md' | 'lg'
  children?: any
  disabled?: boolean
  onPress?: Function
}

export class Button extends React.Component<ButtonProps, {}> {
  private containerRef = null
  static defaultProps = {
    style: {},
    textStyle: {},
    textColorInverse: false,
    type: 'default',
    size: 'md',
    disabled: false,
    onPress: null,
  }

  measure (...args) {
    this.containerRef.measure.apply(null, args)
  }

  handlePress () {
    const { disabled, onPress } = this.props
    if (!disabled && typeof onPress === 'function') {
      return onPress()
    }
  }

  render () {
    const { type, disabled, style, textStyle, size , children, textColorInverse } = this.props

    const styleWrapper = buttonStyles[type + 'Wrapper'] || buttonStyles.defaultWrapper
    const styleText = buttonStyles[type + 'Text'] || buttonStyles.defaultText

    const inverseStyle = textColorInverse && type !== 'default' && type !== 'text' ? { color: variables.mtdGrayBase } : {}

    return (
      <TouchableOpacity
        ref={c => (this.containerRef = c)}
        style={[
          styleWrapper,
          {
            opacity: disabled ? (variables as any).buttonActiveOpacity : 1,
            ...(paddingMap[size] || paddingMap['md'])
          },
          style
        ]}
        disabled={disabled}
        onPress={() => this.handlePress()}
        activeOpacity={disabled ? 1 : (variables as any).buttonActiveOpacity}>
        {
          React.isValidElement(children) ? children : (
            <Text
              style={[
                styleText,
                {
                  fontSize: fontSizeMap[size] || fontSizeMap['md']
                },
                inverseStyle,
                textStyle
              ]}
            >{children}</Text>
          )
        }
      </TouchableOpacity>
    )
  }
}
