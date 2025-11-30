import Project from "../models/project.js";

// Grab all of our projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching projects" });
  }
};

// Grab a project by its ID (I know mongo gives a unique id to each item, but I find it easier to use my own.)
export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ projectId: Number(projectId) });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new project to the DB
export const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    // Make sure the Id is unique
    const existing = await Project.findOne({ projectId: projectData.projectId });
    if (existing) {
      return res.status(400).json({ error: "ProjectId already exists" });
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Error creating project" });
  }
};

// Edit the contents of a project
export const updateProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);

    const project = await Project.findOneAndUpdate(
      { projectId: projectId },     // find by custom ID
      req.body,                     // new values
      { new: true }                 // return updated document
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Error updating project" });
  }
};

// Remove a project from the DB
export const deleteProject = async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);

    const result = await Project.findOneAndDelete({ projectId });

    if (!result) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting project" });
  }
};