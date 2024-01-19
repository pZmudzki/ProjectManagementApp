import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

import "../dashboard.css";

import DeleteTaskButton from "./DeleteTaskButton";
import UpdateTaskButtons from "./UpdateTaskButtons";

//context
import { UserContext } from "../../../../context/userContext";
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

export default function TaskModal({ task, setTaskModalActive }) {
  const { user } = useContext(UserContext);
  const { selectedProject } = useContext(SelectedProjectContext);

  const [loading, setLoading] = useState(true);
  const [currentComment, setCurrentComment] = useState("");
  const [comments, setComments] = useState([]);

  async function sendComment(e) {
    e.preventDefault();
    try {
      await axios
        .post(`/api/project/createComment/${task._id}`, {
          comment: currentComment,
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setCurrentComment("");
            setComments(res.data.comments);
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }
  // Get comments
  useEffect(() => {
    async function getComments() {
      try {
        await axios.get(`/api/project/getComments/${task._id}`).then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
            setLoading(false);
          } else {
            setComments(res.data.comments);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
    }

    getComments();
  }, []);

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return (
      <p className="text-xs md:text-base">
        {day}/{month}/{year} <span>at</span> {hours}:{minutes}
      </p>
    );
  }

  function taskPriority(priority) {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-600";
    }
  }

  return (
    <>
      <div className="modal flex flex-col gap-2 bg-indigo-50 dark:bg-neutral-800 border-4 border-indigo-600 px-4 py-2 rounded-lg">
        <XMarkIcon
          className="h-6 w-6 text-white bg-red-500 rounded-lg absolute right-2 top-2 cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
          onClick={() => setTaskModalActive(false)}
        />
        <div className="flex justify-center pb-4 pt-2 min-w-96">
          <UpdateTaskButtons task={task} />
        </div>
        <div className="flex justify-end gap-1 font-bold">
          {formatDate(task.fromDate)} <span>-</span> {formatDate(task.toDate)}
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col grow">
            <span className="text-xs sm:text-base">Title</span>
            <span className="text-sm md:text-2xl font-bold">
              {task.taskName}
            </span>
          </div>
          <div className="flex flex-col grow">
            <span className="text-xs sm:text-base">Assigned To</span>
            <span className="text-sm md:text-2xl font-bold">
              {task.assignedTo}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs sm:text-base">Description</span>
            <span className="text-sm md:text-2xl font-bold">
              {task.description}
            </span>
          </div>
          <div className="flex flex-col grow">
            <span className="text-xs sm:text-base">Priority</span>
            <span
              className={`text-sm md:text-2xl font-bold ${taskPriority(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          </div>
        </div>
        {user._id === selectedProject.projectManager._id && (
          <div className="flex justify-end">
            <DeleteTaskButton id={task._id} />
          </div>
        )}
        {/* comment section */}
        <div className="p-2 border-t-2 border-black bg-indigo-200 dark:bg-neutral-700 rounded-lg flex flex-col gap-2">
          <form onSubmit={sendComment} className="relative">
            <input
              type="text"
              placeholder="Add a comment"
              className=" rounded-full px-2 py-1 w-full outline outline-2 outline-gray-300 dark:outline-indigo-600 dark:bg-gray-700"
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 top-0  flex items-center justify-center bg-indigo-500 rounded-full text-white font-bold p-2"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
          {/* comments list */}
          <div className="flex flex-col gap-2 max-h-44 overflow-y-auto ">
            {loading ? (
              <p>Loading...</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-2 border-indigo-500 bg-indigo-50 dark:bg-neutral-800 rounded-lg p-2 flex flex-col gap-2 "
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <img
                        src={comment.user.profilePicture}
                        alt="profile picture"
                        className="h-8 w-8 rounded-full object-cover border-2 border-indigo-500"
                      />
                      <p className="font-bold">{comment.user.username}</p>
                    </div>
                    <div className="flex justify-end">
                      {formatDate(comment.createdDate)}
                    </div>
                  </div>
                  <p>Comment: {comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center">No comments yet</p>
            )}
          </div>
        </div>
      </div>
      <div onClick={() => setTaskModalActive(false)} className="bg-modal"></div>
    </>
  );
}
