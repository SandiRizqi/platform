import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedBasemap: '',
  basemapUrl : "https://earthengine.googleapis.com/v1/projects/earthengine-legacy/maps/fe9e7cf8b914dde8e384e4783be25b6a-23137810f154b480512ac4a5fe600cc3/tiles/{z}/{x}/{y}",
  basemapParams: null
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
    },
    setbasemapparams: (state, action ) => {
      state.basemapParams = action.payload.basemapParams;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setbasemap, setbasemapurl, setbasemapparams } = controlSlice.actions

export default controlSlice.reducer