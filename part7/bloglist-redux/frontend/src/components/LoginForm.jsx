import React, { useState } from 'react'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
//import blogService from '../services/blogs'
import formService from '../utilities/forms'

import {Form, Button} from 'react-bootstrap'

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
      <h3>Log in to application</h3>
      <Form onSubmit={handleLogin}>
        <div>
        <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={userForm.username}
            name="username"
            id="username"
            onChange={(event) => formService.formHandler(setUserForm, event)}
          />
        </div>
        <div>
        <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={userForm.password}
            name="password"
            id="password"
            onChange={(event) => formService.formHandler(setUserForm, event)}
          />
        </div>
        <Button variant="primary" id='login-button' type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
