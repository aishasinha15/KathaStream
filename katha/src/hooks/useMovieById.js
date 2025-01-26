import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMovieTrailer, getOverview, getTitle } from "../redux/movieSlice";
import { options } from "../utils/constant";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        const res2 = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          options
        );
        console.log(res.data.results);
        console.log(res2.data.results);
        const trailer = res?.data?.results?.filter((item) => {
          return item.type === "Trailer";
        });
        const title = res2?.data?.original_title;
        const overview = res2?.data?.overview;
        dispatch(
          getMovieTrailer(trailer.length > 0 ? trailer[0] : res.data.results[0])
        );
        dispatch(getTitle(title));
        dispatch(getOverview(overview));
      } catch (error) {
        console.log(error);
      }
    };
    getMovieById();
  }, [movieId]);
};

export default useMovieById;
