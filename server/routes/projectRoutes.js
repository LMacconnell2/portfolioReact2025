import express from "express";
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { authenticate, adminOnly, editorOnly } from "../middleware/auth.js";

const router = express.Router();

// Grab all projects -> public
router.get("/", getAllProjects);

// Grab a single project -> public
router.get("/:projectId", getProjectById);

// Add a new project -> admin only
router.post("/", adminOnly, createProject);

// edit a project -> admins and editors
router.put("/:projectId", editorOnly, updateProject);

// remove a project -> admins only
router.delete("/:projectId", adminOnly, deleteProject);

export default router;