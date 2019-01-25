import React, { Component } from 'react'
import variables from '../../common/styles/variables'
import switchStyle from './styles'
import {
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  PanResponderInstance,
  Platform
} from 'react-native'

const styles = StyleSheet.create<any>(switchStyle)

const SCALE = 6 / 5
const borderColor = variables.mtdGrayLightest
const defaultShadowColor = variables.mtdGray
const disabledShadowColor = variables.mtdGrayLightest

interface Props {
  width?: number,
  height?: number,
  value?: boolean,
  disabled?: boolean,
  rockerSize?: number,
  rockerColor?: string,
  rockerActiveColor?: string,
  backgroundColor?: string,
  backgroundActiveColor?: string,
  backgroundDisabledColor?: string,
  onChange?: (value: any) => void
}

interface State {
  value: boolean,
  toggleable: boolean,
  alignItems: 'flex-end' | 'flex-start',
  handlerAnimation: Animated.Value,
  switchAnimation: Animated.Value,
}

export default class Switch extends Component<Props, State> {

  static defaultProps = {
    width: 50,
    height: 30,
    value: false,
    disabled: false,
    rockerSize: 27,
    rockerColor: variables.mtdFillBase,
    rockerActiveColor: variables.mtdFillBase,
    backgroundColor: variables.mtdFillBase,
    backgroundActiveColor: variables.mtdBrandPrimary,
    backgroundDisabledColor: variables.mtdFillBase
  }

  offset: number
  panResponder: PanResponderInstance
  disabledColor: string
  formItemContext = null

  constructor (props, context) {
    super(props, context)
    const { width, height, rockerSize, value, disabled } = props

    this.state = {
      value,
      toggleable: true,
      alignItems: value ? 'flex-end' : 'flex-start',
      handlerAnimation: new Animated.Value(rockerSize),
      switchAnimation: new Animated.Value(value ? -1 : 1)
    }

    this.offset = width - height + 1
    this.disabledColor = disabled ? disabledShadowColor : defaultShadowColor
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
    this.animateHandler(rockerSize * SCALE)
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
      this.animateHandler(rockerSize)
    }
  }

  /**
   * 切换
   */
  toggleSwitch = (result, callback = (value: any) => null) => {
    const { value } = this.state
    this.toggleSwitchToValue(result, !value, callback)
  }

  toggleSwitchToValue = (result, toValue, callback = (value: any) => null) => {
    const { switchAnimation } = this.state
    const { rockerSize } = this.props

    this.animateHandler(rockerSize)
    if (result) {
      this.animateSwitch(toValue, () => {
        this.setState({
          value: toValue,
          alignItems: toValue ? 'flex-end' : 'flex-start'
        }, () => {
          callback(toValue)
          // 通知Form.Item改变
          if (this.formItemContext && this.formItemContext.emitValueChange) {
            this.formItemContext.emitValueChange(toValue)
          }
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
    let {
      backgroundColor,
      backgroundActiveColor,
      backgroundDisabledColor,
      width,
      height,
      disabled
    } = this.props

    if (Platform.OS === 'android' && disabled) {
      backgroundColor = backgroundDisabledColor
    }

    const interpolatedBackgroundColor = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: [backgroundColor, backgroundActiveColor],
      extrapolate: 'clamp'
    })

    return {
      width,
      height,
      alignItems,
      borderRadius: height / 2,
      borderWidth: 1,
      borderColor,
      backgroundColor: interpolatedBackgroundColor
    }
  }

  getRockerBaseStyle = () => {
    const { switchAnimation, handlerAnimation, value } = this.state
    const {
      height,
      rockerSize,
      rockerActiveColor,
      rockerColor
    } = this.props

    const interpolatedCircleColor = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: [rockerColor, rockerActiveColor],
      extrapolate: 'clamp'
    })

    const interpolatedTranslateX = switchAnimation.interpolate({
      inputRange: value ? [-this.offset, -1] : [1, this.offset],
      outputRange: value ? [-this.offset, this.circlePosition(value)] : [this.circlePosition(value), this.offset],
      extrapolate: 'clamp'
    })

    const { disabled } = this.props
    const rockerBorderColor = disabled ? disabledShadowColor : borderColor

    return {
      backgroundColor: interpolatedCircleColor,
      width: handlerAnimation,
      height: rockerSize,
      marginHorizontal: (height - rockerSize) / 2 - 1,
      borderRadius: height / 2,
      shadowColor: this.disabledColor,
      shadowOffset: { h : 2, w : 2 },
      shadowRadius: 2,
      shadowOpacity: 0.8,
      transform: [{ translateX: interpolatedTranslateX }],
      borderColor: rockerBorderColor
    }
  }

  render () {
    const { disabled } = this.props
    const elevation = disabled ? 1 : 5
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.container, this.getContainBaseStyle()]}>
          <Animated.View style={[this.getRockerBaseStyle(), {
            borderWidth: (Platform.OS === 'android' && Platform.Version < 21) ? 1 : 0
          },
            (Platform.OS === 'android' && Platform.Version >= 21) ? { elevation } : {}
          ]}
          />
      </Animated.View>
    )
  }
}
