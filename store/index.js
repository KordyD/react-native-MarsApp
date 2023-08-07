import { configureStore } from '@reduxjs/toolkit';
import photosReducer from './photosSlice';
export default configureStore({
  reducer: {
    photos: photosReducer,
  },
});
