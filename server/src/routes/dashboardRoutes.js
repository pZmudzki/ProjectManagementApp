const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// middlewares
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/createProject", createProject);
router.get("/getProjects", getProjects);
router.post("/updateProject/:id", updateProject);
router.post("/deleteProject/:id", deleteProject);

module.exports = router;
