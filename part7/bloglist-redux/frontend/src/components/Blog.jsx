import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateLikes, removeBlog } from '../reducers/blogReducer'


const Blog = ({ blog, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const dispatch = useDispatch()

  const handleRemoveBlog = () => {
    if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Removed Blog: ${blog.title}`, 'notice', 5))
    }
  }

  
  const handleLike = (id) => {
    try {
      dispatch(updateLikes(id))
      dispatch(setNotification(`Like logged for ${blog.title}`, 'notice', 5))
    } catch (error) {
      console.log('there was an error', error)
      dispatch(setNotification({ message: 'Something went wrong try again later', type: 'error' }))
    }
  }


  return (
    <div className='blog'>
      {blog.title} {blog.author} <button className='show-button' onClick={() => setBlogVisible(!blogVisible)}>{blogVisible ? 'hide' : 'show'}</button>
      {blogVisible &&
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button className="like-button" onClick={() => handleLike(blog.id)}>like</button></p>
          <p>{blog.user.name}</p>
          {user.name === blog.user.name && <button className='remove-button' onClick={handleRemoveBlog}>remove</button>}
        </div>
      }
    </div>
  )
}


export default Blog