import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/project.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedProjects = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // To avoid issues, I chose to clear the table first before adding any new data.
    await Project.deleteMany({});

    // I may modify this to eventually take data from a file.
    const projects = [
      {
        projectId: 1,
        projectTitle: "Portfolio Website",
        dateStarted: new Date("2024-01-10"),
        dateCompleted: new Date("2024-02-14"),
        projectDescription: "A personal portfolio to showcase my web development projects.",
        projectRepoLink: "https://github.com/yourusername/portfolio",
        projectVideoLink: "https://youtu.be/example1",
        projectParagraph:
          "This project demonstrates my ability to design modern responsive UIs using React and Tailwind, and deploy apps efficiently."
      },
      {
        projectId: 2,
        projectTitle: "MERN Task Manager",
        dateStarted: new Date("2024-03-01"),
        dateCompleted: new Date("2024-03-30"),
        projectDescription: "Full-stack MERN CRUD task manager with authentication.",
        projectRepoLink: "https://github.com/yourusername/task-manager",
        projectVideoLink: "https://youtu.be/example2",
        projectParagraph:
          "This project showcases Express/Mongoose backend structure, protected routes, and a responsive React frontend."
      },
      {
        projectId: 3,
        projectTitle: "JavaScript Game Engine Demo",
        dateStarted: new Date("2024-04-05"),
        dateCompleted: new Date("2024-04-25"),
        projectDescription: "A simple 2D game engine written entirely in JavaScript.",
        projectRepoLink: "https://github.com/yourusername/js-game-engine",
        projectVideoLink: "https://youtu.be/example3",
        projectParagraph:
          "This was a fun experiment to write sprite handling, input systems, and physics from scratch."
      }
    ];

    await Project.insertMany(projects);
    console.log("Projects seeded successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding projects:", err);
    process.exit(1);
  }
};

seedProjects();