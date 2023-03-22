import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  success: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload
      state.success = true
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer