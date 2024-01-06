import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

import LoadingButton from "../../LoadingButton";

// context
import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";
// for date picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";

import "../dashboard.css";

import { setDefaultOptions } from "date-fns";
setDefaultOptions({ weekStartsOn: 1 });

export default function CreateTaskModal({ setCreateTaskModalActive }) {
  const { setTasks } = useContext(TasksContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const { user } = useContext(UserContext);

  const [sendingRequest, setSendingRequest] = useState(false);

  const [task, setTask] = useState({
    taskName: "",
    description: "",
    status: "Not Started",
    priority: "Low",
    fromDate: getDateSetter("start"),
    toDate: getDateSetter("end"),
    project: selectedProject._id,
    assignedTo: user.email,
  });

  // helper for getting a dates that are either 2hours from now or 4 hours from now
  function getDateSetter(type) {
    if (type === "start") {
      const newDate = new Date();
      newDate.setHours(newDate.getHours() + 2);
      return newDate;
    }
    if (type === "end") {
      const newDate = new Date();
      newDate.setHours(newDate.getHours() + 4);
      return newDate;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTask(() => {
      return { ...task, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSendingRequest(true);
    try {
      await axios
        .post("/api/project/createTask", task)
        .then((res) => {
          if (res.data.error) {
            setSendingRequest(false);
            toast.error(res.data.error);
          } else {
            setTasks((prevTasks) => {
              return [...prevTasks, res.data.task];
            });
            toast.success(res.data.message);
            setSendingRequest(false);
            setTask({
              taskName: "",
              description: "",
              status: "Not Started",
              fromDate: getDateSetter("start"),
              toDate: getDateSetter("end"),
              project: selectedProject._id,
              assignedTo: user.email,
            });
            setCreateTaskModalActive(false);
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
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="modal bg-indigo-50 border-4 border-indigo-600 px-4 py-2 rounded-lg">
          <div>
            <div className="flex items-center mb-4 font-bold gap-2">
              <PencilSquareIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-base sm:text-lg font-bold">New Task</h1>
            </div>
            <XMarkIcon
              className="h-6 w-6 text-white bg-red-500 rounded-lg absolute right-2 top-2 cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={() => setCreateTaskModalActive(false)}
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex flex-col grow">
                <label htmlFor="taskName" className="text-xs sm:text-base">
                  Task Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={task.taskName}
                  className="border-2 border-indigo-300 rounded-md px-1"
                />
              </div>
              <div className="flex flex-col grow">
                <label htmlFor="assignedTo" className="text-xs sm:text-base">
                  Assigned To
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  id="assignedTo"
                  name="assignedTo"
                  value={task.assignedTo}
                  className="border-2 border-indigo-300 rounded-md px-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-xs sm:text-base">
                Description
              </label>
              <textarea
                onChange={handleChange}
                cols="20"
                rows="3"
                id="description"
                name="description"
                value={task.description}
                className="resize-none border-2 border-indigo-300 rounded-md px-1"
              />
            </div>
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex flex-col grow">
                <label htmlFor="status" className="text-xs sm:text-base">
                  Status
                </label>
                <select
                  onChange={handleChange}
                  id="status"
                  name="status"
                  value={task.status}
                  className="border-2 border-indigo-300 rounded-md px-1"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col grow">
                <label htmlFor="priority" className="text-xs sm:text-base">
                  Priority
                </label>
                <select
                  onChange={handleChange}
                  id="priority"
                  name="priority"
                  value={task.priority}
                  className="border-2 border-indigo-300 rounded-md px-1"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap mb-3">
              <div className="flex flex-col">
                <p className="text-xs sm:text-base">From date</p>
                <div className="z-50">
                  <DateTimePicker
                    disablePast={true}
                    value={dayjs(task.fromDate)}
                    onChange={(newDate) => {
                      setTask(() => {
                        return { ...task, fromDate: dayjs(newDate) };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs sm:text-base">To date</p>
                <div className="z-50">
                  <DateTimePicker
                    disablePast={true}
                    value={dayjs(task.toDate)}
                    onChange={(newDate) => {
                      setTask(() => {
                        return { ...task, toDate: dayjs(newDate) };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 rounded-md px-2 py-1 w-full text-white transition duration-200 ease-in-out"
              >
                {sendingRequest ? <LoadingButton /> : <span>Create Task</span>}
              </button>
            </div>
          </form>
        </div>
        <div
          onClick={() => setCreateTaskModalActive(false)}
          className="bg-modal"
        ></div>
      </LocalizationProvider>
    </>
  );
}
