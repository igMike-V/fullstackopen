import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'

// Reducers
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'



const App = () => {
  const dispatch = useDispatch()

  // Create a selector for blogs in redux store and sort by likes
  const blogs = useSelector(state => {
    const blogsCopy = [...state.blogs]
    return blogsCopy.sort((a, b) => {
        return b.likes - a.likes
      })
  })

  const user = useSelector(state => {
    return state.user
  })

  //const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Get logged in from storage
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if(loggedInUserJSON) {
      const storedUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(storedUser))
      blogService.setToken(storedUser.token)
    }
    // Get blogs
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    // Set token if logged in
    if(user !== null){
      blogService.setToken(user.token)
    }
  }, [user])
  

  const blogFormRef = useRef()

  return (
    <div className='App'>
      { user && <h1>blogs</h1> }
      <Notification />
      {!user && <h1>Log in to application</h1> }
      {!user && <LoginForm setUser={setUser} /> }
      { user && <p>{user.name} is logged in. <button id="logout-button" onClick={() => loginService.logout(user, setUser, dispatch)}>logout</button></p> }

      { user && <Toggle buttonLabel="New Blog" buttonClass="blog-form" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggle>
      }
      { user &&
        <div className='blogs'>
          {blogs.map(blog => {
            return (
              <Blog key={blog.id} blog={blog} user={user} />
            )
          }
          )}
        </div>
      }
    </div>
  )
}

export default App