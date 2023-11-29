import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";
// for date picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function CreateTask() {
  const { setTasks } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const { user } = useContext(UserContext);
  const [task, setTask] = useState({
    taskName: "",
    description: "",
    status: "Not Started",
    dueDate: new Date(),
    project: selectedProject._id,
    assignedTo: user.email,
  });

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
              dueDate: new Date(),
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

  return (
    <div className="border-2">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
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
          <label htmlFor="dueDate">Due date</label>

          <DateTimePicker
            disablePast={true}
            value={dayjs(task.dueDate)}
            onChange={(newDate) => {
              setTask(() => {
                return { ...task, dueDate: dayjs(newDate) };
              });
              console.log(task);
            }}
          />

          <button type="submit" className="border-2 border-black rounded">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
