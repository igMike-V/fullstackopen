import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  const returnBlog = await axios.get(`${baseUrl}/${response.data.id}`)
  return returnBlog.data
}

const addLike = async id => {
  const updateUrl = `${baseUrl}/${id}`
  const query = await axios.get(updateUrl)
  const updatedBlog = {
    "user": query.data.user.id,
    "likes": query.data.likes + 1,
    "author": query.data.author,
    "title": query.data.title,
    "url": query.data.url
  }
  await axios.put(updateUrl, updatedBlog)
  const returnQuery = await axios.get(updateUrl)
  return returnQuery.data
}

const addComment = async (id, newComment) => {
  
  const updateUrl = `${baseUrl}/${id}`
  // Get blog from db
  const query = await axios.get(updateUrl)
  // Append new comment
  let updatedComments = []
  if (query.data.comments) {
    updatedComments = query.data.comments.concat(newComment)
  } else {
    updatedComments = [newComment] 
  }
  const updatedBlog = {
    ...query,
    comments: updatedComments
  }
  // Put appended blog to db
  axios.put(updateUrl, updatedBlog)
  // Re-query blog for return
  const returnQuery = await axios.get(updateUrl)
  return returnQuery.data
  
}

const update = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  }
  // set url with id
  const updateUrl = `${baseUrl}/${id}`

  const response = await axios.put(updateUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const removalUrl = `${baseUrl}/${id}`
  const response = await axios.delete(removalUrl, config)
  return response
}

export default { getAll, setToken, create, update, remove, addLike, addComment }