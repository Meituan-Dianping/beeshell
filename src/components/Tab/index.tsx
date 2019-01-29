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
  style?: any
  optionItemContainerStyle?: any
  activeColor?: string
  value: number | string
  options: any[]
  renderItem?: Function
  onChange?: (value: any) => void
  scrollable?: boolean
}

interface State {}

export class Tab extends React.Component<Props, State> {
  static defaultProps = {
    activeColor: variables.mtdGrayBase,
    value: null,
    options: [],
    onChange: () => { return },
    scrollable: false,
  }

  renderContent () {
    const { scrollable } = this.props
    const itemVels = this.getItemVels()
    return (
      <View style={[styles.container]}>
        {
          scrollable ?
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={[styles.scrollWrapper]}>
              {itemVels}
            </View>
          </ScrollView> :
          <View style={[styles.scrollWrapper]}>
            {itemVels}
          </View>
        }
      </View>
    )
  }

  getItemVels () {
    const {
      optionItemContainerStyle,
      value,
      options = [],
      onChange,
      renderItem,
    } = this.props
    return options.map((item, index) => {
      const selected = value === item.value
      return (
          <TouchableOpacity
            style={[{ flex: 1 }, optionItemContainerStyle]}
            key={index}
            activeOpacity={1}
            onPress={() => {
              if (item.disabled) {
                return
              }
              onChange(item.value)
            }}>
            {
              renderItem ?
              renderItem(item, index, selected) :
              <View style={[styles.item]}>
                { this.renderItemContent(item, index, selected) }
              </View>
            }
          </TouchableOpacity>
      )
    })
  }

  renderItemContent = (item, index, selected) => {
    return [
      <View key={index}>
        {
          <Text
            style={[
              styles.text,
              selected ? { color : this.props.activeColor, fontWeight: 'bold' } : {},
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
          selected ? { backgroundColor: this.props.activeColor } : {},
        ]}>
      </View>
    ]
  }

  render () {
    return this.renderContent()
  }
}
