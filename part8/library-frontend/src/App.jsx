import Authors from './components/Authors.jsx'
import Books from './components/Books'
import NewBook from './components/NewBook'
import './App.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

const App = () => {

  return (
    <div className='App'>
      <nav className='nav'>
        <Link className='nav--link' to="/authors" >authors</Link>
        <Link className='nav--link' to="/books" >books</Link>
        <Link className='nav--link' to="/add" >add</Link>
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