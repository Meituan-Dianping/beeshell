'use strict';
import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter,
    ScrollView,
} from 'react-native';

let topview = null;

class Topview extends Component {
    static styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
    });


    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            modelList: [],
        };
        topview = this;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    add(c) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let { modelList, count } = this.state;
                ++count;
                const tmp = modelList.concat();
                tmp.push({
                    id: count,
                    component: c
                });
                this.setState({
                    count,
                    modelList: tmp,
                });
                return resolve(count);
            })
        }).catch((e) => {
            console.error(e);
        });
    }

    remove(id) {
        let { modelList, count } = this.state;
        let index;

        return new Promise((resolve) => {
            modelList.some((item, i) => {
                if (item.id == id) {
                    index = i;
                    return true;
                }
            });

            if (index == null) {
                return resolve();
            }

            const tmp = modelList.concat();
            tmp.splice(index, 1);

            if (!tmp.length) {
                count = 0;
            }

            this.setState({
                modelList: tmp,
                count,
            }, () => {
                return resolve();
            });
        }).catch((e) => {
            console.error(e);
        });

    }


    replace(c, id) {
        return new Promise((resolve) => {
            let { modelList, count } = this.state;

            const tmpList = modelList.concat();
            let tmpIndex;
            let tmpItem = tmpList.filter((item, index) => {
                if (item.id === id) {
                    tmpIndex = index;
                    return true;
                }
            })[0];

            tmpItem = {
                ...tmpItem,
                component: c,
            };

            tmpList.splice(tmpIndex, 1, tmpItem);

            this.setState({
                modelList: tmpList
            }, () => {
                return resolve();
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        const { modelList } = this.state;
        if (!modelList.length) {
            return null;
        } else {
            return (
                <View
                    pointerEvents="box-none"
                    style={Topview.styles.container}>

                    {
                        modelList.map((item) => {
                            return item.component ? React.cloneElement(item.component, {
                                key: item.id
                            }) : null;
                        })
                    }
                </View>
            );
        }
    }
}

// 制作registerComponent 的替身
const originRegisterComponent = AppRegistry.registerComponent;

// 改写 registerComponent 方法的实现
AppRegistry.registerComponent = function (element, func) {
    var reg = func();
    return originRegisterComponent(element, function(){

        return createReactClass({
            render: function () {
                // 创建 root_element
                return React.createElement(
                    View,
                    {
                        style: { flex: 1,}
                    },
                    React.createElement(reg, this.props),
                    React.createElement(Topview, null),
                );
            }
        });
    });
}

export default {
    getInstance() {
        return topview;
    },

    Topview,
};