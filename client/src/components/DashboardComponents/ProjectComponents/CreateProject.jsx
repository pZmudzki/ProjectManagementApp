import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";

import { ProjectsContext } from "../../../../context/projectContext";

export default function CreateProject({ modalActive }) {
  const { projects, setProjects } = useContext(ProjectsContext);

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
    status: "Not Started",
    projectManager: "",
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
    <div>
      <h1>Create Project</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            name="projectName"
            id="projectName"
            value={projectData.projectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            name="projectDescription"
            id="projectDescription"
            cols="30"
            rows="5"
            value={projectData.projectDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select name="status" id="status" onChange={handleChange}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="projectManager">
            Project Manager <span>Email</span>
          </label>
          <input
            type="email"
            name="projectManager"
            id="projectManager"
            value={projectData.projectManager}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="projectTeam">
            Project Team Members <span>Email</span>
          </label>
          {projectData.projectTeam.map((teamMember) => (
            <div key={teamMember}>
              <p>{teamMember}</p>
            </div>
          ))}
          <input
            type="email"
            name="projectTeam"
            id="projectTeam"
            value={projectTeam}
            onChange={(e) => setProjectTeam(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
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
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
