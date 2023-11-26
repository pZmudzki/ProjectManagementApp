const express = require("express");
const router = express.Router();
const cors = require("cors");

const auth = require("../middleware/authorization");

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

router.post("/createProject", auth, createProject);
router.get("/getProjects", auth, getProjects);
router.post("/updateProject/:id", auth, updateProject);
router.delete("/deleteProject/:id", auth, deleteProject);

module.exports = router;
