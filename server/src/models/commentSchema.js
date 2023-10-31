const mongoose = require("mongoose");

// Define the schema for Comments
const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  timestamp: Date,
});

module.exports = new mongoose.model("Comment", commentSchema);
