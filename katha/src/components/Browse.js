import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import Search from "./Search";
import MyList from "./MyList";

const Browse = () => {
  const user = useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = useSelector((store) => store.movie.toggle);
  const toggle2 = useSelector((store) => store.myList.toggle2);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="no-scrollbar">
      <Header />
      <div>
        {toggle ? (
          <Search />
        ) : toggle2 ? (
          <MyList />
        ) : (
          <>
            <MainContainer />
            <MovieContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
