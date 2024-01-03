import { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DocumentMinusIcon } from "@heroicons/react/24/outline";

// context
import { TasksContext } from "../../../../context/tasksContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

export default function DeleteTaskButton({ id }) {
  const { selectedProject } = useContext(SelectedProjectContext);
  const { setTasks } = useContext(TasksContext);

  const handleDeleteTask = async () => {
    try {
      await axios
        .delete(`/api/project/${selectedProject._id}/deleteTask/${id}`)
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setTasks(res.data.tasks);
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      type="button"
      className="self-end p-2 rounded-full hover:bg-gray-200"
      onClick={() => handleDeleteTask()}
    >
      <DocumentMinusIcon className="h-7 w-7 text-red-500" aria-hidden={true} />
    </button>
  );
}
