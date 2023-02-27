import React, {useState} from 'react'
import formService from '../utilities/forms'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs, setNotification}) => {
  // State for controlled form elements
  const [blogForm, setBlogForm] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = async (event) => {
    event.preventDefault()
    // TODO add error handling 
    const blogObject = {...blogForm}
    try {
      const response = await blogService.create(blogObject)
      setBlogs(prevBlogs => {
        return [...prevBlogs, response]
      })
      console.log(response)
      setNotification({ message: `a new blog: ${response.title} by ${response.author} added`, type: 'notice'})
    } catch (error) {
      setNotification({ message: `Error, could not add blog, check all inputs and try again.`, type: 'error'})
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
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <div>
        Author:
        <input 
            type="text"
            value={blogForm.author}
            name="author"
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <div>
        url:
        <input 
            type="text"
            value={blogForm.url}
            name="url"
            onChange={(event) => formService.formHandler(setBlogForm, event)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm