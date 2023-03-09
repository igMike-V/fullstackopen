import { createSlice } from '@reduxjs/toolkit'

const initialState = 'render here notification...'

const notifcationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    },
  },
})

export const { setNotification, removeNotification } = notifcationSlice.actions
export default notifcationSlice.reducer