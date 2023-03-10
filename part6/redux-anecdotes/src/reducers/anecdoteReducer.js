import { createSlice } from '@reduxjs/toolkit'
import ancedoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateVote(state, action) {
      const id = action.payload
      state.forEach(anecdote => {
        if(anecdote.id === id) {
          anecdote.votes++
        }
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, updateVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await ancedoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export default anecdoteSlice.reducer