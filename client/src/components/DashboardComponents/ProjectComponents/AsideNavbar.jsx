import React, { useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import { Link } from "react-router-dom";

import {
  ArchiveBoxXMarkIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function AsideNavbar({ projectSelected }) {
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex flex-col justify-between h-full w-max bg-gray-100 absolute p-2 sm:p-3">
      <div className="w-full">
        <button
          onClick={() => setIsNavOpen(false)}
          type="button"
          className="flex justify-between items-center w-full hover:bg-gray-200"
        >
          {isNavOpen && <h2>Overview</h2>}
          <DocumentMagnifyingGlassIcon
            className="h-5 w-5 sm:h-8 sm:w-8"
            aria-hidden="true"
          />
        </button>
        <button
          onClick={() => setIsNavOpen(false)}
          type="button"
          className="flex justify-between items-center w-full hover:bg-gray-200"
        >
          {isNavOpen && <h2>Tasks</h2>}
          <ClipboardDocumentListIcon
            className="h-5 w-5 sm:h-8 sm:w-8"
            aria-hidden="true"
          />
        </button>
      </div>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        type="button"
        className="grow self-end"
      >
        <ChevronRightIcon
          className={
            "h-5 w-5 sm:h-8 sm:w-8 " +
            (isNavOpen ? "rotate-180 transition-all" : "")
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
            className="h-5 w-5 sm:h-8 sm:w-8 text-red-700"
            aria-hidden="true"
          />
        </button>
        <button
          onClick={() => setIsNavOpen(false)}
          type="button"
          className="flex justify-between items-center w-full hover:bg-gray-200"
        >
          {isNavOpen && <h2>Settings</h2>}
          <Cog6ToothIcon className="h-5 w-5 sm:h-8 sm:w-8" aria-hidden="true" />
        </button>
      </div>
      {modalDeleteActive && (
        <DeleteProjectModal
          project={projectSelected}
          setActive={setModalDeleteActive}
        />
      )}
    </div>
  );
}
