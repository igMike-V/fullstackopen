import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route,
  Link
} from 'react-router-dom'


// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import PrivateRoutes from './components/PrivateRoutes'
import User from './components/User'


// Reducers
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import SingleBlog from './components/SingleBlog'



const App = () => {
  const dispatch = useDispatch()

  // Create a selector for blogs in redux store and sort by likes
  const blogs = useSelector(state => {
    const blogsCopy = [...state.blogs]
    return blogsCopy.sort((a, b) => {
        return b.likes - a.likes
      })
  })

  const {user} = useSelector(state => {
    return state.user
  })

  //const [user, setUser] = useState(null)
  
  useEffect(() => {
    // Get logged in from storage
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser')
    if(loggedInUserJSON) {
      const storedUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(storedUser))
      blogService.setToken(storedUser.token)
    }
    // Get blogs
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    // Set token if logged in
    if(user !== null){
      blogService.setToken(user.token)
    }
  }, [user])
  
  return (
    <div className='App'>
      <nav className='nav-menu'>
        <div className="nav-menu--left">
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
        </div>
        <div className="nav-menu--right">
           {user && <p>{user.name} is logged in. <button id="logout-button" onClick={() => loginService.logout(user, setUser, dispatch)}>logout</button></p>}
        </div>
        
          </nav>
      <h1>Blog App</h1>
      <Notification />
      {!user && <h1>Log in to application</h1>}
      {!user && <LoginForm setUser={setUser} />}
      
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/users" exact element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
        </Route>
        <Route path="/" exact element={<Blogs />} /> 
      </Routes>
      
    </div>
  )
}

export default App