const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  isLoggedIn,
} = require("../controllers/userController");
const Multer = require("multer");

// Multer config
const storage = new Multer.memoryStorage();
const upload = Multer({ storage: storage });

// middlewares
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/register", upload.single("profile_picture"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/update", upload.single("profile_picture"), updateUser);
router.get("/loggedIn", isLoggedIn);

module.exports = router;
