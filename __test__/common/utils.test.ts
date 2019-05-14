import { isLeapYear, range, hexToRgb, convert2Digit } from '../../src/common/utils'
import validator from '../../src/common/utils/validator'
import renderSafeArea from '../../src/common/utils/renderSafeArea'
import calendarUtils from '../../src/components/Calendar/utils'
import moment from 'moment'

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


    const localeData = moment().locale('zh-cn').localeData()
    expect(localeData.months(moment([2012, 0]))).toBe('一月')

    localeData.monthsShort()
    localeData.weekdays()
    localeData.weekdaysShort()
    localeData.weekdaysMin()

    localeData.meridiemHour(null, '上午')
    localeData.meridiemHour(12, '下午')

    localeData.meridiem(1, 0)
    localeData.meridiem(6, 0)
    localeData.meridiem(9, 0)
    localeData.meridiem(11, 0)
    localeData.meridiem(12, 0)
    localeData.meridiem(17, 0)
    localeData.meridiem(19, 0)

    localeData.calendar()

    localeData.ordinal()
    localeData.ordinal(1, 'D')
    localeData.ordinal(1, 'M')
    localeData.ordinal(1, 'W')


    calendarUtils.CalendarDecorator
        .trigger([[{dateModel: moment()}], [{dateModel: moment().add(1, 'days')}]])(calendarUtils.CalendarDecorator.decorator.targetMonth.bind(null, moment()))

    calendarUtils.CalendarDecorator
        .trigger([[{dateModel: moment()}], [{dateModel: moment().add(1, 'days')}]])(calendarUtils.CalendarDecorator.decorator.disabled.bind(null, moment(), moment()))
    calendarUtils.changeDate(moment(), 'days', 'subtract')



    const validate = validator.dispatch(
      validator.register('name', (key, value, callback) => {
        callback(ruleName(value, 'lulu'))
      }),
      validator.register('phone', (key, value, callback) => {
        callback(rulePhone(value))
      })
    )

    validate('name', 111, (tmp) => {
      console.log(tmp)
    })

    validate('phone', 111, (tmp) => {
      console.log(tmp)
    })

    renderSafeArea()
  })
})


function ruleName(value: any, targetValue: any) {
  if (!value) {
    return {
      valid: false,
      msg: '请输入姓名'
    }
  }
  value = String(value).toLowerCase()
  if (value === targetValue) {
    return {
      valid: true
    }
  } else {
    return {
      valid: false,
      msg: '输入姓名无效'
    }
  }
}

function rulePhone(value: any) {
  if (!value) {
    return {
      valid: false,
      msg: '请输入手机号码'
    }
  }

  if (/^\d{11}$/.test(value)) {
    return {
      valid: true,
    }
  } else {
    return {
      valid: false,
      msg: '请输入手机号码无效'
    }
  }
}