import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const { addNotification, clearNotification } = notificationSlice.actions

/**
 * Set notification message reducer.
 *
 * @param   message  string message to display.
 * @param   type  string type of message error or info.
 * @returns Promise
 */
export const setNotification = (message, type, time) => {
  
  const notice = { message, type }
  return async dispatch => {
      await dispatch(addNotification(notice))
      setTimeout(() => {
        dispatch(clearNotification())
      }, +time * 1000)
    }
}

export default notificationSlice.reducer