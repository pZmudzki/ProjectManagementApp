const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  getNotifications,
  updateNotifications,
} = require("../controllers/notificationController");

router.get("/getNotifications", auth, getNotifications);
router.post("/updateNotifications", auth, updateNotifications);

module.exports = router;
