import React, { ReactElement } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    RegisteredStyle,
    ViewStyle,
    TextStyle
} from 'react-native'

import variables from '../../common/styles/variables'
import tabStyle from './styles'

const styles = StyleSheet.create<any>(tabStyle)

interface Props {
  style?: ViewStyle
  dataItemContainerStyle?: ViewStyle
  dataItemStyle?: ViewStyle
  activeColor?: string
  value?: any
  data?: any[]
  renderItem?: Function
  onChange?: Function
  scrollable?: boolean
}

interface State {}

export class Tab extends React.Component<Props, State> {
  static defaultProps = {
    activeColor: variables.mtdGrayDarker,
    value: null,
    data: [],
    onChange: null,
    scrollable: false,
  }

  renderContent () {
    const { scrollable } = this.props
    const itemViews = this.getItemViews()
    return (
      <View style={[styles.container]}>
        {
          scrollable ?
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={[styles.content]}>
              {itemViews}
            </View>
          </ScrollView> :
          <View style={[styles.content]}>
            {itemViews}
          </View>
        }
      </View>
    )
  }

  getItemViews () {
    const {
      dataItemContainerStyle,
      dataItemStyle,
      value,
      data = [],
      onChange,
      renderItem,
    } = this.props
    return data.map((item, index) => {
      const active = value === item.value
      return (
          <TouchableOpacity
            style={[{ flex: 1 }, dataItemContainerStyle]}
            key={index}
            activeOpacity={1}
            onPress={() => {
              if (item.disabled) {
                return
              }
              onChange && onChange(item, index)
            }}>
            {
              renderItem ?
              renderItem(item, index, active) :
              <View style={[styles.item, dataItemStyle]}>
                { this.renderItemContent(item, index, active) }
              </View>
            }
          </TouchableOpacity>
      )
    })
  }

  renderItemContent = (item, index, active) => {
    return [
      <View key={index}>
        {
          <Text
            style={[
              styles.text,
              active ? { color : this.props.activeColor, fontWeight: 'bold' } : {},
              item.disabled ? { color : variables.mtdGrayLighter } : {}
            ]}>
            {item.label}
          </Text>
        }
      </View>,
      <View
        key={index + 'l'}
        style={[
          styles.line,
          active ? { backgroundColor: this.props.activeColor } : {},
        ]}>
      </View>
    ]
  }

  render () {
    return this.renderContent()
  }
}
