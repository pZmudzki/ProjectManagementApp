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
    <div className="flex flex-col justify-between h-full w-max bg-gray-100 absolute p-3 z-20">
      <div className="w-full">
        <button
          onClick={() => {
            setProjectViewOpened("overview");
            setIsNavOpen(false);
          }}
          type="button"
          className={
            "flex justify-between items-center w-full hover:bg-gray-200 " +
            (projectViewOpened === "overview" ? "bg-gray-300" : "")
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
            "flex justify-between items-center w-full hover:bg-gray-200 " +
            (projectViewOpened === "tasks" ? "bg-gray-300" : "")
          }
        >
          {isNavOpen && <h2>Tasks</h2>}
          <ClipboardDocumentListIcon className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        type="button"
        className="grow self-end"
      >
        <ChevronRightIcon
          className={
            "h-8 w-8 " +
            (isNavOpen ? "rotate-180 transition-all duration-700" : "")
          }
          aria-hidden="true"
        />
      </button>
      <div className="w-full">
        <button
          type="button"
          className="flex justify-between items-center gap-3 w-full hover:bg-gray-200"
          onClick={() => {
            setModalDeleteActive(true);
            setIsNavOpen(false);
          }}
        >
          {isNavOpen && <h2 className="shrink-0">Delete Project</h2>}
          <ArchiveBoxXMarkIcon
            className="h-8 w-8 text-red-700"
            aria-hidden="true"
          />
        </button>
        <button
          onClick={() => {
            setProjectViewOpened("settings");
            setIsNavOpen(false);
          }}
          type="button"
          className={
            "flex justify-between items-center w-full hover:bg-gray-200 " +
            (projectViewOpened === "settings" ? "bg-gray-300" : "")
          }
        >
          {isNavOpen && <h2>Settings</h2>}
          <Cog6ToothIcon className="h-8 w-8" aria-hidden="true" />
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
