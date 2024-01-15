import { useState, useContext } from "react";
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
  const { tasks } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const { user } = useContext(UserContext);
  // sorting options
  const [sortState, setSortState] = useState("Latest Date");
  // filtering options
  const [filterState, setFilterState] = useState("All");
  // search bar
  const [searchTask, setSearchTask] = useState("");
  // show all tasks that are relatable to project
  const [showOnlyUsersTasks, setShowOnlyUsersTasks] = useState(false);

  function handleSearch(e) {
    setSearchTask(e.target.value);
  }

  return (
    <>
      {tasks.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 p-3 h-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                {/* new task button */}
                <button
                  type="button"
                  className=" text-white border-2 dark:border-indigo-600 flex items-center gap-2 rounded-xl p-1 sm:px-2 sm:py-1 bg-indigo-500 hover:bg-indigo-600 transition duration-300 ease-in-out"
                  onClick={() => setCreateTaskModalActive(true)}
                >
                  <span className="text-xs sm:text-lg">New task</span>
                  <DocumentPlusIcon
                    className="h-4 w-4 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  />
                </button>
                {user._id === selectedProject.projectManager._id && (
                  <div className="flex gap-1 text-xs items-center justify-end">
                    <label>Show only your tasks</label>
                    <input
                      type="checkbox"
                      checked={showOnlyUsersTasks}
                      value={showOnlyUsersTasks}
                      onChange={() =>
                        setShowOnlyUsersTasks(!showOnlyUsersTasks)
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center gap-2">
                <input
                  type="text"
                  id="searchbar"
                  name="searchbar"
                  placeholder="Search tasks"
                  className="bg-gray-200 py-1 px-2 rounded-xl text-xs sm:text-lg outline outline-2 outline-gray-300 dark:outline-indigo-600 dark:bg-gray-700"
                  value={searchTask}
                  onChange={handleSearch}
                />
                <div className="flex text-xs sm:text-lg gap-2">
                  {/* filter tasks */}
                  <select
                    name="filter"
                    id="filter"
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="border-2 rounded border-gray-400 self-end dark:border-indigo-600 dark:bg-gray-700"
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
                    className="border-2 rounded border-gray-400 self-end dark:border-indigo-600 dark:bg-gray-700"
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
              <ul className="flex flex-col gap-2">
                {tasks
                  .filter(filterMethods[filterState].method)
                  .filter((task) => {
                    if (showOnlyUsersTasks) {
                      return task.assignedTo === user.email;
                    } else {
                      return task;
                    }
                  })
                  .filter((task) => {
                    if (searchTask === "") {
                      return task;
                    } else if (
                      task.taskName
                        .toLowerCase()
                        .includes(searchTask.toLowerCase())
                    ) {
                      return task;
                    } else if (
                      task.description
                        .toLowerCase()
                        .includes(searchTask.toLowerCase())
                    ) {
                      return task;
                    } else if (
                      task.assignedTo
                        .toLowerCase()
                        .includes(searchTask.toLowerCase())
                    ) {
                      return task;
                    }
                  })
                  .sort(sortMethods[sortState].method)
                  .map((task) => {
                    return <TaskCard key={task._id} task={task} />;
                  })}
              </ul>
            </div>
          </div>
          {createTaskModalActive && (
            <CreateTaskModal
              setCreateTaskModalActive={setCreateTaskModalActive}
            />
          )}
        </>
      ) : (
        <div className="h-full flex flex-col gap-2 items-center justify-center">
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
