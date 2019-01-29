import React, { Component } from 'react'
import {
  View,
  Animated,
  StyleProp,
  Dimensions,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle
} from 'react-native'

import styles from './styles'

export interface ProgressProps {
  style?: any
  barStyle?: any
  percent?: number
  easing?: boolean
  duration?: number
}

const progressStyles = StyleSheet.create<any>(styles)

export class Progress extends Component<ProgressProps, any> {

  static defaultProps = {
    style: {},
    barStyle: {},
    percent: 0,
    easing: false,
    duration: 1000
  }

  constructor (props: ProgressProps) {
    super(props)
    this.state = {
      wrapperWidth: null,
      barWidth: new Animated.Value(0)
    }
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps: ProgressProps) {
    if (
      this.props.easing &&
      nextProps.percent !== this.props.percent
    ) {
      this.toAnimate(
        this.state.barWidth,
        this.getWidthByPercent(this.state.wrapperWidth, this.props.percent),
        this.getWidthByPercent(this.state.wrapperWidth, nextProps.percent),
        this.props.duration
      )
    }
  }

  normalPercent(percent: number) {
    let ret = 0

    if (percent != null && percent > 0) {
      ret = percent > 100 ? 100 : percent
    }

    return ret
  }

  getWidthByPercent(baseWidth, percent) {
    return baseWidth * (this.normalPercent(percent) / 100)
  }

  onLayout = (e: LayoutChangeEvent) => {
    if (this.state.wrapperWidth == null) {
      // console.log('onLayout: ', e.nativeEvent.layout.width)
      this.setState({
        wrapperWidth: e.nativeEvent.layout.width
      }, () => {

        if (this.props.easing) {
          this.toAnimate(
            this.state.barWidth,
            0,
            this.getWidthByPercent(this.state.wrapperWidth, this.props.percent),
            this.props.duration
          )
        }
      })
    }
  }

  toAnimate(target, fromValue, toValue, duration) {
    target.setValue(fromValue)
    Animated.timing(
      target,
      {
        toValue,
        duration: duration
      }
    ).start()
  }

  render () {
    const {
      style,
      barStyle,
      easing,
      percent
    } = this.props

    const { wrapperWidth, barWidth } = this.state

    let percentStyle
    if (wrapperWidth == null) {
      percentStyle = {}
    } else {
      percentStyle = easing ? {
        width: barWidth
      } : {
        width: this.getWidthByPercent(wrapperWidth, percent)
      }
    }

    return (
      <View style={[progressStyles.wrapper, style]} onLayout={this.onLayout}>
        {
          wrapperWidth == null ? null : (
            easing ? (
              <Animated.View style={[progressStyles.progressBar, barStyle, percentStyle]} />
            ) : (
              <View style={[progressStyles.progressBar, barStyle, percentStyle]} />
            )
          )
        }
      </View>
    )
  }
}
