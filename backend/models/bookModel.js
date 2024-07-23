import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    genre: {
      type: String,
    },
    ratings: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    publisher: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
