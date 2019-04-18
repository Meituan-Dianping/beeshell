import React, { Component, ReactElement } from 'react'
import { StyleSheet, View, PanResponder, ViewStyle } from 'react-native'
import { Icon } from '../Icon'
import styles from './styles'

export interface RateProps {
  style?: ViewStyle
  value?: number
  maximum?: number
  icons?: {
    empty: ReactElement<any>
    full: ReactElement<any>
    half?: ReactElement<any>
  }
  iconSize?: number
  iconSpace?: number
  enableHalf?: boolean // 开启半星
  onChange?: Function
}

const rateStyles = StyleSheet.create(styles as any)

export class Rate extends Component<RateProps, any> {
  static defaultProps = {
    maximum: 5,
    icons: {
      empty: <Icon type='star-o' />,
      full: <Icon type='star' />,
      half: <Icon type='star-half-o' />
    },
    iconSize: 20,
    iconSpace: 4,
    enableHalf: true
  }

  private panResponder = null
  private containerView = null

  constructor (p) {
    super(p)
    this.createPanResponder()
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
  }

  render () {
    return (
      <View
        ref={c => { this.containerView = c }}
        style={[rateStyles.wrapper, this.props.style]}
        collapsable={false}>
        <View
          collapsable={false}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
          {...this.panResponder.panHandlers}>
        </View>
        {this.renderIcons(this.props.value)}
      </View>
    )
  }

  renderIcons (value) {
    const { icons: { half, full, empty }, maximum, iconSpace, iconSize } = this.props
    const ret = []
    for (let i = 0; i < maximum; i++) {
      const marginRight = i === maximum - 1 ? 0 : iconSpace
      if (
        half &&
        value > i &&
        value < i + 1
      ) {
        const tmpProps = { ...half.props, key: i, style: [{ marginRight }, half.props.style] }
        if (half && half.type && (half.type as any).displayName === 'Icon') {
          tmpProps.size = iconSize
        }
        ret.push(React.cloneElement(half, tmpProps))
      } else if (value >= i + 1) {
        const tmpProps = { ...full.props, key: i, style: [{ marginRight }, full.props.style] }
        if (full && full.type && (full.type as any).displayName === 'Icon') {
          tmpProps.size = iconSize
        }
        ret.push(React.cloneElement(full, tmpProps))
      } else {
        const tmpProps = { ...empty.props, key: i, style: [{ marginRight }, empty.props.style] }
        if (empty && empty.type && (empty.type as any).displayName === 'Icon') {
          tmpProps.size = iconSize
        }
        ret.push(React.cloneElement(empty, tmpProps))
      }
    }

    return ret
  }

  getValue (pageX): any {
    const p = new Promise((resolve) => {
      this.containerView && this.containerView.measure((ox, oy, width, height, px, py) => {
        resolve(px)
      })
    })
    return p.then((containerViewX: number) => {
      const { iconSize, iconSpace, maximum, enableHalf } = this.props
      const locationX = pageX - containerViewX
      // console.log(pageX, containerViewX)
      if (locationX <= 0) {
        return 0
      }
      const unitWidth = iconSize + iconSpace
      let value = Math.floor(locationX / unitWidth)
      if (value >= maximum) {
        return maximum
      }
      const rest = locationX - unitWidth * value
      if (rest > 0 && rest < (iconSize / 2)) {
        if (!enableHalf) {
          value = value + 1
        } else {
          value = value + 0.5
        }
      }

      if (rest > (iconSize / 2)) {
        value = value + 1
      }

      return value
    })
  }

  handleChange(value) {
    this.props.onChange && this.props.onChange(value)
  }

  createPanResponder () {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gesture) => {
        this.getValue((event as any).nativeEvent.pageX).then((value) => {
          this.handleChange(value)
        })
      },
      onPanResponderMove: (event, gesture) => {
        this.getValue((event as any).nativeEvent.pageX).then((value) => {
          this.handleChange(value)
        })
      },
      onPanResponderRelease: event => {
      },
    })
  }
}
