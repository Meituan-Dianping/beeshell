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
  value: number | string,
  options: any[],
  renderItem?: (item: any, selected: boolean, disabled: boolean, index: number) => ReactElement<any>
  onChange?: (value: any) => void,
  height?: number,
  scrollable?: boolean,
  isBalanced?: boolean,
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  itemStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
  activeItemStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
  underlineStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
  activeUnderlineStyle?: ViewStyle | RegisteredStyle<ViewStyle>,
  textStyle?: TextStyle | RegisteredStyle<TextStyle>,
  activeTextStyle?: TextStyle | RegisteredStyle<TextStyle>
}

interface State {}

export class Tab extends React.Component<Props, State> {
  static defaultProps = {
    value: null,
    options: [],
    onChange: () => { return },
    scrollable: false,
    isBalanced: true
  }

  renderContent () {
    const { justifyContent } = this.props
    const itemVels = this.getItemVels()
    return (
        <View style={[styles.container]}>
            <View style={[styles.scrollWrapper, justifyContent ? { justifyContent } : {}]}>
                {itemVels}
            </View>
        </View>
    )
  }

  renderScrollContent () {
    const itemVels = this.getItemVels()
    return (
        <View style={[styles.container]}>
            <ScrollView
                style={[styles.scrollWrapper]}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {itemVels}
            </ScrollView>
        </View>
    )
  }

  getItemVels () {
    const {
      value,
      options = [],
      onChange,
      renderItem,
      isBalanced,
      itemStyle,
      activeItemStyle
    } = this.props
    return options.map((item, index) => {
      const selected = !item.disabled && value === item.value
      return (
          <TouchableOpacity
              style={[styles.item, itemStyle ? itemStyle : {}, isBalanced ? { flex: 1 } : {}, selected && activeItemStyle ? activeItemStyle : {}]}
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
                renderItem(item, selected, !!item.disabled, index)
                :
                this.renderItemByDefault(item, selected)
              }
          </TouchableOpacity>
      )
    })
  }

  renderItemByDefault = (item, selected) => {
    const {
      underlineStyle,
      activeUnderlineStyle,
      textStyle,
      activeTextStyle
    } = this.props
    return [
      <View>
        {
          <Text style={[
            styles.text,
            textStyle ? textStyle : {},
            selected ? { color : variables.mtdBrandPrimary, fontWeight: 'bold' } : {},
            selected && activeTextStyle ? activeTextStyle : {},
            item.disabled ? { color : variables.mtdGrayLighter } : {}
          ]}>
              {item.label}
          </Text>
        }
      </View>,
      <View style={[
        styles.line,
        underlineStyle ? underlineStyle : {},
        selected ? { backgroundColor: variables.mtdBrandPrimary } : {},
        selected && activeUnderlineStyle ? activeUnderlineStyle : {}
      ]}></View>
    ]
  }

  render () {
    const { scrollable } = this.props
    if (scrollable) {
      return this.renderScrollContent()
    } else {
      return this.renderContent()
    }
  }
}
