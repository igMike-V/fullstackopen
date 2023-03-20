import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'

import { setNotification } from './reducers/notificationReducer'



const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    // Get logged in from storage
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    // Get blogs
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
      sortBlogs()
    })
  }, [])

  useEffect(() => {
    // Set token if logged in
    if(user !== null){
      blogService.setToken(user.token)
    }
  }, [user])

  const handleLike = async (blog) => {
    try {
      const response = await blogService.update({ ...blog, user: blog.user.id, likes: (blog.likes + 1) }, blog.id)
      dispatch(setNotification(`Like logged for ${response.title}`, 'notice', 5))
      updateLikes(response.id, response.likes)
    } catch (error) {
      console.log('there was an error')
      dispatch(setNotification({ message: 'Something went wrong try again later', type: 'error' }))
    }
  
  }

  // Updates likes in state
  const updateLikes = (id, likes) => {
    setBlogs(prevBlogs => {
      return prevBlogs.map(blogObj => {
        if(blogObj.id === id) {
          return { ...blogObj, likes }
        } else {
          return { ...blogObj }
        }
      })
    })
    sortBlogs()
  }

  const sortBlogs = () => {
    setBlogs(prevBlogs => {
      return prevBlogs.sort((a, b) => {
        return b.likes - a.likes
      })
    })
  }
  
  const removeBlogFromState = (id) => {
    setBlogs(prevBlogs => {
      return prevBlogs.filter(blogObj => id !== blogObj.id)
    })
  }

  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject)
      response.user = {
        name: user.name
      }
      setBlogs(prevBlogs => {
        return [...prevBlogs, response]
      })
      dispatch(setNotification(`a new blog: ${response.title} by ${response.author} added`, 'notice', 5))
      return true
    } catch (error) {
      dispatch(setNotification('Error, could not add blog, check all inputs and try again.', 'error', 5))
      return false
    }
  }

  return (
    <div className='App'>
      { user && <h1>blogs</h1> }
      <Notification />
      {!user && <h1>Log in to application</h1> }
      {!user && <LoginForm setUser={setUser} /> }
      { user && <p>{user.name} is logged in. <button id="logout-button" onClick={() => loginService.logout(user, setUser, dispatch)}>logout</button></p> }

      { user && <Toggle buttonLabel="New Blog" buttonClass="blog-form" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} blogFormRef={blogFormRef} />
      </Toggle>
      }
      { user &&
        <div className='blogs'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} removeBlogFromState={removeBlogFromState} />
          )}
        </div>
      }
    </div>
  )
}

export default App