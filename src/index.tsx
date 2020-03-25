import * as React from 'react'

export type InjectableCotext<T> = React.Context<T>

export function createInjectableContext<T>(defaultValue: T): InjectableCotext<T> {
  const Context = React.createContext<T>(defaultValue)
  const HasParentProvider = React.createContext<boolean>(false)

  const OriginalProvider = Context.Provider

  const Provider: React.FC<React.ProviderProps<T>> = ({ value, children }) => {
    const hasParentProvider = React.useContext(HasParentProvider)
    const injectedVal = React.useContext(Context)

    const wrap = (elements: any) =>
      hasParentProvider ? (
        elements
      ) : (
          <HasParentProvider.Provider value={ true }>{ elements }</HasParentProvider.Provider>
        )

    return wrap(
      <OriginalProvider value={ hasParentProvider ? injectedVal : value }>
        { children }
      </OriginalProvider>
    )
  };

  (Context as any).Provider = Provider

  return Context
}
