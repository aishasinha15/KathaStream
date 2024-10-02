import React, { useEffect } from "react";
import Header from "./Header";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector, useDispatch } from "react-redux";
import {
  getOverview,
  getTitle,
  getId,
  getMovieTrailer,
} from "../redux/movieSlice";
import axios from "axios";
import { options } from "../utils/constant";
import InfoDialog from "./InfoDialog";

const MainContainer = () => {
  const { nowPlayingMovies, id, currentTitle, currentOverview } = useSelector(
    (store) => store.movie
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (nowPlayingMovies && nowPlayingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * nowPlayingMovies.length);
      const randomMovie = nowPlayingMovies[randomIndex];

      // Set the movie's title, overview, and ID
      dispatch(getTitle(randomMovie.title));
      dispatch(getOverview(randomMovie.overview));
      dispatch(getId(randomMovie.id));

      // Fetch and set the movie trailer
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos`,
          options
        )
        .then((res) => {
          const trailer = res.data.results.find(
            (item) => item.type === "Trailer"
          );
          dispatch(getMovieTrailer(trailer || res.data.results[0]));
        })
        .catch((err) => console.log(err));
    }
  }, [nowPlayingMovies, dispatch]);

  if (!nowPlayingMovies) return null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />
      <VideoBackground movieId={id} />
      <VideoTitle movieId={id} />
      <InfoDialog movieId={id} />
    </div>
  );
};

export default MainContainer;
