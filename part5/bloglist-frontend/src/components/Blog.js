import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotification, updateLikes, user, removeBlogFromState }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  
  const handleLike = async () => {
    try{
      console.log(blog.id)
      const response = await blogService.update({...blog, user: blog.user.id, likes: (blog.likes + 1)}, blog.id)
      console.log(response)
      setNotification({ message: `Like logged for ${response.title}`, type: 'notice'})
      updateLikes(response.id, response.likes)
    } catch (error) {
      setNotification({ message: `Somthing went wrong try again later`, type: 'error'})
    }
    
  }

  const removeBlog = async () => {
    if(window.confirm(`Remove blog: ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setNotification({ message: `Removed Blog: ${blog.title}`, type: 'notice'})
      removeBlogFromState(blog.id)
    }

  }

  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={() => setBlogVisible(!blogVisible)}>{blogVisible ? 'hide' : 'show'}</button>
      {blogVisible && 
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {user.name === blog.user.name && <button className='remove-button' onClick={removeBlog}>remove</button>}
        </div>
      }
    </div>  
  )
}

export default Blog