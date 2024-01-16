// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import useLocalStorage from './useSth.js'

function Greeting({initialName = ''}) {
  // // 🐨 initialize the state to the value from localStorage
  // // 💰 window.localStorage.getItem('name') ?? initialName
  // const [name, setName] = React.useState(() => ( window.localStorage.getItem('name') || initialName ))

  // // 🐨 Here's where you'll use `React.useEffect`.
  // // The callback should set the `name` in localStorage.
  // // 💰 window.localStorage.setItem('name', name)

  // React.useEffect(() => {
  //   console.log('Called API');
  //   window.localStorage.setItem('name', name);
  // }, [name]);

  const [name, setName] = useLocalStorage({ storageName: 'name1' })

  function handleChange(event) {
    const name = event.target.value;
    setName(name)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
