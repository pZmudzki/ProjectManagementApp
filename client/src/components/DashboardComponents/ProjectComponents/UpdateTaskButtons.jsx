import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

const statusOptions = ["Not Started", "In Progress", "Completed"];

export default function UpdateTaskButtons({ task }) {
  const [statusState, setStatusState] = useState(task.status);
  const { selectedProject } = useContext(SelectedProjectContext);

  const handleUpdateTaskStatus = async (status) => {
    try {
      await axios
        .put(`/api/project/${selectedProject._id}/updateTask/${task._id}`, {
          status: status,
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setStatusState(res.data.updatedTask.status);
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  function taskStatus(status) {
    if (statusState === status)
      return "bg-indigo-600 text-white outline outline-2 outline-indigo-600 outline-offset-2";
    switch (status) {
      case "Not Started":
        return "bg-red-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-600";
      default:
        return "bg-red-500";
    }
  }

  return (
    <div className="flex gap-4">
      {statusOptions.map((status) => {
        return (
          <button
            key={status}
            type="button"
            className={`px-2 rounded text-xs md:text-base text-white  hover:outline outline-2 outline-indigo-600 outline-offset-2 ${taskStatus(
              status
            )}`}
            onClick={() => {
              handleUpdateTaskStatus(status);
            }}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
