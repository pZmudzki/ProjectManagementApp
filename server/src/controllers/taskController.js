const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const Project = require("../models/projectSchema");

// Get tasks API endpoint (for an individual user)
const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ project: id });
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
    const foundProject = await Project.exists({ _id: project });
    if (!foundProject) {
      return res.json({ error: "Project does not exist" });
    }

    const foundUser = await User.exists({ email: assignedTo });
    if (!foundUser) {
      return res.json({ error: "User does not exist" });
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

    res.json({ message: "Task created successfully", task });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error creating task" });
  }
};

// Update tasks API endpoint

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        status: status,
      },
      { new: true }
    );

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
    if (deletedTask) {
      return res.json({ message: "Task deleted successfully", tasks: tasks });
    } else {
      return res.json({ error: "Task does not exist", id: deletedTask._id });
    }
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
