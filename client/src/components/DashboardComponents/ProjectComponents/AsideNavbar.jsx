import React, { useState, useContext } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import { Link } from "react-router-dom";

// context
// import { SelectedProjectContext } from "../../../../context/selectedProjectContext";

import {
  ArchiveBoxXMarkIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function AsideNavbar({
  projectViewOpened,
  setProjectViewOpened,
}) {
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex flex-col justify-between w-max bg-indigo-600 p-3">
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => {
            setProjectViewOpened("overview");
            setIsNavOpen(false);
          }}
          type="button"
          className={
            "flex justify-between items-center w-full text-white rounded-lg px-2 py-1 hover:bg-indigo-300 " +
            (projectViewOpened === "overview" ? "bg-indigo-400" : "")
          }
        >
          {isNavOpen && <h2>Overview</h2>}
          <DocumentMagnifyingGlassIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <button
          onClick={() => {
            setProjectViewOpened("tasks");
            setIsNavOpen(false);
          }}
          type="button"
          className={
            "flex justify-between items-center w-full text-white rounded-lg px-2 py-1 hover:hover:bg-indigo-300 " +
            (projectViewOpened === "tasks" ? "bg-indigo-400" : "")
          }
        >
          {isNavOpen && <h2>Tasks</h2>}
          <ClipboardDocumentListIcon className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        type="button"
        className="grow self-end text-white"
      >
        <ChevronRightIcon
          className={`h-8 w-8 hover:scale-125 transition-scale duration-300 ease-in-out
            ${isNavOpen ? "rotate-180 transition-rotate duration-700" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => {
            setProjectViewOpened("settings");
            setIsNavOpen(false);
          }}
          type="button"
          className={
            "flex justify-between items-center w-full text-white rounded-lg px-2 py-1 hover:bg-indigo-300 " +
            (projectViewOpened === "settings" ? "bg-indigo-400" : "")
          }
        >
          {isNavOpen && <h2>Settings</h2>}
          <Cog6ToothIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="flex justify-between items-center gap-3 w-full text-white rounded-lg px-2 py-1 hover:bg-indigo-300"
          onClick={() => {
            setModalDeleteActive(true);
            setIsNavOpen(false);
          }}
        >
          {isNavOpen && <h2 className="shrink-0">Delete Project</h2>}
          <ArchiveBoxXMarkIcon
            className="h-6 w-6 sm:h-8 sm:w-8"
            aria-hidden="true"
          />
        </button>
      </div>
      {modalDeleteActive && (
        <DeleteProjectModal
          setProjectViewOpened={setProjectViewOpened}
          setActive={setModalDeleteActive}
        />
      )}
    </div>
  );
}
