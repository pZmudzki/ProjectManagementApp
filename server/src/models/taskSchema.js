const mongoose = require("mongoose");

// Define the schema for the Tasks collection
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  fromDate: Date,
  toDate: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  assignedTo: {
    type: String,
    ref: "User",
    required: true,
  },
});

module.exports = new mongoose.model("Task", taskSchema);
