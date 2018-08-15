import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { colors, padding, border } from '../../common/styles/varibles';
import utils from '../../common/utils';
import Scrollpicker from '../../components/Scrollpicker'

import moment from 'moment';

export default class Datepicker extends React.Component {
    static defaultProps = {
    };

    static styles = StyleSheet.create({
    });

    constructor(props) {
        super(props);

        const data = this.initialize(props);

        this.state = {
            ...data,
        };
    }

    initialize(props) {
        let { startYear, numberOfYears, date } = props;
        let {years, yearIndex} = this.getYearsInfo(date);

               
        const months = [

                    '全天',
                    '10时',
                    '11时',
                    '12时',
                    '13时',
                    '14时',
                    '15时',
                    '16时',
                    '17时',
                    '18时',
                    '19时',
                    '20时',
                    '21时',
                    '22时',
                    '23时',
                    '00时',
                    '01时',
                    '02时',
                    '03时',
                    '04时',
                    '05时',
                    '06时',
                    '07时',
                    '08时',
                    '09时'


                    ];


      const days = [
                    '全天',
                    '00分',
                    '10分',
                    '20分',
                    '30分',
                    '40分',
                    '50分'
                    ];

       


        const list = [
            years,
            months,
            days,
        ];

        const value = [
            yearIndex,
            0,
            0
        ];

        return {
            list,
            value,
        }
    }

    getOffsetDay(offset, type) {
      const initDate = this.props.date ? moment(this.props.date) : moment();
      const date = type === 'after' ?
        initDate.add(offset, 'days').format('YYYY-MM-DD dddd') : initDate.subtract(offset, 'days').format('YYYY-MM-DD dddd');
      const dateArr = date.split('-');
      const weekDay = dateArr[2].split(' ')
      return `${dateArr[1]}-${weekDay[0]}[${weekDay[1].replace('星期', '周')}]`;
      // return {
      //   full: date,
      //   month: dateArr[1],
      //   day: dateArr[2],
      //   active: 0,
      // };

   }
    getYearsInfo(date) {
      const afterOffsetDayMap = {
        '星期一': 6,
        '星期二': 5,
        '星期三': 4,
        '星期四': 3,
        '星期五': 2,
        '星期六': 1,
        '星期日': 0,
      };
      const initDate = moment(date);
      const weekDay = initDate.format('YYYY-MM-DD dddd').split(' ')[1];
      const afterOffsetDay = afterOffsetDayMap[weekDay] + (1 * 7);
      const beforeOffsetDay = ((1 + 1) * 7) - (afterOffsetDayMap[weekDay] + 1);
      const afterDayList = [];
      const beforeDayList = [];
      for (let index = 0; index < afterOffsetDay; index++) {
        afterDayList.push(this.getOffsetDay(index + 1, 'after'));
      }
      for (let index = 0; index < beforeOffsetDay; index++) {
        beforeDayList.unshift(this.getOffsetDay(index + 1, 'before'));
      }
      const nowDay = this.getOffsetDay(0, 'after');
      const dateList = [...beforeDayList, nowDay, ...afterDayList];

      return {
        years: dateList,
        yearIndex: beforeOffsetDay
      }
    }

    

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps == this.props);

        if (nextProps !== this.props) {
            this.setState({
                ...this.initialize(nextProps)
            });
        }
    }

    getViewList(list) {
        return list.map((item, index) => {
            let tmp = [];
            if (index == 0) {
                tmp = item.map((target) => {
                    return target;
                });

            }

            if (index == 1) {
               

                tmp = item.map((target) => {
                    return target;
                });


    
            }

            if (index == 2) {



                tmp = item.map((target) => {
                    return target;
                });


                 
            }

            return tmp;
        });
    }


    onChange(index1, index2) {
        const { list, value } = this.state;

        let newList = [
            ...list,
        ];
        let newValue = [
            ...value
        ];

        newValue[index1] = index2;

       if(index1 == 1 && index2 == 0) {
        newValue['2'] = 0;
       }
       if(index1 == 1 && index2 !==0 && newValue['2']==0) {
        newValue['2'] = 1;
       }
       if(index1 == 2 && index2 == 0) {
        newValue['1'] = 0;
       }
       if(index1 == 2 && index2 !==0 && newValue['1']==0) {
        newValue['1'] = 1;
       }

        this.setState({
            list: newList,
            value: newValue,
        }); 

        const date = this.getDateByIndex(newList, newValue);
        this.props.onChange && this.props.onChange(date);
    }

    getDateByIndex(list, value) {
        let hour = list[1][value[1]];
        let minute = list[2][value[2]];
        return {
            date: list[0][value[0]].split('[')[0],
            hour: (hour.indexOf('时') == -1) ? hour : hour.split('时')[0],
            minute: (minute.indexOf('分') == -1) ? minute : minute.split('分')[0]
        }

    }


    render() {
        const { proportion } = this.props;
        const { list, value } = this.state;

        const viewList = this.getViewList(list);

        return (
            <Scrollpicker
                list={viewList}
                value={value}
                proportion={proportion}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}