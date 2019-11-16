import * as React from 'react'
import { createInjectableContext } from '../src'
import { render } from '@testing-library/react'

describe('createInjectableContext', () => {
  it('should work as a regular context', () => {
    const Context = createInjectableContext<string>()
    const Cosumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const { queryByText } = render(
      <Context.Provider value={'A'}>
        <Cosumer />
      </Context.Provider>
    )
    expect(queryByText('A')).toBeTruthy()
  })

  it('should work as a InjectableProvider', () => {
    const Context = createInjectableContext<string>()
    const Cosumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const { queryByText } = render(
      <Context.InjectableProvider value={'A'}>
        <Cosumer />
      </Context.InjectableProvider>
    )
    expect(queryByText('A')).toBeTruthy()
  })

  it('should work as a InjectableProvider with injection', () => {
    const Context = createInjectableContext<string>()
    const Cosumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const Comp = () => (
      <Context.InjectableProvider value={'A'}>
        <Cosumer />
      </Context.InjectableProvider>
    )
    const Wrapper: React.FC = ({ children }) => (
      <Context.Provider value={'B'}>{children}</Context.Provider>
    )
    const { queryByText } = render(<Wrapper><Comp /></Wrapper>)
    expect(queryByText('B')).toBeTruthy()
  })

  it('should work when injectig null', () => {
    const Context = createInjectableContext<string | null>()
    const Cosumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const Comp = () => (
      <Context.InjectableProvider value={'A'}>
        <Cosumer />
      </Context.InjectableProvider>
    )
    const Wrapper: React.FC = ({ children }) => (
      <Context.Provider value={null}>{children}</Context.Provider>
    )
    const { container } = render(<Wrapper><Comp /></Wrapper>)
    expect(container.textContent).toEqual('')
  })

  it('should not inject if not injectable', () => {
    const Context = createInjectableContext<string | null>()
    const Cosumer: React.FC = () => <div>{React.useContext(Context)}</div>
    const Comp = () => (
      <Context.Provider value={'A'}>
        <Cosumer />
      </Context.Provider>
    )
    const Wrapper: React.FC = ({ children }) => (
      <Context.Provider value={null}>{children}</Context.Provider>
    )
    const { container } = render(<Wrapper><Comp /></Wrapper>)
    expect(container.textContent).toEqual('A')
  })
})
