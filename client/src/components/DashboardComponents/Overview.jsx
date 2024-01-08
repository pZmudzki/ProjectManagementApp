import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ProjectCard from "./ProjectComponents/ProjectCard";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";
import NoProjectsMessage from "./ProjectComponents/NoProjectsMessage";

// context
import { ProjectsContext } from "../../../context/projectContext";
import { TasksContext } from "../../../context/tasksContext";

export default function Overview() {
  const { projects } = useContext(ProjectsContext);
  const { allTasks } = useContext(TasksContext);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  function transformDate(date) {
    const dateObj = new Date(date);
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    if (minute < 10) minute = "0" + minute;
    if (hour < 10) hour = "0" + hour;

    return `${hour}:${minute}`;
  }

  return (
    <div className="p-6">
      {!createProjectModal ? (
        <div>
          {projects.length > 0 ? (
            <div className="flex justify-between">
              <section className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Projects</h1>
                <div className="flex flex-col gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </section>
              <section className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Tasks Today</h1>
                  <Link
                    to="/dashboard/calendar"
                    className=" relative before:absolute before:h-1 before:w-0 before:bg-indigo-500 before:bottom-0 before:left-0 before:rounded-lg before:z-0 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full hover:before:z-10 hover:before:duration-300 hover:before:ease-in-out hover:before:bg-indigo-500 hover:before:bottom-0 hover:before:left-0 hover:before:rounded-lg hover:before:h-1 "
                  >
                    <span>View Calendar &rarr;</span>
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  {allTasks.map((task) => (
                    <div className="bg-indigo-200 rounded-lg shadow-lg p-4 w-80">
                      <span className="text-sm text-end">
                        {transformDate(task.fromDate)} -{" "}
                        {transformDate(task.toDate)}
                      </span>
                      <h1 className="text-xl font-bold">{task.taskName}</h1>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <NoProjectsMessage setCreateProjectModal={setCreateProjectModal} />
          )}
        </div>
      ) : (
        <CreateProjectModal modalActive={setCreateProjectModal} />
      )}
    </div>
  );
}
