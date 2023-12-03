import React, { useContext, useState } from "react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";
import "./dashboard.css";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";
import ProjectSettings from "./ProjectComponents/ProjectSettings";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";
import Tasks from "./ProjectComponents/Tasks";

// context
import { SelectedProjectContext } from "../../../context/selectedProjectContext";
import { ProjectsContext } from "../../../context/projectContext";

export default function Projects() {
  const { selectedProject } = useContext(SelectedProjectContext);
  const { projects } = useContext(ProjectsContext);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [projectViewOpened, setProjectViewOpened] = useState("overview");

  return (
    <>
      {projects.length > 0 ? (
        <div className="relative">
          <div className="grid-container overflow-y-hidden">
            <div className="col-span-full row-span-1">
              <SecondNavbar setProjectViewOpened={setProjectViewOpened} />
            </div>

            <div className="col-span-1 row-span2 relative">
              <AsideNavbar
                setProjectViewOpened={setProjectViewOpened}
                projectViewOpened={projectViewOpened}
              />
            </div>

            <section className="col-start-2 col-end-3 row-span-2 overflow-y-scroll">
              {projectViewOpened === "overview" && (
                <>
                  <h2>{selectedProject._id}</h2>
                  <h2>{selectedProject.projectName}</h2>
                  <h2>{selectedProject.projectDescription}</h2>
                  <h2>{selectedProject.projectManager}</h2>
                  <h2>{selectedProject.status}</h2>
                  <h2>{selectedProject.projectTeam}</h2>
                </>
              )}
              {projectViewOpened === "settings" && (
                <ProjectSettings setProjectViewOpened={setProjectViewOpened} />
              )}
              {projectViewOpened === "tasks" && <Tasks />}
            </section>
          </div>
        </div>
      ) : (
        <section className="flex flex-col items-center ">
          <h1 className="text-lg font-bold mb-2 mt-10 sm:text-3xl">
            Seems like you don't have any projects yet
          </h1>
          <h2 className="flex mb-7">
            Get started by creating a project below{" "}
            <ArrowSmallDownIcon className="h-6 w-6" aria-hidden="true" />
          </h2>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md max-w-max shadow-sm hover:shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all ease-in-out"
            onClick={() => setCreateProjectModal(true)}
          >
            Create New Project
          </button>
          {createProjectModal && (
            <CreateProjectModal modalActive={setCreateProjectModal} />
          )}
        </section>
      )}
    </>
  );
}
