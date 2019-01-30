import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import cascaderStyles from './styles'
const styles = StyleSheet.create<any>(cascaderStyles)
import { Icon } from '../Icon'
import variables from '../../common/styles/variables'

export interface CascaderProps {
  style: any
  options: any[]
  value: any[]
  fieldKeys: any
  proportion: number[]
  onChange: Function
  renderItem: Function
}

export class Cascader extends Component<CascaderProps, any> {
  static displayName = 'Cascader'
  static defaultProps = {
    options: [],
    value: [],
    fieldKeys: {},
    proportion: [ 2, 1, 1 ],
    onChange: null,
    renderItem: null
  }

  constructor (props) {
    super(props)

    const { options, value } = this.props

    this.state = {
      menu: this.getMenu(options, value)
    }
  }

  getMenu(options, value) {
    const fieldKeys = this.getFieldKeys()
    const menu = [
      [ ...options ]
    ]

    if (value && value.length) {
      value.forEach((valueItem, valueIndex) => {
        if (menu[valueIndex] && menu[valueIndex].length) {
          menu[valueIndex].forEach((menuItem, menuIndex) => {
            const tmpValue = menuItem[fieldKeys.valueKey]
            if (tmpValue === valueItem) {
              menuItem[fieldKeys.activeKey] = true
              if (menuItem[fieldKeys.childrenKey] && menuItem[fieldKeys.childrenKey].length) {
                menu.push(menuItem[fieldKeys.childrenKey])
              }
            } else {
              menuItem[fieldKeys.activeKey] = false
            }

            this.changeActiveStatus(menuItem[fieldKeys.childrenKey], false)
          })
        }
      })
    }

    return menu
  }

  changeActiveStatus(options, active) {
    if (options && options.length) {
      const fieldKeys = this.getFieldKeys()
      options.forEach((item) => {
        item[fieldKeys.activeKey] = active

        this.changeActiveStatus(item[fieldKeys.childrenKey], active)
      })
    }
  }

  getFieldKeys() {
    const { fieldKeys } = this.props
    return {
      labelKey: fieldKeys['labelKey'] || 'label',
      childrenKey: fieldKeys['childrenKey'] || 'children',
      valueKey: fieldKeys['valueKey'] || 'value',
      activeKey: fieldKeys['activeKey'] || 'active'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.options !== this.props.options
    ) {
      const newMenu = this.getMenu(nextProps.options, nextProps.value)
      // console.log('newMenu', newMenu)
      this.setState({
        menu: newMenu
      })
    }
  }

  componentDidMount () {
  }

  handlePressItem = (item, index, level, isAutoOpen = false) => {
    const fieldKeys = this.getFieldKeys()
    const { value } = this.props
    const tmpValue = value.concat().splice(0, level)
    tmpValue.push(item[fieldKeys.valueKey])

    this.props.onChange && this.props.onChange(tmpValue)
  }

  renderMenuItem (menuItem, menuIndex, menu) {
    const { proportion } = this.props
    const style = {
      flex: proportion[menuIndex] || 1,
      borderRightColor: variables.mtdBorderColor,
      borderRightWidth: menuIndex < menu.length - 1 ? StyleSheet.hairlineWidth : 0
    }

    return (
      <View style={style} key={menuIndex}>
        <ScrollView>
          {
            menuItem.map((item, index) => {
              return this.renderItem(item, index, menuIndex)
            })
          }
        </ScrollView>
      </View>
    )
  }

  // 渲染每一个选项
  renderItem (item, index, level) {
    const fieldKeys = this.getFieldKeys()
    const hasChildren = item && item[fieldKeys.childrenKey] && item[fieldKeys.childrenKey].length ? true : false
    const active = item[fieldKeys.activeKey]

    return (
      <TouchableOpacity
        key={index}
        onPress={this.handlePressItem.bind(this, item, index, level, false)}>

        {
          this.props.renderItem ? this.props.renderItem(item, index, level) :
          <View
            style={[
              styles.item,
              active ? { backgroundColor: variables.mtdFillGray } : {},
            ]}>
            <Text
              style={[
                styles.itemText,
                active ? { color: variables.mtdBrandPrimaryDark, fontWeight: 'bold' } : {},
              ]}
              ellipsizeMode={'middle'}
              >
              {item[fieldKeys.labelKey]}
            </Text>

            {
              hasChildren ? <Icon type={'caret-right'} size={variables.mtdFontSizeM} tintColor={variables.mtdGrayLighter} /> : null
            }
          </View>
        }
      </TouchableOpacity>
    )
  }

  render () {
    const { options, style } = this.props
    const { menu } = this.state
    return (
      <View style={[styles.container, style]}>
        {
          menu.map((item, index) => {
            return this.renderMenuItem(item, index, menu)
          })
        }
      </View>
    )
  }
}
