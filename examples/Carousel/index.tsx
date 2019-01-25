import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'

import { Carousel } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

const componentStyles = StyleSheet.create({
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
    flex: 1,
    backgroundColor: '#ced',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.container}>

        <View style={styles.row}>
          <Text style={styles.header}>基础</Text>
        </View>

        <Carousel
          style={{ height: 80 }}
          paginationStyle={{ bottom: 8 }}
          onTouchStart={() => console.log('onTouchStart')}
          onTouchEnd={() => console.log('onTouchEnd')}>
          <View style={componentStyles.slide}>
            <Text>内容-1</Text>
          </View>
          <View style={componentStyles.slide}>
            <Text>内容-2</Text>
          </View>
          <View style={componentStyles.slide}>
            <Text>内容-3</Text>
          </View>
        </Carousel>

        <View style={styles.row}>
          <Text style={styles.header}>自定义分页位置</Text>
        </View>

        <Carousel
          style={{ height: 80 }}
          autoplay={true}
          paginationStyle={{ justifyContent: 'flex-end', bottom: 6, paddingRight: 10 }}>
          <View style={componentStyles.slide}>
            <Text>内容-1</Text>
          </View>
          <View style={componentStyles.slide}>
            <Text>自定义高亮dot样式</Text>
          </View>
          <View style={componentStyles.slide}>
            <Text>内容-3</Text>
          </View>
        </Carousel>

        <View style={styles.row}>
          <Text style={styles.header}>自定义分页位置</Text>
        </View>
        <Carousel
          style={{ height: 80 }}
          autoplay={true}
          renderPagination={(index, total) => {
            return (
              <View style={componentStyles.page}>
                <Text style={{ fontSize: 11, lineHeight: 14, color: 'white' }}>{index + 1}/{total}</Text>
              </View>
            )
          }}
          onIndexChanged={(index) => this.indexChange(index)}>

          <View style={componentStyles.slide}>
            <Text>内容-1</Text>
          </View>
          <View style={componentStyles.slide}>
            <Text>内容-2</Text>
          </View>
          <View style={componentStyles.slide}>
            <Text>内容-3</Text>
          </View>
        </Carousel>
      </ScrollView>
    )
  }
}
