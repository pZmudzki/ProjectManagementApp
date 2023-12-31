import { useState, useContext, useEffect } from "react";
import DeleteProjectModal from "./DeleteProjectModal";

//context
import { SelectedProjectContext } from "../../../../context/selectedProjectContext";
import { UserContext } from "../../../../context/userContext";

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
  const { selectedProject } = useContext(SelectedProjectContext);
  const { user } = useContext(UserContext);

  const [isUserManager, setIsUserManager] = useState(false);

  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setIsUserManager(() =>
        user._id === selectedProject.projectManager._id ? true : false
      );
    }
  }, [selectedProject, user._id]);
  return (
    <div className="flex flex-col justify-between items-center w-max bg-indigo-600 p-1 sm:p-3">
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => {
            setProjectViewOpened("overview");
            setIsNavOpen(false);
          }}
          name="overview button"
          type="button"
          className={
            "flex justify-between items-center w-full text-white rounded-lg px-2 py-1 hover:bg-indigo-300 " +
            (projectViewOpened === "overview" ? "bg-indigo-400" : "")
          }
        >
          {isNavOpen && <h2>Overview</h2>}
          <DocumentMagnifyingGlassIcon
            className="h-6 w-6 sm:h-8 sm:w-8"
            aria-hidden="true"
          />
        </button>
        <button
          onClick={() => {
            setProjectViewOpened("tasks");
            setIsNavOpen(false);
          }}
          name="tasks button"
          type="button"
          className={
            "flex justify-between items-center w-full text-white rounded-lg px-2 py-1 hover:hover:bg-indigo-300 " +
            (projectViewOpened === "tasks" ? "bg-indigo-400" : "")
          }
        >
          {isNavOpen && <h2>Tasks</h2>}
          <ClipboardDocumentListIcon
            className="h-6 w-6 sm:h-8 sm:w-8"
            aria-hidden="true"
          />
        </button>
      </div>
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        name="open side navigation button"
        type="button"
        className="grow self-end text-white"
      >
        <ChevronRightIcon
          className={`h-7 w-7 sm:h-8 sm:w-8 hover:scale-125 transition-scale duration-300 ease-in-out
            ${isNavOpen ? "rotate-180 transition-rotate" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div className="w-full flex flex-col gap-2">
        {isUserManager && (
          <>
            <button
              onClick={() => {
                setProjectViewOpened("settings");
                setIsNavOpen(false);
              }}
              name="settings button"
              type="button"
              className={
                "flex justify-between items-center w-full text-white rounded-lg px-2 py-1 hover:bg-indigo-300 " +
                (projectViewOpened === "settings" ? "bg-indigo-400" : "")
              }
            >
              {isNavOpen && <h2>Settings</h2>}
              <Cog6ToothIcon
                className="h-6 w-6 sm:h-8 sm:w-8"
                aria-hidden="true"
              />
            </button>
            <button
              name="delete project button"
              type="button"
              className="flex justify-between items-center gap-3 w-full text-white rounded-lg px-2 py-1 hover:bg-indigo-300"
              onClick={() => {
                setModalDeleteActive(true);
                setIsNavOpen(false);
              }}
            >
              {isNavOpen && <h2 className="shrink-0">Delete Project</h2>}
              <ArchiveBoxXMarkIcon
                className="h-6 w-6 text-red-500 sm:h-8 sm:w-8"
                aria-hidden="true"
              />
            </button>
          </>
        )}
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
