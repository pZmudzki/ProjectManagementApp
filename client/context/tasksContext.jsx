import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import Loader from "../src/components/Loader";

import { ProjectsContext } from "./projectContext";

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const { projects } = useContext(ProjectsContext);
  const [tasks, setTasks] = useState([]); // for user view
  const [tasksAdmin, setTasksAdmin] = useState([]); // for admin view
  const [loading, setLoading] = useState(true);

  const getTasksAdmin = async () => {
    try {
      await axios.get("/api/project/getTasksAdmin").then((res) => {
        setTasksAdmin(res.data.tasks);
        setLoading(false);
        if (res.data.error) {
          console.log(res.data.error);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

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
    getTasksAdmin();
  }, [projects]);

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, tasksAdmin, setTasksAdmin, loading }}
    >
      {loading ? <Loader /> : children}
    </TasksContext.Provider>
  );
}
