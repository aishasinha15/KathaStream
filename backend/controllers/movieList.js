// controllers/movieList.js
import { MovieList } from "../models/movieModel.js";

// Fetch movie list for the user
export const getMovieList = async (req, res) => {
  try {
    const { userId } = req.params;
    const movieList = await MovieList.findOne({ userId });

    if (!movieList) {
      return res
        .status(404)
        .json({ message: "Movie list not found", success: false });
    }

    return res.status(200).json(movieList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Save movie list for the user
export const saveMovieList = async (req, res) => {
  try {
    const { userId, movies } = req.body;
    const movieList = await MovieList.findOneAndUpdate(
      { userId },
      { movies },
      { new: true, upsert: true }
    );

    return res.status(200).json(movieList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
