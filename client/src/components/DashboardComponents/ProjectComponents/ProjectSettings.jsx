import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// context
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { ProjectsContext } from "../../../../context/projectContext";

import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";

export default function ProjectSettings({ setProjectViewOpened }) {
  const navigate = useNavigate();

  const { selectedProject, setSelectedProject } = useContext(
    SelectedProjectContext
  );
  const { setProjects } = useContext(ProjectsContext);

  const [projectData, setProjectData] = useState({
    projectName: selectedProject.projectName,
    projectDescription: selectedProject.projectDescription,
    status: selectedProject.status,
    projectManager: selectedProject.projectManager,
    projectTeam: selectedProject.projectTeam,
  });

  const [projectTeam, setProjectTeam] = useState([]);

  function handleChange(e) {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  }

  async function Submit(e) {
    try {
      e.preventDefault();
      await axios
        .post(`/api/project/updateProject/${selectedProject._id}`, projectData)
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setProjects((projects) => {
              return projects.map((project) =>
                project._id === res.data.updatedProject._id
                  ? res.data.updatedProject
                  : project
              );
            });
            setSelectedProject(res.data.updatedProject);
            navigate("/dashboard/projects");
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={Submit}>
        <div className="flex flex-col">
          <label htmlFor="projectName">Project Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="projectName"
            id="projectName"
            value={projectData.projectName}
            className="border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            onChange={handleChange}
            name="projectDescription"
            id="projectDescription"
            value={projectData.projectDescription}
            className="border-2 border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="projectManager">Project Manager</label>
          <input
            onChange={handleChange}
            type="text"
            name="projectManager"
            id="projectManager"
            value={projectData.projectManager}
            className="border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="projectTeam">Project Team</label>
          {projectData.projectTeam.map((member) => {
            return (
              <div key={member} className="flex gap-5">
                <p>{member}</p>
                <button
                  type="button"
                  onClick={() => {
                    setProjectData({
                      ...projectData,
                      projectTeam: projectData.projectTeam.filter(
                        (name) => name !== member
                      ),
                    });
                  }}
                >
                  <UserMinusIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            );
          })}
          <div className="relative border-2 border-gray-300 rounded-md">
            <input
              className="text-black w-full"
              type="text"
              name="projectTeam"
              id="projectTeam"
              value={projectTeam}
              onChange={(e) => setProjectTeam(e.target.value)}
            />
            <button
              className="max-w-max absolute text-indigo-600 right-2 top-1/2 transform -translate-y-1/2"
              type="button"
              onClick={() => {
                if (projectData.projectTeam.includes(projectTeam)) {
                  setProjectTeam("");
                  return toast.error("User already added to project team.");
                } else if (!projectTeam) {
                  return toast.error("Please enter an email address.");
                }
                setProjectData({
                  ...projectData,
                  projectTeam: [...projectData.projectTeam, projectTeam],
                });
                setProjectTeam("");
              }}
            >
              <UserPlusIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="status">Status</label>
          <select
            onChange={handleChange}
            name="status"
            id="status"
            value={projectData.status}
            className="border-2 border-gray-300 rounded-md"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
