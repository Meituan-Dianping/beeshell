import React from 'react'

import {
  View
} from 'react-native'
import { SlideModal, SlideModalProps, SlideModalState } from '../../components/SlideModal'
import { Radio } from '../../components/Radio'
import dropdownStyles from './styles'

interface OptionItem {
  label: string,
  [propName: string]: any
}

export interface DropdownProps extends SlideModalProps {
  width?: number
  options: Array<OptionItem>
  checkedValue: any
  onChange: Function
}

export interface DropdownState extends SlideModalState {
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  private slideModal = null

  static defaultProps = {
    ...SlideModal.defaultProps,
    cancelable: false,
    direction: 'down'
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
    const { options, checkedValue, onChange } = this.props

    return (
      <View
        style={[
          dropdownStyles.container,
          {
            width: this.props.width
          }
        ]}>
        <Radio
          checkedValue={checkedValue}
          onChange={(value) => {
            this.slideModal.close()
            onChange(value)
          }}>

          {
            options.map((item, index) => {
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
    return (
      <SlideModal
        ref={c => {
          this.slideModal = c
        }}
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
