import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedBasemap: '',
}

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setbasemap: (state, action) => {
      state.selectedBasemap = action.payload.basemap
    },
  },
})

// Action creators are generated for each case reducer function
export const { setbasemap } = controlSlice.actions

export default controlSlice.reducer