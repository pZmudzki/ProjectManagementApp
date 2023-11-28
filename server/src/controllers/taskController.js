const User = require("../models/userSchema");
const Task = require("../models/taskSchema");
const Project = require("../models/projectSchema");

// Get tasks API endpoint
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.email });
    res.json({ tasks });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error getting tasks" });
  }
};

// Create new tasks API endpoint

const createTask = async (req, res) => {
  try {
    const { taskName, description, status, dueDate, project, assignedTo } =
      req.body;

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
      dueDate: dueDate,
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
    const { id } = req.params;
    const { taskName, description, status, dueDate, project, assignedTo } =
      req.body;

    const foundTask = await Task.exists({ _id: id });
    if (!foundTask) {
      return res.json({ error: "Task does not exist" });
    }

    const foundProject = await Project.exists({ _id: project });
    if (!foundProject) {
      return res.json({ error: "Project does not exist" });
    }

    const foundUser = await User.exists({ email: assignedTo });
    if (!foundUser) {
      return res.json({ error: "User does not exist" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        taskName: taskName,
        description: description,
        status: status,
        dueDate: dueDate,
        project: project,
        assignedTo: assignedTo,
      },
      { new: true }
    );

    return res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error updating task" });
  }
};

// Delete tasks API endpoint
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      const foundTask = await Task.findOne({ _id: id });
      return res.json({ message: "Task deleted successfully", foundTask });
    } else {
      return res.json({ error: "Task does not exist" });
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
