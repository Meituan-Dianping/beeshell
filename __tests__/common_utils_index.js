import utils from '../common/utils';
import calendarUtils from '../common/utils/calendar';
import moment from 'moment';

/* test/it */
test('basic use', () => {
    /**
     * 正常输入
     */
    expect(utils.isLeapYear(2000)).toBe(true);
    expect(utils.isLeapYear('2000')).toBe(true);

    /**
     * 边界输入
     */
    expect(utils.isLeapYear(0)).toBe(true);
    expect(utils.isLeapYear(Infinity)).toBe(false);

    /**
     * 非法输入
     */
    expect(utils.isLeapYear('xx')).toBe(false);
    expect(utils.isLeapYear(false)).toBe(false);


    expect(utils.isLeapYear(2001)).toBe(false);



    expect(utils.range(3)).toEqual([0, 1, 2]);

    expect(utils.convert2Digit(3)).toBe('03');
    expect(utils.convert2Digit(13)).toBe('13');




    const localeData = moment().locale('zh-cn').localeData();
    expect(localeData.months(moment([2012, 0]))).toBe('一月');

    localeData.monthsShort();
    localeData.weekdays();
    localeData.weekdaysShort();
    localeData.weekdaysMin();

    localeData.meridiemHour(null, '上午');
    localeData.meridiemHour(12, '下午');

    localeData.meridiem(1, 0);
    localeData.meridiem(6, 0);
    localeData.meridiem(9, 0);
    localeData.meridiem(11, 0);
    localeData.meridiem(12, 0);
    localeData.meridiem(17, 0);
    localeData.meridiem(19, 0);

    localeData.calendar();

    localeData.ordinal();
    localeData.ordinal(1, 'D');
    localeData.ordinal(1, 'M');
    localeData.ordinal(1, 'W');


    calendarUtils.CalendarDecorator
        .trigger([[{dateModel: moment()}], [{dateModel: moment().add(1, 'days')}]])(calendarUtils.CalendarDecorator.decorator.targetMonth.bind(null, moment()));

    calendarUtils.CalendarDecorator
        .trigger([[{dateModel: moment()}], [{dateModel: moment().add(1, 'days')}]])(calendarUtils.CalendarDecorator.decorator.disabled.bind(null, moment(), moment()));
    calendarUtils.changeDate(moment(), 'days', 'subtract');
});