import React, { useState, useContext } from "react";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../dashboard.css";

import { ProjectsContext } from "../../../../context/projectContext";
import { UserContext } from "../../../../context/userContext";

export default function CreateProjectModal({ modalActive }) {
  const { projects, setProjects } = useContext(ProjectsContext);
  const { user } = useContext(UserContext);

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
    status: "Not Started",
    projectManager: user.email,
    projectTeam: [],
  });

  const [projectTeam, setProjectTeam] = useState([]);

  function handleChange(e) {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e) {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "/api/project/createProject",
        projectData
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setProjects([...projects, data.newProject]);
        setProjectData({});
        modalActive(false);
        toast.success(data.message);
        console.log(data.newProject);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="modal  bg-indigo-600 text-white rounded-xl py-3 px-4">
      <h1 className="text-4xl text-center mb-4">New Project</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3 flex flex-col">
          <label htmlFor="projectName">Project Name</label>
          <input
            className="text-black"
            type="text"
            name="projectName"
            id="projectName"
            value={projectData.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            className="text-black"
            name="projectDescription"
            id="projectDescription"
            cols="30"
            rows="5"
            value={projectData.projectDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="status">Status</label>
          <select
            className="text-black"
            name="status"
            id="status"
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="projectManager" className="relative">
            Project Manager{" "}
            <span className="absolute text-xs italic">Email</span>
          </label>
          <input
            className="text-black"
            type="email"
            name="projectManager"
            id="projectManager"
            value={projectData.projectManager}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="projectTeam" className="relative">
            Project Team Members{" "}
            <span className="absolute text-xs italic">Email</span>
          </label>
          {projectData.projectTeam.map((teamMember) => (
            <div className="bg-indigo-200 flex" key={teamMember}>
              <p>{teamMember}</p>
              <button
                type="button"
                onClick={() => {
                  setProjectData({
                    ...projectData,
                    projectTeam: projectData.projectTeam.filter(
                      (team) => team !== teamMember
                    ),
                  });
                }}
              >
                <UserMinusIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          ))}
          <input
            className="text-black"
            type="text"
            name="projectTeam"
            id="projectTeam"
            value={projectTeam}
            onChange={(e) => setProjectTeam(e.target.value)}
          />
          <button
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
        <div className="flex gap-2 justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 rounded-md px-2 py-1"
            type="button"
            onClick={() => {
              modalActive(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 rounded-md px-2 py-1"
            type="submit"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
