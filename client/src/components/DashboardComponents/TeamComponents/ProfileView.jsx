import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";

//context
import { TasksContext } from "../../../../context/tasksContext";
import { UserContext } from "../../../../context/userContext";
import { ProjectsContext } from "../../../../context/projectContext";

export default function ProfileView() {
  const { projects } = useContext(ProjectsContext);
  const { user } = useContext(UserContext);
  const { tasks } = useContext(TasksContext);
  const [selectedUser] = useOutletContext();

  // Example: Display common projects
  const commonProjects = projects.filter(
    (project) =>
      (project.projectTeam.includes(user.id) ||
        project.projectManager._id === user.id) &&
      (project.projectTeam.includes(selectedUser.id) ||
        project.projectManager._id === selectedUser.id)
  );

  const selectedUserTasks = tasks.filter(
    (task) => task.assignedTo === selectedUser.id
  );

  // console.log(tasks);
  console.log(selectedUserTasks);
  return (
    <div>
      <h2>User Profile</h2>
      <h3>Common Projects:</h3>
      <ul>
        {commonProjects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <h3>Completed Tasks:</h3>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <h3>In-Progress Tasks:</h3>
      <p>{inProgressTasks.length}</p>
      <h3>Not Started Tasks:</h3>
      <p>{notStartedTasks.length}</p>
    </div>
  );
}
