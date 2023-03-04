import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'


const Blog = ({ blog, setNotification, user, removeBlogFromState, handleLike }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const removeBlog = async () => {
    if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setNotification({ message: `Removed Blog: ${blog.title}`, type: 'notice' })
      removeBlogFromState(blog.id)
    }

  }

  return (
    <div className='blog'>
      {blog.title} {blog.author} <button className='show-button' onClick={() => setBlogVisible(!blogVisible)}>{blogVisible ? 'hide' : 'show'}</button>
      {blogVisible &&
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button className="like-button" onClick={() => handleLike(blog)}>like</button></p>
          <p>{blog.user.name}</p>
          {user.name === blog.user.name && <button className='remove-button' onClick={removeBlog}>remove</button>}
        </div>
      }
    </div>
  )
}
/* Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setNotification: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  removeBlogFromState: PropTypes.func.isRequired
} */

export default Blog