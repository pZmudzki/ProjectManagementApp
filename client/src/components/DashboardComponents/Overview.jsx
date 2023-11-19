import React, { useState, useContext } from "react";

import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";

import ProjectCard from "./ProjectComponents/ProjectCard";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";

// context
import { ProjectsContext } from "../../../context/projectContext";

export default function Overview() {
  const { projects } = useContext(ProjectsContext);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  return (
    <div>
      <div className="relative">
        {!createProjectModal && (
          <>
            {projects ? (
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
              <section>
                <h1>Seems like you don't have any projects yet</h1>
                <h2>
                  Get started by creating a project below{""}
                  <span>
                    <ArrowSmallDownIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </span>
                </h2>
              </section>
            )}
            <button onClick={() => setCreateProjectModal(!createProjectModal)}>
              Create Project
            </button>
          </>
        )}
        {createProjectModal && (
          <CreateProjectModal modalActive={setCreateProjectModal} />
        )}
      </div>
    </div>
  );
}
