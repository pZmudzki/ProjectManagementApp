import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// context
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { ProjectsContext } from "../../../../context/projectContext";

import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";

export default function ProjectSettings() {
  const navigate = useNavigate();

  const { selectedProject, setSelectedProject } = useContext(
    SelectedProjectContext
  );
  const { setProjects } = useContext(ProjectsContext);

  const [projectData, setProjectData] = useState({
    projectName: selectedProject.projectName,
    projectDescription: selectedProject.projectDescription,
    status: selectedProject.status,
    projectManager: selectedProject.projectManager.email,
    projectTeam: selectedProject.projectTeam.map((member) => member.email),
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
      console.log(projectData);
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
    <form
      onSubmit={Submit}
      className="flex flex-col justify-between p-3 h-full"
    >
      <div className="flex gap-5 flex-col">
        <h1 className="text-2xl font-bold">Project Settings</h1>
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col justify-center">
            <label htmlFor="projectName" className="text-gray-500">
              Project Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="projectName"
              id="projectName"
              value={projectData.projectName}
              className="border-2 border-gray-400 rounded-lg p-1"
            />
          </div>
          <div className="flex flex-col justify-center">
            <label htmlFor="status" className="text-gray-500">
              Status
            </label>
            <select
              onChange={handleChange}
              name="status"
              id="status"
              value={projectData.status}
              className="border-2 border-gray-400 rounded-lg p-1 text-xl"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="projectManager" className="text-gray-500">
              Project Manager
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="projectManager"
              id="projectManager"
              value={projectData.projectManager}
              className="border-2 border-gray-400 rounded-lg p-1"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <label htmlFor="projectDescription" className="text-gray-500">
            Project Description
          </label>
          <textarea
            onChange={handleChange}
            name="projectDescription"
            id="projectDescription"
            rows="3"
            value={projectData.projectDescription}
            className="border-2 border-gray-400 rounded-lg p-1"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="projectTeam" className="text-gray-500">
              Project Team
            </label>
            <div className="relative w-max">
              <input
                className="text-black border-2 border-gray-400 rounded-lg p-1"
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
          <div className="flex flex-col gap-1 w-max">
            {projectData.projectTeam.map((member, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-1 pl-2 border-2 border-indigo-500 rounded-full"
                >
                  <p>{member}</p>
                  <button
                    type="button"
                    className="rounded-full bg-indigo-300 p-1 hover:bg-red-400 hover:scale-105 transition-all duration-300 ease-in-out"
                    onClick={() => {
                      setProjectData({
                        ...projectData,
                        projectTeam: projectData.projectTeam.filter(
                          (email) => email !== member
                        ),
                      });
                    }}
                  >
                    <UserMinusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-indigo-500 text-white text-2xl w-48 sm:w-96 self-end rounded-full shadow-lg hover:bg-indigo-600 transition duration-200 ease-in-out"
      >
        Save
      </button>
    </form>
  );
}
