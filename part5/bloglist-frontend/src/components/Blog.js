import {useState} from 'react'
const Blog = ({blog}) => {
  const [blogVisible, setBlogVisible] = useState(false)
  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={() => setBlogVisible(!blogVisible)}>{blogVisible ? 'hide' : 'show'}</button>
      {blogVisible && 
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      }
    </div>  
  )
}

export default Blog