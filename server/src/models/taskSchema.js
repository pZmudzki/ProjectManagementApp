const mongoose = require("mongoose");

// Define the schema for the Tasks collection
const taskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
  status: String,
  dueDate: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Task", taskSchema);
