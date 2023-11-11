const express = require("express");
const router = express.Router();
const cors = require("cors");
const {} = require("../controllers/dashboardController");

// middlewares
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/");

module.exports = router;
