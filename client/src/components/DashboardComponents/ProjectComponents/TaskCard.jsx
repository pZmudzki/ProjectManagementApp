import { useState, useContext } from "react";

import DeleteTaskButton from "./DeleteTaskButton";
import UpdateTaskButtons from "./UpdateTaskButtons";

//context
import { UserContext } from "../../../../context/userContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

export default function TaskCard({ task }) {
  const [showDetails, setShowDetails] = useState(false);
  const { user } = useContext(UserContext);
  const { selectedProject } = useContext(SelectedProjectContext);

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return (
      <p className="text-xs md:text-base">
        {day}/{month}/{year} <span>at</span> {hours}:{minutes}
      </p>
    );
  }

  function scaleIfDetails() {
    if (showDetails) {
      return "scale-[1.01]";
    } else {
      return "cursor-pointer hover:scale-[1.01] transition-all duration-200 ease-in-out";
    }
  }

  return (
    <li
      key={task._id}
      className={`border-2 flex flex-col rounded-lg ${scaleIfDetails()}`}
    >
      <div className={`flex items-center justify-between px-2 py-1 border-b-2`}>
        <UpdateTaskButtons task={task} />
        <div className="justify-between items-center gap-2 hidden sm:flex">
          {formatDate(task.fromDate)} <span>-</span> {formatDate(task.toDate)}
        </div>
      </div>
      <div className="flex flex-col">
        <div className=" px-2 border-b border-gray-100 justify-end items-center gap-2 flex sm:hidden">
          {formatDate(task.fromDate)} <span>-</span> {formatDate(task.toDate)}
        </div>
        <div
          className="flex flex-wrap"
          onClick={() => setShowDetails(!showDetails)}
        >
          <h1 className=" py-1 px-2 sm:py-2 sm:px-4 flex flex-col justify-between">
            <span className="text-[12px] sm:text-sm">Title</span>
            <span className="text-lg sm:text-2xl font-bold">
              {task.taskName}
            </span>
          </h1>
          <h2 className="py-2 px-4 flex flex-col justify-between">
            <span className="text-[12px] sm:text-sm">Assigned to</span>
            <span className="text-lg sm:text-2xl">{task.assignedTo}</span>
          </h2>
          <h3 className={`py-2 px-4 flex flex-col justify-between`}>
            <span className="text-[12px] sm:text-sm">Priority</span>
            <span className="text-lg sm:text-2xl">{task.priority}</span>
          </h3>
        </div>
      </div>

      {showDetails && (
        <div className="flex justify-between py-2 px-4">
          <div className=" flex flex-col justify-between font-normal">
            <span className="text-[12px] sm:text-sm">Description</span>
            <span className="text-md sm:text-lg">{task.description}</span>
          </div>
          {user._id === selectedProject.projectManager._id && (
            <DeleteTaskButton id={task._id} />
          )}
        </div>
      )}
    </li>
  );
}
