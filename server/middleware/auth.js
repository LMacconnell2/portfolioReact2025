import jwt from "jsonwebtoken";
import user from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

//This middleware checks to see if a user is logged in. Using json web token to save a user session.
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await user.findOne({ userId: decoded.userId });

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Remove sensitive fields before attaching
    const safeUser = user.toObject();
    delete safeUser.password;

    req.user = safeUser;
    next();
  } catch (err) {
    console.error("authenticate error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

//This middleware checks to see if the user is an admin AND is logged in.
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (req.user.accountTypeId !== 1) {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};

// This middleware checks to see if the user is an editor or an admin AND is logged in.
export const editorOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  if (req.user.accountTypeId !== 1 && req.user.accountTypeId !== 2) {
    return res.status(403).json({ error: "Editor or Admin access required" });
  }

  next();
};