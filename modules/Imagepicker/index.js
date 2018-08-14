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
    Dimensions,
} from 'react-native';

import { colors, padding, border, fontSize } from '../../common/styles/varibles';
import SlideModal from '../../components/Modal/extensions/SlideModal';

import NativeImagepicker from '../../natives/Imagepicker';

const screen = Dimensions.get('window');
const px = 1 / PixelRatio.get();

export default class Imagepicker extends React.Component {
    static defaultProps = {
        title: '上传图片',
        cancelButtonTitle: '取消',

        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '从图库上传',

        maxWidth: 1600,
        maxHeight: 1200,
        isAllowCrop: false,
        isAllowRotate: true,
        aspectX: 4,
        aspectY: 3,
        quality: 1,
        responseFileType: '',

        // customButtons: {
        //     delImage: {
        //         title: '删除',
        //         position: 'top',
        //         brandColor: 'brandSuccess',
        //     },
        // },

        onCustomButtonPress: null,
        callback: null,


        // storageOptions: {
        //     skipBackup: true,
        //     path: 'images',
        // },

        // isLowRamPhone: ImageUtils.isLowRamPhone(),
        // recognizeQR: true,

    };

    static styles = StyleSheet.create({
        container: {
            backgroundColor: colors.bgGray,
        },
        heading: {
            flexDirection: 'row',
            borderBottomWidth: 1 * px,
            borderBottomColor: border.color,
            backgroundColor: '#fff',
        },

        title: {
            flex: 1,
            paddingVertical: padding.verticalBase,
            paddingHorizontal: padding.horizontalBase,
            fontSize: fontSize.base,
            textAlign:'center',
            color: colors.grayLighter,
        },

        body: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },

        item: {
            borderBottomWidth: 1 * px,
            borderBottomColor: border.color,
            backgroundColor: '#fff',
        },

        itemText: {
            paddingVertical: padding.verticalSmall,
            paddingHorizontal: padding.horizontalBase,

            fontSize: fontSize.h5,
            textAlign:'center',
            color: colors.gray,
        },

    });


    constructor(props) {
        super(props);

        this.state = {
            ...this.init(props),
        };
    }

    init(props) {
        let topCustomButtons = [];
        let bottomCustomButtons = [];

        if (typeof props.customButtons == 'object') {
            Object.keys(props.customButtons).forEach((key) => {
                const tmp = {
                    ...props.customButtons[key]
                };

                tmp.color = colors[tmp.brandColor];

                if (tmp.position === 'top') {
                    topCustomButtons.push(tmp);
                } else {
                    bottomCustomButtons.push(tmp);
                }
            });
        }


        return {
            topCustomButtons,
            bottomCustomButtons,
        };
    }

    open() {
        this._slideModal.open();
    }

    close() {
        this._slideModal.close();
    }

    loadImage(type) {
        let imageLoader;

        if (type == 'takePhoto') {
            imageLoader = NativeImagepicker ? NativeImagepicker.launchCamera : function () {};
        } else {
            imageLoader = NativeImagepicker ? NativeImagepicker.showImagePicker : function () {};
        }

        let promise;

        if (this.loadingImage) {
            promise = Promise.reject();
        } else {
            this.loadingImage = true;

            promise = new Promise((resolve) => {
                this._slideModal.close().then(() => {
                    imageLoader({
                        ...this.props,
                    }, (response) => {
                        this.loadingImage = false;
                        resolve(response);
                    });

                });
            });
        }

        promise.then((ret) => {
            this.props.callback && this.props.callback(ret);
        }).catch((e) => {

        });
    }


    onCustomButtonPress(item) {
        this.props.onCustomButtonPress && this.props.onCustomButtonPress(item);

        this.close();
    }

    renderCustomButtonItem(item, index) {
        const styles = Imagepicker.styles;

        return (
            <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={this.onCustomButtonPress.bind(this, item)}>

                <Text style={[styles.itemText, { color: item.color }]}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const styles = Imagepicker.styles;

        const { topCustomButtons, bottomCustomButtons } = this.state;

        return (
            <SlideModal
                ref={(c) => {
                    this._slideModal = c;
                }}
                width={screen.width}
                cancelable={true}>

                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.title}>{this.props.title}</Text>
                    </View>

                    {
                        topCustomButtons.map((item, index) => {
                            return this.renderCustomButtonItem(item, index);
                        })
                    }

                    <TouchableOpacity
                        style={[styles.item]}
                        onPress={this.loadImage.bind(this, 'takePhoto')}>
                        <Text style={styles.itemText}>{this.props.takePhotoButtonTitle}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.item]}
                        onPress={this.loadImage.bind(this, 'chooseFromLibrary')}>
                        <Text style={styles.itemText}>{this.props.chooseFromLibraryButtonTitle}</Text>
                    </TouchableOpacity>

                    {
                        bottomCustomButtons.map((item, index) => {
                            return this.renderCustomButtonItem(item, index);
                        })
                    }



                    <TouchableOpacity
                        style={[styles.item, { marginTop: 10 }]}
                        onPress={() => {
                            this._slideModal.close().catch((e) => {
                            });
                        }}>
                        <Text style={styles.itemText}>{this.props.cancelButtonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </SlideModal>
        );
    }
}
