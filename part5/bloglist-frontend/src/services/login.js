import axios from "axios"
const baseUrl = 'api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = async (user, setUser, setNotification) => {
  const userName = user.name
  setUser(null)
  window.localStorage.removeItem('loggedInBlogAppUser')
  setNotification({ message: `${userName} is logged out`, type: 'notice'})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logout }