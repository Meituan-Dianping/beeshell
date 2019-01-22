import React from 'react'
const EmitValueChangeContext = React.createContext<(value: any) => void>(() => { return })
const EmitValueChangeProvider = EmitValueChangeContext.Provider
const EmitValueChangeConsumer = EmitValueChangeContext.Consumer
export { EmitValueChangeProvider, EmitValueChangeConsumer }
