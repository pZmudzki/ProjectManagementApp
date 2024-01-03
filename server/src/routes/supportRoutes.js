const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");

const { sendTicket } = require("../controllers/supportController");

router.post("/sendTicket", auth, sendTicket);

module.exports = router;
