import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader";
//context
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectOverview() {
  const { user } = useContext(UserContext);
  const { selectedProject } = useContext(SelectedProjectContext);
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);
  const [tasksData, setTasksData] = useState([]);
  // data for doughnut chart
  // const [data, setData] = useState(null);

  useEffect(() => {
    const getProjectData = async () => {
      try {
        await axios
          .get(`/api/project/${selectedProject._id}/getProjectInfo`)
          .then((res) => {
            setProjectData(res.data.project);
            setTasksData(() => {
              const groupedTasks = res.data.tasks.reduce(
                (acc, task) => {
                  if (task.status === "Completed") {
                    acc.completed.push(task);
                  } else if (task.status === "In Progress") {
                    acc.inProgress.push(task);
                  } else if (task.status === "Not Started") {
                    acc.notStarted.push(task);
                  }
                  return acc;
                },
                { completed: [], inProgress: [], notStarted: [] }
              );

              return groupedTasks;
            });
            setLoading(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    getProjectData();
  }, [selectedProject]);

  function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return (
      <p className="text-xs sm:text-base font-bold">
        {day}/{month}/{year} <span>at</span> {hours}:{minutes}
      </p>
    );
  }

  function projectStatus(status) {
    switch (status) {
      case "Not Started":
        return "bg-red-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col h-full">
      <header className="flex justify-between items-center border-b p-3">
        <h1 className="text-xl sm:text-3xl font-bold">
          {projectData.projectName}
        </h1>
        <span className="flex gap-2 items-center">
          <span className="text-xs sm:text-base">Created:</span>{" "}
          {formatDate(projectData.createdAt)}
        </span>
      </header>
      <main className="flex flex-col lg:flex-row">
        <div className="grow border-b sm:border-r sm:border-b-0 p-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col border-b pb-3">
              <h2 className="text-xl font-bold">Description</h2>{" "}
              {projectData.projectDescription}
            </div>
            <div
              className={`flex flex-col text-white border-b p-3 ${projectStatus(
                projectData.status
              )}`}
            >
              <h2 className="text-xl font-bold">Status</h2> {projectData.status}
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* project manager card */}
              <div className="flex flex-col grow">
                <h2 className="text-xl font-bold">Project Manager</h2>
                <Link
                  to={
                    projectData.projectManager._id === user._id
                      ? "/dashboard/userprofile"
                      : "/dashboard/team"
                  }
                  className="flex  justify-between items-center border-2 border-indigo-400 rounded-tl-full rounded-bl-full bg-indigo-100 transition hover:bg-indigo-200 pr-2"
                >
                  <img
                    src={projectData.projectManager.profilePicture}
                    className="h-10 w-10 sm:h-20 sm:w-20 object-cover rounded-full outline outline-2 outline-indigo-400"
                  />
                  <div className="flex flex-wrap justify-end sm:justify-between items-center gap-2">
                    <p className="text-xl font-bold">
                      {projectData.projectManager._id === user._id
                        ? "You"
                        : projectData.projectManager.username}
                    </p>
                    <p className="text-xl font-bold">
                      {projectData.projectManager.email}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col grow">
                <h2 className="text-xl font-bold">Team</h2>{" "}
                <div className="flex flex-col gap-2">
                  {projectData.projectTeam.map((member) => (
                    <Link
                      key={member._id}
                      to={
                        member._id === user._id
                          ? "/dashboard/userprofile"
                          : "/dashboard/team"
                      }
                      className="flex  justify-between items-center border-2 border-indigo-400 rounded-tl-full rounded-bl-full bg-indigo-100 transition hover:bg-indigo-200 pr-2"
                    >
                      <img
                        src={member.profilePicture}
                        className="h-10 w-10 sm:h-20 sm:w-20 object-cover rounded-full outline outline-2 outline-indigo-400"
                      />
                      <div className="flex flex-wrap justify-end sm:justify-between items-center gap-2">
                        <p className="text-xl font-bold">
                          {member._id === user._id ? "You" : member.username}
                        </p>
                        <p className="text-xl font-bold">{member.email}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-3 h-full">
          <p className="text-xl">Tasks</p>
          <div className="min-w-sm sm:min-w-lg">
            <Doughnut
              data={{
                labels: ["Completed", "In Progress", "Not Started"],
                datasets: [
                  {
                    label: "# of Tasks",
                    data: [
                      tasksData.completed.length,
                      tasksData.inProgress.length,
                      tasksData.notStarted.length,
                    ],
                    backgroundColor: [
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderColor: [
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
