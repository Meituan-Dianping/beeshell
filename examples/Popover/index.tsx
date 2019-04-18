import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native'
import { Popover, Button } from '../../src'
import styles from '../common/styles'
import variables from '../customTheme'

const screen = Dimensions.get('window')
const screenHeight = Platform.OS === 'ios' ? screen.height : screen.height - StatusBar.currentHeight
const directonsWithAlign = [
  {
    direction: ['right'],
    align: 'up'
  },

  {
    direction: ['up', 'right'],
  },

  {
    direction: ['up'],
    align: 'right'
  },
  {
    direction: ['down'],
    align: 'right'
  },
  {
    direction: ['down', 'right'],
  },
  {
    direction: ['right'],
    align: 'down',
  },
  {
    direction: ['left'],
    align: 'down',
  },
  {
    direction: ['down', 'left'],
  },
  {
    direction: ['down'],
    align: 'left'
  },
  {
    direction: ['up'],
    align: 'left'
  },
  {
    direction: ['up', 'left'],
  },
  {
    direction: ['left'],
    align: 'up'
  }
]
export default class PopoverScreen extends Component<{}, any> {
  [propsName: string]: any

  constructor (props) {
    super(props)
    this.state = {
      directionIndex: 0
    }
  }

  componentDidMount() {
  }

  render () {
    const target = directonsWithAlign[this.state.directionIndex]
    return (
      <ScrollView
      style={styles.body}
      contentContainerStyle={styles.container}>

      <Button
        style={{ marginTop: 12 }}
        ref={c => {
          this.btnA = c
        }}
        size='sm'
        onPress={() => {
          this.btnA.measure((fx, fy, width, height, px, py) => {
            this.setState({
              offsetX: px + 130,
              offsetY: py
            })
            this._popoverA.open().catch((e) => {
              console.log(e)
            })
          })
        }}>
        基础
      </Button>

      <Popover
        ref={c => {
          this._popoverA = c
        }}
        screenHeight={screenHeight}
        offsetX={this.state.offsetX}
        offsetY={this.state.offsetY}
        direction={target.direction as any}
        align={target.align as any}
        onClosed={() => {
          this.setState({
            directionIndex: (this.state.directionIndex + 1) % directonsWithAlign.length
          })
        }}>
        注意注意！！
      </Popover>

      <Button
        style={{ marginTop: 12 }}
        ref={c => {
          this.btnB = c
        }}
        size='sm'
        onPress={() => {
          this.btnB.measure((fx, fy, width, height, px, py) => {
            this.setState({
              offsetXB: px + width,
              offsetYB: py + height
            })
            this._popoverB.open().catch((e) => {
              console.log(e)
            })
          })
        }}>
        自定义渲染内容
      </Button>

      <Popover
        ref={c => {
          this._popoverB = c
        }}
        screenHeight={screenHeight}
        offsetX={this.state.offsetXB}
        offsetY={this.state.offsetYB}
        direction='down'
        align='left'
        onClosed={() => {
          this.setState({
            directionIndex: (this.state.directionIndex + 1) % directonsWithAlign.length
          })
        }}>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)', paddingHorizontal: 16 }}>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>选项一</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>选项二</Text>
          <Text style={{ color: variables.mtdGrayDarker, paddingVertical: variables.mtdVSpacingM }}>选项三</Text>
        </View>
      </Popover>
    </ScrollView>
    )
  }
}
