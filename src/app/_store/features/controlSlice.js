import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedBasemap: '',
  basemapUrl : null
}

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setbasemap: (state, action) => {
      state.selectedBasemap = action.payload.basemap;
    },
    setbasemapurl: (state, action ) => {
      state.basemapUrl = action.payload.basemapUrl;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setbasemap, setbasemapurl } = controlSlice.actions

export default controlSlice.reducer