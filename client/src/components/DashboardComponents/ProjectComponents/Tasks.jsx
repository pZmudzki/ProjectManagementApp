import React, { useState, useEffect, useContext } from "react";
import CreateTaskModal from "./CreateTaskModal";

import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

import TaskCard from "./TaskCard";

import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const sortOptions = ["Latest Date", "Oldest Date", "Name A-Z", "Name Z-A"];
const sortMethods = {
  "Latest Date": {
    method: (a, b) => {
      if (a.fromDate > b.fromDate) {
        return -1;
      }
      if (a.fromDate < b.fromDate) {
        return 1;
      }
      return 0;
    },
  },
  "Oldest Date": {
    method: (a, b) => {
      if (a.fromDate < b.fromDate) {
        return -1;
      }
      if (a.fromDate > b.fromDate) {
        return 1;
      }
      return 0;
    },
  },
  "Name A-Z": {
    method: (a, b) => {
      if (a.taskName < b.taskName) {
        return -1;
      }
      if (a.taskName > b.taskName) {
        return 1;
      }
      return 0;
    },
  },
  "Name Z-A": {
    method: (a, b) => {
      if (a.taskName > b.taskName) {
        return -1;
      }
      if (a.taskName < b.taskName) {
        return 1;
      }
      return 0;
    },
  },
};

export default function Tasks() {
  const [createTaskModalActive, setCreateTaskModalActive] = useState(false);
  const { tasks } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const [sortState, setSortState] = useState("Latest Date");
  const [tasksForSelectedProject, setTasksForSelectedProject] = useState([]);

  useEffect(() => {
    setTasksForSelectedProject(() => {
      const filteredTasks = tasks.filter(
        (task) => task.project === selectedProject._id
      );
      return filteredTasks;
    });
  }, [tasks]);

  return (
    <>
      {tasksForSelectedProject.length > 0 ? (
        <div className="flex flex-col gap-2 p-3 overflow-y-scroll w-full">
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="border-2 flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-indigo-300"
              onClick={() => setCreateTaskModalActive(true)}
            >
              <span>Add new task</span>
              <DocumentPlusIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* sort tasks */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => setSortState(e.target.value)}
              className="border-2 rounded border-gray-400 self-end"
            >
              {sortOptions.map((option, idx) => {
                return (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {tasksForSelectedProject.length !== 0 ? (
              <ul className="flex flex-col gap-2">
                {tasksForSelectedProject
                  .sort(sortMethods[sortState].method)
                  .map((task) => {
                    return <TaskCard key={task._id} task={task} />;
                  })}
              </ul>
            ) : (
              <div>There are no tasks</div>
            )}
          </div>
          {createTaskModalActive && (
            <CreateTaskModal
              setCreateTaskModalActive={setCreateTaskModalActive}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-2xl">There are no tasks</h1>
          <button
            type="button"
            className="border-2 flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-indigo-300"
            onClick={() => setCreateTaskModalActive(true)}
          >
            <span>Add new task</span>
            <DocumentPlusIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          {createTaskModalActive && (
            <CreateTaskModal
              setCreateTaskModalActive={setCreateTaskModalActive}
            />
          )}
        </div>
      )}
    </>
  );
}
