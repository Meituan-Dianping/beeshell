import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'

import { Carousel } from '../../src'

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  title: {
    color: '#202325',
    fontSize: 24,
    lineHeight: 33
  },
  subtitle: {
    lineHeight: 28,
    fontSize: 20,
    color: '#202020',
    paddingHorizontal: 15
  },
  label: {
    lineHeight: 25,
    fontSize: 18,
    color: '#202020',
    paddingHorizontal: 15,
    marginTop: 30,
    marginBottom: 10
  },
  description: {
    color: '#666666',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 17
  },
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 15,
    height: 80,
    position: 'relative'
  },
  slide: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  slideText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000'
  },
  page: {
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 6,
    right: 21,
    paddingHorizontal: 7
  }
})
export default class CarouselScreen extends Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      autoplay: true
    }
  }

  indexChange (index) {
    this.setState({
      currentIndex: index
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>轮播 Carousel</Text>
          <Text style={styles.description}>用于多个同等级信息展示。</Text>
        </View>
        <Text style={styles.subtitle}>基础</Text>
        <View style={{ height: 10 }}></View>
        <View style={styles.wrapper}>
          <Carousel
            dotStyle={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#e5e5e5' }}
            activeDotStyle={{ width: 6, height: 6 }}
            paginationStyle={{ bottom: 8 }}
            onTouchStart={() => console.log('onTouchStart')}
            onTouchEnd={() => console.log('onTouchEnd')}
          >
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-1</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-2</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-3</Text>
            </View>
          </Carousel>
        </View>
        <View style={{ height: 30 }}></View>
        <Text style={styles.subtitle}>小圆轮播</Text>
        <View style={styles.wrapper}>
          <Carousel
            autoplay={true}
            dotStyle={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#e5e5e5' }}
            activeDotStyle={{ width: 4, height: 4, backgroundColor: '#0000ff' }}
            paginationStyle={{ justifyContent: 'flex-end', bottom: 6, paddingRight: 10 }}
          >
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-1</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideText}>自定义高亮dot样式</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-3</Text>
            </View>
          </Carousel>
        </View>
        <View style={{ height: 30 }}></View>
        <Text style={styles.subtitle}>文字轮播</Text>
        <View style={[styles.wrapper, { marginTop: 10 }]}>
          <Carousel
            autoplay={true}
            showsPagination={false}
            onIndexChanged={(index) => this.indexChange(index)}
          >
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-1</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-2</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.slideText}>内容-3</Text>
            </View>
          </Carousel>
          <View style={styles.page}>
            <Text style={{ fontSize: 11, lineHeight: 14, color: 'white' }}>{this.state.currentIndex + 1}/3</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
