const mongoose = require("mongoose");

// Define the schema for the Projects collection
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectTeam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    } 
  ],
});

module.exports = new mongoose.model("Project", projectSchema);
