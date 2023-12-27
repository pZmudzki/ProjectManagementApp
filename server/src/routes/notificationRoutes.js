const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  getNotifications,
  updateNotification,
} = require("../controllers/notificationController");

router.get("/getNotifications", auth, getNotifications);
router.post("/updateNotification/:id", auth, updateNotification);

module.exports = router;
