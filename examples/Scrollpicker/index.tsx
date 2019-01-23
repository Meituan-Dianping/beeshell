import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import { Scrollpicker, Datepicker, Button, Icon, BottomModal } from '../../src'
import variables from '../customTheme'

import styles from '../common/styles'

export default class ScrollpickerScreen extends React.Component {
  [propName: string]: any
  constructor (props) {
    super(props)
  }

  renderSafeArea () {
    return (
      <View style={{ maxHeight: 30 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ height: 60 }}></View>
        </SafeAreaView>
      </View>
    )
  }

  render () {
    return (
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.container}>

        <Button
          size='sm'
          style={{ marginTop: 12 }}
          type='default'
          onPress={() => {
            this.bottomModal1.open()
          }}>
          日期选择
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal1 = c }}
          title='选择开始日期'
          cancelable={true}
          cancelCallback={() => {
            console.log('cancel')
          }}
          confirmCallback={() => {
            console.log('confirm')
          }}
        >
          <View style={{ paddingVertical: 15 }}>
            <Datepicker
              proportion={[1, 1, 1]}
              contentPaddingHorizontal={50}
              startYear={2010}
              numberOfYears={10}
              date='2016-03-30'
              onChange={(data) => {
                console.log(data)
              }}
            />
          </View>
          { this.renderSafeArea() }
        </BottomModal>

        <Button
          size='sm'
          style={{ marginTop: 12 }}
          type='default'
          onPress={() => {
            this.bottomModal2.open()
          }}>
          开始时间
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal2 = c }}
          title='开始时间'
          cancelable={true}
          cancelCallback={() => {
            console.log('cancel')
          }}
          confirmCallback={() => {
            console.log('confirm')
          }}
        >
          <View style={{ paddingVertical: 15 }}>
            <Scrollpicker
              offsetCount={2}
              value={[0, 1]}
              proportion={[1, 1]}
              contentPaddingHorizontal={80}
              list={[
                ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                ['00', '10', '20', '30', '40', '50']
              ]}
              onChange={(columnIndex, rowIndex) => {
                console.log(columnIndex, rowIndex)
              }}
            />
          </View>
          { this.renderSafeArea() }
        </BottomModal>

        <Button
          size='sm'
          style={{ marginTop: 12 }}
          type='default'
          onPress={() => {
            this.bottomModal3.open()
          }}>
          有效期
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal3 = c }}
          title='有效期'
          cancelable={true}
          cancelCallback={() => {
            console.log('cancel')
          }}
          confirmCallback={() => {
            console.log('confirm')
          }}
        >
          <View style={{ paddingVertical: 15 }}>
            <Scrollpicker
              value={[3]}
              proportion={[1]}
              list={[
                ['永久有效', '2020 年', '2021 年', '2022 年', '2023 年']
              ]}
              onChange={(columnIndex, rowIndex) => {
                console.log(columnIndex, rowIndex)
              }}
            />
          </View>
          { this.renderSafeArea() }
        </BottomModal>

        <Button
          size='sm'
          style={{ marginTop: 12 }}
          type='default'
          onPress={() => {
            this.bottomModal4.open()
          }}>
          选择时间
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal4 = c }}
          title='选择时间'
          cancelable={true}
          cancelCallback={() => {
            console.log('cancel')
          }}
          confirmCallback={() => {
            console.log('confirm')
          }}
        >
          <View style={{ paddingVertical: 15 }}>
            <Scrollpicker
              contentPaddingHorizontal={20}
              value={[3, 1, 2]}
              proportion={[2, 1, 1]}
              list={[
                ['10 月 14 日  周六', '10 月 15 日  周日', '10 月 16 日  今天', '10 月 17 日  周二', '10 月 18 日  周三'],
                ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                ['00', '10', '20', '30', '40', '50']
              ]}
              onChange={(columnIndex, rowIndex) => {
                console.log(columnIndex, rowIndex)
              }}
            />
          </View>
          { this.renderSafeArea() }
        </BottomModal>

        <Button
          size='sm'
          style={{ marginTop: 12 }}
          type='default'
          onPress={() => {
            this.bottomModal5.open()
          }}>
          自定义选项
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModal5 = c }}
          title='自定义选项'
          cancelable={true}
          cancelCallback={() => {
            console.log('cancel')
          }}
          confirmCallback={() => {
            console.log('confirm')
          }}
        >
          <Scrollpicker
            contentPaddingHorizontal={70}
            list={[
              [{ label: 2010 }, { label: 2011 }, { label: 2012 }, { label: 2013 }],
              [{ label: 2010 }, { label: 2011 }, { label: 2012 }]
            ]}
            proportion={[1, 1]}
            renderItem={(item) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10
                  }}>
                  {item ? <Icon type='star' size={20} tintColor='#000' /> : '' }
                  <Text
                    style={{
                      color: variables.mtdBrandPrimary,
                      fontSize: 20,
                      marginLeft: 10
                    }}>
                    {item.label}
                  </Text>
                </View>
              )
            }}
            onChange={(columnIndex, rowIndex) => {
              console.log(columnIndex, rowIndex)
            }}
          />
          { this.renderSafeArea() }
        </BottomModal>
      </ScrollView>
    )
  }
}
