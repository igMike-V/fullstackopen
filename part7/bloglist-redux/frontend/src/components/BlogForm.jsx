import React, { useState } from 'react'
import formService from '../utilities/forms'
import { useDispatch } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
// section 5.6 update (already done)
const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  // State for controlled form elements
  const [blogForm, setBlogForm] = useState({
    title: '',
    author: '',
    url: '',
  })


  const resetForm = () => {
    setBlogForm({
      title: '',
      author: '',
      url: '',
    })
  }


  const handleAddBlog = (event) => {
    event.preventDefault()
    const blogObject = { ...blogForm }
    try {
      dispatch(addBlog(blogObject))
      resetForm()
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog: ${blogObject.title} by ${blogObject.author} added`, 'notice', 5))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('Error, could not add blog, check all inputs and try again.', 'error', 5))
    }
  }

  return (
    <div className="blog-form">
      <h2>Create new:</h2>
      <form onSubmit={handleAddBlog}>
        <div>
        title:
          <input
            type="text"
            value={blogForm.title}
            name="title"
            id="blog-title"
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <div>
        Author:
          <input
            type="text"
            value={blogForm.author}
            name="author"
            id='blog-author'
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={blogForm.url}
            name="url"
            id="blog-url"
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <button id='new-blog-button' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm