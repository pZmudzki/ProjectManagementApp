const mongoose = require("mongoose");

// Define the schema for the Tasks collection
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: String,
  status: String,
  createdDate: {
    type: Date,
    default: Date.now,
  }, 
  dueDate: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  assignedTo: {
    type: String,
    ref: "User",
  },
});

module.exports = new mongoose.model("Task", taskSchema);
