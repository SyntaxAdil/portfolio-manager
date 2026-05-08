import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  live: {
    type: String,
    required: true,
  },
  tech: [
    {
      tag: String,
      id: String,
    },
  ],
});

const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);
export default Projects;
