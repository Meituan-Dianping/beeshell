import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Animated } from 'react-native'

import { FadeAnimated, SlideAnimated } from '../../../src/common/animations'
import { Button } from '../../../src'

import styles from '../../common/styles'
import variables from '../../customTheme'

export default class AnimationsScreen extends Component<{}, any> {
  private fade: any
  private slide: any

  constructor(props) {
    super(props)
    this.state = {
      fadeTag: false,
      slideTag: false
    }
    this.fade = new FadeAnimated()
    this.slide = new SlideAnimated({
      directionType: ['horizontal', 'vertical'],
      translateXList: [0, 100],
      translateYList: [0, -20]
    })
  }

  componentDidMount () {
  }

  render () {
    return (
      <ScrollView
        style={styles.body}>
        <Text style={styles.header}>淡入淡出动画 FadeAnimated</Text>
        <View
          style={[
            styles.panel,
          ]}>
          <Button
            size='sm'
            onPress={() => {
              if (this.state.fadeTag) {
                this.fade.toOut().then(() => {
                  this.setState({
                    fadeTag: false
                  })
                })
              } else {
                this.fade.toIn().then(() => {
                  this.setState({
                    fadeTag: true
                  })
                })
              }
            }}>
            Toggle
          </Button>

          <Animated.View
            style={[
              { width: 100, height: 100, backgroundColor: variables.mtdBrandPrimaryDark },
              {
                transform: [
                  { scale: this.fade.getState().scale }
                ],
                opacity: this.fade.getState().opacity
              }
            ]}>
          </Animated.View>
        </View>

        <Text style={styles.header}>滑动动画</Text>
        <View style={styles.panel}>
          <Button
            size='sm'
            onPress={() => {
              if (this.state.slideTag) {
                this.slide.toOut().then(() => {
                  this.setState({
                    slideTag: false
                  })
                })
              } else {
                this.slide.toIn().then(() => {
                  this.setState({
                    slideTag: true
                  })
                })
              }
            }}>
            Toggle
          </Button>

          <Animated.View
            style={[
              { width: 100, height: 100, backgroundColor: variables.mtdBrandPrimaryDark },
              {
                transform: [
                  { translateX: this.slide.getState().translateX },
                  { translateY: this.slide.getState().translateY }
                ],
                opacity: this.slide.getState().opacity
              }
            ]}>
          </Animated.View>
        </View>
      </ScrollView>
    )
  }
}
