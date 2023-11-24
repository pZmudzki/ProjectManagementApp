import React, { useState, useContext } from "react";
import CreateProjectModal from "./CreateProjectModal";

// context
import { ProjectsContext } from "../../../../context/projectContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

// icons
import {
  FolderPlusIcon,
  FolderIcon,
  FolderOpenIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

export default function SecondNavbar() {
  const { projects } = useContext(ProjectsContext);
  const { selectedProject, setSelectedProject } = useContext(
    SelectedProjectContext
  );
  // for controlling a modal
  const [createProjectModal, setCreateProjectModal] = useState(false);
  // for controlling a dropdown
  const [dropDown, setDropDown] = useState(false);

  return (
    <div>
      <nav className="flex justify-between px-4 py-2 bg-gray-100">
        {/* dropdown here */}
        {selectedProject ? (
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

                <span>{selectedProject.projectName}</span>
              </div>
              <ChevronDownIcon
                className={`h-4 w-4 text-indigo-600 transform ${
                  dropDown ? "rotate-180" : ""
                } transition-all ease-in-out`}
                aria-hidden="true"
              />
            </button>
            {dropDown ? (
              <div className="absolute top-7 w-40 bg-white shadow-md rounded-md z-50">
                <ul className="flex flex-col border-2 rounded-md">
                  {projects.map((project, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        className="w-full flex gap-2 px-1 py-1 font-bold text-xs hover:bg-gray-200"
                        onClick={(e) => {
                          setSelectedProject(projects[idx]);
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
        ) : (
          <div className="flex items-center gap-2">
            <span>Create new project by clicking on a folder button</span>
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
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
      </nav>
      {createProjectModal && (
        <CreateProjectModal modalActive={setCreateProjectModal} />
      )}
    </div>
  );
}
