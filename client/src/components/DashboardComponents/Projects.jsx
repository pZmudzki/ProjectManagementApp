import React, { useContext, useState, useEffect } from "react";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";

// context
import { ProjectsContext } from "../../../context/projectContext";

export default function Projects() {
  const { projects } = useContext(ProjectsContext);
  // for controlling a selected project
  const [projectUserSelected, setProjectUserSelected] = useState(null);

  useEffect(() => {
    setProjectUserSelected(projects[0]);
  }, []);
  return (
    <div className="relative">
      <div>
        <SecondNavbar
          projectSelected={projectUserSelected}
          setProjectSelected={setProjectUserSelected}
        />
        {projectUserSelected && (
          <AsideNavbar projectSelected={projectUserSelected} />
        )}
        <section>
          {projectUserSelected && (
            <>
              <h2>{projectUserSelected.projectName}</h2>
              <h2>{projectUserSelected.projectDescription}</h2>
              <h2>{projectUserSelected.projectManager}</h2>
              <h2>{projectUserSelected.status}</h2>
              <h2>{projectUserSelected.projectTeam}</h2>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
