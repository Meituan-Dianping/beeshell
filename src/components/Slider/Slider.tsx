import React, { PureComponent, ReactElement } from 'react'
import {
  Animated,
  Image,
  StyleSheet,
  PanResponder,
  View,
  Text,
  PanResponderInstance,
  ImageSourcePropType,
  Platform,
  ViewStyle,
  RegisteredStyle
} from 'react-native'
import variables from '../../common/styles/variables'
import sliderStyle from './styles'
import Coord from './Coord'

const minTrackDisabledColor = variables.mtdGrayLighter
const thumbTouchSize = {
  width: 34,
  height: 34
}
const thumbImage = require('./images/rectangle.png')
const otherThumbImage = require('./images/rectangle.png')

interface Props {
  style?: ViewStyle | RegisteredStyle<ViewStyle>

  value?: number
  otherValue?: number
  minValue?: number
  maxValue?: number
  disabled?: boolean
  step?: number
  markOtptions?: any[]
  renderMarkOptionItem?: Function

  maxTrackColor?: string
  minTrackColor?: string
  rangeMinTrackColor?: string

  onChange?: (value: number | number []) => void
  onStart?: (value: number | number []) => void
  onEnd?: (value: number | number []) => void

  showTip?: boolean
  renderToolTip?: (value: any) => ReactElement<any>
  renderThumb?: Function

  isRange?: boolean
}

interface State {
  containerSize: {
    width: number
    height: number
  }
  trackSize: {
    width: number
    height: number
  }
  thumbSize: {
    width: number
    height: number
  }
  otherThumbSize: {
    width: number
    height: number
  }
  value: Animated.Value
  otherValue: Animated.Value
  tip: string
  otherTip: string
}

const styles = StyleSheet.create<any>(sliderStyle)

export default class Slider extends PureComponent<Props, State> {

  panResponder: PanResponderInstance
  previousLeft: number
  otherPreviousLeft: number
  isOther: boolean
  showAndroidTip: boolean

  static defaultProps = {
    value: 0,
    minValue: 0,
    maxValue: 1,
    step: 0,
    maxTrackColor: variables.mtdFillBody,
    minTrackColor: variables.mtdBrandPrimary,
    rangeMinTrackColor: variables.mtdFillBody,

    isRange: false,
    otherValue: 0,
    showTip: false,
  }

  constructor (props) {
    super(props)
    this.state = {
      containerSize: { width: 0, height: 0 },
      trackSize: { width: 0, height: 0 },
      thumbSize: { width: 0, height: 0 },
      otherThumbSize: { width: 0, height: 0 },
      value: new Animated.Value(this.props.value),
      otherValue: new Animated.Value(this.props.otherValue),
      tip: `${this.props.value}`,
      otherTip: `${this.props.otherValue}`
    }
    this.isOther = false
    this.showAndroidTip = this.props.showTip && Platform.OS === 'android'
  }

