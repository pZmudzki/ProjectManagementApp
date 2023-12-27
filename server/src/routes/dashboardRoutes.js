const express = require("express");
const router = express.Router();

const auth = require("../middleware/authorization");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksAdmin,
} = require("../controllers/taskController");

const {
  getNotifications,
  updateNotification,
} = require("../controllers/notificationController");

router.post("/createProject", auth, createProject);
router.get("/getProjects", auth, getProjects);
router.post("/updateProject/:id", auth, updateProject);
router.delete("/deleteProject/:id", auth, deleteProject);

router.post("/createTask", auth, createTask);
router.get("/getTasks", auth, getTasks);
router.get("/getTasksAdmin", auth, getTasksAdmin);
router.post("/updateTask/:id", auth, updateTask);
router.delete("/deleteTask/:id", auth, deleteTask);

router.get("/getNotifications", auth, getNotifications);
router.post("/updateNotification/:id", auth, updateNotification);

module.exports = router;
