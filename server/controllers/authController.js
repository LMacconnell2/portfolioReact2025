import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const signToken = (user) => {
  //Return necessary info
  return jwt.sign(
    { userId: user.userId, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// POST /api/auth/register || Register route controller
export const register = async (req, res) => {
  try {
    const { userId, accountTypeId = 3, firstName, lastName, email, password } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" }); //All fields must be filled out.
    }

    // Check if duplicate email exists 
    const existing = await user.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    //Check if duplicate ID exists
    if (userId) {
      const existingId = await user.findOne({ userId });
      if (existingId) {
        return res.status(400).json({ error: "userId already in use" });
      }
    }

    const hashed = await bcrypt.hash(password, SALT_ROUNDS); //SALT IT 

    const user = await user.create({
      userId, accountTypeId, firstName, lastName, email, password: hashed});

    const token = signToken(user);
    const safeUser = user.toObject();
    delete safeUser.password;

    res.status(201).json({ token, user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error registering user" });
  }
};

// POST /api/auth/login || Login route controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(user);
    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error logging in" });
  }
};

// GET /api/auth/me  Grab info on the current user.
export const me = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const safeUser = user.toObject();
    delete safeUser.password;

    res.json({ user: safeUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};