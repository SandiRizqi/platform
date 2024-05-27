import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedBasemap: '',
  basemapUrl : null,
  basemapParams: null,
  aoi: null,
  modal: {
    isOpen: false,
    title: null,
    component: null
  }
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
    setaoi: (state, action) => {
      state.aoi = action.payload.aoi;
    },
    setmodal: (state, action) => {
      state.modal = action.payload.modal;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setbasemap, setbasemapurl, setbasemapparams, setaoi, setmodal } = controlSlice.actions

export default controlSlice.reducer