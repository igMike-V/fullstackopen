import React, { useState } from 'react'
import formService from '../utilities/forms'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
// section 5.6 update (already done)
const BlogForm = ({ blogFormRef, createBlog }) => {
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

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = { ...blogForm }
    const response = await createBlog(blogObject)
    if(response) {
      resetForm()
      blogFormRef.current.toggleVisibility()
    }
  }

  return (
    <div className="blog-form">
      <h2>Create new:</h2>
      <form onSubmit={addBlog}>
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

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm