import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails, clearSearchState } from "../redux/searchSlice";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";
import Header from "./Header";
import { Search_url, options } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { API_END_POINT } from "../utils/constant";

const Search = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((store) => store.app.isLoading);
  const [isSearched, setIsSearched] = useState(false);
  const user = useSelector((store) => store.user.user);
  const { searchedMovie, movieName } = useSelector(
    (store) => store.searchMovie
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(clearSearchState());
      fetchSearchHistory();
      setIsSearched(false);
    }
  }, [user, navigate, dispatch]);

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT}/${user._id}/search-history`,
        {
          userId: user._id,
          searchMovie,
        }
      );
      console.log("Search history response:", response.data);
      setSearchHistory(response.data.searchHistory);
    } catch (error) {
      console.error("Error fetching search history:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchMovie.trim() === "") return;
    setIsSearched(true);
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${Search_url}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options
      );
      const movies = res?.data?.results;
      dispatch(setSearchMovieDetails({ searchMovie, movies }));

      console.log("Attempting to update search history...");
      const searchResponse = await axios.post(
        `${API_END_POINT}/${user._id}/add-to-search-history`,
        {
          userId: user._id,
          searchMovie,
        }
      );
      console.log("Search history update response:", searchResponse.data);

      await fetchSearchHistory();
    } catch (error) {
      console.error("Error in handleSearch:", error);
    } finally {
      dispatch(setLoading(false));
    }
    setSearchMovie("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-20">
        <div className="w-full max-w-2xl mx-auto relative mb-8 mt-24">
          <form onSubmit={handleSearch} className="relative">
            <input
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full p-4 pr-28 outline-none rounded-full text-lg bg-gray-800 text-white"
              type="text"
              placeholder="Enter Movie Name..."
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-white font-bold hover:from-[#03ecfc] hover:to-[#0086c0] hover:border hover:border-[#03ecfc] rounded-full"
              type="submit"
            >
              {isLoading ? "Loading..." : "Search"}
            </button>
          </form>
        </div>

        {searchedMovie && searchedMovie.length > 0 ? (
          <div className="mt-8">
            <MovieList
              title={`Search Results for "${movieName}"`}
              movies={searchedMovie}
              searchMovie={true}
              listMovie={false}
            />
          </div>
        ) : (
          isSearched && ( // Show this only if something has been searched
            <h2 className="text-center mt-8 text-xl">No Movies Found!</h2>
          )
        )}

        {searchHistory.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl mb-4">Recent Searches</h2>
            <ul className="list-disc ml-8">
              {searchHistory.map((history, index) => (
                <li key={index} className="text-white text-lg">
                  {history}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
