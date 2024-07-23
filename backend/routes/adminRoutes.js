import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, admin, (req, res) => {
  res.json({ message: "Admin paneline hoş geldiniz" });
});

export default router;
