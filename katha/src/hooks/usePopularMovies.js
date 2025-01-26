import React from "react";
import axios from "axios";
import { getPopularMovies } from "../redux/movieSlice";
import { Popular_Movies,options} from "../utils/constant";
import { useDispatch } from "react-redux";


const usePopularMovies = async () =>{
    const dispatch = useDispatch();
    try {
      const res = await axios.get(Popular_Movies,options);
      dispatch(getPopularMovies(res.data.results));
    } catch (error) {
      console.log(error);
    }
  }

  export default usePopularMovies;