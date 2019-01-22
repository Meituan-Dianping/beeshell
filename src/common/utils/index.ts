export function range (length) {
  const ret = []

  for (let i = 0; i < length; i++) {
    ret.push(i)
  }

  return ret
}

export function hexToRgb (hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function isLeapYear (year) {
  year = parseInt(year, 10)
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true
  } else {
    return false
  }
}

export function convert2Digit (i) {
  i = Number(i)

  if (i > 0 && i < 10) {
    i = '0' + i
  } else {
    i = '' + i
  }
  return i
}
