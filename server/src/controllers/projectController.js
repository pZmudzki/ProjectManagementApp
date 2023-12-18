// const mongoose = require("mongoose");
const Project = require("../models/projectSchema.js");
const User = require("../models/userSchema.js");

// Get projects API Endpoint
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ projectManager: req.user._id }, { projectTeam: req.user._id }],
    })
      .populate("projectManager", "username email profilePicture")
      .populate("projectTeam", "username email profilePicture");

    console.log(projects);
    res.json({ projects: projects });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error getting projects" });
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

    const newProject = await Project.create({
      projectName: projectName,
      projectDescription: projectDescription,
      status: status,
      projectManager: foundProjectManager,
      projectTeam: foundProjectTeam,
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
    const projects = await Project.find({
      $or: [{ projectManager: req.user._id }, { projectTeam: req.user.email }],
    });
    res.json({ message: "Project deleted successfully", projects: projects });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error deleting project" });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
