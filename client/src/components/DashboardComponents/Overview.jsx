import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";

import ProjectCard from "./ProjectComponents/ProjectCard";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";

// context
import { ProjectsContext } from "../../../context/projectContext";
import { SelectedProjectContext } from "../../../context/selectedProjectContext";

export default function Overview() {
  const navigate = useNavigate();
  const { projects } = useContext(ProjectsContext);
  // console.log(projects);
  const { setSelectedProject } = useContext(SelectedProjectContext);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="relative">
        {!createProjectModal ? (
          <>
            {projects.length > 0 ? (
              <section className="flex flex-col gap-8">
                <h1 className="font-bold text-3xl text-indigo-600 border-b-2">
                  Projects
                </h1>
                <div className="flex flex-wrap gap-10 justify-center">
                  {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </section>
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
              </section>
            )}
          </>
        ) : (
          <CreateProjectModal modalActive={setCreateProjectModal} />
        )}
      </div>
    </div>
  );
}
