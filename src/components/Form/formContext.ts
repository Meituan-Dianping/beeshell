import React from 'react'
// 从Form向 FormItem传递 form: this
const FormContext = React.createContext<{
  model: any,
  rules: any,
  addField: (field: any) => void,
  removeField: (field: any) => void
}>({
  model: undefined,
  rules: undefined,
  addField: () => { return },
  removeField: () => { return }
})

const FormProvider = FormContext.Provider
const FormConsumer = FormContext.Consumer
export { FormProvider, FormConsumer, FormContext }
