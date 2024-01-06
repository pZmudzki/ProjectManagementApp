import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../dashboard.css";

import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

import LoadingButton from "../../LoadingButton";

// context
import { ProjectsContext } from "../../../../context/projectContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

export default function DeleteProjectModal({
  setActive,
  setProjectViewOpened,
}) {
  const [typedName, setTypedName] = useState("");
  const { setProjects } = useContext(ProjectsContext);
  const { selectedProject, setSelectedProject } = useContext(
    SelectedProjectContext
  );

  const [sendingRequest, setSendingRequest] = useState(false);

  function handleChange(e) {
    setTypedName(e.target.value);
  }

  async function deleteProject(e) {
    try {
      e.preventDefault();
      setSendingRequest(true);
      await axios
        .delete(`/api/project/deleteProject/${selectedProject._id}`)
        .then((res) => {
          if (res.data.error) {
            setSendingRequest(false);
            toast.error(res.data.error);
          } else {
            setProjects(res.data.projects);
            setSelectedProject(res.data.projects[0]);
            setSendingRequest(false);
            setProjectViewOpened("overview");
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
      <div className="modal bg-indigo-50 border-4 border-indigo-600 rounded-xl py-3 px-4 flex flex-col gap-4">
        <div>
          <div className="flex items-center font-bold gap-2">
            <TrashIcon className="h-8 w-8 text-indigo-600" />
            <h1 className="text-md">Confirm</h1>
          </div>
          <XMarkIcon
            className="h-6 w-6 text-white bg-red-500 rounded-lg absolute right-2 top-2 cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
            onClick={() => setActive(false)}
          />
        </div>
        <h1 className="text-2xl ">
          To delete this project type:{" "}
          <span className="text-red-500 font-bold underline">
            {selectedProject.projectName}
          </span>
        </h1>
        <form onSubmit={deleteProject} className="flex flex-col gap-1">
          <input
            className="text-black border-2 border-indigo-300 rounded-md px-1 text-2xl"
            onChange={handleChange}
            type="text"
            name="projectName"
            value={typedName}
          />

          {typedName === selectedProject.projectName ? (
            <button
              className="text-xl bg-red-500 hover:bg-red-600 rounded-md px-2 py-1 w-full text-white transition duration-200 ease-in-out"
              type="submit"
            >
              {sendingRequest ? <LoadingButton /> : "Delete"}
            </button>
          ) : (
            <button
              className="text-xl bg-gray-500 hover:bg-gray-600 rounded-md px-2 py-1 w-full text-white transition duration-200 ease-in-out"
              type="submit"
              disabled
            >
              Delete
            </button>
          )}
        </form>
      </div>
      <div onClick={() => setActive(false)} className="bg-modal"></div>
    </>
  );
}
