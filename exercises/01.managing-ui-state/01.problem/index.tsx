import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void
}) {
  // 🐨 call useState here to get the `username` state and `setUsername` updater function

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // 🐨 call `onSubmitUsername` with the `username` state
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // 🐨 call setUsername with the event.currentTarget.value
  }

  return (
    <form name="usernameForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = (username: string) =>
    alert(`You entered: ${username}`)
  return (
    <div style={{width: 400}}>
      <UsernameForm onSubmitUsername={onSubmitUsername} />
    </div>
  )
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)