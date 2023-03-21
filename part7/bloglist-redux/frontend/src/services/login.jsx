import axios from 'axios'
import { setNotification } from '../reducers/notificationReducer'

const baseUrl = 'api/login'


const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = async (user, setUser, dispatch) => {
  const userName = user.name
  dispatch(setUser(null))
  window.localStorage.removeItem('loggedInBlogAppUser')
  dispatch(setNotification(`${userName} is logged out`, 'notice', 5))
}

export default { login, logout }