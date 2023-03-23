import React, { useState } from 'react'
import formService from '../utilities/forms'
import { useDispatch } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
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
      <h5>Create new:</h5>
      <Form onSubmit={handleAddBlog}>
        <div>
        title:
          <Form.Control
            type="text"
            value={blogForm.title}
            name="title"
            id="blog-title"
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <div>
        Author:
          <Form.Control
            type="text"
            value={blogForm.author}
            name="author"
            id='blog-author'
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <div>
        url:
          <Form.Control
            type="text"
            value={blogForm.url}
            name="url"
            id="blog-url"
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <Button id='new-blog-button' type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm