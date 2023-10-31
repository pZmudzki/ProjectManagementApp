const mongoose = require("mongoose");

// Define the schema for the Projects collection
const projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  status: String,
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Project", projectSchema);
