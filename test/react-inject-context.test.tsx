import * as React from 'react'
import { createInjectableContext } from '../src'
import { render } from '@testing-library/react'

describe('createInjectableContext', () => {
  it('should work as a Provider', () => {
    const Context = createInjectableContext<string>(null as any)
    const Consumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const { queryByText } = render(
      <Context.Provider value={'A'}>
        <Consumer />
      </Context.Provider>
    )
    expect(queryByText('A')).toBeTruthy()
  })

  it('should work as a Provider with injection', () => {
    const Context = createInjectableContext<string>(null as any)
    const Consumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const Comp = () => (
      <Context.Provider value={'A'}>
        <Consumer />
      </Context.Provider>
    )
    const Injector: React.FC = ({ children }) => (
      <Context.Provider value={'B'}>{children}</Context.Provider>
    )
    const { queryByText } = render(
      <Injector>
        <Comp />
      </Injector>
    )
    expect(queryByText('B')).toBeTruthy()
  })

  it('should work when injectig null', () => {
    const Context = createInjectableContext<string | null>(null as any)
    const Consumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const Comp = () => (
      <Context.Provider value={'A'}>
        <Consumer />
      </Context.Provider>
    )
    const Injector: React.FC = ({ children }) => (
      <Context.Provider value={null}>{children}</Context.Provider>
    )
    const { container } = render(
      <Injector>
        <Comp />
      </Injector>
    )
    expect(container.textContent).toEqual('')
  })

  it('should work when injectig default value', () => {
    const Context = createInjectableContext<string>('A')
    const Consumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const Comp = () => (
      <Context.Provider value={'B'}>
        <Consumer />
      </Context.Provider>
    )
    const Injector: React.FC = ({ children }) => (
      <Context.Provider value={'A'}>{children}</Context.Provider>
    )
    const { container } = render(
      <Injector>
        <Comp />
      </Injector>
    )
    expect(container.textContent).toEqual('A')
  })

  it('should provide outermost value', () => {
    const Context = createInjectableContext<string>(null as any)
    const Consumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const { queryByText } = render(
      <Context.Provider value={'A'}>
        <Context.Provider value={'B'}>
          <Context.Provider value={'C'}>
            <Consumer />
          </Context.Provider>
        </Context.Provider>
      </Context.Provider>
    )
    expect(queryByText('A')).toBeTruthy()
  })

  it('should provide default value', () => {
    const Context = createInjectableContext<string>('A')
    const Consumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const { queryByText } = render(<Consumer />)
    expect(queryByText('A')).toBeTruthy()
  })
})
