const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteAccount,
  isLoggedIn,
  getResetToken,
  changePassword,
} = require("../controllers/userController");
const Multer = require("multer");

// Multer config
const storage = new Multer.memoryStorage();
const upload = Multer({ storage: storage });

router.post("/register", upload.single("profile_picture"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/update", upload.single("profile_picture"), updateUser);
router.post("/deleteAccount", deleteAccount);
router.post("/getResetToken", getResetToken);
router.post("/changePassword", changePassword);
router.get("/loggedIn", isLoggedIn);

module.exports = router;
