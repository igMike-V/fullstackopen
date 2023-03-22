import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
  const { id } = useParams()
  const user = useSelector(state => {
    if (state.users) {
      return state.users.find(user => id === user.id)
    }
  })
  if (user) {
    const userBlogs = user.blogs.map(blog => <li key={blog.id}>{`${blog.title}`}</li>)
    return (
    <section className="user">
      <h2>{user.name}</h2>
      <h4> added Blogs </h4>
      <ul>
          {userBlogs}
      </ul>
    </section>
    )
  }
  return null
}

export default User