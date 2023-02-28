import React, { useState } from 'react'
import loginService from '../services/login'
//import blogService from '../services/blogs'
import formService from '../utilities/forms'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setNotification }) => {
  // State for controlled form elements
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
  })

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
      setUser(userData)
      formService.resetForm(setUserForm)

    } catch(err) {
      setNotification({ message: 'Wrong username or password', type: 'error' })
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
            onChange={(event) => formService.formHandler(setUserForm, event)}
          />
        </div>
        <div>
        Password:
          <input
            type="password"
            value={userForm.password}
            name="password"
            onChange={(event) => formService.formHandler(setUserForm, event)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}
export default LoginForm
