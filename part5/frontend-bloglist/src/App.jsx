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
    if(notification !== null){
      setTimeout(() => {
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
    try{
      const response = await blogService.update({ ...blog, user: blog.user.id, likes: (blog.likes + 1) }, blog.id)
      setNotification({ message: `Like logged for ${response.title}`, type: 'notice' })
      updateLikes(response.id, response.likes)
    } catch (error) {
      setNotification({ message: 'Somthing went wrong try again later', type: 'error' })
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
      setNotification({ message: `a new blog: ${response.title} by ${response.author} added`, type: 'notice' })
      return true
    } catch (error) {
      setNotification({ message: 'Error, could not add blog, check all inputs and try again.', type: 'error' })
      return false
    }
  }

  return (
    <div className='App'>
      { user && <h1>blogs</h1> }
      <Notification notification={notification}/>
      {!user && <h1>Log in to application</h1> }
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} /> }
      { user && <p>{user.name} is logged in. <button onClick={() => loginService.logout(user, setUser, setNotification)}>logout</button></p> }

      { user && <Toggle buttonLabel="New Blog" buttonClass="blog-form-toggle" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} blogFormRef={blogFormRef} />
      </Toggle>
      }
      { user &&
        <div className='blogs'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setNotification={setNotification} handleLike={handleLike} user={user} removeBlogFromState={removeBlogFromState} />
          )}
        </div>
      }
    </div>
  )
}

export default App