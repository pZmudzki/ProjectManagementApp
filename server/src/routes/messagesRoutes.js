const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const {
  getMessages,
  createMessage,
} = require("../controllers/messageController");

// :id is the receiver's id
router.get("/:id", auth, getMessages);
router.post("/:id", auth, createMessage);

module.exports = router;
