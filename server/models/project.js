import mongoose from "mongoose";

//Table for our project data.
const projectSchema = new mongoose.Schema({
    projectId: { type: Number, required: true, unique: true },
    projectTitle: { type: String, required: true },
    dateStarted: { type: Date, required: true },
    dateCompleted: { type: Date, required: true },
    projectDescription: {type: String, required: true},
    projectRepoLink: { type: String, required: true },
    projectVideoLink: { type: String, required: true },
    projectParagraph: { type: String, required: true }
});

export default mongoose.model("Project", projectSchema);