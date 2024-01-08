import { useState } from "react";

import TaskModal from "./TaskModal";

export default function TaskCard({ task }) {
  const [taskModalActive, setTaskModalActive] = useState(false);

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return (
      <p className="text-xs md:text-base">
        {day}/{month}/{year} <span>at</span> {hours}:{minutes}
      </p>
    );
  }

  return (
    <>
      <li
        key={task._id}
        className="border-2 border-indigo-500 bg-indigo-50 rounded-lg grid grid-cols-3 sm:grid-cols-4 grid-rows-2 sm:grid-rows-1 gap-1 py-1 px-2 md:py-2 md:px-4"
      >
        <h1 className=" flex flex-col justify-between ">
          <span className="text-[12px] md:text-sm">Title</span>
          <span className="text-sm md:text-2xl font-bold truncate">
            {task.taskName}
          </span>
        </h1>
        <h2 className=" flex flex-col justify-between ">
          <span className="text-[12px] md:text-sm">Assigned to</span>
          <span className="text-sm md:text-2xl font-bold truncate">
            {task.assignedTo}
          </span>
        </h2>
        <h3 className=" flex flex-col justify-between ">
          <span className="text-[12px] md:text-sm">Priority</span>
          <span className="text-sm md:text-2xl font-bold truncate">
            {task.priority}
          </span>
        </h3>
        <div className="flex sm:flex-col justify-between items-end col-span-3 sm:col-span-1">
          {formatDate(task.fromDate)}
          <button
            name="show task info"
            onClick={() => setTaskModalActive(true)}
            className="flex items-center font-bold text-indigo-800 md:text-2xl relative before:absolute before:h-1 before:w-0 before:bg-indigo-500 before:bottom-0 before:left-0 before:rounded-lg before:z-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:z-10 hover:before:duration-300 hover:before:ease-in-out hover:before:bg-indigo-500 hover:before:bottom-0 hover:before:left-0 hover:before:rounded-lg hover:before:h-1  text-sm "
          >
            Show More &rarr;
          </button>
        </div>
      </li>
      {taskModalActive && (
        <TaskModal task={task} setTaskModalActive={setTaskModalActive} />
      )}
    </>
  );
}
