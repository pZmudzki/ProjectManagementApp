import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProjectsContext = createContext();

export function ProjectsContextProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      await axios.get("/api/project/getProjects").then((res) => {
        setProjects(res.data.projects);
        if (res.data.error) {
          console.log(res.data.error);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}
