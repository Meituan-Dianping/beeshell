import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { colors, padding, border } from '../../common/styles/varibles';
import utils from '../../common/utils';
import Scrollpicker from '../Scrollpicker'

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
        const years = utils.range(numberOfYears).map((item, index) => {
            return Number(startYear) + index;
        });
        const months = utils.range(12).map((i) => {
            return i + 1;
        });

        date = moment(date);

        if (!date.isValid()) {
            date = moment();
        }

        const year = date.year();
        const month = date.month() + 1;
        const day = date.date();

        const days = this.getDays(year, month);

        const list = [
            years,
            months,
            days,
        ];

        const value = [
            years.indexOf(year),
            months.indexOf(month),
            days.indexOf(day)
        ];


        return {
            list,
            value,
        }
    }

    getDays(year, month) {
        year = parseInt(year, 10);
        month = parseInt(month, 10);

        let dayNum = 0;
        switch(month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                dayNum = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                dayNum = 30;
                break;
            case 2:
                dayNum = utils.isLeapYear(year) ? 29 : 28;
                break;
        }

        const days = utils.range(dayNum).map((i) => {
            return i + 1;
        });
        return days;
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
                    return target + '年';
                });
            }

            if (index == 1) {
                tmp = item.map((target) => {
                    return target + '月';
                });
            }

            if (index == 2) {
                tmp = item.map((target) => {
                    return target + '日';
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

        let year,
            month,
            day,
            days;

        if (index1 === 0) {
            year = list[index1][index2];
            month = list[1][value[1]];
        }

        if (index1 === 1) {
            year = list[0][value[0]];
            month = list[index1][index2];
        }

        if (index1 === 2) {
            year = list[0][value[0]];
            month = list[1][value[1]];
        }

        days = this.getDays(year, month);

        newList[2] = days;

        day = list[2][value[2]];
        if (days.indexOf(day) == -1) {
            newValue[2] = days.length - 1;
        }

        this.setState({
            list: newList,
            value: newValue,
        });

        const date = this.getDateByIndex(newList, newValue);
        this.props.onChange && this.props.onChange(date);
    }

    getDateByIndex(list, value) {
        const ret = list.map((item, index) => {
            return utils.convert2Digit(item[value[index]]);
        });

        return ret.join('-')
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