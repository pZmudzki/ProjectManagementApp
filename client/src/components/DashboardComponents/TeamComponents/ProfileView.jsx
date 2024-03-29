import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Battery0Icon,
  Battery50Icon,
  Battery100Icon,
  ArchiveBoxIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

import Loader from "../../Loader";

export default function ProfileView() {
  const [selectedUser, isSidebarOpen] = useOutletContext();
  const [userInfo, setUserInfo] = useState({
    completedTasks: [],
    inProgressTasks: [],
    notStartedTasks: [],
    tasks: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);

  // get user info
  useEffect(() => {
    async function getUserInfo() {
      try {
        await axios
          .get(`/api/project/getUserInfo/${selectedUser._id}`)
          .then((res) => {
            if (res.data.error) {
              return toast.error(res.data.error);
            }
            setUserInfo({
              completedTasks: res.data.tasks.filter(
                (task) => task.status === "Completed"
              ),
              inProgressTasks: res.data.tasks.filter(
                (task) => task.status === "In Progress"
              ),
              notStartedTasks: res.data.tasks.filter(
                (task) => task.status === "Not Started"
              ),
              tasks: res.data.tasks,
              projects: res.data.projects,
            });
            setLoading(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    getUserInfo();
  }, [selectedUser]);

  return (
    <div className="bg-white w-full h-full overflow-y-auto dark:text-white dark:bg-neutral-800">
      <header>
        <div className="h-28 flex items-end justify-end relative border-b-2 dark:border-gray-600 bg-indigo-50 dark:bg-neutral-900 p-1 md:px-6">
          <img
            src={selectedUser.profilePicture}
            alt="user profile picture"
            className=" h-40 w-40 rounded-full mx-auto object-cover outline outline-2 outline-indigo-500 absolute -bottom-20 left-10"
          />
          <h1 className="text-3xl font-bold">{selectedUser.username}</h1>
        </div>
        <div className="h-28 flex items-start justify-end p-1 md:px-6">
          <h2 className="text-end text-2xl font-bold">{selectedUser.email}</h2>
        </div>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <main className={`flex ${isSidebarOpen ? "flex-col" : ""} gap-5`}>
          <div className="flex flex-col items-center gap-5 border-r-2 w-full">
            <div className="flex flex-col justify-center text-2xl">
              <Battery100Icon className="h-10 w-10 text-green-500" />
              <div className="flex">
                <h2>Completed Tasks:</h2>
                <span className="font-bold">
                  {userInfo.completedTasks.length}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center text-2xl">
              <Battery50Icon className="h-10 w-10 text-yellow-500" />
              <div className="flex">
                <h2>In-progress Tasks:</h2>
                <span className="font-bold">
                  {userInfo.inProgressTasks.length}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center text-2xl">
              <Battery0Icon className="h-10 w-10 text-red-500" />
              <div className="flex">
                <h2>Not Starded Tasks:</h2>
                <span className="font-bold">
                  {userInfo.notStartedTasks.length}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-col text-2xl">
              <div className="flex gap-2 items-center">
                <ArchiveBoxIcon className="h-10 w-10 text-indigo-500" />
                <h2>Projects:</h2>
              </div>
              <ul className="flex flex-col gap-2">
                {userInfo.projects.map((project) => {
                  return (
                    <li
                      key={project._id}
                      className="px-10 flex text-lg items-center flex-wrap"
                    >
                      <h3 className="text-lg font-bold">
                        - {project.projectName}
                      </h3>
                      <span className="text-base">
                        (
                        {selectedUser._id === project.projectManager
                          ? "Project Manager"
                          : "Team Mamber"}
                        )
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col text-2xl">
              <div className="flex gap-2 items-center">
                <DocumentIcon className="h-10 w-10 text-indigo-500" />
                <h2>Assigned Tasks:</h2>
              </div>
              {userInfo.tasks.length > 0 ? (
                <ul className="flex flex-col max-h-96 overflow-y-auto">
                  {userInfo.tasks.map((task) => {
                    return (
                      <li key={task._id} className="px-10">
                        <h3 className="text-lg font-bold">- {task.taskName}</h3>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <h3 className="text-base font-bold text-center">
                  - No tasks assigned
                </h3>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
