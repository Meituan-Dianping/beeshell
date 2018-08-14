import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    Image,
    TouchableOpacity,
} from 'react-native';
import Schema from 'async-validator';

import { colors, padding, border, fontSize, formControl } from '../../common/styles/varibles';
import formStyles from '../../common/styles/form';
import Form from './Form';


const styles = StyleSheet.create({
    frame: {
        backgroundColor: '#fff',
    },
    line: {
        marginLeft: padding.horizontalBase,
        height: 1 / PixelRatio.get(),
        backgroundColor: border.color,
    },

    formItem: {
        paddingHorizontal: padding.horizontalBase,
        paddingVertical: padding.verticalBase - 7,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    control: {
        flex: 1,
    },

    others: {
    },

    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    validationView: {
        color: colors.brandDanger,
        fontSize: fontSize.small,
    }
});

export default class FormItem extends Component {
    static propTypes = {
        prop: PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
        ]),
        labelWidth: PropTypes.number,
        indicator: PropTypes.bool,
        showValidation: PropTypes.bool, // 是否默认显示 红色的校验错误
        hasLine: PropTypes.bool,
        validateOnMount: PropTypes.bool,
        disabledCallback: PropTypes.func,
    };

    static defaultProps = {
        prop: '',
        label: '',
        labelWidth: formControl.labelWidth,
        hasLine: false,
        showValidation: true,
        validateOnMount: false,
        indicator: false,
        disabled: false,
        disabledCallback: () => {

        }
    };

    /**
     * 约束 Context 类型
     * 
     * @static
     * @memberof FormItem
     */
    static contextTypes = {
        form: PropTypes.instanceOf(Form).isRequired,
    };

    /**
     * for children
     * 向 children 的 context 注入 emit 方法广播事件（用于感知 change 和 blur 事件）
     * 
     * @static
     * @memberof FormItem
     */
    static childContextTypes = {
        emitValueBlur: PropTypes.func,
        emitValueChange: PropTypes.func,
    };

    getChildContext() {
        return {
            emitValueBlur: this.handleBlur,
            emitValueChange: this.handleValueChange,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            validation: '',
            valid: false,
            validating: false,
        };

        this.blured = false;

        this.handleBlur = this.handleBlur.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }


    componentDidMount() {
        const { prop } = this.props;

        if (prop) {
            this.parent().addField(this);
            // this.initialValue ?
        }

        if (this.props.validateOnMount) {
            this.validate();
        }
    }

    componentWillUnmount() {
        this.parent().removeField(this);
    }

    // rules 变更时重新校验
    componentWillReceiveProps() {
        if (this.fieldValue()) {
            this.validate();
            return;
        }
        if (this.blured) {
            this.validate('blur');
        }
    }

    /**
     * 通过context 获取父级 Form 组件
     * 
     * @returns 
     * @memberof FormItem
     */
    parent() {
        return this.context.form;
    }

    /**
     * 获取 需要校验的值
     * 
     * @returns 
     * @memberof FormItem
     */
    fieldValue() {
        const prop = this.props.prop;
        const model = this.parent().props.model;
        return (prop && model) ? model[prop] : null;
    }
    // 获取 field 校验规则
    getRules() {
        const { prop } = this.props;
        const { rules } = this.parent().props;
        return (prop && rules) ? (rules[prop] || []) : [];
    }
  
    getFilteredRules(trigger) {
        const rules = this.getRules();

        // rules 可能是 function
        if (Array.isArray(rules)) {
            /**
             * 返回所有的不是 change 和 没写的 rules
             * 如果 trigger undefined or null 
             */
            if (trigger == null) {
                return rules.filter(rule => !rule.trigger || rule.trigger !== 'blur')
            } else {
                return rules.filter(rule => rule.trigger && rule.trigger.indexOf(trigger) > -1);
            }
        } else if(typeof rules === 'function') {
            return rules;
        } else {
            return rules
        }

    }
    
    /**
     * 触发校验
     * 
     * @param {any} triggers 触发方式 'change' || 'blur' 
     * @param {any} callback 完成校验后回调
     * @returns 
     * @memberof FormItem
     */
    validate(triggers, callback) {
        const prop = this.props.prop;
        const rules = this.getFilteredRules(triggers);

        if (rules.length === 0) {
            if (typeof callback === 'function') {
                callback(null);
            }
            return true;
        }

        this.setState({ validating: true });

        const descriptor = { [prop]: rules };
        const schema = new Schema(descriptor);
        const source = { [prop]: this.fieldValue() };

        schema.validate(source, { first: true }, (errors) => {
            this.setState({
                validation: errors ? errors[0].message : '',
                valid: !errors,
                validating: false,
            }, () => {
                if (typeof callback === 'function') {
                    callback(errors);
                }
            });
        });
    }

    /**
     * Private API
     * 响应子元素通过Context触发的blur操作
     * 
     * @memberof FormItem
     */
    handleBlur() {
        this.blured = true;
        // 触发 async-validator 的 blur规则
        this.validate('blur'); // 触发
    }

    handleValueChange() {
        // next tick 校验
        setTimeout(() => {
            this.validate('change');
        });
    }





    renderItem() {
        const children = this.props.children && this.props.children.length ?
            this.props.children : [this.props.children];

        const validationView = (!this.state.valid && this.state.validation && this.props.showValidation)
            ? <Text style={styles.validationView}>{this.state.validation}</Text>
            : null;


        return (
            <View style={styles.frame}>
                <View style={[styles.formItem]}>

                    <View style={styles.container}>
                        {
                            this.props.label ? <View style={[formStyles.label, { width: this.props.labelWidth }]}>
                                <Text style={formStyles.labelText}>
                                    {this.props.label}
                                </Text>
                            </View> : null
                        }

                        <View
                            style={[styles.control]}>
                            { children[0] }
                        </View>

                        {
                            this.props.indicator ? <View style={formStyles.indicator}>
                                <Image
                                    style={{ width: 10, height: 20 }}
                                    resizeMode={'stretch'}
                                    source={require('./arrow-right.png')}
                                />
                            </View> : null
                        }
                    </View>

                    {
                        [].slice.call(children, 1).length ? <View style={styles.others}>
                            {[].slice.call(children, 1)}
                        </View> : null
                    }
                    { validationView }
                    {
                        this.props.disabled === true ? <TouchableOpacity
                            activeOpacity={1}
                            style={styles.mask}
                            onPress={() => {
                                this.props.disabledCallback();
                            }}>
                        </TouchableOpacity> : null
                    }
                </View>
                {this.props.hasLine ? <View style={styles.line}></View> : null}
            </View>
        );
    }

    render() {
        return this.renderItem();
    }
};