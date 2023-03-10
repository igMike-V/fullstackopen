import { createSlice } from '@reduxjs/toolkit'
import ancedoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(obj => {
        if (obj.id === newAnecdote.id) {
          return newAnecdote
        }
        return obj
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await ancedoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await ancedoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = id => {
  return async dispatch => {
    const targetAnecdote = await ancedoteService.addVote(id)
    dispatch(updateAnecdote(targetAnecdote))
  }
}

export default anecdoteSlice.reducer