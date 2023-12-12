import React, { useContext, useState } from "react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";
import "./dashboard.css";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";
import ProjectSettings from "./ProjectComponents/ProjectSettings";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";
import Tasks from "./ProjectComponents/Tasks";
import NoProjectsMessage from "./ProjectComponents/NoProjectsMessage";

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
        <div className="h-full flex">
          <AsideNavbar
            setProjectViewOpened={setProjectViewOpened}
            projectViewOpened={projectViewOpened}
          />

          <div className="flex flex-col w-full">
            <SecondNavbar setProjectViewOpened={setProjectViewOpened} />
            <section className="w-full over">
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
        <NoProjectsMessage setCreateProjectModal={setCreateProjectModal} />
      )}
    </>
  );
}
