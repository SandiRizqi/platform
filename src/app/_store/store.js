import { configureStore } from '@reduxjs/toolkit';
import controlSlice from './features/controlSlice';

export const store = configureStore({
  reducer: {
    control: controlSlice
  },
})