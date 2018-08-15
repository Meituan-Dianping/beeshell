import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * 高阶组件。增强输入控件，代理组件的 onValueChange & onBlur props 以实现和 FormItem 的自动通信。
 *
 * 输入组件需实现的 props:
 * - onValueChange {Function} 输入事件回调
 * - onBlur {Function} 失去焦点回调 （无对应原生事件可不提供）
 *
 * @param {Component} InputComponent 
 */
export default function enhance(InputComponent) {
    return class EnhancedInputComponent extends Component {
        static contextTypes = {
            emitValueBlur: PropTypes.func,
            emitValueChange: PropTypes.func,
        };

        constructor(props, context) {
            super(props, context);

            this.handleBlur = this.handleBlur.bind(this);
            this.handleValueChange = this.handleValueChange.bind(this);
        }

        handleBlur() {
            const onBlur = this.props.onBlur;
            if (typeof onBlur === 'function') {
                onBlur(...arguments);
            }
            // notify blur
            if (this.context.emitValueBlur) {
                this.context.emitValueBlur();
            }
        }

        handleValueChange() {
            const onValueChange = this.props.onValueChange;
            if (typeof onValueChange === 'function') {
                onValueChange(...arguments);
            }
            // notify change
            if (this.context.emitValueChange) {
                this.context.emitValueChange();
            }
        }

        render() {
            return (
                <InputComponent
                    {...this.props}
                    onBlur={this.handleBlur}
                    onValueChange={this.handleValueChange}
                    error={this.context.error}
                    message={this.context.message}
                />
            );
        }
    };
};
