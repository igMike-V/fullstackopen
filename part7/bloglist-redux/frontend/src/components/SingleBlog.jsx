import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { updateLikes } from '../reducers/blogReducer'
import { setNotification } from "../reducers/notificationReducer"
import CommentForm from "./CommentForm"
import {Table, Button} from 'react-bootstrap'

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

  console.log(blog)

  return (
    <section className="single-blog">
      <div className="container">
        <h2 className="single-blog--title">{`${blog.title} | ${blog.author}`}</h2>
        <div className="blog-user">{`added by ${blog.user.name}`}</div>
        Visit Blog: <Link className="single-blog--link" to={`${blog.url}`} >{blog.url}</Link>
      </div>
      <div className="container">
        <div className="blog-likes">
          {`${blog.likes} likes`}
          <Button className="like-button" onClick={() => handleLike(blog.id)}>like</Button>
        </div>        
      </div>
      <div className="container">
        {blog.comments && <h3>Comments</h3>}
        {blog.comments && <CommentForm id={blog.id} />}
        {blog.comments &&
          <Table>
            <tbody>
            {
              blog.comments.map((comment, index) => {
                return (
                  <tr key={index} className="blogs-comment">
                    <td>
                      {comment}
                    </td>
                  </tr>)
              })
              }
              </tbody>
          </Table>
        }
      </div>
    </section>
  )
}

export default SingleBlog

