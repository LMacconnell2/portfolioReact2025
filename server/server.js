import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
const app = express();

//Middleware functions
app.use(express.json());

// I love and hate CORS
app.use(cors({
  origin: "http://localhost:3000" // The React server
}));

//Connect to our database
connectDB();
//docker run -d --name portDB -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -p 5050:27017 mongo:latest

//import routes from userRoutes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

//import routes from projectRoutes
import projectRoutes from "./routes/projectRoutes.js";
app.use("/api/projects", projectRoutes);

//import routes from authRoutes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));