import { createSlice } from "@reduxjs/toolkit";

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    toggle2: false,
    movies: [],
  },
  reducers: {
    addToMyList: (state, action) => {
      const { id, title, posterPath, overview } = action.payload;
      if (!state.movies.some((movie) => movie.id === id)) {
        state.movies.push({
          id,
          title,
          posterPath,
          overview,
        });
      }
    },
    removeFromMyList: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setToggle2: (state) => {
      state.toggle2 = !state.toggle2;
    },
    setMyListMovies: (state, action) => {
      state.movies = action.payload; // Set movies from an external source
    },
    clearMyList: (state) => {
      state.movies = []; // New action to clear the movie list
    },
  },
});

export const {
  addToMyList,
  removeFromMyList,
  setToggle2,
  setMyListMovies,
  clearMyList,
} = myListSlice.actions;
export default myListSlice.reducer;
