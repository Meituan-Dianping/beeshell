import React from 'react'
import {
  Image,
  ImageStyle,
  ImageSourcePropType
} from 'react-native'
import variables from '../../common/styles/variables'

export interface IconProps {
  style?: ImageStyle
  type?: string
  size?: number | null | undefined
  tintColor?: string | null | undefined // Android 平台无效
  source?: ImageSourcePropType
}

export class Icon extends React.Component<IconProps, any> {
  static displayName = 'Icon'
  static defaultProps = {
    type: 'angle-down',
    size: 14,
    style: {},
    tintColor: variables.mtdBrandPrimaryDark,
    source: null
  }

  render () {
    let { type, size, style, tintColor, source } = this.props

    const mainStyle = {
      tintColor,
      width: size,
      height: size
    }

    if (size == null) {
      delete mainStyle.width
      delete mainStyle.height
    }

    if (!source) {
      source = require(`../../common/images/icons/${type}.png`)
    }

    return (
      <Image
        style={[
          style,
          {
            ...mainStyle
          }
        ]}
        source={source}
      />
    )
  }
}
