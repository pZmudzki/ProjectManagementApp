import React, { useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";

export default function AsideNavbar({ projectSelected }) {
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  return (
    <div>
      <div>
        <p>Overview</p>
        <p>Tasks</p>
      </div>
      <div>
        <button onClick={() => setModalDeleteActive(true)}>
          Delete Project
        </button>
        <p>Project Settings</p>
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
