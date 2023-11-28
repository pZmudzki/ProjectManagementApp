import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Loader from "../src/components/Loader";

export const ProjectsContext = createContext();

export function ProjectsContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjects = async () => {
    try {
      await axios.get("/api/project/getProjects").then((res) => {
        setProjects(res.data.projects);
        setLoading(false);
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

  const getTasks = async () => {
    try {
      await axios.get("/api/project/getTasks").then((res) => {
        setTasks(res.data.tasks);
        if (res.data.error) {
          console.log(res.data.error);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, [projects]);

  return (
    <ProjectsContext.Provider
      value={{ projects, tasks, setProjects, setTasks, loading }}
    >
      {loading ? <Loader /> : children}
    </ProjectsContext.Provider>
  );
}
