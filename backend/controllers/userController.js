import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Add a book to user's favorites
// @route   POST /api/users/favorites
// @access  Private (Protected Route)
const addFavoriteBook = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.favorites.addToSet(bookId);
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Remove a book from user's favorites
// @route   DELETE /api/users/favorites
// @access  Private (Protected Route)
const removeFavoriteBook = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.favorites.pull(bookId);
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const getUserFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");

  if (user) {
    res.status(200).json(user.favorites);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  addFavoriteBook,
  removeFavoriteBook,
  getUserFavorites,
};
