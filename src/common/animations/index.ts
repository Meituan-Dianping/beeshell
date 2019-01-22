import { Animated, Easing } from 'react-native'

class CommonAnimated {
  state: any
  animated: any
  constructor () {
    this.state = {
      opacityList: [0, 1],
      duration: 300,
      easing: Easing.elastic(0.8)
    }
  }

  getState () {
    return {
      ...this.state
    }
  }

  setState (key, value) {
    this.state[key] = value
  }

  stop () {
    if (this.animated) {
      this.animated.stop()
      this.animated = null
    }
  }
  /* tslint:disable:no-empty */
  toIn () {}

  /* tslint:disable:no-empty */
  toOut () {}
}

export class FadeAnimated extends CommonAnimated {
  constructor () {
    super()
    this.state = {
      ...this.state,
      scaleList: [0, 1],
      translateXList: [null, null],
      translateYList: [null, null]
    }

    this.state.opacity = new Animated.Value(
      this.getPropertyValue('opacity', true)
    )
    this.state.scale = new Animated.Value(this.getPropertyValue('scale', true))

    this.state.translateX = new Animated.Value(
      this.getPropertyValue('translateX', true)
    )
    this.state.translateY = new Animated.Value(
      this.getPropertyValue('translateY', true)
    )
  }

  getPropertyValue (type, tag) {
    if (tag) {
      return this.state[type + 'List'][0]
    } else {
      return this.state[type + 'List'][1]
    }
  }

  toIn () {
    return this.fade(true)
  }

  toOut () {
    return this.fade(false)
  }

  fade (tag) {
    this.stop()
    this.state.opacity.setValue(this.getPropertyValue('opacity', tag))
    this.state.scale.setValue(this.getPropertyValue('scale', tag))
    this.state.translateX.setValue(this.getPropertyValue('translateX', tag))
    this.state.translateY.setValue(this.getPropertyValue('translateY', tag))

    this.animated = Animated.parallel([
      Animated.timing(this.state.opacity, {
        toValue: this.getPropertyValue('opacity', !tag),
        duration: this.state.duration,
        easing: this.state.easing
      }),

      Animated.timing(this.state.scale, {
        toValue: this.getPropertyValue('scale', !tag),
        duration: this.state.duration,
        easing: this.state.easing
      }),

      Animated.timing(this.state.translateX, {
        toValue: this.getPropertyValue('translateX', !tag),
        duration: this.state.duration,
        easing: this.state.easing
      }),

      Animated.timing(this.state.translateY, {
        toValue: this.getPropertyValue('translateY', !tag),
        duration: this.state.duration,
        easing: this.state.easing
      })
    ])

    return new Promise(resolve => {
      this.animated.start(() => {
        resolve('animated end')
      })
    }).catch(e => {
      console.log(e)
    })
  }
}

export class SlideAnimated extends CommonAnimated {
  constructor (props) {
    super()

    this.state = {
      ...this.state,
      ...props,
      translateYList: [null, 0],
      translateXList: [null, 0]
    }

    this.state.opacity = new Animated.Value(
      this.getPropertyValue('opacity', true)
    )
    this.state.translateY = new Animated.Value(
      this.getPropertyValue('translateY', true)
    )
    this.state.translateX = new Animated.Value(
      this.getPropertyValue('translateX', true)
    )
  }

  reset (size, directionType) {
    const map = {
      vertical: 'translateYList',
      horizontal: 'translateXList'
    }
    const key = map[directionType]

    const tmp = this.state[key].concat()
    tmp.splice(0, 1, size)

    this.state = {
      ...this.state,
      [key]: tmp
    }
  }

  getPropertyValue (type, tag) {
    const tmp = tag
      ? this.state[type + 'List'][0]
      : this.state[type + 'List'][1]
    return tmp == null ? 0 : tmp
  }

  toIn () {
    return this.slide(true)
  }

  toOut () {
    return this.slide(false)
  }

  slide (tag) {
    this.stop()
    this.state.opacity.setValue(this.getPropertyValue('opacity', tag))

    const map = {
      vertical: 'translateY',
      horizontal: 'translateX'
    }
    const key = map[this.state.directionType]

    this.state[key].setValue(this.getPropertyValue(key, tag))

    return new Promise(resolve => {
      if (this.state[key + 'List'][0] == null) {
        setTimeout(() => {
          resolve('pre animated end')
        }, 100)
      } else {
        resolve('pre animated end')
      }
    })
      .then(ret => {
        this.state[key].setValue(this.getPropertyValue(key, tag))

        this.animated = Animated.parallel([
          Animated.timing(this.state.opacity, {
            toValue: this.getPropertyValue('opacity', !tag),
            duration: this.state.duration,
            easing: this.state.easing
          }),

          Animated.timing(this.state[key], {
            toValue: this.getPropertyValue(key, !tag),
            duration: this.state.duration,
            easing: this.state.easing
          })
        ])

        return new Promise(resolve => {
          this.animated.start(() => {
            resolve('animated end')
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
}
