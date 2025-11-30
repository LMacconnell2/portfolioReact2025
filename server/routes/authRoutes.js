import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Endpoint for grabbing data on the current user.
router.get("/me", authenticate, me);

export default router;