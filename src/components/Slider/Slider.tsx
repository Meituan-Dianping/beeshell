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
import sliderStyles from './styles'
import Coord from './Coord'

const thumbImage = require('./images/rectangle.png')
const otherThumbImage = require('./images/rectangle.png')

export interface SliderProps {
  style?: ViewStyle | RegisteredStyle<ViewStyle>

  value?: number | number[]
  min?: number
  max?: number
  disabled?: boolean
  step?: number
  marks?: any[] // 刻度
  range?: boolean
  vertical?: boolean

  trackWeight?: number // 滑轨粗细
  thumbSize?: number
  maxTrackColor?: string
  minTrackColor?: string
  midTrackColor?: string

  onChange?: (value: number | number []) => void

  showTip?: boolean
  renderTip?: (value: any) => ReactElement<any>
  renderThumb?: (isOther: any) => ReactElement<any>
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

const styles = StyleSheet.create<any>(sliderStyles)

export default class Slider extends PureComponent<SliderProps, State> {
  oldValue: any
  oldOtherValue: any
  panResponder: PanResponderInstance
  previousLeft: number
  otherPreviousLeft: number
  isOther: boolean
  showAndroidTip: boolean

  static defaultProps = {
    value: 0,
    min: 0,
    max: 1,
    step: 0,

    maxTrackColor:  variables.mtdFillGray,
    minTrackColor: variables.mtdBrandPrimary,
    midTrackColor: variables.mtdBrandDanger,
    range: false,
    vertical: false,
    showTip: false,
    trackWeight: 5,
    thumbSize: 30
  }

