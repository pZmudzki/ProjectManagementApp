import { createContext, useContext, useState, useEffect } from "react";
import { ProjectsContext } from "./projectContext";

export const SelectedProjectContext = createContext();

export function SelectedProjectContextProvider({ children }) {
  const { projects } = useContext(ProjectsContext);

  const projectIds = projects.map((project) => project._id);

  const [selectedProject, setSelectedProject] = useState(() => {
    // Retrieve the selected project from local storage
    const storedProject = localStorage.getItem("selectedProject");
    // If the selected project is not in the projects array, remove it from local storage
    if(!projectIds.includes(storedProject)) {
      localStorage.removeItem("selectedProject");
    }
    return storedProject
      ? JSON.parse(storedProject)
      : projects.length > 0
      ? projects[0]
      : null;
  });

  // Update local storage whenever the selected project changes
  useEffect(() => {
    localStorage.setItem("selectedProject", JSON.stringify(selectedProject));
  }, [selectedProject, projects]);

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
}
