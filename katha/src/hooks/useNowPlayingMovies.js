import React from "react";
import axios from "axios";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movies,options} from "../utils/constant";
import { useDispatch } from "react-redux";


const useNowPlayingMovies = async () =>{
  const dispatch = useDispatch();
    try {
      const res = await axios.get(Now_Playing_Movies,options);
      dispatch(getNowPlayingMovies(res.data.results));
    } catch (error) {
      console.log(error);
    }
  }

  export default useNowPlayingMovies;