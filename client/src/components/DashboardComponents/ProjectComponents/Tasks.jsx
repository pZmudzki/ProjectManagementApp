import React, { useState } from "react";
import TaskCalendar from "./TaskCalendar";

export default function Tasks() {
  return (
    <div className="p-2 pb-1 relative">
      <TaskCalendar />
    </div>
  );
}
