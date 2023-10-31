const mongoose = require("mongoose");

// Define the schema for UserSettings
const userSettingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  emailNotifications: Boolean,
  darkMode: Boolean,
});

module.exports = new mongoose.model("UserSettings", userSettingsSchema);
