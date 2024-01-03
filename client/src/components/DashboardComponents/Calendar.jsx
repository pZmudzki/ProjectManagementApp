import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Loader from "../Loader";
import { Scheduler } from "@aldabil/react-scheduler";

import { TasksContext } from "../../../context/tasksContext";

const defaultSettings = {
  weekDays: [0, 1, 2, 3, 4, 5, 6],
  weekStartOn: 1,
  startHour: 6,
  endHour: 22,
  step: 30,
};

export default function Calendar() {
  const { tasks, setTasks } = useContext(TasksContext); // get tasks from TasksContext

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(() => {
      return tasks.map((task) => {
        return {
          event_id: task._id,
          title: task.taskName,
          start: new Date(task.fromDate),
          end: new Date(task.toDate),
          assignedTo: task.assignedTo,
          description: task.description,
          status: task.status,
          priority: task.priority,
        };
      });
    });
    setLoading(false);
  }, [tasks]);

  // handle confirm
  function handleConfirm(event, action) {
    console.log(event);
    console.log(action);
    // if (action === "add") {
    //   axios
    //     .post("/api/project/createTask", event)
    //     .then((res) => {
    //       setTasksAdmin((prevTasks) => {
    //         return [...prevTasks, res.data.task];
    //       });
    //       setTasks((prevTasks) => {
    //         return [...prevTasks, res.data.task];
    //       });
    //       toast.success(res.data.message);
    //     })
    //     .catch((err) => {
    //       toast.error(err.response.data.message);
    //     });
    // }
    // if (action === "edit") {
    //   axios
    //     .patch(`/api/project/updateTask/${event.event_id}`, event)
    //     .then((res) => {
    //       setTasksAdmin((prevTasks) => {
    //         return prevTasks.map((task) => {
    //           if (task._id === res.data.task._id) {
    //             return res.data.task;
    //           }
    //           return task;
    //         });
    //       });
    //       setTasks((prevTasks) => {
    //         return prevTasks.map((task) => {
    //           if (task._id === res.data.task._id) {
    //             return res.data.task;
    //           }
    //           return task;
    //         });
    //       });
    //       toast.success(res.data.message);
    //     })
    //     .catch((err) => {
    //       toast.error(err.response.data.message);
    //     });
    // }
  }

  // handle delete
  function handleDelete(id) {
    console.log(id);
    axios
      .delete(`/api/project/deleteTask/${id}`)
      .then((res) => {
        setTasksAdmin((prevTasks) => {
          return prevTasks.filter((task) => task._id !== id);
        });
        setTasks((prevTasks) => {
          return prevTasks.filter((task) => task._id !== id);
        });
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(res.data.error);
      });
  }

  console.log(events);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Scheduler
          view="month"
          height="700"
          month={defaultSettings}
          week={defaultSettings}
          day={defaultSettings}
          events={events}
          fields={[
            {
              name: "assignedTo",
              type: "input",
              config: {
                label: "Assigned To",
                required: true,
                min: 3,
                variant: "outlined",
              },
            },
            {
              name: "description",
              type: "input",
              config: {
                label: "Description",
                required: false,
                min: 3,
                variant: "outlined",
              },
            },
            {
              name: "status",
              type: "select",
              options: [
                { id: 1, text: "Not Started", value: "Not Started" },
                { id: 2, text: "In Progress", value: "In Progress" },
                { id: 3, text: "Completed", value: "Completed" },
              ],
              config: {
                label: "Status",
                required: true,
              },
            },
            {
              name: "priority",
              type: "select",
              options: [
                { id: 1, text: "Low", value: "Low" },
                { id: 2, text: "Medium", value: "Medium" },
                { id: 3, text: "High", value: "High" },
              ],
              config: {
                label: "Priority",
                required: true,
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
          onConfirm={(event, action) => {
            // handleConfirm(event, action);
            console.log(event);
            console.log(action);
          }}
          // onDelete={(id) => handleDelete(id)}
        />
      )}
    </>
  );
}
