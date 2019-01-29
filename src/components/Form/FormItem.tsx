import React, { Component, ReactNode, ReactChild } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Icon } from '../Icon'
import variables from '../../common/styles/variables'
import formStyles from './styles'

const styles = StyleSheet.create<any>(formStyles)

export interface FormItemProps {
  /**
   * 表单数据模型key
   * 结合From.model属性
   */
  prop: string
  /**
   * 表单控件标签
   */
  label: string | ReactNode
  labelWidth: number
  /**
   * 是否有下分割线
   */
  hasLine: boolean
  /**
   * 加载时校验
   */
  validateOnMount: boolean
  showValidation: boolean
  children?: ReactChild[] | ReactChild
  style: any
}

interface FormItemState {
  validation: string
  valid: boolean
  validating: boolean
}

export class FormItem extends Component<FormItemProps, FormItemState> {
  static defaultProps = {
    prop: '',
    label: '标题',
    labelWidth: variables.formItemLabelWidth,
    hasLine: false,
    showValidation: true,
    validateOnMount: false,
    style: {}
  }

  blured = false
  formContext = undefined

  constructor (props) {
    super(props)

    this.state = {
      validation: '',
      valid: false,
      validating: false
    }
  }

  componentDidMount () {
    const { prop } = this.props
    // console.log('this.context',this.context)

    if (prop && this.formContext) {
      this.formContext.addField(this)
    }

    if (this.formContext && this.props.validateOnMount) {
      this.validate('', '')
    }
  }

  componentWillUnmount () {
    this.formContext && this.formContext.removeField(this)
  }

  // rules 变更时重新校验
  // componentWillReceiveProps () {
  //   if (this.fieldValue()) {
  //     this.validate('', '')
  //     return
  //   }
  //   if (this.blured) {
  //     this.validate('blur', '')
  //   }
  // }

  // 通过外层 model 获取需要校验的值
  fieldValue = () => {
    const prop = this.props.prop
    const { model } = this.formContext
    return (prop && model) ? model[prop] : null
  }

  // 通过外层 rules 获取校验的规则
  getRules = () => {
    const { prop } = this.props
    const { rules } = this.formContext
    return (prop && rules) ? (rules[prop] || []) : []
  }

  getFilteredRules = (trigger) => {
    const rules = this.getRules()
    // rules 可能是 function
    if (Array.isArray(rules)) {
      /**
       * 返回所有的不是 change 和 没写的 rules
       * 如果 trigger undefined or null or change
       */
      if (trigger === '' || trigger === 'change' || trigger === undefined) {
        return rules.filter(rule => !rule.trigger || rule.trigger !== 'blur')
      } else {
        return rules.filter(rule => rule.trigger && rule.trigger.indexOf(trigger) > -1)
      }
    } else if (typeof rules === 'function') {
      return rules
    } else {
      return rules
    }

  }

  /**
   * 触发校验
   * @param {any} triggers 触发方式 'change' || 'blur'
   * @param {any} callback 完成校验后回调
   * @returns
   * @memberof FormItem
   */
  validate = (triggers, callback) => {
    // const prop = this.props.prop
    // const rules = this.getFilteredRules(triggers)

    // if (rules.length === 0) {
    //   if (typeof callback === 'function') {
    //     callback(null)
    //   }
    //   return true
    // }

    // this.setState({ validating: true })

    // const descriptor = { [prop]: rules }
    // const schema = new Schema(descriptor)
    // const source = { [prop]: this.fieldValue() }

    // schema.validate(source, { first: true }, (errors) => {
    //   this.setState({
    //     validation: errors ? errors[0].message : '',
    //     valid: !errors,
    //     validating: false
    //   }, () => {
    //     if (typeof callback === 'function') {
    //       callback(errors)
    //     }
    //   })
    // })
  }

  /**
   * Private API
   * 响应子元素通过Context触发的blur操作
   * @memberof FormItem
   */
  handleValueBlur = () => {
    this.blured = true
    // 触发 async-validator 的 blur规则
    this.validate('blur', '') // 触发
  }

  handleValueChange = () => {
    // next tick 校验
    setTimeout(() => {
      this.validate('change', '')
    })
  }

  renderItem = () => {
    const children = this.props.children && Array.isArray(this.props.children) ?
      this.props.children : [this.props.children]

    const validationView = (!this.state.valid && this.state.validation && this.props.showValidation)
      ? <Text style={styles.validationView}>{this.state.validation}</Text>
      : null

    return (
      <View>
        <View style={[styles.formItem, this.props.style]}>
          <View style={styles.container}>
            {
              React.isValidElement(this.props.label) ? this.props.label :
              <View style={[styles.label, { width: this.props.labelWidth }]}>
                <Text style={styles.labelText}>
                  {this.props.label}
                </Text>
              </View>
            }

            <View style={[styles.control]}>
              {children[0]}
            </View>
          </View>

          {
            [].slice.call(children, 1).length ? <View style={styles.others}>
              {[].slice.call(children, 1)}
            </View> : null
          }
          {
            /* 校验位显示 */
            validationView
          }
        </View>
        {this.props.hasLine ? <View style={styles.line}></View> : null}
      </View>
    )
  }

  render () {
    return this.renderItem()
  }
}
