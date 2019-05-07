import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

import { Icon } from '../../src'
import variables from '../customTheme'
import styles from '../common/styles'

const componentStyles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: 12,
  },
  content: {
    alignItems: 'center',
    width: 110,
    padding: 8,
    marginBottom: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: variables.mtdGrayLighter
  },
  title: {
    marginTop: 5,
    fontSize: 10,
    color: '#666'
  }
})

interface State {
  count: number
}

export default class IconScreen extends Component<{}, State> {
  constructor (p) {
    super(p)
    this.state = {
      count: 0
    }
  }

  render () {
    return (
      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.container}>
        <View style={componentStyles.panel}>
          <View style={componentStyles.content}>
            <Icon size={20} type='angle-up' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-up</Text>
          </View>
          <View style={componentStyles.content}>
            <Icon size={20} type='angle-down' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-down</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='angle-left' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-left</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='angle-right' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-right</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='angle-double-left' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-double-left</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='angle-double-right' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-double-right</Text>
          </View>
          <View style={componentStyles.content}>
            <Icon size={20} type='check' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>check</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='check-circle' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>check-circle</Text>
          </View>


          <View style={componentStyles.content}>
            <Icon size={20} type='plus' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>plus</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='plus-circle-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>plus-circle-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='plus-square-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>plus-square-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='question-circle' tintColor={variables.mtdGrayBase}/>
            <Text style={componentStyles.title}>question-circle</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='question-circle-o' tintColor={variables.mtdGrayBase}/>
            <Text style={componentStyles.title}>question-circle-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='angle-left' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-left</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='angle-right' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>angle-right</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='times' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>times</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='times-circle' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>times-circle</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='times-circle-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>times-circle-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='minus' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>minus</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='star' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>star</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='star-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>star-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='star-half-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>star-half-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='search' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>search</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='ellipsis-h' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>ellipsis-h</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='user-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>user-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='users-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>users-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='camera-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>camera-o</Text>
          </View>

          <View style={componentStyles.content}>
            <Icon size={20} type='edit-o' tintColor={variables.mtdGrayBase} />
            <Text style={componentStyles.title}>edit-o</Text>
          </View>

          {/*<View style={componentStyles.content}>
            <Icon
              size={50}
              source={{
                uri: 'http://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png'
              }}
              tintColor={variables.mtdGrayBase}
            />
            <Text style={componentStyles.title}>自定义 source</Text>
          </View>*/}
        </View>
      </ScrollView>
    )
  }
}
