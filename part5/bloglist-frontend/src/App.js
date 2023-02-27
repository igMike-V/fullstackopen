import React, { useState, useEffect } from 'react'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get logged in from storage
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if(loggedInUserJSON) {
      console.log('userdata found')
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    if(user != null){
      blogService.setToken(user.token)
    }
  }, [user])

  return (
    <div>
      {!user && <LoginForm setUser={setUser} /> }
      { user && <h2>blogs</h2> }
      { user && <p>{user.name} is logged in. <button onClick={() => loginService.logout(setUser)}>logout</button></p> }
      { user && <BlogForm setBlogs={setBlogs} /> } 
      { user &&  blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App