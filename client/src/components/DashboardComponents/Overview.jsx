import { useState, useContext } from "react";

import ProjectCard from "./ProjectComponents/ProjectCard";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";
import NoProjectsMessage from "./ProjectComponents/NoProjectsMessage";

// context
import { ProjectsContext } from "../../../context/projectContext";

export default function Overview() {
  const { projects } = useContext(ProjectsContext);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  return (
    <div className="p-6">
      {!createProjectModal ? (
        <>
          {projects.length > 0 ? (
            <section className="flex flex-wrap gap-10">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
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
