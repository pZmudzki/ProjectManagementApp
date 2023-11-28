import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TasksContext } from "../../../../context/tasksContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateTask() {
  const { setTasks } = useContext(TasksContext);
  const [task, setTask] = useState({
    taskName: "",
    description: "",
    status: "Not Started",
    dueDate: new Date(),
    project: "",
    assignedTo: "",
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
              project: "",
              assignedTo: "",
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
    <div className="border-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name</label>
        <input
          onChange={handleChange}
          type="text"
          id="taskName"
          name="taskName"
          value={task.taskName}
        />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          value={task.description}
        />
        <label htmlFor="status">Status</label>
        <select
          onChange={handleChange}
          id="status"
          name="status"
          value={task.status}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <label htmlFor="todoDate">Due date</label>
        <DatePicker
          id="dueDate"
          selected={task.dueDate}
          onChange={(date) =>
            setTask(() => {
              return { ...task, dueDate: date };
            })
          }
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
