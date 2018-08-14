import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  PixelRatio,
} from 'react-native';

import moment from 'moment';
import { colors, padding, border, fontSize } from '../../common/styles/varibles';
import styleUtils from '../../common/styles/utils';
import calendarUtils from '../../common/utils/calendar';


export default class Calendar extends React.Component {
    static defaultProps = {
        locale: 'zh-cn',
        format: 'YYYY-MM-DD',
        date: '',
        startDate: '',
        endDate: '',
        renderHeader: null,
        renderItem: null,
        renderWeekDay: null,
    };

    static styles = StyleSheet.create({
        container: {
            paddingVertical: padding.verticalBase,
            backgroundColor: '#fff',
        },

        header: {
            paddingBottom: padding.verticalSmall,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            flex: 3,
            paddingHorizontal: padding.horizontalBase,

            textAlign: 'center',
            fontSize: fontSize.h5,
            color: colors.grayDark,
        },

        operatorWrapper: {
            flex: 1,
            // paddingVertical: padding.verticalSmall,
            paddingHorizontal: padding.horizontalBase,
        },

        operator: {
            textAlign: 'center',
            fontSize: fontSize.h5,
            color: colors.grayDark,
        },

        gridRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },


        gridItemWrapper: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 5,
        },
        gridItem: {
            width: 30,
            height: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
        },

        gridItemInner: {
            fontSize: fontSize.h5,
            color: colors.grayDark,
        },

        dotIndicator: {
            position: 'absolute',
            bottom: -6,
            width: 4,
            height: 4,
            borderRadius: 4,
            backgroundColor: colors.grayLighter,
        }
    });

    constructor(props) {
        super(props);
        moment.locale(this.props.locale);

        this.state = {
            ...this.init(this.props)
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        const keys = [ 'date', 'startDate', 'endDate'];

        const propsChanged = keys.some((key) => {
            if (nextProps[key] != this.props[key]) {
                return true;
            }
        });

        if (propsChanged) {
            this.setState({
                ...this.init(nextProps)
            });
        }
    }

    init(props) {
        let { date, startDate, endDate } = props;
        date = moment(date);
        if (!date.isValid()) {
            date = moment();
        }

        startDate = moment(startDate);
        if (!startDate.isValid()) {
            startDate = null;
        }

        endDate = moment(endDate);
        if (!endDate.isValid()) {
            endDate = null;
        }

        return {
            date,
            selectedDate: date,
            startDate,
            endDate
        };
    }


    changeDate(type, method) {
        const { date } = this.state;

        this.setState({
            date: calendarUtils.changeDate(date, type, method)
        });
    }

    selectDate(viewDate) {
        if (viewDate.disabled) {
            return;
        }
        this.setState({
            date: viewDate.dateModel,
            selectedDate: viewDate.dateModel,
        });
        const dateString = viewDate.dateModel.format(this.props.format);
        this.props.onChange && this.props.onChange(dateString);
    }

    isTargetMonth(item) {
        const { date } = this.state;

        if (!date.isSame(item.dateModel, 'month')) {
            return false;
        } else {
            return true;
        }
    }

    isDisabled(item) {
        const { startDate, endDate } = this.state;

        if (
            (startDate && item.dateModel.isBefore(startDate)) ||
            (endDate && item.dateModel.isAfter(endDate))
        ) {
            return true;
        } else {
            return false;
        }
    }


    renderHeader = () => {
        const styles = Calendar.styles;
        const {date} = this.state;
        return (
            <View style={styles.header}>
                <View style={styles.operatorWrapper}>
                    <TouchableOpacity
                        onPress={this.changeDate.bind(this, 'years', 'subtract')}>
                        <Text style={[styles.operator, { textAlign: 'left' }]} numberOfLines={1}>&lt;&lt;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.operatorWrapper}>
                    <TouchableOpacity
                        onPress={this.changeDate.bind(this, 'months', 'subtract')}>
                        <Text style={styles.operator}>&lt;</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title} numberOfLines={1}>{date.format('YYYY-MM-DD')}</Text>

                <View style={styles.operatorWrapper}>
                    <TouchableOpacity
                        onPress={this.changeDate.bind(this, 'months', 'add')}>
                        <Text style={styles.operator}>&gt;</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.operatorWrapper}>
                    <TouchableOpacity
                        onPress={this.changeDate.bind(this, 'years', 'add')}>
                        <Text style={[styles.operator, { textAlign: 'right' }]} numberOfLines={1}>&gt;&gt;</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderItem(item) {
        const desc = {};
        desc.targetMonth = this.isTargetMonth(item);
        desc.disabled = this.isDisabled(item);
        desc.today = item.dateModel.isSame(moment(), 'day');
        desc.selected = item.dateModel.isSame(this.state.selectedDate);

        return (
            <View
                onStartShouldSetResponder={() => {
                    if (desc.disabled) {
                        return true;
                    } else {
                        return false;
                    }
                }}>
                <View
                    style={[
                        Calendar.styles.gridItem,
                        {
                            backgroundColor: desc.selected ? colors.brandPrimary : (
                                    desc.today ? colors.bgGray : null
                            )
                        }
                    ]}>

                    <Text
                        style={[
                            Calendar.styles.gridItemInner,
                            {
                                color: desc.disabled ? colors.grayLightest : (
                                    desc.targetMonth ? colors.grayDark : colors.grayLight
                                ),

                                fontWeight: desc.selected ? 'bold' : null,
                            },

                        ]}>
                        {item.dateModel.format('DD')}
                    </Text>
                    {
                        desc.selected || desc.today ? <View style={Calendar.styles.dotIndicator}></View> : null
                    }
                </View>
            </View>
        );
    }

    renderWeekDay = (item, index) => {
        const {renderWeekDay} = this.props;
        if(renderWeekDay) {
            return renderWeekDay(item, index);
        }
        return (
            <View style={Calendar.styles.gridItemWrapper} key={index}>
                <Text style={{}}>{item}</Text>
            </View>
        );
    }

    render() {
        const styles = Calendar.styles;
        const { date, startDate, endDate } = this.state;
        let calendar = calendarUtils.getCalendar(date);


        const weekdays = calendarUtils.getWeekdays(calendar);

        return (
            <View style={styles.container}>
                { this.props.renderHeader ?
                    this.props.renderHeader(date, this.changeDate.bind(this)) :
                    this.renderHeader() }

                <View>
                    <View style={styles.gridRow}>
                        {
                            weekdays.map(this.renderWeekDay)
                        }
                    </View>
                    <View>
                        {
                            calendar.map((week, i) => {
                                return (
                                    <View
                                        key={i}
                                        style={styles.gridRow}>

                                        {
                                            week.map((item, index) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        style={[
                                                            styles.gridItemWrapper
                                                        ]}>
                                                        <TouchableOpacity
                                                            onPress={this.selectDate.bind(this, item)}>
                                                            {this.props.renderItem ? this.props.renderItem(item, date) : this.renderItem(item, date)}
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
}
