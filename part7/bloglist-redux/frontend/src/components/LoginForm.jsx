import React, { useState } from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
//import blogService from '../services/blogs'
import formService from '../utilities/forms'

const LoginForm = ({ setUser }) => {
  // State for controlled form elements
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()

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
      //blogService.setToken(userData.token)
      dispatch(setUser(userData))
      formService.resetForm(setUserForm)

    } catch(err) {
      dispatch(setNotification('Wrong username or password', 'error', 5))
    }
  }

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div>
        Username:
          <input
            type="text"
            value={userForm.username}
            name="username"
            id="username"
            onChange={(event) => formService.formHandler(setUserForm, event)}
          />
        </div>
        <div>
        Password:
          <input
            type="password"
            value={userForm.password}
            name="password"
            id="password"
            onChange={(event) => formService.formHandler(setUserForm, event)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
