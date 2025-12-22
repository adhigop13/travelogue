import { useState } from 'react'
import './App.css'
import { Login } from './pages'

function App() {
  const [isLoginPage, setIsLoginPage] = useState(false)
  const [count, setCount] = useState(0)

  // 1. THIS IS YOUR LOGIN VIEW
  if (isLoginPage) {
    return (
      <Login></Login>
    )
  }

  // 2. THIS IS YOUR HOME VIEW
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setIsLoginPage(true)}>
          Go to Login Page
        </button>
      </div>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App