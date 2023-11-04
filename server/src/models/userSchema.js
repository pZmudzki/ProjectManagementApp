const mongoose = require("mongoose");

// Define the schema for the Users collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

module.exports = new mongoose.model("User", userSchema);
