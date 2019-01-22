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

import ProgressStyle from './style'

export interface ProgressProps {
  percent?: number
  wrapperWidth?: number
  styles?: any
  wrapperStyle?: StyleProp<ViewStyle>
  barStyle?: StyleProp<ViewStyle>
  easing?: boolean
  duration?: number
}

const progressStyles = StyleSheet.create<any>(ProgressStyle)

export class Progress extends Component<ProgressProps, any> {

  static defaultProps = {
    percent: 0,
    easing: false,
    styles: progressStyles,
    duration: 1000
  }

  constructor (props: ProgressProps) {
    super(props)
    this.state = {
      wrapperWidth: props.wrapperWidth || Dimensions.get('window').width,
      percentage: new Animated.Value(0)
    }
  }

  componentDidMount () {
    if (this.props.easing) {
      this.state.percentage.setValue(0)
      Animated.timing(
        this.state.percentage,
        {
          toValue: this.getWidth(),
          duration: this.props.duration
        }
      ).start()
    }
  }

  componentWillReceiveProps (nextProps: ProgressProps) {
    if (nextProps.wrapperWidth !== this.props.wrapperWidth) {
      this.setState({
        wrapperWidth: nextProps.wrapperWidth
      })
    }
    if (this.props.easing && nextProps.percent !== this.props.percent) {
      this.setState({
        percentage: new Animated.Value(this.getWidth(nextProps.percent))
      })
    }
  }

  normalPercent = (percent?: number) => {
    let widthPercent: any = 0

    if (percent !== undefined && percent > 0) {
      widthPercent = percent > 100 ? 100 : percent
    }

    return widthPercent
  }

  getWidth = (percent = this.props.percent) => {
    return this.state.wrapperWidth * (this.normalPercent(percent) / 100)
  }

  onLayout = (e: LayoutChangeEvent) => {
    this.setState({
      wrapperWidth: e.nativeEvent.layout.width
    })
  }

  render () {
    const {
      easing,
      styles,
      barStyle
    } = this.props

    const percentStyle = easing ? {
      width: this.state.percentage
    } : {
      width: this.getWidth()
    }

    return (
      <View style={styles.wrapper} onLayout={this.onLayout}>
        {easing ? (
          <Animated.View style={[styles.progressBar, percentStyle, barStyle]} />
        ) : (
          <View style={[styles.progressBar, percentStyle, barStyle]} />
        )}
      </View>
    )
  }
}
