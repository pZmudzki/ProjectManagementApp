const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const Project = require("../models/projectSchema");
const Notification = require("../models/notificationSchema.js");

// Get tasks API endpoint
const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    var tasks = [];
    
    if (project.projectManager._id.toString() === req.user._id.toString()) {
      tasks = await Task.find({ project: id });
    } else {
      tasks = await Task.find({ project: id, assignedTo: req.user.email });
    }
    res.json({ tasks });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error getting tasks" });
  }
};
// Create new tasks API endpoint

const createTask = async (req, res) => {
  try {
    const {
      taskName,
      description,
      status,
      priority,
      fromDate,
      toDate,
      project,
      assignedTo,
    } = req.body;

    if (!taskName) {
      return res.json({ error: "Task name has not been entered" });
    }
    const foundProject = await Project.findOne({ _id: project });
    if (!foundProject) {
      return res.json({ error: "Project does not exist" });
    }

    const foundUser = await User.exists({ email: assignedTo });
    if (!foundUser) {
      return res.json({ error: "User does not exist" });
    }

    if (
      foundUser._id.toString() !== req.user._id.toString() &&
      foundProject.projectManager._id.toString() !== req.user._id.toString()
    ) {
      return res.json({
        error:
          "Only project manager can create tasks for other project members.",
      });
    }

    const task = await Task.create({
      taskName: taskName,
      description: description,
      status: status,
      priority: priority,
      fromDate: fromDate,
      toDate: toDate,
      project: project,
      assignedTo: assignedTo,
    });

    const notification = await Notification.create({
      notificationType: "Task",
      sender: req.user._id,
      receivers: [foundUser._id],
      message: `You have been assigned a new task: ${taskName}`,
    });

    res.json({ message: "Task created successfully", task });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error creating task" });
  }
};

// Update tasks API endpoint

const updateTask = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const { status } = req.body;

    const project = await Project.findById(id);
    const foundTask = await Task.findById(taskId);

    if (
      project.projectManager._id.toString() !== req.user._id.toString() &&
      foundTask.assignedTo !== req.user.email
    ) {
      return res.json({
        error:
          "Only project manager or user that is assigned to can update a task.",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        status: status,
      },
      { new: true }
    );

    const userThatTaskIsAssignedTo = await User.findOne({
      email: updatedTask.assignedTo,
    });

    const notification = await Notification.create({
      notificationType: "Task",
      sender: req.user._id,
      receivers: [userThatTaskIsAssignedTo._id],
      message: `Task "${updatedTask.taskName}" status updated to: ${updatedTask.status}`,
    });

    return res.json({
      message: "Task updated successfully",
      updatedTask: updatedTask,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error updating task" });
  }
};

// Delete tasks API endpoint
const deleteTask = async (req, res) => {
  const { id, taskId } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    const tasks = await Task.find({ project: id });
    if (!deletedTask) {
      return res.json({ error: "Task does not exist", id: deletedTask._id });
    }
    const notification = await Notification.create({
      notificationType: "Task",
      sender: req.user._id,
      receivers: [deletedTask.assignedTo],
      message: `Task "${deletedTask.taskName}" has been deleted`,
    });

    return res.json({ message: "Task deleted successfully", tasks: tasks });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error deleting task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
