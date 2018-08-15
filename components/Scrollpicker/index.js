import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { colors, padding, border } from '../../common/styles/varibles';
import utils from '../../common/utils';

const DEFAULT_CONTAINER_HEIGHT = 1;

export default class Scrollpicker extends React.Component {
    static defaultProps = {
        list: [
            ['第一列第一项', '第一列第二项', '第一列第三项'],
            ['第二列第一项', '第二列第二项', '第二列第三项'],
            ['第三列第一项', '第三列第二项', '第三列第三项'],
        ],
        value: [],
        proportion: [2, 1, 1],
        offsetCount: 2,
        fontSize: 14,

    };

    static styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: '#fff',
        },

        proportionWrapper: {
            flexDirection: 'column',
        },

        scroller: {
            flex: 1,
        },

        scrollerContentContainer: {
            alignItems: 'center',
        },

        targetItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        targetItemContent: {
            flex: 1,
            paddingVertical: 10,
            textAlign: 'center',
        },


        indicator: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
        },

        indicatorMask: {
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
        },

        indicatorTarget: {

        }
    });

    constructor(props) {
        super(props);
        this.containerRef = null;

        const data = this.initialize(props);

        // console.log(dataSource);

        this.state = {
            ...data,

            targetItemHeight: null,
            containerHeight: null,
        };

        this._scrollers = [];
    }

    initialize(props) {
        const data = this.initData(props);

        return data;
    }


    initData(props = {}) {
        let { list, proportion, value } = props;

        if (!list || !list.length) {
            throw '提供有效的 list 参数';
        }

        const { offsetCount } = this.props;

        const placeholderList = utils.range(offsetCount).map(() => {
            return '';
        });

        list = list.map((scrollItem) => {
            const tmp = scrollItem.concat();

            [].push.apply(tmp, placeholderList);
            [].unshift.apply(tmp, placeholderList);

            return tmp;
        });


        const length = list.length;

        if (
            !proportion ||
            !proportion.length ||
            (proportion && proportion.length && proportion.length !== length)
        ) {
            proportion = utils.range(length).map(() => {
                return 1;
            })
        }

        if (
            !value ||
            !value.length ||
            (value && value.length && value.length !== length)
        ) {
            value = utils.range(length).map(() => {
                return 0;
            });
        }



        return {
            list,
            value,
            proportion,
        }
    }


    componentDidMount() {
        this.getUIData(this.containerRef, DEFAULT_CONTAINER_HEIGHT).then((data) => {
            const { rect, targetItemHeight } = data;

            const containerHeight = this.resizeContainerHeight(targetItemHeight);

            // console.log(containerHeight, targetItemHeight);

            this.setState({
                containerHeight,
                targetItemHeight,
            }, () => {
                this.getUIData(this.containerRef, this.state.containerHeight).then((uiData) => {
                    // console.log(uiData);
                    const { value } = this.state;

                    value.forEach((item, index) => {
                        this.scrollTo(index, item, false);
                    });
                });
            });

        });
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps == this.props);

        if (nextProps !== this.props) {
            const data = this.initialize(nextProps);

            this.setState({
                ...data,
            }, () => {

                setTimeout(() => {
                    const { value } = this.state;

                    value.forEach((item, index) => {
                        this.scrollTo(index, item);
                    });
                });
            });
        }
    }

    getUIData(element, accurateHeight) {
        let count = 0;

        return new Promise((resolve, reject) => {
            measure = measure.bind(this);
            toCheck = toCheck.bind(this);

            measure();


            function measure() {
                let ret = null;

                element.measure((x, y, width, height, left, top) => {
                    console.log(`Get container height: ${height}, accurate height: ${accurateHeight} and target item height: ${this.targetItemHeight} for ${++count}th.`);

                    if (height) {

                        // 安卓机器获取高度不精确
                        const needToReset = height % 1 === 0 ? false : true;
                        let minHeight;
                        let maxHeight;

                        if (needToReset) {
                            minHeight = Math.floor(height);
                            maxHeight = minHeight + 1;
                        } else {
                            minHeight = maxHeight = height;
                        }

                        if ((minHeight === accurateHeight || maxHeight === accurateHeight) && this.targetItemHeight) {
                            ret = {
                                rect: {
                                    x,
                                    y,
                                    width,
                                    height
                                },
                                targetItemHeight: this.targetItemHeight,
                            };
                        }
                    }

                    toCheck(ret);
                });
            }


            function toCheck(ret) {
                if (ret) {
                    return resolve(ret);
                } else {
                    if (count < 10) {
                        setTimeout(() => {
                            measure();
                        }, 0);
                    } else {
                        return reject('获取元素高度失败！');
                    }
                }
            }
        });
    }

    resizeContainerHeight(targetItemHeight) {
        const { offsetCount } = this.props;
        const ret = targetItemHeight + 2 * (targetItemHeight * offsetCount);
        return ret;
    }

    locateIndicator(targetItemHeight) {
        const styles = Scrollpicker.styles;
        const { offsetCount } = this.props;

        return (
            <View
                style={[styles.indicator]}
                pointerEvents="none">

                <View
                    style={[
                        styles.indicator,
                        styles.indicatorMask,
                        { bottom: targetItemHeight + offsetCount * targetItemHeight },
                        { borderBottomWidth: border.width, borderBottomColor: border.color }
                        ]}>
                </View>

                <View
                    style={[
                        styles.indicator,
                        styles.indicatorMask,
                        { top: targetItemHeight + offsetCount * targetItemHeight },
                        { borderTopWidth: border.width, borderTopColor: border.color }
                    ]}>
                </View>
            </View>
        );
    }


    scrollTo(scrollIndex, targetItemIndex, animated) {
        const { targetItemHeight } = this.state;
        const { offsetCount } = this.props;

        this.scrollProper(scrollIndex, targetItemHeight * targetItemIndex, animated);
    }


    onScroll(scrollIndex, scrollHeight) {
        const { offsetCount } = this.props;
        const { list, containerHeight, targetItemHeight } = this.state;

        const targetItemIndex = this.scrollProper(scrollIndex, scrollHeight);

        // console.log(scrollIndex, targetItemIndex);

        this.props.onChange && this.props.onChange(scrollIndex, targetItemIndex);
    }

    scrollProper(scrollIndex, scrollHeight, animated) {
        const { targetItemHeight, list } = this.state;
        const { offsetCount } = this.props;
        const scrollListLength = list[scrollIndex].length;

        let newScrollHeight;

        const min = 0;
        const max = (scrollListLength - 2 * offsetCount - 1) * targetItemHeight;

        if (scrollHeight <= min) {
            newScrollHeight = min;
        } else if (scrollHeight >= max) {
            newScrollHeight = max;
        } else {
            const quotient = parseInt(scrollHeight / targetItemHeight, 10);
            newScrollHeight = quotient * targetItemHeight;

            const halfHeight = targetItemHeight / 2;

            if (scrollHeight - newScrollHeight > halfHeight) {
                newScrollHeight += targetItemHeight;
            }
        }

        this._scrollers[scrollIndex].scrollTo({
            x: 0,
            y: newScrollHeight,
            animated: animated === false ? false : true
        });

        const targetItemIndex = newScrollHeight / targetItemHeight;
        return targetItemIndex;
    }


    render() {
        const styles = Scrollpicker.styles;
        const { list, proportion, containerHeight, targetItemHeight } = this.state;

        // console.log('render', containerHeight);

        return (
            <View ref={(el) => { this.containerRef = el; }} style={[styles.container, { height: containerHeight || DEFAULT_CONTAINER_HEIGHT }]}>
                { containerHeight && this.locateIndicator(targetItemHeight)}

                {
                    list.map((scrollItem, scrollIndex) => {
                        return (
                            <View key={scrollIndex} style={[styles.proportionWrapper, { flex: Number(proportion[scrollIndex]) }]}>
                                <ScrollView
                                    ref={(c) => {
                                        this._scrollers[scrollIndex] = c;
                                    }}
                                    style={styles.scroller}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={[styles.scrollerContentContainer]}
                                    onScrollEndDrag={(e) => {
                                        this.onScroll(scrollIndex, e.nativeEvent.contentOffset.y);
                                    }}>

                                    {
                                        scrollItem.map((item, index) => {
                                            return(
                                                <View
                                                    key={index}
                                                    style={[styles.targetItem, { height: targetItemHeight }]}
                                                    onLayout={(e) => {
                                                        if (item && this.targetItemHeight == null && e.nativeEvent.layout.height) {
                                                            this.targetItemHeight = Math.ceil(e.nativeEvent.layout.height);
                                                            console.log('OnLayout get target item height:', this.targetItemHeight);
                                                        }
                                                    }}>
                                                    <Text style={[styles.targetItemContent, {fontSize: this.props.fontSize}]} numberOfLines={1}>
                                                        {typeof item == 'object' ? item.label : item}
                                                    </Text>
                                                </View>
                                            );
                                        })
                                    }
                                </ScrollView>
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}