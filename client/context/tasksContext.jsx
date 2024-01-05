import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import Loader from "../src/components/Loader";

import { SelectedProjectContext } from "./selectedProjectContext";

export const TasksContext = createContext();

export function TasksContextProvider({ children }) {
  const { selectedProject } = useContext(SelectedProjectContext);
  const [tasks, setTasks] = useState([]); // tasks for selected project
  const [allTasks, setAllTasks] = useState([]); // for calendar [all tasks]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        if (!selectedProject) return setLoading(false);
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

    getTasks();
  }, [selectedProject]);

  useEffect(() => {
    async function getAllTasks() {
      try {
        await axios.get(`/api/project/getAllTasks`).then((res) => {
          setAllTasks(res.data.tasks);
          if (res.data.error) {
            console.log(res.data.error);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllTasks();
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, allTasks, setAllTasks, loading }}
    >
      {loading ? <Loader /> : children}
    </TasksContext.Provider>
  );
}
