import React, { Component } from 'react'
import variables from '../../common/styles/variables'
import switchStyles from './styles'
import {
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  PanResponderInstance,
  Platform,
  ViewStyle
} from 'react-native'

const styles = StyleSheet.create<any>(switchStyles)

const SCALE = 6 / 5
const borderColor = '#c5c5c5'
const defaultShadowColor = variables.mtdGray
const disabledShadowColor = variables.mtdGrayLightest
const switchWidth = 50
const switchHeight = 30
const rockerSizeMap = {
  'lg': 27,
  'sm': 20
}

export interface SwitchProps {
  testID?: string
  style?: ViewStyle | ViewStyle[]
  value?: boolean
  disabled?: boolean
  rockerSize?: 'lg' | 'sm'
  activeColor?: string
  onChange?: Function
}

export interface SwitchState {
  value: boolean
  toggleable: boolean
  alignItems: 'flex-end' | 'flex-start'
  handlerAnimation: Animated.Value
  switchAnimation: Animated.Value
}

export class Switch extends Component<SwitchProps, SwitchState> {

  static defaultProps = {
    style: {},
    value: false,
    disabled: false,
    rockerSize: 'lg',
    activeColor: variables.mtdBrandPrimaryDark
  }

  offset: number
  panResponder: PanResponderInstance
  shadowColor: string

  constructor (props) {
    super(props)
    const { rockerSize, value, disabled } = props

    this.state = {
      value,
      toggleable: true,
      alignItems: value ? 'flex-end' : 'flex-start',
      handlerAnimation: new Animated.Value(rockerSizeMap[rockerSize]),
      switchAnimation: new Animated.Value(value ? -1 : 1)
    }

    this.offset = switchWidth - switchHeight + 1
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value === this.state.value) {
      return
    }

    if (typeof nextProps.value !== 'undefined' && nextProps.value !== this.props.value) {
      this.toggleSwitchToValue(true, nextProps.value)
    }
  }

  componentWillMount () {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    })
  }

  onPanResponderGrant = () => {
    const { disabled, rockerSize } = this.props
    if (disabled) return

    this.setState({ toggleable: true })
    this.animateHandler(rockerSizeMap[rockerSize] * SCALE)
  }

  onPanResponderMove = (evt, gestureState) => {
    const { value } = this.state
    const { disabled } = this.props
    if (disabled) return

    this.setState({
      toggleable: value ? (gestureState.dx < 10) : (gestureState.dx > -10)
    })
  }

  onPanResponderRelease = () => {
    const { toggleable } = this.state
    const { disabled, onChange, rockerSize } = this.props

    if (disabled) return

    if (toggleable) {
      this.toggleSwitch(true, onChange)
    } else {
      this.animateHandler(rockerSizeMap[rockerSize])
    }
  }

  /**
   * 切换
   */
  toggleSwitch = (result, callback: Function) => {
    const { value } = this.state
    this.toggleSwitchToValue(result, !value, callback)
  }

  toggleSwitchToValue = (result, toValue?, callback?: Function) => {
    const { switchAnimation } = this.state
    const { rockerSize } = this.props

    this.animateHandler(rockerSizeMap[rockerSize])
    if (result) {
      this.animateSwitch(toValue, () => {
        this.setState({
          value: toValue,
          alignItems: toValue ? 'flex-end' : 'flex-start'
        }, () => {
          callback && callback(toValue)
        })
        switchAnimation.setValue(toValue ? -1 : 1)
      })
    }
  }

  animateSwitch = (value, callback = () => null) => {
    const { switchAnimation } = this.state

    Animated.timing(switchAnimation,
      {
        toValue: value ? this.offset : -this.offset,
        duration: 200,
        easing: Easing.linear
      }
    ).start(callback)
  }

  animateHandler = (value, callback = () => null) => {
    const { handlerAnimation } = this.state

    Animated.timing(handlerAnimation,
      {
        toValue: value,
        duration: 200,
        easing: Easing.linear
      }
    ).start(callback)
  }

  circlePosition = (value) => {
    const modifier = value ? 1 : -1
    let position = modifier * -1
    return position
  }

  getContainBaseStyle = () => {
    const { switchAnimation, alignItems, value } = this.state
    const {
      activeColor
    } = this.props

    const interpolatedBackgroundColor = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: ['#fff', activeColor],
      extrapolate: 'clamp'
    })

    return {
      width: switchWidth,
      height: switchHeight,
      alignItems,
      borderRadius: switchHeight / 2,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor,
      backgroundColor: interpolatedBackgroundColor
    }
  }

  getRockerBaseStyle = () => {
    const { switchAnimation, handlerAnimation, value } = this.state
    const {
      rockerSize,
      disabled
    } = this.props

    const interpolatedCircleColor = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      // outputRange: [rockerColor, rockerActiveColor],
      outputRange: ['#fff', '#fff'],
      extrapolate: 'clamp'
    })

    const interpolatedTranslateX = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: value ? [-this.offset, this.circlePosition(value)] : [this.circlePosition(value), this.offset],
      extrapolate: 'clamp'
    })

    return {
      backgroundColor: interpolatedCircleColor,
      width: handlerAnimation,
      height: rockerSizeMap[rockerSize],
      marginHorizontal: (switchHeight - rockerSizeMap[rockerSize]) / 2 - 1,
      borderRadius: switchHeight / 2,
      shadowColor: disabled ? disabledShadowColor : defaultShadowColor,
      shadowOffset: { h : 2, w : 2 },
      shadowRadius: 2,
      shadowOpacity: 0.8,
      transform: [{ translateX: interpolatedTranslateX }],
      borderColor: disabled ? disabledShadowColor : borderColor
    }
  }

  render () {
    const { disabled } = this.props
    const elevation = disabled ? 1 : 5
    return (
      <Animated.View
        testID={this.props.testID}
        {...this.panResponder.panHandlers}
        style={[styles.container, this.getContainBaseStyle(), this.props.style]}>
          <Animated.View style={[this.getRockerBaseStyle(), {
            borderWidth: (Platform.OS === 'android' && Platform.Version < 21) ? StyleSheet.hairlineWidth : 0
          },
            (Platform.OS === 'android' && Platform.Version >= 21) ? { elevation } : {}
          ]}
          />
      </Animated.View>
    )
  }
}
