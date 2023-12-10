import React, { useState, useEffect, useContext } from "react";

import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

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
  const { tasks } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const [sortState, setSortState] = useState("Latest Date");
  const [tasksForSelectedProject, setTasksForSelectedProject] = useState(() => {
    const filteredTasks = tasks.filter(
      (task) => task.project === selectedProject._id
    );
    return filteredTasks;
  });
  const [showDetails, setShowDetails] = useState([null]);

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  function taskStatus(task) {
    switch (task.status) {
      case "Not Started":
        return "bg-red-500";
      case "In Progress":
        return "bg-yellow-300";
      case "Completed":
        return "bg-green-300";
      default:
        return "bg-red-500";
    }
  }

  return (
    <div className="flex flex-col gap-2 px-7">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl underline -underline-offset-1">Tasks</h1>
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
                return (
                  <li
                    onClick={() =>
                      setShowDetails({
                        show: !showDetails.show,
                        task: task._id,
                      })
                    }
                    key={task._id}
                    className={`border-2 flex flex-col rounded-lg hover:scale-[1.01] transition-all duration-200 ease-in-out cursor-pointer`}
                  >
                    <h3
                      className={`${taskStatus(
                        task
                      )} flex items-center justify-center text-2xl px-4 border-b-2`}
                    >
                      {task.status}
                    </h3>
                    <div className="flex">
                      <h1 className="text-3xl py-2 px-4 flex flex-col justify-between">
                        <span className="text-sm">Title</span>
                        <span>{task.taskName}</span>
                      </h1>
                      <h2 className="text-2xl py-2 px-4 flex flex-col justify-between">
                        <span className="text-sm">Assigned to</span>
                        <span>{task.assignedTo}</span>
                      </h2>
                      <div className="text-2xl py-2 px-4 flex flex-col justify-between">
                        <span className="text-sm">Start</span>
                        <span>{formatDate(task.fromDate)}</span>
                      </div>
                      <div className="text-2xl py-2 px-4 flex flex-col justify-between">
                        <span className="text-sm">End</span>
                        <span>{formatDate(task.toDate)}</span>
                      </div>
                    </div>

                    {showDetails.show && showDetails.task === task._id && (
                      <div className="text-2xl py-2 px-4 flex flex-col justify-between">
                        <span className="text-sm">Description</span>
                        <span>{task.description}</span>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        ) : (
          <div>There are no tasks</div>
        )}
      </div>
    </div>
  );
}
