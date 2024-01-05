import { useContext, useState } from "react";
import "./dashboard.css";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";
import ProjectSettings from "./ProjectComponents/ProjectSettings";
import ProjectOverview from "./ProjectComponents/ProjectOverview";
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
        <div className="flex absolute top-[66px] right-0 bottom-0 left-0 z-0">
          <AsideNavbar
            setProjectViewOpened={setProjectViewOpened}
            projectViewOpened={projectViewOpened}
          />

          <div className="flex-1 flex flex-col">
            <SecondNavbar setProjectViewOpened={setProjectViewOpened} />
            <section className="flex-1 flex overflow-y-scroll">
              <div className="min-h-min w-full">
                {projectViewOpened === "overview" && <ProjectOverview />}
                {projectViewOpened === "settings" && (
                  <ProjectSettings
                    setProjectViewOpened={setProjectViewOpened}
                  />
                )}
                {projectViewOpened === "tasks" && <Tasks />}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <NoProjectsMessage setCreateProjectModal={setCreateProjectModal} />
      )}
      {createProjectModal && (
        <CreateProjectModal modalActive={setCreateProjectModal} />
      )}
    </>
  );
}
