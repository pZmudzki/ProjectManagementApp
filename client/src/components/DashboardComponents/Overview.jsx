import React, { useState } from "react";
import CreateProject from "./ProjectComponents/CreateProject";
import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";

export default function Overview() {
  const [createProjectModal, setCreateProjectModal] = useState(false);

  return (
    <div>
      {/* Create Project Modal */}
      <div>
        <h1>Seems like you don't have any projects yet</h1>
        <h2>
          Get started by creating a project below{""}
          <span>
            <ArrowSmallDownIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </h2>
        <button onClick={() => setCreateProjectModal(true)}>
          Create Project
        </button>
        {createProjectModal && <CreateProject />}
      </div>
    </div>
  );
}
