import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    PixelRatio,
    Animated,
    Dimensions,
    StatusBar,
} from 'react-native';
import Modal from '../../Modal';
import { colors, padding, border, fontSize } from '../../../../common/styles/varibles';
import Topview from '../../../Topview';
import { SlideAnimated } from '../../../../common/animations';

const screen = Dimensions.get('window');
const statusBarCurrentHeight = StatusBar.currentHeight || 0;

export default class SlideModal extends Modal {
    static defaultProps = {
        ...Modal.defaultProps,

        cancelable: false,

        offsetY: null,
        compatStatusBarCurrentHeight: false,
        offsetX: 0,
        width: null,
        direction: 'up',
    };

    static styles = StyleSheet.create({
        container: {
            ...StyleSheet.flatten(Modal.styles.container),
        },
        content: {
            position: 'absolute',
            overflow: 'hidden',
        }
    });

    constructor(props) {
        super(props);

        this.animated = new SlideAnimated({
            // duration: 1000
        });

        this.state = {
            ...this.state,
            ...this.init(props),
        };
    }

    init(props) {
        const data = {
            screenHeight: props.compatStatusBarCurrentHeight ? screen.height - statusBarCurrentHeight : screen.height,
        };

        data.offsetY = typeof props.offsetY == 'number' ? props.offsetY : data.screenHeight;

        return data;
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.offsetY !== this.props.offsetY ||
            nextProps.compatStatusBarCurrentHeight !== this.props.compatStatusBarCurrentHeight
        ) {
            this.setState({
                ...this.init(nextProps),
            });
        }
    }

    getContent(inner) {
        const modalStyles = Modal.styles;
        const styles = SlideModal.styles;
        const { direction, offsetX, width } = this.props;
        const { offsetY, screenHeight } = this.state;
        const tmp = inner == null ? this.props.children : inner;

        return (
            <View style={[
                styles.container,
                {
                    top: direction == 'up' ? 0 : offsetY,
                    height: direction == 'up' ? offsetY : screenHeight - offsetY,
                }
            ]}>
                <TouchableOpacity
                    style={[
                        modalStyles.mask,
                        { opacity: this.props.opacity },
                    ]}
                    activeOpacity={this.props.opacity}
                    onPress={() => {
                        this.handleMaskPress();
                    }}
                />

                <Animated.View
                    style={[
                        styles.content,
                        {
                            left: offsetX,
                            top: direction == 'up' ? null : 0,
                            bottom: direction == 'up' ? 0 : null,
                            width: width,

                            borderRadius: this.props.borderRadius,
                        },

                        {
                            transform: [
                                { translateY: this.animated.getState().translateY }
                            ],

                            opacity: this.animated.getState().opacity,
                        }
                    ]}
                    onLayout={(e) => {
                        const height = e.nativeEvent.layout.height;
                        this.animated.reset(this.props.direction == 'up' ? height : - height);
                    }}>

                    {tmp || null}
                </Animated.View>
            </View>
        );
    }
}