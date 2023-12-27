import React from "react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";

export default function NoProjectsMessage({ setCreateProjectModal }) {
  return (
    <section className="h-full flex justify-center items-center ">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold mb-2 mt-10 sm:text-3xl">
          Seems like you don't have any projects yet
        </h1>
        <h2 className="flex mb-7">
          Get started by creating a project below{" "}
          <ArrowSmallDownIcon className="h-6 w-6" aria-hidden="true" />
        </h2>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md max-w-max shadow-sm hover:shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all ease-in-out"
          onClick={() => setCreateProjectModal(true)}
        >
          Create New Project
        </button>
      </div>
    </section>
  );
}
