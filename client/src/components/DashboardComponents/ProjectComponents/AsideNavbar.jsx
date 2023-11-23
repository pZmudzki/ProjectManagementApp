import React, { useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import {Link} from "react-router-dom"

import {ArchiveBoxXMarkIcon, Cog6ToothIcon} from "@heroicons/react/24/outline"



export default function AsideNavbar({ projectSelected }) {
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <div>
        <p>Overview</p>
        <p>Tasks</p>
      </div>
      <div>
        <button onClick={() => setModalDeleteActive(true)}>
          <ArchiveBoxXMarkIcon className="h-7 w-7 text-red-700" aria-hidden="true"/>
        </button>
        <Link to={`/dashboard/projects/${projectSelected._id}/settings`}>
          <Cog6ToothIcon className="h-7 w-7" aria-hidden="true"/>
        </Link>
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
