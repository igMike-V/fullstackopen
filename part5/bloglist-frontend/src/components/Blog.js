import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotification, updateLikes }) => {
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

  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={() => setBlogVisible(!blogVisible)}>{blogVisible ? 'hide' : 'show'}</button>
      {blogVisible && 
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      }
    </div>  
  )
}

export default Blog