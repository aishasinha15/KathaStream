import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInfoOpen } from "../redux/movieSlice";
import axios from "axios";

const InfoDialog = ({ movieId }) => {
  const dispatch = useDispatch();
  const infoOpen = useSelector((store) => store.movie.infoOpen);
  const [movieDetails, setMovieDetails] = React.useState(null);

  useEffect(() => {
    console.log(
      "InfoDialog rendered. InfoOpen:",
      infoOpen,
      "MovieId:",
      movieId
    );
    if (infoOpen && movieId) {
      console.log("Fetching movie details...");
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=5dbfddbbca4413efcf455abad26480cd`
        )
        .then((res) => {
          console.log("Movie details fetched:", res.data);
          setMovieDetails(res.data);
        })
        .catch((err) => console.log("Error fetching movie details:", err));
    }
  }, [infoOpen, movieId]);

  if (!infoOpen || !movieDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-[#03ecfc] to-[#0086c0] rounded-lg p-8 w-2/3 max-w-4xl text-black">
        <h2 className="text-3xl font-bold mb-4">{movieDetails.title}</h2>
        <p className="mb-4">{movieDetails.overview}</p>
        <ul className="mb-4">
          <li>
            <strong>Release Date:</strong> {movieDetails.release_date}
          </li>
          <li>
            <strong>Genres:</strong>{" "}
            {movieDetails.genres.map((g) => g.name).join(", ")}
          </li>
          <li>
            <strong>Runtime:</strong> {movieDetails.runtime} minutes
          </li>
        </ul>
        <button
          onClick={() => {
            dispatch(setInfoOpen(false));
          }}
          className="mt-4 p-2 text-black font-bold rounded hover:bg-opacity-80 transition text-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoDialog;
