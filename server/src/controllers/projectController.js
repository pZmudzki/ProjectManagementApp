// const mongoose = require("mongoose");
const Project = require("../models/projectSchema.js");
const User = require("../models/userSchema.js");
const Task = require("../models/taskSchema.js");
const Notification = require("../models/notificationSchema.js");

// Get projects API Endpoint
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ projectManager: req.user._id }, { projectTeam: req.user._id }],
    })
      .populate("projectManager", "username email profilePicture")
      .populate("projectTeam", "username email profilePicture");

    res.json({ projects: projects });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error getting projects" });
  }
};

// Get project info API Endpoint
const getProjectInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("projectManager", "username email profilePicture")
      .populate("projectTeam", "username email profilePicture");

    if (!project) {
      return res.json({ error: "Project does not exist" });
    }

    const tasks = await Task.find({ project: id });

    res.json({ project: project, tasks: tasks });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error getting project info" });
  }
};

// Create Project API Endpoint
const createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      status,
      projectManager,
      projectTeam,
    } = req.body;

    // console.log(req.body.projectTeam);

    if (!projectName) {
      return res.json({ error: "Project name has not been entered" });
    }

    if (!projectDescription) {
      return res.json({ error: "Project description has not been entered" });
    }

    if (!projectManager) {
      return res.json({ error: "Project manager has not been entered" });
    }

    // Check if project manager exists and retrieve their ID
    const foundProjectManager = await User.exists({ email: projectManager });
    if (!foundProjectManager) {
      return res.json({
        error: "User provided as project manager does not exist",
      });
    }
    // Check if each user project team exists and retrieve their ID
    var isValid = true;
    var notValidUser = "";

    const foundProjectTeam = await Promise.all(
      projectTeam.map(async (user) => {
        const foundUser = await User.exists({ email: user });
        if (!foundUser) {
          isValid = false;
          notValidUser = user;
        }
        return foundUser;
      })
    );

    if (!isValid) {
      return res.json({
        error: `User provided as project team member does not exist: ${notValidUser}`,
      });
    }

    const createdProject = await Project.create({
      projectName: projectName,
      projectDescription: projectDescription,
      status: status,
      projectManager: foundProjectManager,
      projectTeam: foundProjectTeam,
    });

    const newProject = await Project.findById(createdProject._id)
      .populate("projectManager", "username email profilePicture")
      .populate("projectTeam", "username email profilePicture");

    const notification = await Notification.create({
      notificationType: "Project",
      sender: foundProjectManager,
      receivers: foundProjectTeam,
      project: newProject._id,
      message: `You have been added to the project: ${projectName}`,
    });

    res.json({ message: "Project created successfully", newProject });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error creating project" });
  }
};

// Update Project API Endpoint
const updateProject = async (req, res) => {
  try {
    const {
      projectName,
      projectDescription,
      status,
      projectManager,
      projectTeam,
    } = req.body;
    const { id } = req.params;

    const projectExists = await Project.findById(id);
    if (!projectExists) return res.json({ error: "Project does not exist" });
    if (projectExists.projectManager != req.user._id) {
      return res.json({ error: "Only project manager can update a project" });
    }

    // Check if project manager exists and retrieve their ID
    const foundProjectManager = await User.exists({ email: projectManager });
    if (!foundProjectManager) {
      return res.json({
        error: "User provided as project manager does not exist",
      });
    }
    // Check if each user project team exists and retrieve their ID
    const foundProjectTeam = await Promise.all(
      projectTeam.map(async (user) => {
        const foundUser = await User.exists({ email: user });
        if (!foundUser) {
          return res.json({
            error: `User provided as project team member does not exist: ${user}`,
          });
        }
        return foundUser;
      })
    );

    await Project.findByIdAndUpdate(id, {
      projectName: projectName,
      projectDescription: projectDescription,
      status: status,
      projectManager: foundProjectManager,
      projectTeam: foundProjectTeam,
    });

    const updatedProject = await Project.findById(id)
      .populate("projectManager", "username email profilePicture")
      .populate("projectTeam", "username email profilePicture");

    const notification = await Notification.create({
      notificationType: "Project",
      sender: foundProjectManager,
      receivers: foundProjectTeam,
      project: updatedProject._id,
      message: `You have been added to the project: ${projectName}`,
    });

    res.json({ message: "Project updated successfully", updatedProject });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error updating project" });
  }
};

// Delete Project API Endpoint
const deleteProject = async (req, res) => {
  const projectID = req.params.id;
  try {
    const projectExists = await Project.findById(projectID);
    if (!projectExists) {
      return res.json({ error: "Project does not exist" });
    }
    if (projectExists.projectManager != req.user._id) {
      return res.json({ error: "Only project manager can delete a project" });
    }
    const deletedProject = await Project.findByIdAndDelete(projectID);

    const deleteTasksRelatedToProject = await Task.deleteMany({
      project: projectID,
    });

    const projects = await Project.find({
      $or: [{ projectManager: req.user._id }, { projectTeam: req.user._id }],
    })
      .populate("projectManager", "username email profilePicture")
      .populate("projectTeam", "username email profilePicture");

    const notification = await Notification.create({
      notificationType: "Project",
      sender: projectExists.projectManager,
      receivers: projectExists.projectTeam,
      project: projectID,
      message: `The project: ${projectExists.projectName} has been deleted`,
    });

    res.json({ message: "Project deleted successfully", projects: projects });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error deleting project" });
  }
};

// Get specific user info API Endpoint

const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const userExists = await User.findById(id);
    if (!userExists) {
      return res.json({ error: "User does not exist" });
    }

    const projects = await Project.find({
      $or: [
        { projectManager: userExists._id },
        { projectTeam: userExists._id },
      ],
    });

    const tasks = await Task.find({ assignedTo: userExists.email });

    res.json({ projects: projects, tasks: tasks });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error getting user info" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectInfo,
  updateProject,
  deleteProject,
  getUserInfo,
};
