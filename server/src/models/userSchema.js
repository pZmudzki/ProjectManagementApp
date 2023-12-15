const mongoose = require("mongoose");

// Define the schema for the Users collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

module.exports = new mongoose.model("User", userSchema);
