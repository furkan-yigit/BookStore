import express from "express";
import {
  authUser,
  registerUser,
  addFavoriteBook,
  removeFavoriteBook,
  getUserFavorites,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/favorites", protect, addFavoriteBook);
router.delete("/favorites", protect, removeFavoriteBook);
router.get("/favorites", protect, getUserFavorites);

export default router;
