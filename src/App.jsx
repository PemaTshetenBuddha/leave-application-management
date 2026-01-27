import { useState } from 'react'
import './App.css'
import Login from './page/Login'
import SignUp from './page/signUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUp/>
    </>
  )
}

export default App
