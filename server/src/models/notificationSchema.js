const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receivers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = new mongoose.model("Notification", notificationSchema);
