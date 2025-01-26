import mongoose from "mongoose";

const movieListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true, // Ensure each user has only one movie list
    },
    movies: [
      {
        id: { type: Number, required: true },
        title: String,
        poster: String,
        overview: String,
      },
    ],
    searchHistory: [
      {
        query: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const MovieList = mongoose.model("MovieList", movieListSchema);
