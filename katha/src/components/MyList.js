import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMyListMovies, removeFromMyList } from "../redux/myListSlice";
import Header from "./Header";
import MovieList from "./MovieList";
import { API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const MyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myList = useSelector((state) => state.myList.movies);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchMyList = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/${user._id}/mylist`);
        dispatch(setMyListMovies(response.data.movies));
      } catch (error) {
        console.error("Error fetching my list:", error);
      }
    };

    fetchMyList();
  }, [user, dispatch, navigate]);

  if (!user) {
    return null; // or you could return a loading spinner here
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-20">
        {myList && myList.length > 0 ? (
          <MovieList
            title={`${user.fullName}'s List`}
            movies={myList}
            listMovie={true}
          />
        ) : (
          <h2 className="text-center text-xl mt-16">
            No movies in your list yet!
          </h2>
        )}
      </div>
    </div>
  );
};

export default MyList;
