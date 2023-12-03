import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";
// for date picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

import "../dashboard.css";

import { setDefaultOptions } from "date-fns";
setDefaultOptions({ weekStartsOn: 1 });

export default function CreateTask({
  setCreateTaskModalActive,
  selectedDate,
  selectedTime,
}) {
  const { setTasks } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const { user } = useContext(UserContext);

  console.log(selectedDate, selectedTime);
  // helper for appending date and time
  function appendDateAndTime() {
    var hour = parseInt(selectedTime.hour);
    if (selectedTime.ampm === "PM") {
      hour = hour + 12;
    }
    var date = new Date(
      selectedDate.date.year,
      selectedDate.date.month,
      selectedDate.date.day,
      hour,
      selectedTime.minute
    );
    return date;
  }

  const [task, setTask] = useState({
    taskName: "",
    description: "",
    status: "Not Started",
    fromDate: new Date(appendDateAndTime()),
    toDate: getTwoHoursFromNow(appendDateAndTime()),
    project: selectedProject._id,
    assignedTo: user.email,
  });

  // helper for getting a date 2 hours from now
  function getTwoHoursFromNow(date) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 2);
    return newDate;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTask(() => {
      return { ...task, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios
        .post("/api/project/createTask", task)
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setTasks((prevTasks) => {
              return [...prevTasks, res.data.task];
            });
            toast.success(res.data.message);
            setTask({
              taskName: "",
              description: "",
              status: "Not Started",
              fromDate: new Date(appendDateAndTime),
              toDate: getTwoHoursFromNow(appendDateAndTime),
              project: selectedProject._id,
              assignedTo: user.email,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  console.log(task);
  return (
    <>
      <div className="border-2 border-black modal px-4 py-2 rounded-lg bg-indigo-300">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="taskName">Task Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="taskName"
              name="taskName"
              value={task.taskName}
              className="border-2 border-black rounded"
            />
            <label htmlFor="description">Description</label>
            <textarea
              onChange={handleChange}
              cols="20"
              rows="3"
              id="description"
              name="description"
              value={task.description}
              className="resize-none border-2 border-black rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="assignedTo">Assigned To</label>
            <input
              onChange={handleChange}
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={task.assignedTo}
              className="border-2 border-black rounded"
            />
            <label htmlFor="status">Status</label>
            <select
              onChange={handleChange}
              id="status"
              name="status"
              value={task.status}
              className="border-2 border-black rounded"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <label htmlFor="fromDate">From date</label>
            <div className="z-50">
              <DateTimePicker
                disablePast={true}
                value={dayjs(task.fromDate)}
                onChange={(newDate) => {
                  setTask(() => {
                    return { ...task, fromDate: dayjs(newDate) };
                  });
                  console.log(task);
                }}
              />
            </div>
            <label htmlFor="toDate">To date</label>
            <div className="z-50">
              <DateTimePicker
                disablePast={true}
                value={dayjs(task.toDate)}
                onChange={(newDate) => {
                  setTask(() => {
                    return { ...task, toDate: dayjs(newDate) };
                  });
                  console.log(task);
                }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setCreateTaskModalActive(false)}
              className="border-2 border-red rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => setCreateTaskModalActive(false)}
              className="border-2 border-black rounded"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
      <div
        onClick={() => setCreateTaskModalActive(false)}
        className="bg-modal"
      ></div>
    </>
  );
}
