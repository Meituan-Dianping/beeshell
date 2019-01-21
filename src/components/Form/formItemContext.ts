import React from 'react'
// 从Form向 FormItem传递 form: this
const FormItemContext = React.createContext<{
  emitValueChange: () => void,
  emitValueBlur: () => void
}>({
  emitValueChange: () => { return },
  emitValueBlur: () => { return }
})

const FormItemProvider = FormItemContext.Provider
const FormItemConsumer = FormItemContext.Consumer
export { FormItemProvider, FormItemConsumer }
