import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { updateLikes } from '../reducers/blogReducer'
import { setNotification } from "../reducers/notificationReducer"

const SingleBlog = () => {
  const { id } = useParams()
  const blog = useSelector(state => {
    return state.blogs.find(blog => blog.id === id)
  })

  const dispatch = useDispatch()
  
  if (!blog) { return null }
    
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
    <section className="single-blog">
      <h2>{`${blog.title} | ${blog.author}`}</h2>
      <Link to={`${blog.url}`} >{blog.url}</Link>
      <div className="blog-likes">
        {`${blog.likes} likes`}
        <button className="like-button" onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div className="blog-user">{ `added by ${blog.user.name}` }</div>
    </section>
  )
}

export default SingleBlog

