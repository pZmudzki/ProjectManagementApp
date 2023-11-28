import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import Loader from "../src/components/Loader";

import { ProjectsContext } from "./projectContext";

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const { projects } = useContext(ProjectsContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      await axios.get("/api/project/getTasks").then((res) => {
        setTasks(res.data.tasks);
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
    getTasks();
  }, [projects]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, loading }}>
      {loading ? <Loader /> : children}
    </TasksContext.Provider>
  );
}
