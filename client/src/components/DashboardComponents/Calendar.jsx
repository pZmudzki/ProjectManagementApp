import React, { useContext } from "react";
import { Scheduler } from "@aldabil/react-scheduler";

import { TasksContext } from "../../../context/tasksContext";

const defaultSettings = {
  startHour: 6,
  endHour: 22,
  // weekDays: [2, 3, 4, 5, 6, 0, 1],
  step: 30,
};

export default function Calendar() {
  const { tasks } = useContext(TasksContext); // get tasks from TasksContext

  // convert tasks to events
  const events = tasks.map((task) => {
    return {
      event_id: task._id,
      title: task.taskName,
      start: new Date(task.fromDate),
      description: task.description,
      end: new Date(task.toDate),
      color: "#4f46e5",
    };
  });

  return (
    <Scheduler
      view="month"
      height="700"
      month={defaultSettings}
      week={defaultSettings}
      day={defaultSettings}
      events={events}
      fields={[
        {
          name: "description",
          type: "input",
          config: {
            label: "Description",
            required: true,
            min: 3,
            variant: "outlined",
          },
        },
      ]}
      viewerTitleComponent={(props) => {
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold">{props.title}</h1>
          </div>
        );
      }}
    />
  );
}
