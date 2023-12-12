import React, { useState } from "react";

import DeleteTaskButton from "./DeleteTaskButton";

export default function TaskCard({ task }) {
  const [showDetails, setShowDetails] = useState(false);

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
  
  function taskPriority(task) {
    switch (task.priority) {
      case "Low":
        return "bg-green-300";
      case "Medium":
        return "bg-yellow-300";
      case "High":
        return "bg-red-500";
      default:
        return "bg-red-500";
    }
  }

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return (
      <p>
        {day}-{month}-{year} <span className="text-lg">at</span> {hours}:
        {minutes}
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
      onClick={() => setShowDetails(!showDetails)}
      key={task._id}
      className={`border-2 flex flex-col rounded-lg ${scaleIfDetails()}`}
    >
      <h3
        className={`${taskStatus(
          task
        )} flex items-center justify-center px-4 border-b-2`}
      >
        {task.status}
      </h3>
      <div className="flex flex-wrap">
        <h1 className=" py-1 px-2 sm:py-2 sm:px-4 flex flex-col justify-between">
          <span className="text-[12px] sm:text-sm">Title</span>
          <span className="text-lg sm:text-2xl font-bold">{task.taskName}</span>
        </h1>
        <h2 className="py-2 px-4 flex flex-col justify-between">
          <span className="text-[12px] sm:text-sm">Assigned to</span>
          <span className="text-lg sm:text-2xl">{task.assignedTo}</span>
        </h2>
        <h3 className={`py-2 px-4 flex flex-col justify-between`}>
          <span className="text-[12px] sm:text-sm">Priority</span>
          <span className={`text-lg sm:text-2xl ${taskPriority(task)} py-1 px-2 rounded-full`}>{task.priority}</span>
        </h3>
        <div className="hidden sm:block">
        <div className="flex flex-wrap">
        <div className=" py-2 px-4 flex flex-col justify-between">
          <span className="text-[12px] sm:text-sm">Start</span>
          <span className="text-lg sm:text-2xl">{formatDate(task.fromDate)}</span>
        </div>
        <div className=" py-2 px-4 flex flex-col justify-between">
          <span className="text-[12px] sm:text-sm">End</span>
          <span className="text-lg sm:text-2xl">{formatDate(task.toDate)}</span>
        </div>
        </div>
        </div>
      </div>

      {showDetails && (
        <div className="flex justify-between py-2 px-4">
          <div className=" flex flex-col justify-between font-normal">
            <span className="text-[12px] sm:text-sm">Description</span>
            <span className="text-md sm:text-lg">{task.description}</span>
          </div>
          <DeleteTaskButton id={task._id} />
        </div>
      )}
    </li>
  );
}
