import express from "express";
import { getDashboard, getAllUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticate, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Dashboard requires login.
router.get("/dashboard", authenticate, getDashboard);

// Retrive all users endpoint
router.get("/allUsers", authenticate, adminOnly, getAllUsers);

//Endpoint for creating a new user
router.post("/newUser", authenticate, adminOnly, createUser);

//Endpoint for updating an existing user based upon their userId
router.put("updateUser/:userId", authenticate, adminOnly, updateUser);

//Endpoint for removing a user based upon their userId
router.delete("deleteUser/:userId", authenticate, adminOnly, deleteUser);

export default router;