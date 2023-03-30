import Authors from './components/Authors.jsx'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import './App.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  //set token from storage 
  useEffect(() => {}, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }


  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken} />
      </>
    )
  }
  

  return (
    <div className='App'>
      <nav className='nav'>
        <Link className='nav--link' to="/authors" >authors</Link>
        <Link className='nav--link' to="/books" >books</Link>
        <Link className='nav--link' to="/add" >add</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      <Routes>
        <Route path="/" exact element={<Navigate to="/authors" />} />
        <Route path="/authors" element={<Authors />} >Authors</Route>
        <Route path="/books" element={<Books />} >Books</Route>
        <Route path="/add" element={<NewBook />} >Add</Route>
      </Routes>
    </div>
  )
}

export default App