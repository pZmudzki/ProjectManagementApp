import React, { useState } from "react";
import TaskCalendar from "./TaskCalendar";

export default function Tasks() {
  return (
    <div className="bg-gray-100 py-2 relative">
      <TaskCalendar />
    </div>
  );
}
