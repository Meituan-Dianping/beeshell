import React from 'react'
import {
  Image
} from 'react-native'

import varibles from '../../common/styles/variables'

export interface IconProps {
  type?: string,
  size?: number | null | undefined,
  tintColor?: string | null | undefined,
  style?: any,
  source?: any
}

export class Icon extends React.Component<IconProps, any> {
  static defaultProps = {
    type: 'caret-down',
    size: null,
    tintColor: null,
    style: {},
    source: null
  }

  render () {
    let { type, size, tintColor, style, source } = this.props

    const mainStyle = {
      tintColor,
      width: size,
      height: size
    }

    if (size == null) {
      delete mainStyle.width
      delete mainStyle.height
    }

    const tmpSource = source == null ? require(`../../common/images/icons/${type}.png`) : source

    // 取消染色的方法
    if (!tintColor) {
      delete mainStyle.tintColor
    }

    return (
      <Image
        style={[
          style,
          {
            ...mainStyle
          }
        ]}
        source={tmpSource}
      />
    )
  }
}
