const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getUserInfo,
} = require("../controllers/projectController");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/createProject", auth, createProject);
router.get("/getProjects", auth, getProjects);
router.post("/updateProject/:id", auth, updateProject);
router.delete("/deleteProject/:id", auth, deleteProject);

router.post("/createTask", auth, createTask);
router.get("/:id/getTasks", auth, getTasks);
router.put("/updateTask/:taskId", auth, updateTask);
router.delete("/:id/deleteTask/:taskId", auth, deleteTask);

router.get("/getUserInfo/:id", auth, getUserInfo);

module.exports = router;
