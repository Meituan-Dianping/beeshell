import React from 'react'

import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  ViewStyle,
  TextStyle
} from 'react-native'
import buttonStyles from './styles'
export { buttonStyles }
import variables from '../../common/styles/variables'
import { FadeAnimated } from '../../common/animations'

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
  testID?: string
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  textColorInverse?: boolean
  type?: 'default' | 'primary' | 'danger' | 'info' | 'success' | 'warning' | 'text'
  size?: 'sm' | 'md' | 'lg'
  children?: any
  disabled?: boolean
  onPress?: Function
}

export class Button extends React.Component<ButtonProps, any> {
  private containerRef = null
  private animated = null

  static defaultProps = {
    style: {},
    textStyle: {},
    textColorInverse: false,
    type: 'default',
    size: 'md',
    disabled: false,
    onPress: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      buttonWidth: 0,
    }

    if (variables.buttonEnableAnimated) {
      this.animated = new FadeAnimated({
        scaleList: [0, 1],

        opacityList: [1, 0],
        opacityDuration: 1000,
      })
    }
  }

  componentDidMount () {

  }

  measure (...args) {
    this.containerRef.measure.apply(null, args)
  }

  handlePress () {
    const { disabled, onPress } = this.props
    if (disabled) {
      return
    }
    this.animated && this.animated.toIn()

    if (typeof onPress === 'function') {
      onPress()
    }
  }

  handleLayout = (e) => {
    const { width } = e.nativeEvent.layout
    this.setState({
      buttonWidth: width
    })
  }

  render () {
    const { type, disabled, style, textStyle, size , children, textColorInverse, testID } = this.props

    const styleWrapper = buttonStyles[type + 'Wrapper'] || buttonStyles.defaultWrapper
    const styleText = buttonStyles[type + 'Text'] || buttonStyles.defaultText

    const inverseStyle = textColorInverse && type !== 'default' && type !== 'text' ? { color: variables.mtdGrayBase } : {}

    let animatedStyle: any = {}
    if (this.animated) {
      animatedStyle = {
        transform: [{ scale: this.animated.getState().scale }],
        opacity: this.animated.getState().opacity
      }
    }
    return (
      <TouchableOpacity
        testID={testID}
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
        activeOpacity={disabled ? 1 : (variables as any).buttonActiveOpacity}
        onLayout={this.handleLayout}>

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
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: -1,
              width: this.state.buttonWidth,
              height: this.state.buttonWidth,
              borderRadius: this.state.buttonWidth,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              opacity: 0,
            },
            animatedStyle
          ]}>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}
