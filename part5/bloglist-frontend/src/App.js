import React, { useState, useEffect, useRef } from 'react'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    if(notification != null){
      setTimeout(() => {
        console.log('time to kill notification')
        setNotification(null)
      }, 5000)
    }
  }, [notification])

  useEffect(() => {
    // Get logged in from storage
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    // Get blogs
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    // Set token if logged in
    if(user != null){
      blogService.setToken(user.token)
    }
  }, [user])

  const blogFormRef = useRef()

  return (
    <div className='App'>
      { user && <h1>blogs</h1> }
      <Notification notification={notification}/>
      {!user && <h1>Log in to application</h1> }
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} /> }
      { user && <p>{user.name} is logged in. <button onClick={() => loginService.logout(user, setUser, setNotification)}>logout</button></p> }
      
      { user && <Toggle buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm setBlogs={setBlogs} setNotification={setNotification} blogFormRef={blogFormRef} user={user} />
        </Toggle>
      } 
      { user && 
        <div className='blogs'>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App