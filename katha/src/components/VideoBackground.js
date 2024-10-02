import React from "react";
import useMovieById from "../hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const movieTrailer = useSelector((store) => store.movie.movieTrailer);
  useMovieById(movieId); // Fetch movie details

  if (!movieTrailer) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {movieTrailer.key ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&mute=1&loop=1&playlist=${movieTrailer.key}`}
          title="YouTube video player"
          frameBorder="0"
          className="absolute top-0 left-0 w-full h-full object-cover"
          allow="autoplay"
        ></iframe>
      ) : (
        <div className="w-full h-screen bg-black flex items-center justify-center text-white">
          No trailer available
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
