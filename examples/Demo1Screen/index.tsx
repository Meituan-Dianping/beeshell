import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { Button, Icon } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

interface State {
  count: number
}

export default class Demo1Screen extends Component<{}, State> {
  [propName: string]: any
  constructor (p) {
    super(p)
    this.state = {
      count: 0
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <View style={[styles.body, { backgroundColor: '#fff' }]}>
        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 80 }} type='primary' size='sm' textColorInverse>Login</Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 50, borderRadius: 25 }} type='info' size='sm'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type='search' tintColor='#fff'></Icon>
              <Text style={{ color: '#fff', marginLeft: 5 }}>Search</Text>
            </View>
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 50 }} type='danger' size='sm'>
            Want to see what it looks like?
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 50 }} type='success' size='sm'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#fff', textAlign: 'center', marginRight: 10 }}>Loading</Text>
              <ActivityIndicator size='small' color='#fff' />
            </View>
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 20, marginRight: 50 }} type='warning' size='sm'>
            HOME
          </Button>

          <Button style={{ borderColor: variables.mtdBrandInfo, paddingHorizontal: 20 }} type='default' size='sm'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type='plus-circle-o' tintColor={variables.mtdBrandInfo}></Icon>
              <Text style={{ color: variables.mtdBrandInfo, marginLeft: 10 }}>PROFILE</Text>
            </View>
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ }} type='primary' size='md' textColorInverse>
            Primary type and middle size.
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ backgroundColor: variables.mtdGrayLightest, paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            <Text style={{ color: variables.mtdGrayBase }}>Light</Text>
          </Button>

          <Button style={{ backgroundColor: variables.mtdGrayBase, paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            <Text style={{ color: '#fff' }}>Dark</Text>
          </Button>

          <Button style={{ paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            Text type
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ }} type='default' size='lg'>
            Default type and Large size
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 20, marginRight: 20 }} type='danger' size='md'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type='times-circle' tintColor='#fff'></Icon>
              <Text style={{ color: '#fff', marginLeft: 10 }}>DANGER</Text>
            </View>
          </Button>

          <Button style={{ }} type='success' size='md'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type='check-circle' tintColor='#fff'></Icon>
              <Text style={{ color: '#fff', marginLeft: 10 }}>SUCCESS</Text>
            </View>
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ paddingHorizontal: 80, borderRadius: 30 }} type='info' size='lg'>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator size='small' color='#fff' />
            </View>
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ backgroundColor: '#eb2f96', paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            <Text style={{ color: '#fff' }}>Magenta</Text>
          </Button>

          <Button style={{ backgroundColor: '#fa541c', paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            <Text style={{ color: '#fff' }}>Volcano</Text>
          </Button>

          <Button style={{ backgroundColor: '#a0d911', paddingHorizontal: 20 }} type='text' size='sm'>
          <Text style={{ color: '#fff' }}>Lime</Text>
          </Button>
        </View>

        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ backgroundColor: '#13c2c2', paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            <Text style={{ color: '#fff' }}>Cyan</Text>
          </Button>

          <Button style={{ backgroundColor: '#2f54eb', paddingHorizontal: 20, marginRight: 20 }} type='text' size='sm'>
            <Text style={{ color: '#fff' }}>Geekblue</Text>
          </Button>

          <Button style={{ backgroundColor: '#722ed1', paddingHorizontal: 20 }} type='text' size='sm'>
          <Text style={{ color: '#fff' }}>Purple</Text>
          </Button>
        </View>
      </View>
    )
  }
}
