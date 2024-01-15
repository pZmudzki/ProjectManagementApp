import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";

import UserList from "./TeamComponents/UserList";
import NoProjectsMessage from "./ProjectComponents/NoProjectsMessage";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";

//context
import { ProjectsContext } from "../../../context/projectContext";

export default function Team() {
  const { projects } = useContext(ProjectsContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  return projects.length > 0 ? (
    <div className="flex absolute top-[66px] right-0 bottom-0 left-0 z-0">
      {/* sidebar with users */}
      <UserList
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* chat view */}
      {selectedUser ? (
        <Outlet context={[selectedUser, isSidebarOpen]} />
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center min-w-fit">
          <h1 className="text-2xl font-semibold px-10">Select a user</h1>
        </div>
      )}
    </div>
  ) : createProjectModal ? (
    <CreateProjectModal modalActive={setCreateProjectModal} />
  ) : (
    <NoProjectsMessage setCreateProjectModal={setCreateProjectModal} />
  );
}
