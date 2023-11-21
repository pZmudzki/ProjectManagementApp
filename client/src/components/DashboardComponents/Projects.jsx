import React, { useContext, useState } from "react";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";

// context 
import { ProjectsContext } from "../../../context/projectContext";
// icons
import {
  FolderPlusIcon,
  FolderIcon,
  FolderOpenIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

export default function Projects() {
  const { projects } = useContext(ProjectsContext);
  // for controlling a selected project
  const [projectSelected, setProjectSelected] = useState(projects[0]);
  // for controlling a modal
  const [createProjectModal, setCreateProjectModal] = useState(false);
  // for controlling a dropdown
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="relative">
        <div>
          <div className="flex justify-between px-4">
            {/* dropdown here */}
            <div className="relative">
              <button
                type="button"
                className="w-40 flex items-center justify-between px-1 py-1 outline outline-offset-2 outline-2 outline-indigo-600 font-bold text-xs rounded-md shadow-sm hover:outline-4"
                onClick={() => {
                  setDropDown(!dropDown);
                }}
              >
                <div className="flex gap-2">
                  <FolderOpenIcon
                    className="h-4 w-4 text-indigo-600"
                    aria-hidden="true"
                  />

                  <span>{projectSelected.projectName}</span>
                </div>
                <ChevronDownIcon
                  className={`h-4 w-4 text-indigo-600 transform ${
                    dropDown ? "rotate-180" : ""
                  } transition-all ease-in-out`}
                  aria-hidden="true"
                />
              </button>
              {dropDown ? (
                <div className="absolute top-7 w-40 bg-white shadow-md rounded-md">
                  <ul className="flex flex-col border-2 rounded-md">
                    {projects.map((project, idx) => (
                      <li key={idx}>
                        <button
                          type="button"
                          className="w-full flex gap-2 px-1 py-1 font-bold text-xs hover:bg-gray-200"
                          onClick={(e) => {
                            setProjectSelected(projects[idx]);
                            setDropDown(false);
                          }}
                        >
                          <FolderIcon
                            className="h-4 w-4 text-indigo-600"
                            aria-hidden="true"
                          />
                          <span>{project.projectName}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              onClick={() => {
                setCreateProjectModal(true);
              }}
            >
              <FolderPlusIcon
                className="h-6 w-6 text-green-500"
                aria-hidden="true"
              />
            </button>
          </div>
          <section>
            <h1>Project Overview</h1>
            <h2>{projectSelected.projectName}</h2>
            <h2>{projectSelected.projectDescription}</h2>
            <h2>{projectSelected.projectManager}</h2>
            <h2>{projectSelected.projectTeam}</h2>
          </section>
        </div>
      {createProjectModal && ( 
        <CreateProjectModal modalActive={setCreateProjectModal} />
      )}
    </div>
  );
}
