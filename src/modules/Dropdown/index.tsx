import React, { ReactElement } from 'react'

import {
  ViewStyle,
  ScrollView,
  Animated
} from 'react-native'
import { SlideModal, SlideModalProps } from '../../components/SlideModal'
import { Radio } from '../../components/Radio'
import dropdownStyles from './styles'
import variables from '../../common/styles/variables'
import { SlideAnimated } from '../../common/animations'

interface OptionItem {
  label: string,
  [propName: string]: any
}

export interface DropdownProps extends SlideModalProps {
  testID?: string
  style?: ViewStyle
  direction?: 'up' | 'down'
  data: Array<OptionItem>
  value: any
  checkedIcon?: ReactElement<any>
  uncheckedIcon?: ReactElement<any>
  onChange: Function
}

export class Dropdown extends React.Component<DropdownProps> {
  private slideModal = null
  private animated = null

  static defaultProps = {
    ...SlideModal.defaultProps,
    cancelable: false,
    direction: 'down',
    fullScreenPatch: null,
    data: []
  }

  constructor (props) {
    super(props)

    if (variables.dropdownEnableAnimated) {
      this.animated = new SlideAnimated({
        directionType: ['vertical'],
        duration: 1000,
        translateYList: [
          props.direction === 'down' ? -20 : 20,
          0,
        ]
      })
    }
  }

  open () {
    this.animated && this.animated.toIn()
    return this.slideModal.open()
  }

  close () {
    return this.slideModal.close()
  }

  getContent () {
    const { data, value, onChange, checkedIcon, uncheckedIcon } = this.props

    let animatedStyle: any = {}
    if (this.animated) {
      animatedStyle = {
        transform: [
          { translateX: this.animated.getState().translateX },
          { translateY: this.animated.getState().translateY }
        ],
        opacity: this.animated.getState().opacity
      }
    }

    return (
      <ScrollView
        style={[
          dropdownStyles.container,
          this.props.style
        ]}>
        <Animated.View style={animatedStyle}>
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
                    testID={item.testID}
                    key={index}
                    label={item.label}
                    value={item.value}>
                  </Radio.Item>
                )
              })
            }
          </Radio>
        </Animated.View>
      </ScrollView>
    )
  }

  render () {
    const { direction } = this.props
    const fullScreenPatch = this.props.fullScreenPatch || (
      direction === 'down' ? [true, false, false] : [false, false, true]
    )
    return (
      <SlideModal<SlideModalProps>
        ref={c => {
          this.slideModal = c
        }}
        fullScreenPatch={fullScreenPatch}
        direction={this.props.direction}
        offsetX={this.props.offsetX}
        offsetY={this.props.offsetY}
        cancelable={this.props.cancelable}>
        { this.getContent() }
      </SlideModal>
    )
  }
}
