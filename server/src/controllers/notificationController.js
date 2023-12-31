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

// Update notifications API Endpoint
const updateNotifications = async (req, res) => {
  try {
    const { ids, read } = req.body;

    if (ids.length === 0) {
      return res.json({ error: "No notifications selected" });
    }

    const notifications = await Notification.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        read: read,
      }
    );
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
  updateNotifications,
};
