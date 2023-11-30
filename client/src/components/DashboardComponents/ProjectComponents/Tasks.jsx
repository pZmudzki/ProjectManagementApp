import React, { useState } from "react";
import CreateTask from "./CreateTask";
import TaskCalendar from "./TaskCalendar";

export default function Tasks() {
  const [createTaskModalActive, setCreateTaskModalActive] = useState(false);
  console.log(createTaskModalActive);

  return (
    <div className="p-2 pb-1 relative">
      <TaskCalendar setCreateTaskModalActive={setCreateTaskModalActive} />
      {createTaskModalActive && (
        <CreateTask setCreateTaskModalActive={setCreateTaskModalActive} />
      )}
    </div>
  );
}
