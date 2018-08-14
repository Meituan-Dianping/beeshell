import 'react-native';
import React from 'react';
import Component from '../modules/Imagepicker';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

    it('basic use', () => {
        const configs = {
            title: '上传图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从图库上传',
            maxWidth: 1600,
            maxHeight: 1200,
            isAllowCrop: true,
            isAllowRotate: true,
            aspectX: 4,
            aspectY: 3,
            quality: 1,
            noData: false,
            customButtons: {
                delImage: {
                    title: '删除',
                    position: 'top',
                    brandColor: 'brandWarning',
                },

                goto: {
                    title: '跳转',
                    position: 'bottom',
                    brandColor: 'brandInfo',
                },
            },

            recognizeQR: true,
            // responseFileType: 'base64',

            callback(res) {
                console.log(res);
            },

            onCustomButtonPress(item) {
                console.log(item);
            }
        }
        const component = renderer.create(
            <Component
                {...configs}>
            </Component>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        const instance = component.getInstance();
        instance.open();
        instance.close();

        instance.loadImage('takePhoto');
        instance.loadImage('chooseFromLibrary');

        instance.onCustomButtonPress({});
    });
});

