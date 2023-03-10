/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notifcationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    },
  },
})

export const { clearNotification, addNotification } = notifcationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, +time * 1000)
  }
}

export default notifcationSlice.reducer