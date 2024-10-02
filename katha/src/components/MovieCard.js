import React from "react";
import { useDispatch } from "react-redux";
import { getId, setOpen, getTitle, getOverview } from "../redux/movieSlice";

const MovieCard = ({ movieId, posterPath, currentTitle, currentOverview }) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
    dispatch(getTitle(currentTitle));
    dispatch(getOverview(currentOverview));
  };

  if (!posterPath) return null;
  return (
    <div
      className="movie-card bg-gray-800 p-4 rounded-md flex cursor-pointer"
      onClick={handleOpen}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={currentTitle || "Movie Poster"}
        className="w-full h-full object-cover rounded-md"
        style={{ maxWidth: "200px", maxHeight: "300px" }}
      />
    </div>
  );
};

export default MovieCard;
