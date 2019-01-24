import React from 'react'

import {
  Text,
  TouchableOpacity,
  View
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
  type?: 'default' | 'primary' | 'danger' | 'info' | 'success' | 'warning' | 'text',
  size?: 'sm' | 'md' | 'lg',
  style?: any,
  disabled?: boolean,
  onPress?: Function,
  reverse?: boolean
}

export class Button extends React.Component<ButtonProps, {}> {
  private containerRef = null
  static defaultProps = {
    type: 'default',
    size: 'md',
    disabled: false,
    style: {},
    onPress: null,
    reverse: false
  }

  measure (...args) {
    this.containerRef.measure.apply(null, args)
  }

  onPressHandle () {
    const { disabled, onPress } = this.props
    if (!disabled && typeof onPress === 'function') {
      return onPress()
    }
  }

  render () {
    const { type, disabled, style, size , children, reverse } = this.props

    const styleWrapper = buttonStyles[type + 'Wrapper'] || buttonStyles.defaultWrapper
    const styleText = buttonStyles[type + 'Text'] || buttonStyles.defaultText

    const textReverseStyle = reverse && type !== 'default' ? { color: '#000' } : {}

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
        onPress={() => this.onPressHandle()}
        activeOpacity={disabled ? 1 : (variables as any).buttonActiveOpacity}>
        {
          React.isValidElement(children) ? children : (
            <Text
              style={[
                styleText,
                {
                  fontSize: fontSizeMap[size] || fontSizeMap['md'],
                  ...textReverseStyle
                }
              ]}
            >{children}</Text>
          )
        }
      </TouchableOpacity>
    )
  }
}
