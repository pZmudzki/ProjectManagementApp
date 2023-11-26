const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  logoutUser,
  isLoggedIn,
} = require("../controllers/authController");

// middlewares
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/loggedIn", isLoggedIn);

module.exports = router;
