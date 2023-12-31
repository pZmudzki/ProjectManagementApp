import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import Loader from "../src/components/Loader";

import { SelectedProjectContext } from "./selectedProjectContext";

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const { selectedProject } = useContext(SelectedProjectContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      await axios
        .get(`/api/project/${selectedProject._id}/getTasks`)
        .then((res) => {
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
  }, [selectedProject]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, loading }}>
      {loading ? <Loader /> : children}
    </TasksContext.Provider>
  );
}
