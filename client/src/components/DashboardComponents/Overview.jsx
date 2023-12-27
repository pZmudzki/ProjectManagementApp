import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ProjectCard from "./ProjectComponents/ProjectCard";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";
import NoProjectsMessage from "./ProjectComponents/NoProjectsMessage";

// context
import { ProjectsContext } from "../../../context/projectContext";
// import { SelectedProjectContext } from "../../../context/selectedProjectContext";

export default function Overview() {
  const navigate = useNavigate();
  const { projects } = useContext(ProjectsContext);
  // console.log(projects);
  // const { setSelectedProject } = useContext(SelectedProjectContext);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  return (
    <div>
      {!createProjectModal ? (
        <>
          {projects.length > 0 ? (
            <section className="flex flex-col gap-8">
              <h1 className="font-bold text-3xl text-indigo-600 border-b-2">
                Projects
              </h1>
              <div className="flex flex-wrap gap-10">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </section>
          ) : (
            <NoProjectsMessage setCreateProjectModal={setCreateProjectModal} />
          )}
        </>
      ) : (
        <CreateProjectModal modalActive={setCreateProjectModal} />
      )}
    </div>
  );
}
