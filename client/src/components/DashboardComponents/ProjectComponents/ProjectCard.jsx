import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  function handleProjectClick() {
    navigate(`/dashboard/projects/${project._id}`);
  }

  function projectStatus() {
    // const defaultStatusStyles = "self-end text-xs";
    switch (project.status) {
      case "Not Started":
        return "bg-red-500";
      case "In Progress":
        return "bg-yellow-300";
      case "Completed":
        return "bg-green-300";
      default:
        return "bg-red-500";
    }
  }

  return (
    <article
      onClick={handleProjectClick}
      className="cursor-pointer transition-all hover:scale-110 "
    >
      <div className="bg-indigo-400 py-4 px-6 w-60 h-36 flex flex-col rounded-lg relative">
        <h1 className="text-2xl line-clamp-1 first-letter: capitalize">
          {project.projectName}
        </h1>
        <p className="line-clamp-3 text-xs">{project.projectDescription}</p>
        {/* status bar */}
        <div
          className={`${projectStatus()} absolute py-1 px-2 rounded-lg border-white border-2 -top-3 -right-3`}
        >
          <h3 className="text-xs  top-0 right-0">{project.status}</h3>
        </div>
        <p className="flex text-xs py-1 px-2 bg-white max-w-fit rounded-lg absolute bottom-2 right-2">
          Menage <ArrowRightIcon className="block h-4 w-4" aria-hidden="true" />
        </p>
      </div>
    </article>
  );
}
