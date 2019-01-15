import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { Button, Icon } from '../../src'

const Styles = StyleSheet.create({
  title: {
    padding: 15,
    fontSize: 16
  },
  spaceGap: {
    height: 20,
    marginLeft: -20,
    marginRight: -20,
    backgroundColor: '#f2f3f4'
  },
  panel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#E5E8E9',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
} as any)

interface State {
  count: number
}

export default class ButtonScreen extends Component<{}, State> {
  constructor (p) {
    super(p)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <ScrollView style={Styles.warp}>

        <Text style={Styles.headerTitle}>按钮 Button</Text>
        <Text style={Styles.explainText}>用于触发一个行动并形成决策的组件。</Text>

        <View style={Styles.section}>
          <Text style={Styles.sectionTitle}>基础用法</Text>
          <View style={Styles.panel}>
            <Text>默认</Text>
            <Button type='default' size='md'>默认 default</Button>
          </View>

          <View style={Styles.panel}>
            <Text>首选项</Text>
            <Button type='primary' size='md'>首选项 primary</Button>
          </View>

          <View style={Styles.panel}>
            <Text>危险</Text>
            <Button type='danger' size='md'>危险 danger</Button>
          </View>

          <View style={Styles.panel}>
            <Text>一般信息</Text>
            <Button type='info' size='md'>一般信息 info</Button>
          </View>

          <View style={Styles.panel}>
            <Text>警告</Text>
            <Button type='warning' size='md'>警告 warning</Button>
          </View>

          <View style={Styles.panel}>
            <Text>成功</Text>
            <Button type='success' size='md'>成功 success</Button>
          </View>

          <View style={Styles.spaceGap}></View>

          <View style={Styles.panel}>
            <Text>禁用</Text>
            <Button type='default' size='md' disabled>default disabled</Button>
          </View>

          <View style={Styles.panel}>
            <Text>禁用</Text>
            <Button type='primary' size='md' disabled>primary disabled</Button>
          </View>

          <View style={Styles.panel}>
            <Text>禁用</Text>
            <Button type='danger' size='md' disabled>danger disabled</Button>
          </View>

          <View style={Styles.spaceGap}></View>
        </View>

        <View style={[Styles.section, { marginBottom: 200 }]}>
          <Text style={Styles.sectionTitle}>衍生用法</Text>

          <View style={Styles.panel}>
            <Text>圆角示范</Text>
            <Button style={{ borderRadius: 50 }} type='primary' size='md'>primary</Button>
          </View>

          <View style={Styles.panel}>
            <Text>圆角示范</Text>
            <Button style={{ borderRadius: 50 }} type='primary' size='md' disabled>primary disabled</Button>
          </View>

          <View style={Styles.spaceGap}></View>

          <View style={Styles.panel}>
            <Text>纯文字示范</Text>
            <Button type='text' size='md'>primary</Button>
          </View>

          <View style={Styles.panel}>
            <Text>纯文字示范</Text>
            <Button type='text' size='md' disabled>primary disabled</Button>
          </View>

          <View style={Styles.spaceGap}></View>

          <View style={Styles.panel}>
            <Text>图标示范</Text>
            <Button style={{ borderRadius: 50, backgroundColor: 'transparent' }} type='primary' size='md'>
              <ActivityIndicator />
            </Button>
          </View>

          <View style={Styles.panel}>
            <Text>图标示范</Text>
            <Button style={{ borderRadius: 50, backgroundColor: 'transparent' }} type='primary' size='md'>
              <Icon type='search' />
            </Button>
          </View>

          <View style={Styles.panel}>
            <Text>图标示范</Text>
            <Button style={{ borderRadius: 50, backgroundColor: 'transparent' }} type='primary' size='md' disabled>
              <Icon type='search' />
            </Button>
          </View>

          <View style={Styles.spaceGap}></View>

          <View style={Styles.panel}>
            <Text>图标 + 文字</Text>
            <Button style={{ borderRadius: 50 }} type='primary' size='md'>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ActivityIndicator style={{ width: 14, height: 14 }} />
                <Text style={{ color: '#fff', marginLeft: 4 }}>加载中</Text>
              </View>
            </Button>
          </View>

          <View style={Styles.panel}>
            <Text>图标 + 文字</Text>
            <Button style={{ borderRadius: 50 }} type='primary' size='md'>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon type='search' tintColor='#fff' size={14} />
                <Text style={{ color: '#fff', marginLeft: 4 }}>搜索</Text>
              </View>
            </Button>
          </View>

          <View style={Styles.panel}>
            <Text>图标 + 文字</Text>
            <Button style={{ borderRadius: 50 }} type='primary' size='md' disabled>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon type='search' tintColor='#fff' size={14} />
                <Text style={{ color: '#fff', marginLeft: 4 }}>搜索</Text>
              </View>
            </Button>
          </View>

          <View style={Styles.spaceGap}></View>

          <View style={Styles.panel}>
            <View style={{ flex: 1 }}>
              <Button type='primary' size='md'>示例：横向拉伸至全屏</Button>
            </View>
          </View>

          <View style={Styles.spaceGap}></View>
        </View>
      </ScrollView>
    )
  }
}
