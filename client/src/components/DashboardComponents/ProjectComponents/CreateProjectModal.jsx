import { useState, useContext } from "react";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../dashboard.css";
import { useNavigate } from "react-router-dom";

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { ProjectsContext } from "../../../../context/projectContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";

export default function CreateProjectModal({ modalActive }) {
  const navigate = useNavigate();

  const { setSelectedProject } = useContext(SelectedProjectContext);
  const { projects, setProjects } = useContext(ProjectsContext);
  const { user } = useContext(UserContext);

  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
    status: "Not Started",
    projectManager: user.email,
    projectTeam: [],
  });

  const [projectTeamMember, setProjectTeamMember] = useState("");

  // helper function to validate email address
  function validateTeamEmail(email) {
    return email.match(
      //validation regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

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
        setSelectedProject(data.newProject);
        setProjectData({});
        modalActive(false);
        navigate("/dashboard/projects");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="modal bg-indigo-50 border-4 border-indigo-600 rounded-xl py-3 px-4">
        <div>
          <div className="flex items-center mb-4 font-bold gap-2">
            <PencilSquareIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-base sm:text-lg">New Project</h1>
          </div>
          <XMarkIcon
            className="h-6 w-6 text-white bg-red-500 rounded-lg absolute right-2 top-2 cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={() => modalActive(false)}
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="flex gap-2">
            <div className="mb-3 flex flex-col">
              <label htmlFor="projectName" className="text-xs">
                Project Name
              </label>
              <input
                className="text-black border-2 border-indigo-300 rounded-md px-1"
                type="text"
                name="projectName"
                id="projectName"
                value={projectData.projectName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 flex flex-col">
              <label htmlFor="status" className="text-xs">
                Status
              </label>
              <select
                className="text-black border-2 border-indigo-300 rounded-md px-1 text-lg"
                name="status"
                id="status"
                onChange={handleChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="projectDescription" className="text-xs">
              Project Description
            </label>
            <textarea
              className="text-black resize-none border-2 border-indigo-300 rounded-md px-1 text-lg"
              name="projectDescription"
              id="projectDescription"
              cols="30"
              rows="4"
              value={projectData.projectDescription}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex gap-2 flex-wrap">
            <div className="mb-3 flex flex-col">
              <label htmlFor="projectManager" className="relative ">
                Project Manager{" "}
                <span className="absolute text-xs italic">Email</span>
              </label>
              <input
                className="text-black border-2 border-indigo-300 rounded-md px-1 text-lg"
                type="email"
                name="projectManager"
                id="projectManager"
                value={projectData.projectManager}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectTeam" className="relative">
                Project Team Members{" "}
                <span className="absolute text-xs italic">Email</span>
              </label>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    className="text-black w-full border-2 border-indigo-300 rounded-md px-1 text-lg"
                    type="email"
                    name="projectTeam"
                    id="projectTeam"
                    value={projectTeamMember}
                    onChange={(e) => setProjectTeamMember(e.target.value)}
                  />
                  <button
                    className="max-w-max absolute text-indigo-600 right-2 top-1/2 transform -translate-y-1/2"
                    type="button"
                    onClick={() => {
                      if (projectData.projectTeam.includes(projectTeamMember)) {
                        setProjectTeamMember("");
                        return toast.error(
                          "User already added to project team."
                        );
                      } else if (
                        projectTeamMember == null ||
                        projectTeamMember === ""
                      ) {
                        return toast.error("Please enter an email address.");
                      } else if (!validateTeamEmail(projectTeamMember)) {
                        setProjectTeamMember("");
                        return toast.error(
                          "Please enter a valid email address."
                        );
                      } else if (
                        projectTeamMember === projectData.projectManager
                      ) {
                        setProjectTeamMember("");
                        return toast.error(
                          "Project Manager cannot be added to project team."
                        );
                      }
                      setProjectData({
                        ...projectData,
                        projectTeam: [
                          ...projectData.projectTeam,
                          projectTeamMember,
                        ],
                      });
                      setProjectTeamMember("");
                    }}
                  >
                    <UserPlusIcon
                      className="h-6 w-6 hover:scale-110 transition duration-100 ease-in-out"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                  {projectData.projectTeam.map((teamMember) => (
                    <div
                      className="bg-indigo-200 flex justify-between py-1 px-2 rounded-md"
                      key={teamMember}
                    >
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
                        <UserMinusIcon
                          className="h-6 w-6 hover:scale-110 transition duration-100 ease-in-out"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 w-full text-white transition duration-200 ease-in-out"
            type="submit"
          >
            Create Project
          </button>
        </form>
      </div>
      <div onClick={() => modalActive(false)} className="bg-modal"></div>
    </>
  );
}
