import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native'

import { NavigationBar } from '../../src'

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
  customButtonWrapper: {
    flexDirection: 'row',
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  customButton: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default class NavigationBarScreen extends Component<{}, {}> {

  constructor (p) {
    super(p)
    this.state = {}
  }

  clickHandle (e) {
    console.warn('clickHandle', Object.keys(e))
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>导航栏 Navigation Bar</Text>
          <Text style={styles.description}>用于展示当前页面的主题，并且能够快速返回上一页面或进入特定页面。</Text>
        </View>
        <Text style={styles.subtitle}>基础</Text>
        <View style={{ height: 10 }}></View>
        <NavigationBar
          hasSearchBar={false}
          title='标题'
          onPressBackButton={e => this.clickHandle(e)}
        ></NavigationBar>
        <Text style={styles.label}>标题+文字</Text>
        <NavigationBar
          title='标题'
        >
          <View style={styles.customButtonWrapper}>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => console.log('操作')}
            >
              <Text style={{ color: '#4e73ff', fontSize: 14 }}>操作</Text>
            </TouchableHighlight>
          </View>
        </NavigationBar>
        <Text style={styles.label}>标题+icon</Text>
        <NavigationBar
          title='标题'
          onPressBackButton={e => this.clickHandle(e)}
        >
          <View style={styles.customButtonWrapper}>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={styles.customButton}
              onPress={() => { console.log('map.') }}
            >
              <Image
                source={require('./images/icon-search-lg.png')}
                resizeMode='contain'
                style={{ width: 22, height: 22 }}
              />
            </TouchableHighlight>
          </View>
        </NavigationBar>
        <View style={{ height: 10 }}></View>
        <NavigationBar
          title='标题'
          onPressBackButton={e => this.clickHandle(e)}
        >
          <View style={styles.customButtonWrapper}>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={styles.customButton}
              onPress={() => { console.log('star.') }}
            >
              <Image
                source={require('./images/icon-collect.png')}
                resizeMode='contain'
                style={{ width: 22, height: 22 }}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={[styles.customButton, { marginLeft: 15 }]}
              onPress={() => { console.log('share.') }}
            >
              <Image
                source={require('./images/icon-share.png')}
                resizeMode='contain'
                style={{ width: 22, height: 22 }}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={[styles.customButton, { marginLeft: 15 }]}
              onPress={() => { console.log('more.') }}
            >
              <Image
                source={require('./images/icon-more.png')}
                resizeMode='contain'
              />
            </TouchableHighlight>
          </View>
        </NavigationBar>
        <Text style={styles.label}>搜索</Text>
        <NavigationBar
          hasSearchBar={true}
          onPressBackButton={e => this.clickHandle(e)}
        ></NavigationBar>
        <Text style={styles.label}>搜索+icon</Text>
        <NavigationBar
          hasSearchBar={true}
          onPressBackButton={e => this.clickHandle(e)}
        >
          <View style={styles.customButtonWrapper}>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={styles.customButton}
              onPress={() => { console.log('map.') }}
            >
              <Image
                source={require('./images/icon-map.png')}
                resizeMode='contain'
                style={{ width: 22, height: 22 }}
              />
            </TouchableHighlight>
          </View>
        </NavigationBar>
        <View style={{ height: 10 }}></View>
        <NavigationBar
          hasSearchBar={true}
          onPressBackButton={e => this.clickHandle(e)}
        >
          <View style={styles.customButtonWrapper}>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={styles.customButton}
              onPress={() => { console.log('map.') }}
            >
              <Image
                source={require('./images/icon-map.png')}
                resizeMode='contain'
                style={{ width: 22, height: 22 }}
              />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.3}
              underlayColor='transparent'
              style={[styles.customButton, { marginLeft: 15 }]}
              onPress={() => { console.log('share.') }}
            >
              <Image
                source={require('./images/icon-share.png')}
                resizeMode='contain'
                style={{ width: 22, height: 22 }}
              />
            </TouchableHighlight>
          </View>
        </NavigationBar>
      </ScrollView>
    )
  }
}
