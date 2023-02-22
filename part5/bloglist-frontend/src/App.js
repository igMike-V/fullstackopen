import React, { useState, useEffect } from 'react'

// Services
import blogService from './services/blogs'

// Components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {!user && <LoginForm setUser={setUser} /> }
      { user && <h2>blogs</h2> }
      { user && <p>{user.name} is logged in.</p> }
      {user &&  blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App