import { createSlice } from '@reduxjs/toolkit'
import ancedoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const id = action.payload
      state.forEach(anecdote => {
        if(anecdote.id === id) {
          anecdote.votes++
        }
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

export const { updateVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await ancedoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await(ancedoteService.createNew(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer