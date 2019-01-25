import React, { Component, ReactElement, ReactChild } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  RegisteredStyle
  } from 'react-native'
import { CheckboxItemAllChecked } from './CheckboxItemAllChecked'
import checkboxStyles from './styles'
import variables from '../../common/styles/variables'
import { CheckboxItem } from './CheckboxItem'

interface Props {
  style?: ViewStyle | RegisteredStyle<ViewStyle>,
  checkedValue?: any[]
  iconPosition?: 'left' | 'right'
  onChange?: Function

  showAllChecked?: boolean
  children: ReactChild[] | ReactChild
}

interface State {
}

const styles = StyleSheet.create<any>(checkboxStyles)

export default class Checkbox extends Component<Props, State> {
  static displayName = 'Checkbox'
  static Item = null

  childCount = 0
  childValueArray = []
  formItemContext = null

  static defaultProps = {
    checkedValue: [],
    showAllChecked: false,
    onChange: () => { return },
    iconPosition: 'left',
  }

  constructor (props) {
    super(props)

    React.Children.map(this.props.children, (child) => {
      if ((child as any).type.displayName === 'CheckboxItem') {
        this.childCount ++
        this.childValueArray.push((child as any).props.value)
      }
    })
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  onChange = (value, checked, allCheckedTag?) => {
    const { checkedValue } = this.props
    let newCheckedValue = checkedValue.concat()

    // 点击选项
    if (!allCheckedTag) {
      const idx = checkedValue.indexOf(value)

      if (checked) {
        if (idx > -1) {
          // donothing
        } else {
          newCheckedValue.push(value)
        }
      } else {
        if (idx > -1) {
          newCheckedValue.splice(idx, 1)
        }
      }
    } else {
      // 点击”全选“按钮
      if (checked === 1) {
        newCheckedValue = []
      }

      if (checked === 3) {
        newCheckedValue = this.childValueArray.concat()
      }
    }

    this.props.onChange && this.props.onChange(newCheckedValue)
  }


  checkValueChecked (props) {
    const { value } = props
    const idx = this.props.checkedValue.indexOf(value)
    return idx > -1 ? true : false
  }

  getAllCheckedStatus() {
    const { checkedValue } = this.props
    if (checkedValue.length === 0) {
      return 1
    }

    if (checkedValue.length < this.childCount) {
      return 2
    }

    if (checkedValue.length >= this.childCount) {
      return 3
    }
  }

  render () {
    const {
      showAllChecked,
      iconPosition,
      children,
      style
    } = this.props

    return (
      <View style={[styles.container, style]}>
        <View>
          {
            showAllChecked ?
            <View style={styles.allChecked}>
              <CheckboxItemAllChecked
                checkedStatus={this.getAllCheckedStatus()}
                label='全选'
                iconPosition={iconPosition}
                onChange={this.onChange}
              />
            </View> : null
          }
          <View style={styles.children}>
            {
              React.Children.map(children, (child, index) => {
                // 需要子组件自己定义了 displayName
                if ((child as any).type.displayName === 'CheckboxItem') {
                  const childProps = (child as any).props
                  const checked = this.checkValueChecked(childProps)
                  const {
                    renderContent,
                    renderIcon
                   } = childProps
                  return React.cloneElement((child as any), {
                    key: index,
                    checked,
                    iconPosition,
                    onChange: this.onChange
                  })
                } else {
                  return React.cloneElement((child as any))
                }
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
