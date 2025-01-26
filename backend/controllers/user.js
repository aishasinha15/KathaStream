import { User } from "../models/userModel.js";
import { MovieList } from "../models/movieModel.js"; // Importing the MovieList model
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Couldn't find an account linked to this email",
        success: false,
      });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const tokenData = {
      id: user._id,
    };
    const token = await jwt.sign(tokenData, "imdaimdoiemasdoa", {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        message: `Welcome back ${user.fullName}`,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred during login",
      success: false,
    });
  }
};

// ... other functions (Register, Logout) remain the same
export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({
      message: "Logged out successfully",
      success: true,
    });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email already in use",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add a movie to user's list
export const addToMyList = async (req, res) => {
  const { userId } = req.params;
  const { id, title, posterPath, overview } = req.body;

  if (!id || !title) {
    return res
      .status(400)
      .json({ success: false, message: "Movie ID and title are required." });
  }

  try {
    let movieList = await MovieList.findOne({ userId });
    if (!movieList) {
      movieList = new MovieList({ userId, movies: [] });
    }

    const movieExists = movieList.movies.some((movie) => movie.id === id);
    if (movieExists) {
      return res
        .status(400)
        .json({ success: false, message: "Movie already in the list." });
    }

    movieList.movies.push({ id, title, poster: posterPath, overview });
    await movieList.save();

    return res
      .status(200)
      .json({ success: true, message: "Movie added to my list." });
  } catch (error) {
    console.error("Error adding to my list:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const removeFromMyList = async (req, res) => {
  const { userId } = req.params;
  const { movieId } = req.body;

  try {
    const movieList = await MovieList.findOne({ userId });
    if (!movieList) {
      return res
        .status(404)
        .json({ success: false, message: "Movie list not found" });
    }

    movieList.movies = movieList.movies.filter((movie) => movie.id !== movieId);
    await movieList.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Movie removed from list",
        updatedList: movieList.movies,
      });
  } catch (error) {
    console.error("Error removing from My List:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMyList = async (req, res) => {
  const { userId } = req.params;

  try {
    const movieList = await MovieList.findOne({ userId });
    if (!movieList) {
      return res.status(200).json({ movies: [] });
    }

    res.status(200).json({ movies: movieList.movies });
  } catch (error) {
    console.error("Error fetching My List:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Add to search history
export const addToSearchHistory = async (req, res) => {
  try {
    const { userId, searchMovie } = req.body; // Changed searchTerm to searchMovie
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the search term to the beginning of the array and limit to 10 items
    user.searchHistory.unshift(searchMovie);
    user.searchHistory = user.searchHistory.slice(0, 10);

    await user.save();

    res.status(200).json({
      message: "Search history updated successfully",
      searchHistory: user.searchHistory,
    });
  } catch (error) {
    console.error("Error updating search history:", error);
    res.status(500).json({ message: "Error updating search history" });
  }
};

export const getSearchHistory = async (req, res) => {
  const userId = req.params.userId; // Extract user ID from request parameters
  try {
    const user = await User.findById(userId); // Find user in database
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Assuming searchHistory is an array of search objects
    res.status(200).json({ success: true, searchHistory: user.searchHistory });
  } catch (error) {
    console.error("Error fetching search history:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
