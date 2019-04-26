import React, { Component } from 'react'
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  ViewStyle
} from 'react-native'
import { TopviewGetInstance } from '../../components/Topview'
import variables from '../../common/styles/variables'
import { range } from '../../common/utils'

export interface RulerProps {
  style?: ViewStyle
  direction?: 'vertical' | 'horizontal'
}

export class Ruler extends Component<RulerProps, any> {
  static defaultProps = {
    direction: 'vertical'
  }

  constructor (p) {
    super(p)
    this.state = {
      topviewId: null
    }
  }

  componentDidMount () {
    if (this.state.topviewId) {
      return
    }
    TopviewGetInstance() && TopviewGetInstance().add(this.renderFullScreenView()).then((id) => {
      this.setState({
        topviewId: id
      })
    })
  }

  componentWillUnmount () {
    TopviewGetInstance() && TopviewGetInstance().remove(this.state.topviewId)
  }

  renderFullScreenView () {
    const { direction, style } = this.props
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          alignItems: 'flex-start',
        }}
        pointerEvents='box-none'>

        <ScrollView
          style={[
            {
              marginLeft: direction === 'vertical' ? 40 : null,
              marginTop: direction === 'vertical' ? null : 200,
            },
            style,
          ]}
          contentContainerStyle={{
            flexDirection: direction === 'vertical' ? 'column' : 'row',
            alignItems: 'flex-start'
          }}
          horizontal={direction === 'horizontal'}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}>
          {
            range(100).map((item) => {
              const index = item + 1
              const evenNumber = index % 2 === 0
              const base = 10
              const value = index * base
              const showValue = value % 50 === 0
              const valueViewHeight = direction === 'vertical' ? base : null
              const valueViewWidth = direction === 'vertical' ? null : base

              return (
                <View
                  key={item}
                  style={{
                    flexDirection: direction === 'vertical' ? 'row' : 'column'
                  }}>
                  <View
                    style={{
                      height: base,
                      width: base,
                      backgroundColor: evenNumber ? variables.mtdGrayLightest : variables.mtdGrayBase
                    }}>
                  </View>

                  <View
                    style={{
                      height: valueViewHeight,
                      width: valueViewWidth,
                    }}>
                    {
                      showValue ?
                      <View
                        style={{
                          height: valueViewHeight,
                          width: valueViewWidth,
                          backgroundColor: variables.mtdBrandDanger,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                        <Text
                          style={{
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontSize: 10,
                            color: '#fff',
                          }}
                          numberOfLines={undefined}>
                          {value}
                        </Text>
                      </View> : null
                    }
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }

  render () {
    return null
  }
}
