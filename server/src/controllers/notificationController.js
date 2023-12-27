const Notification = require("../models/notificationSchema");

// Get notifications API Endpoint
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receivers: req.user._id,
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.log(error.message);
  }
};

// Update notification API Endpoint

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(id, {
      read: true,
    });
    const allNotifications = await Notification.find({
      receivers: req.user._id,
    });
    res.status(200).json(allNotifications);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getNotifications,
  updateNotification,
};
