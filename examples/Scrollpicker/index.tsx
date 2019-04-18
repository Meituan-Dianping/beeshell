import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import { Scrollpicker, Datepicker, Timepicker, Button, Icon, BottomModal } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

export default class ScrollpickerScreen extends React.Component<any, any> {
  [propName: string]: any
  constructor (props) {
    super(props)
    this.state = {
      time: '',
      date: ''
    }
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
            this.bottomModalX.open()
          }}>
          Scrollpicker 基础
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalX = c }}
          title='请选择'
          cancelable={true}>
          <View style={{ paddingVertical: 15 }}>
            <Scrollpicker
              style={{ paddingHorizontal: 0 }}
              proportion={[1, 1, 1]}
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
          Scrollpicker 自定义数据源
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal2 = c }}
          title='请选择'
          cancelable={true}
        >
          <View style={{ paddingVertical: 15 }}>
            <Scrollpicker
              style={{ paddingHorizontal: 80 }}
              offsetCount={2}
              value={[0, 1]}
              proportion={[1, 1]}
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
            this.bottomModal5.open()
          }}>
          Scrollpicker 自定义渲染项
        </Button>
        <BottomModal
          ref={(c) => { this.bottomModal5 = c }}
          title='自定义选项'
          cancelable={true}
        >
          <Scrollpicker
            style={{ paddingHorizontal: 70 }}
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

        <Button
          size='sm'
          style={{ marginTop: 12 }}
          type='default'
          onPress={() => {
            this.bottomModal1.open()
          }}>
          Datepicker 日期选择
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModal1 = c }}
          title='请选择日期'
          cancelable={true}>
          <View style={{ paddingVertical: 15 }}>
            <Datepicker
              style={{ paddingHorizontal: 50 }}
              proportion={[1, 1, 1]}
              startYear={2010}
              numberOfYears={10}
              date={this.state.date}
              onChange={(value) => {
                console.log(value)
                this.setState({
                  date: value
                })
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
            this.bottomModalY.open()
          }}>
          Timepicker 时间选择
        </Button>

        <BottomModal
          ref={(c) => { this.bottomModalY = c }}
          title='请选择时间'
          cancelable={true}>
          <View style={{ paddingVertical: 15 }}>
            <Timepicker
              style={{ paddingHorizontal: 50 }}
              proportion={[2, 1, 1]}
              hourStep={3}
              minuteStep={10}
              secondStep={10}
              value={this.state.time}
              onChange={(value) => {
                console.log(value)
                this.setState({
                  time: value
                })
              }}
            />
          </View>
          { this.renderSafeArea() }
        </BottomModal>
      </ScrollView>
    )
  }
}
