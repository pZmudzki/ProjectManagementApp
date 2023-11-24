import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// context
import { ProjectsContext } from "../../../../context/projectContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

export default function DeleteProjectModal({ setActive }) {
  const navigate = useNavigate();

  const [typedName, setTypedName] = useState("");
  const { projects, setProjects } = useContext(ProjectsContext);
  const { selectedProject, setSelectedProject } = useContext(
    SelectedProjectContext
  );

  function handleChange(e) {
    setTypedName(e.target.value);
  }

  async function deleteProject(e) {
    try {
      e.preventDefault();
      await axios
        .delete(`/api/project/deleteProject/${selectedProject._id}`)
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setProjects(
              projects.filter((project) => project._id !== res.data._id)
            );
            setSelectedProject(projects[0]);
            setActive(false);
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="modal bg-gray-300 rounded-xl border-4 border-indigo-700 py-3 px-4">
        <h1 className="text-2xl">
          To delete this project type{" "}
          <span className="text-red-500">{selectedProject.projectName}</span>
        </h1>
        <form onSubmit={deleteProject}>
          <input
            onChange={handleChange}
            type="text"
            name="projectName"
            value={typedName}
          />
          <div>
            <button type="button" onClick={() => setActive(false)}>
              Cancel
            </button>
            {typedName === selectedProject.projectName ? (
              <button className="bg-red-500 text-white" type="submit">
                Delete
              </button>
            ) : (
              <button className="bg-gray-400 text-white" type="submit" disabled>
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="bg-modal"></div>
    </>
  );
}
