
function dispatch(...funcs: Function[]) {
  return function (...args) {
    return funcs.some((item) => {
      const ret = item.apply(this, args)
      return ret
    })
  }
}

function register(key: string, func: Function) {
  const keyArray = key.split(',')
  return function (...args) {
    if (keyArray.indexOf(args[0]) !== -1) {
      func.apply(this, args)
      return true
    } else {
      return false
    }
  }
}

export default {
  dispatch,
  register
}
