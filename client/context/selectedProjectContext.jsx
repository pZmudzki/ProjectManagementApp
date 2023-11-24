import React, { createContext, useContext, useState } from "react";
import { ProjectsContext } from "./projectContext";

export const SelectedProjectContext = createContext();

export function SelectedProjectContextProvider({ children }) {
  const { projects } = useContext(ProjectsContext);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
}
