import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ blog, user, removeBlogFromState, handleLike }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const dispatch = useDispatch()

  const removeBlog = async () => {
    if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      dispatch(setNotification(`Removed Blog: ${blog.title}`, 'notice', 5))
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


export default Blog