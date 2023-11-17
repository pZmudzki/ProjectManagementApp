// const mongoose = require("mongoose");
const Project = require("../models/projectSchema.js");
const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");

// Get projects API Endpoint
const getProjects = (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;

      const projects = await Project.find({
        $or: [{ projectManager: user._id }, { projectTeam: user.email }],
      });
      res.json({ projects });
    });
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

    console.log(req.body.projectTeam);

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
    const newProject = await Project.create({
      projectName: projectName,
      projectDescription: projectDescription,
      status: status,
      projectManager: foundProjectManager,
      projectTeam: projectTeam,
    });

    res.json({ message: "Project created successfully", newProject });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: "Error creating project" });
  }
};

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

    const updatedProject = await Project.findByIdAndUpdate(id, {
      projectName,
      projectDescription,
      status,
      projectManager,
      projectTeam,
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
    await Project.findByIdAndDelete(projectID);
    res.json({ message: "Project deleted successfully" });
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
