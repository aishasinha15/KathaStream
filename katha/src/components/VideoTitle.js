import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import useMovieById from "../hooks/useMovieById";
import { setInfoOpen } from "../redux/movieSlice";

const VideoTitle = ({ movieId }) => {
  const currentTitle = useSelector((store) => store.movie.currentTitle);
  const currentOverview = useSelector((store) => store.movie.currentOverview);
  const movieTrailer = useSelector((store) => store.movie.movieTrailer);
  const dispatch = useDispatch();
  useMovieById(movieId);

  const handleMoreInfoClick = () => {
    console.log("More Info button clicked");
    dispatch(setInfoOpen(true));
    console.log("setInfoOpen dispatched with true");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-start pl-8 pr-8">
      <div className="bg-transparent bg-opacity-50 p-8 rounded-md w-1/3">
        <h1 className="text-2xl font-bold text-white mb-2">{currentTitle}</h1>
        <p className="text-white text-base mb-4">{currentOverview}</p>
        <div className="flex space-x-4">
          <button
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${movieTrailer.key}`,
                "_blank"
              )
            }
            className="flex items-center px-4 py-2 text-white font-bold text-lg rounded-md bg-gradient-to-r from-[#03ecfc] to-[#0086c0] hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            Watch Now <FaPlay className="ml-2" />
          </button>
          <button
            onClick={handleMoreInfoClick}
            className="flex items-center px-4 py-2 text-white font-bold text-lg rounded-md bg-gradient-to-r from-[#03ecfc] to-[#0086c0] opacity-70 hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc]"
          >
            More Info <FaCircleInfo className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
