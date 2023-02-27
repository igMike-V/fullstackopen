import axios from "axios"
const baseUrl = 'api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logout = async (setUser) => {
  setUser(null)
  window.localStorage.removeItem('loggedInBlogAppUser')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logout }