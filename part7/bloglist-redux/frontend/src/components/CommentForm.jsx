import { useState } from "react"
import formService from '../utilities/forms'
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { addComment } from "../reducers/blogReducer"

const CommentForm = ({id}) => {
  const dispatch = useDispatch()
  const [commentForm, setCommentForm] = useState({
    comment: ''
  })  
  const handleComment = (event) => {
    event.preventDefault()
    if (commentForm.comment.length > 3) {
      dispatch(addComment(id, commentForm.comment))
      dispatch(setNotification(`added comment: ${commentForm.comment}`, 'info', 5))
      formService.resetForm(setCommentForm)      
    } else {
      dispatch(setNotification(`Opps... your comment: "${commentForm.comment}" is too short. Minium length is 3 characters`, 'error', 5))
    }
    
  }

  return (
    <div className="comment-form">
      <form onSubmit={handleComment}>
        <div>
          <input 
            type="text"
            value={commentForm.comment}
            name="comment"
            id="comment"
            onChange={(event) => formService.formHandler(setCommentForm, event)}
          />
        </div>
        <button id='new-blog-comment-button' type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm