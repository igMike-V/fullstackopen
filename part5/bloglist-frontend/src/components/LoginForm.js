import React, {useState} from "react"
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'

const LoginForm = ({setUser}) => {
  //make login form
  const [userForm, setUserForm] = useState({
      username: '',
      password: '',
  })

  const userFormHandler = (event) => {
    setUserForm(prev => {
      return {...prev, [event.target.name] : event.target.value }
    })
  }

  const resetUserForm = () => {
    setUserForm(prev => {
      let newLoginState = {...prev}
      Object.keys(newLoginState).forEach(key => {newLoginState[key] = ''})
      return newLoginState
    })
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    const { username, password } = userForm 
    try {
      const userData = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(userData)
      )
      blogService.setToken(userData.token)
      setUser(userData)
      resetUserForm()

    } catch(err) {
      console.log('Wrong Credentials', err)
    }
  }

  return (
    <div className="login-form">
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
        Username:
          <input 
            type="text"
            value={userForm.username}
            name="username"
            onChange={userFormHandler}
          />
        </div>
        <div>
        Password:
          <input 
            type="password"
            value={userForm.password}
            name="password"
            onChange={userFormHandler}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm
