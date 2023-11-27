const User = require('../models/userSchema');
const Task = require('../models/taskSchema');
const Project = require('../models/projectSchema');


const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
        $or: [{ taskManager: req.user._id }, { taskTeam: req.user.email }],
        });
        res.json({ tasks });
    } catch (error) {
        console.log(error.message);
        return res.json({ error: "Error getting tasks" });
    }
};

const createTask = async (req, res) => {
    try {
        const { taskName, description, status, dueDate, project, assignedTo } = req.body;

        if (!taskName) {
            return res.json({ error: "Task name has not been entered" }); 
        }
        const foundProject = await Project.exists({ projectName: project });
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
    
        res.json({message: "Task created successfully", task });      
    } catch (error) {
        console.log(error.message);
        return res.json({ error: "Error creating task" });
    };
};

const updateTask = async (req, res) => {
   
};

module.exports = {
    getTasks,
    createTask
};