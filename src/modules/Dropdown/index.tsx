import React, { ReactElement } from 'react'

import {
  View,
  ViewStyle,
} from 'react-native'
import { SlideModal, SlideModalProps, SlideModalState } from '../../components/SlideModal'
import { Radio } from '../../components/Radio'
import dropdownStyles from './styles'

interface OptionItem {
  label: string,
  [propName: string]: any
}

export interface DropdownProps extends SlideModalProps {
  style?: ViewStyle
  direction?: 'up' | 'down'
  data: Array<OptionItem>
  value: any
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
  onChange: Function
}

export interface DropdownState extends SlideModalState {
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  private slideModal = null

  static defaultProps = {
    ...SlideModal.defaultProps,
    cancelable: false,
    direction: 'down',
    fullScreenPatch: null,
    data: []
  }

  constructor (props) {
    super(props)
  }

  open () {
    this.slideModal.open()
  }

  close () {
    this.slideModal.close()
  }
  // componentDidMount () {}

  getContent () {
    const { data, value, onChange, checkedIcon, uncheckedIcon } = this.props

    if (!data || !data.length) {
      throw Error('Dropdown 组件请提供有效的 data 属性')
    }

    return (
      <View
        style={[
          dropdownStyles.container,
          this.props.style
        ]}>
        <Radio
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          value={value}
          onChange={(value) => {
            this.slideModal.close()
            onChange(value)
          }}>

          {
            data.map((item, index) => {
              return (
                <Radio.Item
                  key={index}
                  label={item.label}
                  value={item.value}>
                </Radio.Item>
              )
            })
          }
        </Radio>
      </View>
    )
  }

  render () {
    const { direction } = this.props
    const fullScreenPatch = this.props.fullScreenPatch || (
      direction === 'down' ? [true, false, false] : [false, false, true]
    )
    return (
      <SlideModal
        ref={c => {
          this.slideModal = c
        }}
        fullScreenPatch={fullScreenPatch}
        direction={this.props.direction}
        offsetX={this.props.offsetX}
        offsetY={this.props.offsetY}
        cancelable={true}
      >
        { this.getContent() }
      </SlideModal>
    )
  }
}
