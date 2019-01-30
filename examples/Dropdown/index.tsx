import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native'
import { Button, Dropdown } from '../../src/'
import styles from '../common/styles'
import variables from '../customTheme'

const screen = Dimensions.get('window')

export default class DropdownScreen extends Component<{}, any> {
  [propName: string]: any

  constructor (p) {
    super(p)
    this.state = {
      checkedValue: 1,
      options: [
        {
          label: '我关注的',
          value: 1
        },
        {
          label: '离我最近',
          value: 2
        },
        {
          label: '综合评分最高的的的',
          value: 3
        }
      ]
    }
  }

  onChange = (value) => {
    this.setState({
      checkedValue: value
    })
  }

  render () {
    const { checkedValue, options } = this.state
    return (
      <ScrollView
        style={styles.body}>
        <View style={styles.container}>
          <Button
            style={{ marginTop: 12 }}
            size='sm'
            ref={(c) => {
              this.btnEl = c
            }}
            onPress={() => {
              this.btnEl.measure((fx, fy, width, height, px, py) => {
                this.setState({
                  offsetX: px,
                  offsetY: py + height
                })
                this.dropdown.open()
              })
            }}>
            基础
          </Button>

          <Dropdown
            ref={(c) => {
              this.dropdown = c
            }}
            offsetX={this.state.offsetX}
            offsetY={this.state.offsetY}
            cancelable={true}
            checkedValue={checkedValue}
            options={options}
            onChange={this.onChange}
          />

          <Button
            style={{ marginTop: 12 }}
            size='sm'
            ref={element => {
              this.btnEl2 = element
            }}
            onPress={() => {
              this.btnEl2.measure((fx, fy, width, height, px, py) => {
                this.setState({
                  offsetX2: px,
                  offsetY2: py + height
                })
                this.slideModal2.open()
              })
            }}
          >
            水平拉伸至全屏
          </Button>

          <Dropdown
            ref={c => {
              this.slideModal2 = c
            }}
            offsetX={0}
            width={screen.width}
            offsetY={this.state.offsetY2}
            cancelable={true}
            checkedValue={checkedValue}
            options={options}
            onChange={this.onChange}
          />

          <Button
            style={{ marginTop: 12 }}
            size='sm'
            ref={element => {
              this.btnEl3 = element
            }}
            onPress={() => {
              this.btnEl3.measure((fx, fy, width, height, px, py) => {
                this.setState({
                  offsetX3: px,
                  offsetY3: py
                })
                this.slideModal3.open()
              })
            }}
          >
            上拉
          </Button>

          <Dropdown
            ref={c => {
              this.slideModal3 = c
            }}
            offsetX={0}
            offsetY={this.state.offsetY3}
            direction='up'
            cancelable={true}
            checkedValue={checkedValue}
            options={options}
            onChange={this.onChange}
          />
        </View>
      </ScrollView>
    )
  }
}
