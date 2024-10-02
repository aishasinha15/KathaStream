import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    movieList: [
      {
        id: Number,
        title: String,
        posterPath: String,
        overview: String,
      },
    ],
    searchHistory: [String],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
