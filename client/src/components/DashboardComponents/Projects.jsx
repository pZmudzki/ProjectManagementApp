import React, { useContext, useState, useEffect } from "react";

import "./dashboard.css";

import SecondNavbar from "./ProjectComponents/SecondNavbar";
import AsideNavbar from "./ProjectComponents/AsideNavbar";

// context
import { SelectedProjectContext } from "../../../context/selectedProjectContext";

export default function Projects() {
  const { selectedProject } = useContext(SelectedProjectContext);

  return (
    <div className="relative">
      <div className="grid-container overflow-y-hidden">
        <div className="col-span-full row-span-1">
          <SecondNavbar />
        </div>
        {selectedProject && (
          <div className="col-span-1 row-span2 relative">
            <AsideNavbar />
          </div>
        )}
        <section className="col-start-2 col-end-3 row-span-2">
          {selectedProject && (
            <>
              <h2>{selectedProject._id}</h2>
              <h2>{selectedProject.projectName}</h2>
              <h2>{selectedProject.projectDescription}</h2>
              <h2>{selectedProject.projectManager}</h2>
              <h2>{selectedProject.status}</h2>
              <h2>{selectedProject.projectTeam}</h2>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
