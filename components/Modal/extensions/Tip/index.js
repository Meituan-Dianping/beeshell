import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    PixelRatio,
} from 'react-native';
import Modal from '../../Modal';
import { colors, padding, border, fontSize } from '../../../../common/styles/varibles';

const px = 1 / PixelRatio.get();

export default class Tip extends Modal {
    static defaultProps = {
        ...Modal.defaultProps,

        opacity: 0,

        body: 'hello world',
        cancelable: true,
        duration: null,
    };

    static styles = StyleSheet.create({
        container: {
        },
        body: {
            paddingVertical: 20,
            paddingHorizontal: 30,

            marginHorizontal: 40,
            borderRadius: border.radiusBase,
            textAlign: 'center',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            overflow: 'hidden',
        }
    });


    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    getContent(c) {
        const inner = <View style={Tip.styles.container}>
            {this.getBody(c)}
        </View>;

        return Modal.prototype.getContent.call(this, inner);
    }

    getBody(c) {
        const { body } = this.props;
        const tmp = c == null ? String(body) : c;

        if (React.isValidElement(tmp)) {
            return tmp;
        } else {
            return (
                <Text style={Tip.styles.body}>{tmp}</Text>
            );
        }
    }

    open(c) {
        return Modal.prototype.open.call(this, c).then((ret) => {

            if (typeof this.props.duration == 'number') {
                setTimeout(() => {
                    this.close();
                }, this.props.duration);
            }

            return ret;
        });
    }

    render() {
        return null;
    }
}