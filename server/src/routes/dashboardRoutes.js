const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  createProject,
  getProjectInfo,
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
  getAllTasks,
  createComment,
  getComments,
} = require("../controllers/taskController");

router.post("/createProject", auth, createProject);
router.get("/:id/getProjectInfo", auth, getProjectInfo);
router.get("/getProjects", auth, getProjects);
router.post("/updateProject/:id", auth, updateProject);
router.delete("/deleteProject/:id", auth, deleteProject);

router.post("/createTask", auth, createTask);
router.get("/:id/getTasks", auth, getTasks);
router.get("/getAllTasks", auth, getAllTasks);
router.put("/:id/updateTask/:taskId", auth, updateTask);
router.delete("/:id/deleteTask/:taskId", auth, deleteTask);
router.post("/createComment/:taskId", auth, createComment);
router.get("/getComments/:taskId", auth, getComments);

router.get("/getUserInfo/:id", auth, getUserInfo);

module.exports = router;
