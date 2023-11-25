import React, { useContext, useState } from "react";

import "./dashboard.css";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";
import ProjectSettings from "./ProjectComponents/ProjectSettings";

// context
import { SelectedProjectContext } from "../../../context/selectedProjectContext";

export default function Projects() {
  const { selectedProject } = useContext(SelectedProjectContext);
  const [projectViewOpened, setProjectViewOpened] = useState("overview");

  return (
    <div className="relative">
      <div className="grid-container overflow-y-hidden">
        <div className="col-span-full row-span-1">
          <SecondNavbar setProjectViewOpened={setProjectViewOpened} />
        </div>
        {selectedProject && (
          <div className="col-span-1 row-span2 relative">
            <AsideNavbar
              setProjectViewOpened={setProjectViewOpened}
              projectViewOpened={projectViewOpened}
            />
          </div>
        )}
        {selectedProject && (
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
            {projectViewOpened === "tasks" && <p>tasks</p>}
          </section>
        )}
      </div>
    </div>
  );
}
