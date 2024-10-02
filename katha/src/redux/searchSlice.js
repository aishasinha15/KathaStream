import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchMovie",
  initialState: {
    searchedMovie: [],
    movieName: "",
  },
  reducers: {
    setSearchMovieDetails: (state, action) => {
      state.searchedMovie = action.payload.movies;
      state.movieName = action.payload.searchMovie;
    },
    clearSearchState: (state) => {
      state.searchedMovie = [];
      state.movieName = "";
    },
  },
});

export const { setSearchMovieDetails, clearSearchState } = searchSlice.actions;

export default searchSlice.reducer;
