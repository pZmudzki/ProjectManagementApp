import React, { useContext, useState, useEffect } from "react";

import "./dashboard.css";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";

// context
import { ProjectsContext } from "../../../context/projectContext";

export default function Projects({ filterProject }) {
  const { projects } = useContext(ProjectsContext);
  // for controlling a selected project
  const [projectUserSelected, setProjectUserSelected] = useState(null);

  // find the project that matches the id from the url
  const findProject = projects.filter(
    (project) => project._id === filterProject
  );

  useEffect(() => {
    setProjectUserSelected(filterProject ? findProject[0] : projects[0]);
  }, []);

  return (
    <div className="relative">
      <div className="grid-container overflow-y-hidden">
        <div className="col-span-full row-span-1">
          <SecondNavbar
            projectSelected={projectUserSelected}
            setProjectSelected={setProjectUserSelected}
          />
        </div>
        {projectUserSelected && (
          <div className="col-span-1 row-span2 relative">
            <AsideNavbar projectSelected={projectUserSelected} />
          </div>
        )}
        <section className="col-start-2 col-end-3 row-span-2">
          {projectUserSelected && (
            <>
              <h2>{projectUserSelected._id}</h2>
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
