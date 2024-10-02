import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    toggle: false,
    movieTrailer: null,
    open: false,
    id: "",
    currentTitle: "",
    currentOverview: "",
    infoOpen: false,
  },
  reducers: {
    getNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    getUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    getMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    getId: (state, action) => {
      state.id = action.payload;
    },
    getTitle: (state, action) => {
      state.currentTitle = action.payload;
    },
    getOverview: (state, action) => {
      state.currentOverview = action.payload;
    },
    setInfoOpen: (state, action) => {
      state.infoOpen = action.payload;
    },
  },
});

export const {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  setToggle,
  getMovieTrailer,
  setOpen,
  getId,
  getTitle,
  getOverview,
  setInfoOpen,
} = movieSlice.actions;

export default movieSlice.reducer;
