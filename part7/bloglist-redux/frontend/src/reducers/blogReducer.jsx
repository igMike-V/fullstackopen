import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const newBlog = action.payload
      console.log(newBlog)
      return state.map(blog => {
        if (blog.id === newBlog.id) {
          return newBlog
        }
        return blog
      })
    },
    deleteBlog(state, action) {
      const newState = [...state].filter(blog => blog.id !== action.payload.id)
      return newState
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogsService.getAll()
    dispatch(setBlogs(data))
  }
}

export const updateLikes = id => {
  return async dispatch => {
    const newBlog = await (blogsService.addLike(id))
    dispatch(updateBlog(newBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    const blogToDelete = await blogsService.remove(id)
    dispatch(deleteBlog({ id: id }))
  }
}

export const addBlog = (newBlogObject) => {
  return async dispatch => {
    const newBlog = await blogsService.create(newBlogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const addComment = (id, newComment) => {
  return async dispatch => {
    const newBlog = await blogsService.addComment(id, newComment)
    dispatch(updateBlog(newBlog))
  }
}

export default blogSlice.reducer