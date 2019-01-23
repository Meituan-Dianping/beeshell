import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { Icon } from '../Icon'
import { CheckboxItem, CheckboxItemProps } from './CheckboxItem'
import variables from '../../common/styles/variables'
import styles from './styles'

enum ICON_POSITION {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface CheckboxItemAllCheckedProps extends CheckboxItemProps {
  checkedStatus?: number
}

export class CheckboxItemAllChecked extends CheckboxItem<CheckboxItemAllCheckedProps, any> {

  static defaultProps = {
    ...CheckboxItem.defaultProps,
    label: '全选',
    disabled: false,
    checkedStatus: 1,
    iconPosition: ICON_POSITION.LEFT
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  handlePress = () => {
    const { disabled, checkedStatus } = this.props
    if (disabled) {
      return
    }
    let tmp
    if (checkedStatus === 1 || checkedStatus === 2) {
      tmp = 3
    }

    if (checkedStatus === 3) {
      tmp = 1
    }

    this.props.onChange && this.props.onChange(null, tmp, true)
  }

  renderLabelText () {
    const { label, disabled, checkedStatus } = this.props

    return (
      <Text
        style={[
          styles.labelText,
          (checkedStatus === 2 || checkedStatus === 3) ? { color: variables.mtdBrandPrimaryDark } : null
        ]}>
        {label}
      </Text>
    )
  }
  renderStatusIcon = () => {
    const { disabled, checkedStatus, iconPosition } = this.props
    const styleArray: any[] = [styles.icon]
    styleArray.push(styles.iconDefault)

    if (checkedStatus === 2 || checkedStatus === 3) {
      styleArray.push(styles.iconChecked)
    }
    if (iconPosition === ICON_POSITION.LEFT) {
      styleArray.push(styles.iconLeftPosition)
    }

    let iconView = null
    if (checkedStatus === 3) {
      iconView = <View style={styles.iconView as any}><Icon type={'check'} size={variables.checkboxIconSize} tintColor={'#333'}/></View>
    } else if (checkedStatus === 2) {
      iconView = <View style={styles.iconView as any}><Icon type={'minus'} size={variables.checkboxIconSize} tintColor={'#333'}/></View>
    }

    return (
      <View style={styleArray}>
        {iconView}
      </View>
    )
  }
}
