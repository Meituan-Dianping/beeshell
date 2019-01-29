import moment from 'moment'
moment.defineLocale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日Ah点mm分',
    LLLL: 'YYYY年M月D日ddddAh点mm分',
    l: 'YYYY/M/D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem : function (hour, minute, isLower) {
    let hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  },
  calendar : {
    sameDay : '[今天]LT',
    nextDay : '[明天]LT',
    nextWeek : '[下]ddddLT',
    lastDay : '[昨天]LT',
    lastWeek : '[上]ddddLT',
    sameElse : 'L'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (numberVal, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return numberVal + '日'
      case 'M':
        return numberVal + '月'
      case 'w':
      case 'W':
        return numberVal + '周'
      default:
        return numberVal
    }
  },
  relativeTime: {
    future : '%s内',
    past : '%s前',
    s : '几秒',
    ss : '%d 秒',
    m : '1 分钟',
    mm : '%d 分钟',
    h : '1 小时',
    hh : '%d 小时',
    d : '1 天',
    dd : '%d 天',
    M : '1 个月',
    MM : '%d 个月',
    y : '1 年',
    yy : '%d 年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow : 1, // Monday is the first day of the week.
    doy : 4  // The week that contains Jan 4th is the first week of the year.
  }
} as any)

const ROWS_OF_CALENDAR = 6
const DAYS_OF_A_WEEK = 7

/**
 * 获取日历面板
 * 参数为某天的日期
 */
function getCalendar(date) {
  const firstDate = date.clone().date(1)
  const firstWeek = getAWeek(firstDate)

  const nextMonthFirstDate = firstDate.clone().add(1, 'months')
  const lastDate = nextMonthFirstDate.clone().date(0)
  const lastWeek = getAWeek(lastDate)

  const ret = [ firstWeek ]

  let i
  for (i = 1; i < ROWS_OF_CALENDAR; i++) {
    let sunday = firstDate.clone().day(0).day(i * DAYS_OF_A_WEEK)

    if (sunday.isBefore(lastWeek[0].dateModel)) {
      ret.push(getAWeek(sunday))
    } else {
      ret.push(lastWeek)
      break
    }
  }

  let j
  for (j = ret.length; j < ROWS_OF_CALENDAR; j++) {
    let sunday = firstDate.clone().day(0).day(j * DAYS_OF_A_WEEK)
    ret.push(getAWeek(sunday))
  }

  return ret
}

/**
 * 获取某天所在的一周
 */
function getAWeek(date) {
  const week = []

  range(DAYS_OF_A_WEEK).forEach((i) => {
    week.push(
      new ViewDate({
        dateModel: date.clone().day(i),
      })
    )
  })

  return week
}

/**
 * ViewDate 类型
 * 该类型对象的 dateModel 属性为一个 moment 类型对象
 * 对 moment 进行一次封装，方便扩展属性
 */

function ViewDate(options) {
  this.dateModel = options.dateModel
  this.formattedDate = this.dateModel.format('YYYY-MM-DD')
}


/**
 * 获取星期的文案
 * ['日', '一', '二', ....]
 */
function getWeekdays(calendar) {
  const week = calendar[0]
  const ret = []

  return week.map((item) => {
    return moment.weekdaysMin(item.dateModel.day())
  })
}

function changeDate(date, type, method) {
  date = date.clone()
  date[method](1, type)
  return date
}

function range(count) {
  const list = []
  let i
  for (i = 0; i < count; i++) {
    list.push(i)
  }

  return list
}


/**
 * CalendarDecorator
 * 对日历面板进行统一的属性扩展工具
 */
const CalendarDecorator = {
  trigger(calendar) {
    const flatList = calendar.reduce((accumulate, item) => {
      return accumulate.concat(item)
    }, [])

    return (decorator) => {
      flatList.forEach((item) => {
        decorator(item)
      })
      return calendar
    }
  },

  decorator: {
    targetMonth(date, item) {
      if (!date.isSame(item.dateModel, 'month')) {
        item.targetMonth = false
      } else {
        item.targetMonth = true
      }
    },

    disabled(startDate, endDate, item) {
      if (
        (startDate && item.dateModel.isBefore(startDate)) ||
        (endDate && item.dateModel.isAfter(endDate))
      ) {
        item.disabled = true
      } else {
        item.disabled = false
      }
    }
  }
}


export default {
  CalendarDecorator,
  getCalendar,
  getWeekdays,
  changeDate
}
