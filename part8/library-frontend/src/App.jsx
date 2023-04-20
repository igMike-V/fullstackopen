import Authors from './components/Authors.jsx'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend.jsx'
import './App.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient, useSubscription} from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { BOOK_ADDED, ALL_BOOKS } from './queries.jsx'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;

      window.alert(
        `Book ${addedBook.title} by ${addedBook.author.name} added to the database.`
      )
    }
  })

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
        <Link className='nav--link' to="/recommend" >recommend</Link>
        <Link className='nav--link' to="/" onClick={logout} >logout</Link>
      </nav>
      <Routes>
        <Route path="/" exact element={<Navigate to="/authors" />} />
        <Route path="/authors" element={<Authors />} >Authors</Route>
        <Route path="/books" element={<Books />} >Books</Route>
        <Route path="/add" element={<NewBook />} >Add</Route>
        <Route path="/recommend" element={<Recommend />} >Add</Route>
      </Routes>
    </div>
  )
}

export default App