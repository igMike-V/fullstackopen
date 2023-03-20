import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer.jsx'

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

export default store