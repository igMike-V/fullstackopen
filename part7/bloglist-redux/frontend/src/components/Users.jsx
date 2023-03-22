import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }

  const userElements = users.map(user => {
    return (
        <div className="users--user" key={user.id}>
          <div className="users--user-name"><Link to={`/users/${user.id}`} >{user.name}</Link></div>
          <div className="users--user-blogcount">{user.blogs.length}</div>
        </div>
    )
  })
  
  return (
    <section className="users">
      <div className="users--heading">
        <h2>Users</h2>
      </div>
      <div className="users--stats">
        <div className="users--user-heading">
          <div className="users--user-heading-name"></div>
          <div className="users--user-heading-blogcount">blogs created</div>
        </div>
        {userElements}
      </div>
    </section>
  )
}

export default Users