  constructor (props) {
    super(props)
    this.state = {
      containerSize: { width: 0, height: 0 },
      trackSize: { width: 0, height: 0 },
      thumbSize: { width: props.thumbSize, height: props.thumbSize },
      otherThumbSize: { width: props.thumbSize, height: props.thumbSize },
      value: new Animated.Value(this.getValueByProps()),
      otherValue: new Animated.Value(this.getValueByProps(true)),
      tip: `${this.getValueByProps()}`,
      otherTip: `${this.getValueByProps(true)}`
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
    let newValue = 0
    let newOtherValue = 0
    const { range } = this.props
    if (range && nextProps.value instanceof Array) {
      newValue = nextProps.value[0]
      newOtherValue = nextProps.value[1]
    } else {
      newValue = nextProps.value
    }

    if (this.getValueByProps() !== newValue) {
      this.setCurrentValue(newValue)
    }
    if (range && this.getValueByProps(true) !== newOtherValue) {
      this.setCurrentValue(newOtherValue, range)
    }
  }

  /**
   * 通过props获取滑块对应的value值
   */
  getValueByProps = (isOther?: boolean) => {
    const { value, range } = this.props
    if (range && value instanceof Array) {
      if (isOther) {
        return value[1]
      }
      return value[0]
    }
    return value as number
  }

  /**
   * 判断用户触控的区域是否在滑块上
   */
  thumbTouchCheck = (e: any) => {
    const nativeEvent = e.nativeEvent
    const { range } = this.props
    if (range) {
      const otherThumbCoord = this.getThumbCoord(range)
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
    const { thumbSize, otherThumbSize, containerSize } = this.state
    let currThumb = thumbSize
    if (isOther) {
      currThumb = otherThumbSize
    }
    const { vertical } = this.props
    let x = null
    let y = null
    if (vertical) {
      x = (containerSize.width - currThumb.width) / 2
      y = this.getThumbLeft(this.getCurrentValue(isOther))
    } else {
      x = this.getThumbLeft(this.getCurrentValue(isOther))
      y = (containerSize.height - currThumb.height) / 2
    }
    return new Coord(
      x,
      y,
      currThumb.width,
      currThumb.height,
    )
  }

  /**
   * 滚动状态响应
   */
  scroll = (gestureState: Object) => {
    if (this.props.disabled) {
      return
    }
    if (this.isOther) {
      const isOtherValue = this.getValue(gestureState, this.isOther)
      this.setCurrentValue(isOtherValue, this.isOther)
    } else {
      const value = this.getValue(gestureState)
      this.setCurrentValue(value)
    }
  }

  touchStart = (e: Object) => {
    this.oldValue = (this.state.value as any).__getValue()
    this.oldOtherValue = (this.state.otherValue as any).__getValue()
    return this.thumbTouchCheck(e)
  }

  pressStart = () => {
    if (this.isOther) {
      this.otherPreviousLeft = this.getThumbLeft(this.getCurrentValue(this.isOther))
    } else {
      this.previousLeft = this.getThumbLeft(this.getCurrentValue())
    }
  }

  lastMove = (_: Object, gestureState: Object) => {
    this.scroll(gestureState)
  }

  touchEnd = (_: Object, gestureState: Object) => {
    this.scroll(gestureState)
    if (this.oldValue !== this.getCurrentValue()) {
      this.triggerEvent('onChange')
    }

    if (this.props.range && this.oldOtherValue !== this.getCurrentValue(true)) {
      this.triggerEvent('onChange')
    }
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

  /**
   * 获取可滑动长度
   */
  getScrollLength = () => {
    const { vertical } = this.props
    const { trackSize } = this.state
    if (vertical) {
      return trackSize.height
    } else {
      return trackSize.width
    }
  }

  /**
   * 获取滑块的坐标的宽度
   * 如果是横向slider则取width,纵向取height
   */
  getThumbOffset = (isOther?: boolean) => {
    const { vertical } = this.props
    const { thumbSize, otherThumbSize } = this.state
    if (vertical && isOther) {
      return otherThumbSize.height
    } else if (!vertical && isOther) {
      return otherThumbSize.width
    } else if (vertical && !isOther) {
      return thumbSize.height
    } else if (!vertical && !isOther) {
      return thumbSize.height
    }
  }

  /**
   * 获取当前value值所占的百分比
   */
  getRatio = (value: number) => {
    const { min, max } = this.props
    return (value - min) / (max - min)
  }

  /**
   * 滑块在滑动轴上的偏移量
   * value => x
   */
  getThumbLeft = (value: number) => {
    const { vertical } = this.props
    let ratio = this.getRatio(value)
    if (vertical) {
      ratio = 1 - ratio
    }
    const scrollLength = this.getScrollLength()
    return (
      ratio * scrollLength
    )
  }

  /**
   * 互斥prop
   * 刻度属性只有正在非纵向轴、非双滑块下才生效
   */
  showStep = () => {
    const { vertical, step, marks, range } = this.props
    if (!range && !vertical && step && marks) {
      return true
    }
    return false
  }

  /**
   * 获取滑动位置所对应的value值，和getThumbLeft方法对应
   * x => value
   */
  getValue = (gestureState: Object, isOther?: boolean) => {
    let previousLeft = this.previousLeft
    if (isOther) {
      previousLeft = this.otherPreviousLeft
    }
    const scrollLength = this.getScrollLength()
    const { step, min, max, vertical } = this.props
    let thumbLeft = null
    if (vertical) {
      thumbLeft = previousLeft + (gestureState as any).dy
    } else {
      thumbLeft = previousLeft + (gestureState as any).dx
    }
    let ratio = thumbLeft / scrollLength
    if (vertical) {
      ratio = 1 - ratio
    }
    if (this.showStep()) {
      return Math.max(
        min,
        Math.min(
          max,
          min + Math.round(ratio * (max - min) / step) * step
        )
      )
    }
    return Math.max(
      min,
      Math.min(
        max,
        ratio * (max - min) + min
      )
    )
  }

  /**
   * 获取滑块的value值
   */
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

  triggerEvent = (event) => {
    if (this.props[event]) {
      let args = [Math.round(this.getCurrentValue())]
      const { range } = this.props
      if (range) {
        if (this.compareValue()) {
          args.unshift(Math.round(this.getCurrentValue(range)))
        } else {
          args.push(Math.round(this.getCurrentValue(range)))
        }
        this.props[event](args)
      } else {
        this.props[event](args[0])
      }
    }
  }

  /**
   * 默认滑块的的滑块图片渲染
   */
  renderThumbImage = (isOther?: boolean) => {
    if (!isOther && !thumbImage) return
    if (isOther && !otherThumbImage) return

    const { renderThumb } = this.props
    const { thumbSize } = this.state
    if (typeof renderThumb === 'function') {
      return renderThumb(isOther)
    }
    return <Image style={[thumbSize, { borderRadius: this.getThumbOffset() / 2 }]} source={isOther ? otherThumbImage as ImageSourcePropType : thumbImage as ImageSourcePropType}/>
  }

  /**
   * 刻度模块的渲染
   */
  renderMarks = () => {
    const { step, marks, min, max, thumbSize } = this.props
    if (!this.showStep()) {
      return null
    }
    const maxStep = Math.ceil(Math.abs((max - min) / step)) + 1
    let currStep = 0
    const markViewArr = []
    while (maxStep > currStep) {
      if (React.isValidElement(marks[currStep])) {
        markViewArr.push(marks[currStep])
      } else {
        markViewArr.push(
          <View key={currStep} style={{ width: thumbSize, alignItems: 'center' }}>
            <Text style={styles.markItemText}>{marks[currStep]}</Text>
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
    const { showTip, renderTip } = this.props
    if (!showTip) {
      return
    }
    const { tip, otherTip } = this.state
    return (
      <View style={[styles.tip, this.showAndroidTip ? { top: 0, marginTop: 0, height: 100 } : {}]}>
        <View key={1} style={styles.tipContent}>
          {
            renderTip ? renderTip(isOther ? otherTip : tip)
            :
            <Text style={styles.tipText}>{isOther ? otherTip : tip}</Text>
          }
        </View>
        <View key={2} style={styles.tipIcon}></View>
      </View>
    )
  }

  /**
   * 滑动的起始和结束x值
   */
  getScrollRange = () => {
    const scrollLength = this.getScrollLength()
    return [0, scrollLength]
  }

  /**
   * 滑块渲染
   */
  renderThumb = (isOther?: boolean) => {
    const { vertical, range } = this.props
    if (isOther && !range) return

    const { value, otherValue, thumbSize, otherThumbSize } = this.state
    let currValue = value
    let currThumb = thumbSize
    let measureFn = this.measureThumb
    if (isOther) {
      currValue = otherValue
      currThumb = otherThumbSize
      measureFn = this.measureOtherThumb
    }

    const thumbLeft = this.getThumbLeft((currValue as any).__getValue())
    let thumbStyle: any = {
      transform: [{ translateX: thumbLeft }, { translateY: 0 }],
      alignItems: 'center',
      borderRadius: this.getThumbOffset(isOther) / 2,
    }
    if (vertical) {
      thumbStyle.transform = [{ translateX: 0 }, { translateY: thumbLeft }]
    }

    if (this.showAndroidTip) {
      return (
        <Animated.View
          onLayout={measureFn}
          renderToHardwareTextureAndroid
          style={[
            styles.thumb,
            thumbStyle,
          ]}
        >
          {this.renderThumbToolTip(isOther)}
          <View
            style={[
              currThumb,
              { borderRadius: this.getThumbOffset(isOther) / 2 }
            ]}
          >
            {this.renderThumbImage(isOther)}
          </View>
        </Animated.View>
      )
    }
    return (
      <Animated.View
        onLayout={measureFn}
        renderToHardwareTextureAndroid
        style={[
          styles.thumb,
          currThumb,
          thumbStyle,
        ]}
      >
        {this.renderThumbToolTip(isOther)}
        {this.renderThumbImage(isOther)}
      </Animated.View>
    )
  }

  /**
   * 两个滑块值比较，滑块A的值是否大于B
   */
  compareValue = () => {
    const { range } = this.props
    return range && this.getCurrentValue() >= this.getCurrentValue(true)
  }

  /**
   * 滑轨色值计算
   * 双滑块模式下，需要根据两个滑块的值大小结果互换色值
   * 垂直滑块模式下，因为滑块的渲染是从顶部计算的，所以滑块需要使用反向色值来实现从底部滑动的效果
   * 假设滑块A,B
   */
  getTrackColor = (isOther?: boolean) => {
    const { minTrackColor, midTrackColor, maxTrackColor, range, vertical } = this.props
    let activeColor = ''
    // 双滑块B
    if (isOther) {
      if (this.compareValue()) {
        if (vertical) {
          // 纵向双滑块A>=B B => midTrackColor
          activeColor = midTrackColor
        } else {
          // 横向双滑块A>=B B => minTrackColor
          activeColor = minTrackColor
        }
      } else {
        if (vertical) {
          // 纵向双滑块A<B B => trackColor
          activeColor = maxTrackColor
        } else {
          // 横向双滑块A<B B => midTrackColor
          activeColor = midTrackColor
        }
      }
    // 双滑块A
    } else if (range) {
      if (this.compareValue()) {
        if (vertical) {
          // 纵向双滑块A<B A => trackColor
          activeColor = maxTrackColor
        } else {
          // 横向双滑块A<B A => midTrackColor
          activeColor = midTrackColor
        }
      } else {
        if (vertical) {
          // 纵向双滑块A>=B A => midTrackColor
          activeColor = midTrackColor
        } else {
          // 横向单滑块A>=B A => minTrackColor
          activeColor = minTrackColor
        }
      }
    // 单滑块
    } else {
      if (vertical) {
        // 纵向单滑块 A => trackColor
        activeColor = maxTrackColor
      } else {
        // 横向单滑块 A => minTrackColor
        activeColor = minTrackColor
      }
    }
    return [activeColor]
  }

  /**
   * 默认滑块划过的滑轨
   */
  renderMinimumTrack = (isOther?: boolean) => {
    const { disabled, range, vertical, trackWeight } = this.props
    if (isOther && !range) return

    const { value, otherValue } = this.state
    let currValue: any = value
    let minimumTrackColor = null
    let currKey = 'minTrack'
    if (isOther) {
      currValue = otherValue
      currKey = 'otherMinTrack'
    }
    const minimumTrackWidth = this.getThumbLeft(currValue.__getValue())
    // 滑轨颜色值设定
    const trackColors = this.getTrackColor(isOther)
    minimumTrackColor = trackColors[0]
    const minimumTrackStyle: any = {
      position: 'absolute',
      backgroundColor: minimumTrackColor
    }
    let trackStyle = null
    if (vertical) {
      minimumTrackStyle.height = minimumTrackWidth
      minimumTrackStyle.width = this.props.trackWeight
      trackStyle = { marginVertical: this.getThumbOffset(isOther) / 2 }
    } else {
      minimumTrackStyle.height = this.props.trackWeight
      minimumTrackStyle.width = minimumTrackWidth
      trackStyle = { marginHorizontal: this.getThumbOffset(isOther) / 2 }
    }
    return (
      <Animated.View
        key={currKey}
        renderToHardwareTextureAndroid
        style={[{ borderRadius: trackWeight / 2 }, minimumTrackStyle, trackStyle]}
      />
    )
  }

  getTrackStyle = () => {
    const { range, vertical, maxTrackColor, minTrackColor, trackWeight, thumbSize } = this.props
    const trackStyle: any = { backgroundColor: maxTrackColor }
    let marginArr = [ 'marginLeft', 'marginRight', 'marginHorizontal', 'height' ]
    const rest = thumbSize - trackWeight
    const spacing = rest > 0 ? Math.ceil(rest / 2) : 0
    if (vertical) {
      marginArr = [ 'marginTop', 'marginBottom', 'marginVertical', 'width' ]
      trackStyle.flex = 1
      trackStyle.alignItems = 'flex-start'
      trackStyle.backgroundColor = minTrackColor
      trackStyle.marginHorizontal = spacing
    } else {
      trackStyle.marginVertical = spacing
    }
    // 样式处理
    if (range) {
      trackStyle[marginArr[0]] = this.getThumbOffset() / 2
      trackStyle[marginArr[1]] = this.getThumbOffset(true) / 2
    } else {
      trackStyle[marginArr[2]] = this.getThumbOffset() / 2
    }
    trackStyle[marginArr[3]] = this.props.trackWeight
    return trackStyle
  }

  renderTracks = () => {
    const { vertical, trackWeight } = this.props
    const trackStyle: any = this.getTrackStyle()
    // 如果value > oldValue，则代表两个滑块滑动位置互换，则更新渲染层级
    let tracks = [
      <View
        style={[ { borderRadius: trackWeight / 2 }, trackStyle ]}
        onLayout={this.measureTrack}
      />
    ]
    // vertical的值和this.compareValue()值相同时，次滑块轴在底层，反之主滑块轴在底层
    if (vertical === this.compareValue()) {
      tracks.push(this.renderMinimumTrack(true))
      tracks.push(this.renderMinimumTrack())
    } else {
      tracks.push(this.renderMinimumTrack())
      tracks.push(this.renderMinimumTrack(true))
    }
    return tracks
  }

  render () {
    const { style, vertical } = this.props

    return (
      <View
        style={[
          { flexDirection: vertical ? 'row' : 'column' },
          style
        ]}>
        {this.renderMarks()}
        <View
          style={{
            alignItems: vertical ? 'center' : undefined,
            justifyContent: vertical ? undefined : 'center'
          }}
          onLayout={this.measureContainer}
        >
          {this.renderTracks()}
          {this.renderThumb()}
          {this.renderThumb(true)}
          <View
            renderToHardwareTextureAndroid
            style={styles.touchArea}
            {...this.panResponder.panHandlers}>
          </View>
        </View>
      </View>
    )
  }
}
