import React, { Component, ReactNode } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

import formStyles from './styles'
import { FormItem } from './FormItem'
const styles = StyleSheet.create<any>(formStyles)

export interface FormProps {
  style?: any
}

interface FormState {
  isEditing: boolean
}

export class Form extends Component<FormProps, FormState> {
  static displayName = 'Form'
  static defaultProps = {
    style: {}
  }
  static Item = FormItem

  fields = []

  constructor (props) {
    super(props)
  }

  // ----------------- public API ---------------------
  /**
   * 遍历所有子 Form-item 的校验器
   * @param {any} callback
   * @memberof Form
   */
  validate (callback) {
    let valid = true
    let count = 0

    // 保存调用 validate 时 field 副本
    const fields = this.fields.slice()

    // 无需要校验的 fields
    if (fields.length === 0) {
      callback(true)
    }

    const process = (errors) => {
      if (errors) {
        valid = false
      }
      if (typeof callback === 'function' && ++count === fields.length) {
        callback(valid)
      }
    }
    fields.forEach((field) => {
      field.validate('', process)
    })
  }

  /**
   * 只触发一个 Form-item 的校验
   * @param {any} prop
   * @param {any} callback
   * @returns
   * @memberof Form
   */
  validateField (prop, callback) {
    const field = this.fields.find(field => field.props.prop === prop)

    if (!field) {
      throw new Error('must call validateField with valid prop string!')
    }

    return field.validate(callback)
  }

  // ------------------ private API for Form-Item -------------------
  addField = (field) => {
    this.fields.push(field)
  }

  removeField = (field) => {
    const idx = this.fields.indexOf(field)
    if (idx > -1) {
      this.fields.splice(idx, 1)
    }
  }

  render () {
    return (
      <View style={[styles.form, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}
