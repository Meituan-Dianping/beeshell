import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextStyle
} from 'react-native'

import {
  SlideModal,
  SlideModalProps
} from '../../components/SlideModal'

import variables from '../../common/styles/variables'

export interface PopoverProps extends SlideModalProps {
}

export class Popover extends SlideModal<PopoverProps> {
  static defaultProps = {
    ...SlideModal.defaultProps,

    backdropOpacity: 0,
    offsetX: 100,
    offsetY: 100,
    direction: 'down',
    align: 'left',
    fullScreenPatch: [true, true, true],
    cancelable: true
  }

  constructor (props) {
    super(props)
  }

  getContent () {
    const inner = React.isValidElement(this.props.children) ? this.props.children : (
      <View
        style={[
          {
            backgroundColor: variables.mtdFillBackdropDark,
            borderRadius: variables.mtdRadiusXS,
            paddingHorizontal: variables.mtdHSpacingL,
            paddingVertical: variables.mtdVSpacingL,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}>
          <Text
            style={{ color: '#fff' }}>
            {this.props.children}
          </Text>
      </View>
    )
    return SlideModal.prototype.getContent.call(this, inner)
  }
}
