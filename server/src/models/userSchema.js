const mongoose = require("mongoose");

// Define the schema for the Users collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: { type: String },
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
