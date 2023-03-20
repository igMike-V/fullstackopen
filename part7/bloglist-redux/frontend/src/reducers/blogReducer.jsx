import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const newBlog = action.payload
      return state.map(blog => {
        if (blog.id === newBlog.id) {
          return newBlog
        }
        return blog
      })
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogsService.getAll()
    dispatch(setBlogs)
  }
}

export default blogSlice.reducer