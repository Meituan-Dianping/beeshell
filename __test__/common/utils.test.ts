import { isLeapYear, range, hexToRgb, convert2Digit } from '../../src/common/utils'

describe('JS Utils', () => {
  test('use correctly', () => {
    /**
     * 正常输入
     */
    expect(isLeapYear(2000)).toBe(true)
    expect(isLeapYear('2000')).toBe(true)
    expect(isLeapYear(2001)).toBe(false)

    /**
     * 边界输入
     */
    expect(isLeapYear(0)).toBe(true)
    expect(isLeapYear(Infinity)).toBe(false)

    /**
     * 非法输入
     */
    expect(isLeapYear('xx')).toBe(false)
    expect(isLeapYear(false)).toBe(false)


    expect(range(3)).toEqual([0, 1, 2])
    expect(hexToRgb('#111111')).toEqual({ r: 17, g: 17, b: 17 })
    expect(convert2Digit(2)).toBe('02')
    expect(convert2Digit(20)).toBe('20')

  })
})