  componentWillMount () {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.touchStart,
      onMoveShouldSetPanResponder: _ => false,
      onPanResponderGrant: this.pressStart,
      onPanResponderMove: this.lastMove,
      onPanResponderRelease: this.touchEnd,
      onPanResponderTerminationRequest: _ => false,
      onPanResponderTerminate: this.touchEnd
    })
  }

  componentWillReceiveProps (nextProps) {
    const newValue = nextProps.value
    const newOtherValue = nextProps.otherValue

    if (this.props.value !== newValue) {
      this.setCurrentValue(newValue)
    }
    const { isRange } = nextProps
    if (isRange && this.props.otherValue !== newOtherValue) {
      this.setCurrentValue(newOtherValue, isRange)
    }
  }

  thumbTouchCheck = (e: any) => {
    const nativeEvent = e.nativeEvent
    const { isRange } = this.props
    if (isRange) {
      const otherThumbCoord = this.getThumbCoord(isRange)
      const otherCheckResult = otherThumbCoord.contain(
        nativeEvent.locationX,
        nativeEvent.locationY
      )
      if (otherCheckResult) {
        this.isOther = true
        return otherCheckResult
      }
    }
    const ThumbCoord = this.getThumbCoord()
    const checkResult = ThumbCoord.contain(
      nativeEvent.locationX,
      nativeEvent.locationY
    )
    if (checkResult) {
      this.isOther = false
      return checkResult
    }
    return false
  }

  getThumbCoord = (isOther?: boolean) => {
    const state = this.state
    const props = this.props
    const touchOverflowSize = this.getTouchOverflowSize(isOther)
    let thumbSize = state.thumbSize
    if (isOther) {
      thumbSize = state.otherThumbSize
    }

    return new Coord(
      touchOverflowSize.width / 2 +
        this.getThumbLeft(this.getCurrentValue(isOther), isOther) +
        (thumbSize.width - thumbTouchSize.width) / 2,
      touchOverflowSize.height / 2 +
        (state.containerSize.height - thumbTouchSize.height) / 2,
      thumbTouchSize.width,
      thumbTouchSize.height
    )
  }

  touchStart = (e: Object) => {
    return this.thumbTouchCheck(e)
  }

  pressStart = () => {
    if (this.isOther) {
      this.otherPreviousLeft = this.getThumbLeft(this.getCurrentValue(this.isOther), this.isOther)
    } else {
      this.previousLeft = this.getThumbLeft(this.getCurrentValue())
    }
    this.triggerEvent('onStart')
  }

  lastMove = (_: Object, gestureState: Object) => {
    if (this.props.disabled) {
      return
    }
    if (this.isOther) {
      const value = this.getCurrentValue()
      const isOtherValue = this.getValue(gestureState, this.isOther)
      if (value > isOtherValue) {
        return
      }
      this.setCurrentValue(isOtherValue, this.isOther)
    } else {
      const value = this.getValue(gestureState)
      const { isRange } = this.props
      if (isRange) {
        const isOtherValue = this.getCurrentValue(true)
        if (value > isOtherValue) {
          return
        }
      }
      this.setCurrentValue(value)
    }
    this.triggerEvent('onChange')
  }

  touchEnd = (e: Object, gestureState: Object) => {
    if (this.props.disabled) {
      return
    }
    if (this.isOther) {
      const value = this.getCurrentValue()
      const isOtherValue = this.getValue(gestureState, this.isOther)
      if (value > isOtherValue) {
        return
      }
      this.setCurrentValue(isOtherValue, this.isOther)
    } else {
      const value = this.getValue(gestureState)
      const { isRange } = this.props
      if (isRange) {
        const isOtherValue = this.getCurrentValue(true)
        if (value > isOtherValue) {
          return
        }
      }
      this.setCurrentValue(value)
    }
    this.triggerEvent('onEnd')
  }

  measureContainer = (x: Object) => {
    this.handleMeasure('containerSize', x)
  }

  measureTrack = (x: Object) => {
    this.handleMeasure('trackSize', x)
  }

  measureThumb = (x: Object) => {
    this.handleMeasure('thumbSize', x)
  }

  measureOtherThumb = (x: Object) => {
    this.handleMeasure('otherThumbSize', x)
  }

  handleMeasure = (name: string, x: any) => {
    const { width, height } = x.nativeEvent.layout
    const size = { width, height }

    const currentSize = this.state[name]
    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return
    }

    const newState: any = {
      [name]: size
    }

    // 双滑块
    this.setState(newState)
  }

  getRatio = (value: number) =>
    (value - this.props.minValue) /
    (this.props.maxValue - this.props.minValue)

  getThumbLeft = (value: number, isOther?: boolean) => {
    const nonRtlRatio = this.getRatio(value)
    const ratio = nonRtlRatio
    let thumbWidth = this.state.thumbSize.width
    if (isOther) {
      thumbWidth = this.state.otherThumbSize.width
    }
    return (
      ratio * (this.state.containerSize.width - thumbWidth)
    )
  }

  getValue = (gestureState: Object, isOther?: boolean) => {
    let thumbSize = this.state.thumbSize
    let previousLeft = this.previousLeft
    if (isOther) {
      thumbSize = this.state.otherThumbSize
      previousLeft = this.otherPreviousLeft
    }
    const length = this.state.containerSize.width - thumbSize.width
    const thumbLeft = previousLeft + (gestureState as any).dx

    const nonRtlRatio = thumbLeft / length
    const ratio = nonRtlRatio

    if (this.props.step) {
      return Math.max(
        this.props.minValue,
        Math.min(
          this.props.maxValue,
          this.props.minValue +
            Math.round(
              ratio *
                (this.props.maxValue - this.props.minValue) /
                this.props.step
            ) *
              this.props.step
        )
      )
    }
    return Math.max(
      this.props.minValue,
      Math.min(
        this.props.maxValue,
        ratio * (this.props.maxValue - this.props.minValue) +
          this.props.minValue
      )
    )
  }

  getCurrentValue = (isOther?: boolean) => {
    let value: any = this.state.value
    if (isOther) {
      value = this.state.otherValue
    }
    return value.__getValue()
  }

  setCurrentValue = (value: number, isOther?: boolean) => {
    if (isOther) {
      this.setState({
        otherTip: `${Math.round(value)}`
      })
      this.state.otherValue.setValue(value)
    } else {
      this.setState({
        tip: `${Math.round(value)}`
      })
      this.state.value.setValue(value)
    }
  }

  triggerEvent = event => {
    if (this.props[event]) {
      const args = [Math.round(this.getCurrentValue())]
      const { isRange } = this.props
      if (isRange) {
        args.push(Math.round(this.getCurrentValue(isRange)))
        this.props[event](args)
      } else {
        this.props[event](args[0])
      }
    }
  }

  getTouchOverflowSize = (isOther: boolean) => {
    const state = this.state
    const props = this.props
    let thumbSize = state.thumbSize

    if (isOther) {
      thumbSize = state.otherThumbSize
    }

    const size: any = {}
    size.width = Math.max(
      0,
      thumbTouchSize.width - thumbSize.width
    )
    size.height = Math.max(
      0,
      thumbTouchSize.height - state.containerSize.height
    )

    return size
  }

  getTouchOverflowStyle = (isOther?: boolean) => {
    const { width, height } = this.getTouchOverflowSize(isOther)

    const touchOverflowStyle: any = {}
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2
      touchOverflowStyle.marginTop = verticalMargin
      touchOverflowStyle.marginBottom = verticalMargin

      const horizontalMargin = -width / 2
      touchOverflowStyle.marginLeft = horizontalMargin
      touchOverflowStyle.marginRight = horizontalMargin
    }

    return touchOverflowStyle
  }

  /**
   * 默认滑块的的滑块图片渲染
   */
  renderThumbImage = (isOther?: boolean) => {
    if (!isOther && !thumbImage) return

    if (isOther && !otherThumbImage) return

    return <Image style={[thumbTouchSize, { borderRadius: thumbTouchSize.width / 2 }]} source={isOther ? otherThumbImage as ImageSourcePropType : thumbImage as ImageSourcePropType}/>
  }

  /**
   * 刻度模块的渲染
   */
  renderMarkView = () => {
    const { step, markOtptions, renderMarkOptionItem, minValue, maxValue } = this.props
    if (!step || !markOtptions) {
      return null
    }
    const maxStep = Math.ceil(Math.abs((maxValue - minValue) / step)) + 1
    let currStep = 0
    const markViewArr = []
    while (maxStep > currStep) {
      if (renderMarkOptionItem) {
        markViewArr.push(renderMarkOptionItem(markOtptions[currStep], currStep))
      } else {
        markViewArr.push(
          <View key={currStep} style={styles.markItemView}>
            <Text style={styles.markItemText}>{markOtptions[currStep]}</Text>
            <View style={styles.markItemLine}></View>
          </View>
        )
      }
      currStep += 1
    }
    return (
      <View
        style={styles.markContainer}
      >
        {markViewArr}
      </View>
    )
  }

  /**
   * 渲染滑块的toopTip提示
   */
  renderThumbToolTip = (isOther?: boolean) => {
    const { showTip, renderToolTip } = this.props
    if (!showTip) {
      return
    }
    const { tip, otherTip } = this.state
    return (
      <View style={[styles.toolTip, this.showAndroidTip ? { top: 0, marginTop: 0, height: 100 } : {}]}>
        {
          renderToolTip ? renderToolTip(isOther ? otherTip : tip)
          :
            [
              <View key={1} style={styles.toolTipTextContain}>
                <Text style={styles.toolTipText}>{isOther ? otherTip : tip}</Text>
              </View>,
              <View key={2} style={styles.toolTipIcon}></View>
            ]
        }
      </View>
    )
  }

  /**
   * 默认滑块的渲染
   */
  renderThumb = () => {
    const {
      minValue,
      maxValue,
    } = this.props
    const {
      value,
      containerSize,
      thumbSize
    } = this.state

    const thumbLeft = value.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: [-1, containerSize.width - thumbSize.width + 1]
    })

    const thumBg = thumbImage ? {} : {}

    if (this.showAndroidTip) {
      return (
        <Animated.View
          onLayout={this.measureThumb}
          renderToHardwareTextureAndroid
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbLeft }, { translateY: 0 }],
              height: variables.sliderSlideHeightForTip,
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          {this.renderThumbToolTip()}
          <View
            style={[
              thumBg,
              thumbTouchSize,
              { borderRadius: thumbTouchSize.width / 2 }
            ]}
          >
            {this.renderThumbImage()}
          </View>
        </Animated.View>
      )
    }
    return (
      <Animated.View
        onLayout={this.measureThumb}
        renderToHardwareTextureAndroid
        style={[
          thumBg,
          styles.thumb,
          thumbTouchSize,
          { borderRadius: thumbTouchSize.width / 2 },
          {
            transform: [{ translateX: thumbLeft }, { translateY: 0 }]
          }
        ]}
      >
        {this.renderThumbToolTip()}
        {this.renderThumbImage()}
      </Animated.View>
    )
  }

  /**
   * 双滑块模式下，另一个滑块的渲染
   */
  renderOtherThumb = () => {
    const {
      minValue,
      maxValue,
      isRange,
    } = this.props

    if (!isRange) {
      return
    }

    const {
      otherValue,
      containerSize,
      otherThumbSize
    } = this.state

    const thumBg = thumbImage ? {} : {}

    const otherThumbRight = otherValue.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: [-1, containerSize.width - otherThumbSize.width + 1]
    })

    if (this.showAndroidTip) {
      return (
        <Animated.View
          onLayout={this.measureOtherThumb}
          renderToHardwareTextureAndroid
          style={[
            styles.thumb,
            {
              transform: [{ translateX: otherThumbRight }, { translateY: 0 }],
              height: variables.sliderSlideHeightForTip,
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          {this.renderThumbToolTip(true)}
          <View
            style={[
              thumBg,
              thumbTouchSize,
              { borderRadius: thumbTouchSize.width / 2 }
            ]}
          >
            {this.renderThumbImage()}
          </View>
        </Animated.View>
      )
    }

    return (
      <Animated.View
        onLayout={this.measureOtherThumb}
        renderToHardwareTextureAndroid
        style={[
          thumBg,
          styles.thumb,
          {
            transform: [{ translateX: otherThumbRight }, { translateY: 0 }]
          }
        ]}
      >
        {this.renderThumbToolTip(true)}
        {this.renderThumbImage()}
      </Animated.View>
    )
  }

  /**
   * 默认滑块划过的滑轨
   */
  renderMinimumTrack = () => {
    const {
      minValue,
      maxValue,
      minTrackColor,
      rangeMinTrackColor,
      disabled,
      isRange
    } = this.props
    const {
      value,
      containerSize,
      thumbSize
    } = this.state
    const minimumTrackWidth = value.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: [0, containerSize.width - thumbSize.width]
    })
    const minimumTrackColor = isRange ? rangeMinTrackColor : (disabled ? minTrackDisabledColor : minTrackColor)
    const minimumTrackStyle = {
      position: 'absolute',
      width: Animated.add(minimumTrackWidth, thumbSize.width / 2),
      backgroundColor: minimumTrackColor
    }
    return (
      <Animated.View
        renderToHardwareTextureAndroid
        style={[styles.track, minimumTrackStyle]}
      />
    )
  }

  /**
   * 双滑轨模式下，另一个滑块划过的滑轨
   */
  renderOtherMinimumTrack = () => {
    const {
      minValue,
      maxValue,
      minTrackColor,
      disabled
    } = this.props
    const {
      otherValue,
      containerSize,
      otherThumbSize
    } = this.state
    const minimumTrackWidth = otherValue.interpolate({
      inputRange: [minValue, maxValue],
      outputRange: [0, containerSize.width - otherThumbSize.width]
    })
    const minimumTrackColor = disabled ? minTrackDisabledColor : minTrackColor
    const minimumTrackStyle = {
      position: 'absolute',
      width: Animated.add(minimumTrackWidth, otherThumbSize.width / 2),
      backgroundColor: minimumTrackColor
    }
    return (
      <Animated.View
        renderToHardwareTextureAndroid
        style={[styles.track, minimumTrackStyle]}
      />
    )
  }

  render () {
    const {
      maxTrackColor,
      style,
      showTip,
      renderThumb
    } = this.props

    const touchOverflowStyle = this.getTouchOverflowStyle()

    return (
      <View style={style}>
        {this.renderMarkView()}
        <View
          style={[
            styles.silderContainer,
            showTip ? { height: variables.sliderSlideHeightForTip } : {}
          ]}
          onLayout={this.measureContainer}
        >
          <View
            style={[
              styles.track,
              { backgroundColor: maxTrackColor },
            ]}
            renderToHardwareTextureAndroid
            onLayout={this.measureTrack}
          />
          {this.renderOtherMinimumTrack()}
          {this.renderMinimumTrack()}
          {this.renderThumb()}
          {this.renderOtherThumb()}
          <View
            renderToHardwareTextureAndroid
            style={[styles.touchArea, touchOverflowStyle]}
            {...this.panResponder.panHandlers}
          >
          </View>
        </View>
      </View>
    )
  }
}
