import Project from "../models/projectSchema.js";
import User from "../models/userSchema.js";

// Get projects API Endpoint
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ projects });
    } catch (error) {
        console.log(error.message);
        return res.json({ error: "Error getting projects" });
    }
}

// Create Project API Endpoint
const createProject = async (req, res) => {
    try {
        const { projectName, projectDescription, status, projectManager, projectTeam } = req.body;

        if (!projectName) { 
            return res.json({ error: "Project name has not been entered" }); 
        }
        if (!projectDescription) { 
            return res.json({ error: "Project description has not been entered" }); 
        }
        if (!projectManager) { 
            return res.json({ error: "Project manager has not been entered" }); 
        }
        const foundProjectManager = await User.findById({email: projectManager});
        const newProject = await Project.create({
            projectName,
            projectDescription,
            status,
            foundProjectManager._id,
            projectTeam,
        });
        res.json({ message: "Project created successfully", newProject });
    } catch (error) {
        console.log(error.message);
        return res.json({ error: "Error creating project" });
    }    
}

const updateProject = async (req, res) => {
    try {
        const { projectName, projectDescription, status, projectManager, projectTeam } = req.body;
        const { id } = req.params;

        const projectExists = await Project.findById(id);
        if(!projectExists) return res.json({ error: "Project does not exist" });

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
}

module.exports = {
    createProject,
    getProjects,
    updateProject,
};