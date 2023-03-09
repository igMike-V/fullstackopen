import { createSlice } from '@reduxjs/toolkit'

const initialFilterState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer