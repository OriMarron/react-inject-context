## Usage ##
The problem: 

React context consumers receive the value from the nearest provider:
```JSX
 
const Context = React.createContext(null)

const Consumer = () => {
  const value = React.useContext(Context)
  return <div>{value}</div>;
}

const App = () => {
  return (
    <Context.Provider value="A">
      <Context.Provider value="B">
        <Context.Provider value="C">
          <Consumer />
        </Context.Provider>
      </Context.Provider>
    </Context.Provider>
  )
}

// Output:
// "C"
// (value from inner-most provider)

```

The Solution:

simply create the context with `createInjectableContext` 

```JSX

// call createInjectableContext instead of React.createContext
const InjectableContext = createInjectableContext(null);

// everything else remains the same
const Consumer = () => {
  const value = React.useContext(RegularContext)
  return <div>{value}</div>
}

const App = () => {
  return (
    <InjectableContext.Provider value="A">
      <InjectableContext.Provider value="B">
        <InjectableContext.Provider value="C">
          <Consumer />
        </InjectableContext.Provider>
      </InjectableContext.Provider>
    </InjectableContext.Provider>
  )
}

// Output:
// "A"
// (value from outer-most provider)
```
