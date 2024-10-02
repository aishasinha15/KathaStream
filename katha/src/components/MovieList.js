import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import { addToMyList, removeFromMyList } from "../redux/myListSlice";
import MovieCard from "./MovieCard";
import {
  MdOutlinePlaylistAddCheck,
  MdOutlinePlaylistAdd,
} from "react-icons/md";

const MovieList = ({
  title,
  movies,
  searchMovie = false,
  listMovie = false,
}) => {
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.myList.movies);
  const user = useSelector((state) => state.user.user);

  const isInMyList = (movieId) => myList.some((movie) => movie.id === movieId);

  const handleAddToList = async (movie) => {
    const { id, title, poster_path, overview } = movie;
    const movieData = {
      id,
      title,
      posterPath: poster_path,
      overview,
    };
    try {
      const response = await axios.post(
        `${API_END_POINT}/${user._id}/add-to-mylist`,
        {
          userId: user._id,
          ...movieData,
        }
      );
      console.log("Add to My List Response:", response.data);
      if (response.data.success) {
        dispatch(addToMyList(movieData));
      }
    } catch (error) {
      console.error("Error adding movie to list:", error);
    }
  };

  const handleRemoveFromList = async (movieId) => {
    try {
      const response = await axios.post(
        `${API_END_POINT}/${user._id}/remove-from-mylist`,
        {
          userId: user._id,
          movieId,
        }
      );
      console.log("Remove from My List Response:", response.data);
      if (response.data.success) {
        dispatch(removeFromMyList({ id: movieId }));
      }
    } catch (error) {
      console.error("Error removing movie from list:", error);
    }
  };

  return (
    <div className="px-4 md:px-8 mb-8">
      <h1 className={"text-2xl md:text-3xl py-3 font-semibold text-white"}>
        {title}
      </h1>
      <div className="relative">
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 py-4">
          {movies?.map(
            (movie) => (
              console.log(movie),
              (
                <div key={movie.id} className="flex-none w-32 md:w-40 lg:w-48">
                  <MovieCard
                    movieId={movie.id}
                    posterPath={
                      movie.poster_path || movie.posterPath || movie.poster
                    }
                    currentTitle={movie.title}
                    currentOverview={movie.overview}
                  />
                  <div className="flex justify-between mt-2">
                    {!isInMyList(movie.id) && !listMovie ? (
                      <button
                        onClick={() => handleAddToList(movie)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm flex items-center"
                      >
                        <MdOutlinePlaylistAdd className="mr-1" /> Add
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveFromList(movie.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm flex items-center"
                      >
                        <MdOutlinePlaylistAddCheck className="mr-1" /> Remove
                      </button>
                    )}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
