import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewPagerAndroid,
  Platform,
  ActivityIndicator
} from 'react-native'

import carouselStyle from './styles'

import variables from '../../common/styles/variables'

export interface CarouselProps {
  style?: any
  paginationStyle?: any

  horizontal?: boolean
  children?: JSX.Element[],

  loadMinimal?: boolean
  loadMinimalSize?: number
  loadMinimalLoader?: JSX.Element
  loop?: boolean
  autoplay?: boolean
  autoplayTimeout?: number
  autoplayDirection?: boolean
  index?: number
  renderPagination?: Function

  onIndexChanged?: (index: number) => void
  onTouchStartCapture?: () => void
  onTouchStart?: () => void
  onTouchEnd?: () => void
  onScrollBeginDrag?: any
  onResponderRelease?: () => void
  onMomentumScrollEnd?: any
  onPageScrollStateChanged?: () => void
}

const styles = StyleSheet.create<any>(carouselStyle)

export class Carousel extends Component<CarouselProps, any> {

  internals: any

  scrollView: any

  state: any = this.initState(this.props)

  initialRender = true

  autoplayTimer = null

  loopJumpTimer = null

  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: () => null
  }

  constructor (props: CarouselProps) {
    super(props)
  }

  componentDidMount () {
    this.autoplay()
  }

  componentWillUnmount () {
    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.loopJumpTimer && clearTimeout(this.loopJumpTimer)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.index !== nextState.index) this.props.onIndexChanged(nextState.index)
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer)
    this.setState(this.initState(nextProps, this.props.index !== nextProps.index))
    this.internals.autoplay = nextProps.autoplay
    if (nextProps.autoplay) this.autoplay()
  }

  autoplay = () => {
    if (!Array.isArray(this.props.children) || !this.internals.autoplay || this.internals.isScrolling || this.state.autoplayend) {
      return
    }

    this.autoplayTimer && clearTimeout(this.autoplayTimer)
    this.autoplayTimer = setTimeout(() => {
      if (!this.props.loop && (
        this.props.autoplayDirection
          ? this.state.index === this.state.total - 1
          : this.state.index === 0
      )) {
        this.setState({
          autoplayEnd: true
        })
        return
      }

      this.scrollBy(this.props.autoplayDirection ? 1 : -1)
    }, this.props.autoplayTimeout * 1000)
  }

  scrollBy = (index, animated = true) => {
    if (this.internals.isScrolling || this.state.total < 2) {
      return
    }
    const state = this.state
    const diff = (this.props.loop ? 1 : 0) + index + this.state.index
    let x = 0
    let y = 0
    if (state.dir === 'x') x = diff * state.width
    if (state.dir === 'y') y = diff * state.height

    if (Platform.OS !== 'ios') {
      this.scrollView && this.scrollView[animated ? 'setPage' : 'setPageWithoutAnimation'](diff)
    } else {
      this.scrollView && this.scrollView.scrollTo({ x, y, animated })
    }

    this.internals.isScrolling = true
    this.setState({
      autoplayEnd: false
    })

    if (!animated || Platform.OS !== 'ios') {
      setImmediate(() => {
        this.onScrollEnd({
          nativeEvent: {
            position: diff
          }
        })
      })
    }
  }

  onScrollBegin = e => {
    this.internals.isScrolling = true
    this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e, this.fullState(), this)
  }

  onScrollEnd = e => {
    e.persist && e.persist()
    this.internals.isScrolling = false

    if (!e.nativeEvent.contentOffset) {
      if (this.state.dir === 'x') {
        e.nativeEvent.contentOffset = {
          x: e.nativeEvent.position * this.state.width
        }
      } else {
        e.nativeEvent.contentOffset = {
          y: e.nativeEvent.position * this.state.height
        }
      }
    }

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir, () => {
      this.autoplay()
      this.loopJump()
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e, this.fullState(), this)
    })
  }

  onScrollEndDrag = e => {
    const {
      contentOffset
    } = e.nativeEvent
    const {
      horizontal,
      children
    } = this.props
    const {
      index
    } = this.state
    const {
      offset
    } = this.internals
    const previousOffset = horizontal ? offset.x : offset.y
    const newOffset = horizontal ? contentOffset.x : contentOffset.y

    if (previousOffset === newOffset &&
      (index === 0 || index === children.length - 1)) {
      this.internals.isScrolling = false
    }
  }

  updateIndex = (offset, dir, cb) => {
    if (offset === undefined || this.internals.offset === undefined) {
      return
    }
    const state = this.state
    let index = state.index
    const diff = offset[dir] - this.internals.offset[dir]
    const step = dir === 'x' ? state.width : state.height
    let loopJump = false

    // if (!diff) return
    index = parseInt(index + Math.round(diff / step), 10)
    if (this.props.loop) {
      if (index <= -1) {
        index = state.total - 1
        offset[dir] = step * state.total
        loopJump = true
      } else if (index >= state.total) {
        index = 0
        offset[dir] = step
        loopJump = true
      }
    }

    const newState: any = {}
    newState.index = index
    newState.loopJump = loopJump

    this.internals.offset = offset

    if (loopJump) {
      if (offset[dir] === this.internals.offset[dir]) {
        newState.offset = {
          x: 0,
          y: 0
        }
        newState.offset[dir] = offset[dir] + 1
        this.setState(newState, () => {
          this.setState({
            offset: offset
          }, cb)
        })
      } else {
        newState.offset = offset
        this.setState(newState, cb)
      }
    } else {
      this.setState(newState, cb)
    }
  }

  loopJump = () => {
    if (!this.state.loopJump) {
      return
    }
    const i = this.state.index + (this.props.loop ? 1 : 0)
    const scrollView = this.scrollView
    this.loopJumpTimer = setTimeout(() => scrollView.setPageWithoutAnimation && scrollView.setPageWithoutAnimation(i), 50)
  }

  initState (props, updateIndex = false) {
    const state = this.state || {
      width: 0,
      height: 0,
      offset: {
        x: 0,
        y: 0
      }
    }
    const initState: any = {
      autoplayEnd: false,
      loopJump: false
    }

    initState.total = props.children ? props.children.length || 1 : 0

    if (state.total === initState.total && !updateIndex) {
      initState.index = state.index
    } else {
      initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0
    }

    const {
      width,
      height
    } = Dimensions.get('window')

    initState.dir = props.horizontal === false ? 'y' : 'x'

    if (props.width) {
      initState.width = props.width
    } else if (this.state && this.state.width) {
      initState.width = this.state.width
    } else {
      initState.width = width
    }

    if (props.height) {
      initState.height = props.height
    } else if (this.state && this.state.height) {
      initState.height = this.state.height
    } else {
      initState.height = height
    }

    this.internals = {
      ...this.internals,
      isScrolling: false,
      autoplay: this.props.autoplay
    }
    return initState
  }

  fullState () {
    return Object.assign({}, this.state, this.internals)
  }

  onLayout = (event) => {
    const {
      width,
      height
    } = event.nativeEvent.layout
    const offset = this.internals.offset = {}
    const state: any = {
      width,
      height
    }
    if (this.state.total > 1) {
      let setup = this.state.index
      if (this.props.loop) {
        setup++
      }
      offset[this.state.dir] = this.state.dir === 'y'
        ? height * setup
        : width * setup
    }

    if (!this.state.offset || width !== this.state.width || height !== this.state.height) {
      state.offset = offset
    }

    if (Platform.OS === 'ios') {
      if (this.initialRender && this.state.total > 1) {
        this.scrollView.scrollTo({
          ...offset,
          animated: false
        })
        this.initialRender = false
      }
    }

    this.setState(state)
  }

  scrollViewPropOverrides = () => {
    const props = this.props
    let overrides = {}

    for (let prop in props) {
      if (typeof props[prop] === 'function' &&
        prop !== 'onMomentumScrollEnd' &&
        prop !== 'renderPagination' &&
        prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop]
        overrides[prop] = (e) => originResponder(e, this.fullState(), this)
      }
    }

    return overrides
  }

  renderPagination = () => {
    if (this.state.total <= 1) {
      return null
    }

    const dotSize = 6
    const dotRadius = dotSize / 2
    const dotMargin = 3

    let dots = []
    const ActiveDot = <View style={[
      {
        backgroundColor: variables.mtdBrandPrimary,
        width: dotSize,
        height: dotSize,
        borderRadius: dotRadius,
        marginHorizontal: dotMargin
      }
    ]} />
    const Dot = <View style={[
      {
        backgroundColor: variables.mtdFillGray,
        width: dotSize,
        height: dotSize,
        borderRadius: dotRadius,
        marginHorizontal: dotMargin
      }
    ]} />
    for (let i = 0; i < this.state.total; i++) {
      dots.push(i === this.state.index
        ? React.cloneElement(ActiveDot, {
          key: i
        })
        : React.cloneElement(Dot, {
          key: i
        })
      )
    }

    return (
      <View
        pointerEvents='none'
        style={[
          styles['pagination' + this.state.dir.toUpperCase()],
          this.props.paginationStyle
        ]}>
        {dots}
      </View>
    )
  }

  refScrollView = view => {
    this.scrollView = view
  }

  renderScrollView = pages => {
    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          ref={this.refScrollView}
          {...this.props}
          {...this.scrollViewPropOverrides()}
          contentOffset={this.state.offset}
          onScrollBeginDrag={this.onScrollBegin}
          onMomentumScrollEnd={this.onScrollEnd}
          onScrollEndDrag={this.onScrollEndDrag}>
          {pages}
        </ScrollView>
      )
    }
    return (
      <ViewPagerAndroid
          ref={this.refScrollView}
          {...this.props}
          initialPage={this.props.loop ? this.state.index + 1 : this.state.index}
          onPageSelected={this.onScrollEnd}
          key={pages.length}
          style={[styles.wrapperAndroid]}>
        {pages}
      </ViewPagerAndroid>
    )
  }

  render () {
    const {
      index,
      total,
      width,
      height
    } = this.state
    const {
      children,
      style,
      loop,
      loadMinimal,
      loadMinimalSize,
      loadMinimalLoader,
      renderPagination,
    } = this.props
    const loopVal = loop ? 1 : 0
    let pages: any = []
    const pageStyle = [{ width, height }, styles.slide]
    const pageStyleLoading: any = {
      width,
      height,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
    if (total > 1) {
      pages = Object.keys(children)
      if (loop) {
        pages.unshift(String(total - 1))
        pages.push('0')
      }

      pages = pages.map((page, i) => {
        if (loadMinimal) {
          if (i >= (index + loopVal - loadMinimalSize) && i <= (index + loopVal + loadMinimalSize)) {
            return <View style={pageStyle} key={i}>{children[page]}</View>
          } else {
            return (
              <View style={pageStyleLoading} key={i}>
                {loadMinimalLoader ? loadMinimalLoader : <ActivityIndicator />}
              </View>
            )
          }
        } else {
          return <View style={pageStyle} key={i}>{children[page]}</View>
        }
      })
    } else {
      pages = <View style={pageStyle} key={0}>{children}</View>
    }

    return (
      <View
        style={[
          styles.container,
          style
        ]}
        onLayout={this.onLayout}>

        {this.renderScrollView(pages)}
        {renderPagination ? renderPagination(index, total) : this.renderPagination()}
      </View>
    )
  }
}
