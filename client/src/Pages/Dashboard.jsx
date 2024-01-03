import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// context
import { UserContext } from "../../context/userContext";
import { ProjectsContextProvider } from "../../context/projectContext";
import { SelectedProjectContextProvider } from "../../context/selectedProjectContext";
import { TasksContextProvider } from "../../context/tasksContext";
import { NotificationsContextProvider } from "../../context/notificationsContext";

import Navbar from "../components/DashboardComponents/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <div>
        <ProjectsContextProvider>
          <SelectedProjectContextProvider>
            <TasksContextProvider>
              <NotificationsContextProvider>
                <Navbar />
                <Outlet />
              </NotificationsContextProvider>
            </TasksContextProvider>
          </SelectedProjectContextProvider>
        </ProjectsContextProvider>
      </div>
    </>
  );
}
