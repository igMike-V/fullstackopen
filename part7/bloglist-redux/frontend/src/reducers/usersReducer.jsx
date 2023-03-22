import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = null

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, {payload}){
      return payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const data = await usersService.getAll()
    dispatch(setUsers(data))
  }
}

export default usersSlice.reducer