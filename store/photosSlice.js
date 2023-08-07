import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const api_key = '0rahcpm3Dhq7uynyCcvyIgjULkyQWV7m7DTipNsy';
const URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async function ({ camera, date }) {
    const response = await fetch(
      URL +
        `sol=${1000}&page=${10}&api_key=${api_key}&camera=${camera}&earth_date=${date
          .toISOString()
          .substring(0, 10)}`
    );
    // const response = await fetch(
    //   'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=10&api_key=0rahcpm3Dhq7uynyCcvyIgjULkyQWV7m7DTipNsy&camera=MAST&earth_date=2015-06-03'
    // );
    const data = await response.json();
    return data;
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState: {
    photos: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.photos = action.payload.photos;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'rejected';
      });
  },
});

export default photosSlice.reducer;
