import * as React from 'react'

export type InjectableCotext<T> = React.Context<T> & {
  InjectableProvider: React.FC<React.ProviderProps<T>>
}

const NOTHING = {}

export function createInjectableContext<T>(): InjectableCotext<T> {
  const Context = React.createContext<T>(NOTHING as any) as InjectableCotext<T>
  
  Context.InjectableProvider = ({ value, children }) => {
    const injectedVal = React.useContext(Context)
    return (
      <Context.Provider
        value={injectedVal !== NOTHING ? injectedVal : value}
        children={children}
      ></Context.Provider>
    )
  }
  return Context
}
