import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { colors, padding, border, fontSize } from '../../common/styles/varibles';

const styles = StyleSheet.create({
    form: {},
    title: {
        paddingHorizontal: padding.horizontalBase,
        paddingTop: padding.verticalSmall,
        paddingBottom: padding.verticalSmall - 5,
        fontSize: fontSize.base,
        color: colors.gray,
    },
});

export default class Form extends Component {
    static defaultProps = {
        style: {},
    };

    constructor(props) {
        super(props);
        this.fields = [];
    }


    /**
     * 传递给 Form-item 的context
     * 
     * @static
     * @memberof Form
     */
    static childContextTypes = {
        form: PropTypes.any,
    };

    getChildContext() {
        return { form: this };
    }

    // ----------------- public API ---------------------
    /**
     * 遍历所有子 Form-item 的校验器
     * 
     * @param {any} callback 
     * @memberof Form
     */
    validate(callback) {
        let valid = true;
        let count = 0;

        // 保存调用 validate 时 field 副本
        const fields = this.fields.slice();

        // 无需要校验的 fields
        if (fields.length === 0) {
            callback(true);
        }

        const process = (errors) => {
            if (errors) {
                valid = false;
            }
            if (typeof callback === 'function' && ++count === fields.length) {
                callback(valid);
            }
        };
        fields.forEach((field) => {
            field.validate('', process);
        });
    }

    /**
     * 只触发一个 Form-item 的校验
     * 
     * @param {any} prop 
     * @param {any} callback 
     * @returns 
     * @memberof Form
     */
    validateField(prop, callback) {
        const field = this.fields.find(field => field.props.prop === prop);

        if (!field) {
            throw new Error('must call validateField with valid prop string!');
        }

        return field.validate(callback);
    }

    // ------------------ private API for Form-Item -------------------
    addField(field) {
        this.fields.push(field);
    }

    removeField(field) {
        const idx = this.fields.indexOf(field);
        if (idx > -1) {
            this.fields.splice(idx, 1);
        }
    }

    render() {
        return (
            <View style={[styles.form, this.props.style]}>
                {
                    this.props.title ?
                    <Text style={styles.title}>{this.props.title}</Text> : null
                }
                { this.props.children }
            </View>
        );
    }
};