import React, { useState, useEffect, useContext } from "react";
import CreateTaskModal from "./CreateTaskModal";

import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";

import TaskCard from "./TaskCard";

import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const filterOptions = ["All", "Completed", "In Progress", "Not Started"];
const filterMethods = {
  All: {
    method: (task) => {
      return task;
    },
  },
  Completed: {
    method: (task) => {
      return task.status === "Completed";
    },
  },
  "In Progress": {
    method: (task) => {
      return task.status === "In Progress";
    },
  },
  "Not Started": {
    method: (task) => {
      return task.status === "Not Started";
    },
  },
};

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
  const { tasks, tasksAdmin } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const { user } = useContext(UserContext);
  const [sortState, setSortState] = useState("Latest Date");
  const [filterState, setFilterState] = useState("All");
  const [tasksForSelectedProject, setTasksForSelectedProject] = useState([]);
  // show all tasks that are relatable to project
  const [showAdminTasks, setShowAdminTasks] = useState(false);

  useEffect(() => {
    setTasksForSelectedProject(() => {
      if (user._id === selectedProject.projectManager && showAdminTasks) {
        return tasksAdmin.filter(
          (task) => task.project === selectedProject._id
        );
      } else {
        return tasks.filter((task) => task.project === selectedProject._id);
      }
    });
  }, [tasks, showAdminTasks, selectedProject, tasksAdmin]);

  return (
    <>
      {tasksForSelectedProject.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 p-3 h-full">
            <div className="flex flex-col">
              {user._id === selectedProject.projectManager && (
                <div className="flex gap-1 text-xs items-center justify-end">
                  <label>Show all tasks</label>
                  <input
                    type="checkbox"
                    value={showAdminTasks}
                    onChange={() => setShowAdminTasks(!showAdminTasks)}
                  />
                </div>
              )}
              <div className="flex justify-between items-center gap-2">
                {/* new task button */}
                <button
                  type="button"
                  className="border-2 flex items-center gap-2 rounded-lg sm:px-2 sm:py-1 hover:bg-indigo-300"
                  onClick={() => setCreateTaskModalActive(true)}
                >
                  <span className="text-xs sm:text-lg">New task</span>
                  <DocumentPlusIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex text-xs sm:text-lg">
                  {/* filter tasks */}
                  <select
                    name="filter"
                    id="filter"
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="border-2 rounded border-gray-400 self-end"
                  >
                    {filterOptions.map((option, idx) => {
                      return (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                  {/* sort tasks */}
                  <select
                    name="sort"
                    id="sort"
                    value={sortState}
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
              </div>
            </div>
            <div>
              {tasksForSelectedProject.length !== 0 ? (
                <ul className="flex flex-col gap-2">
                  {tasksForSelectedProject
                    .filter(filterMethods[filterState].method)
                    .sort(sortMethods[sortState].method)
                    .map((task) => {
                      return <TaskCard key={task._id} task={task} />;
                    })}
                </ul>
              ) : (
                <div>There are no tasks</div>
              )}
            </div>
          </div>
          {createTaskModalActive && (
            <CreateTaskModal
              setCreateTaskModalActive={setCreateTaskModalActive}
            />
          )}
        </>
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
