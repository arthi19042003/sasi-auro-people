// backend/src/routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// User Registration
router.post("/register", register);

// User Login
router.post("/login", login);

export default router;
