import { useContext, useEffect, useMemo } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// context
import { UserContext } from "../../context/userContext";
import { ProjectsContextProvider } from "../../context/projectContext";
import { SelectedProjectContextProvider } from "../../context/selectedProjectContext";
import { TasksContextProvider } from "../../context/tasksContext";
import { NotificationsContextProvider } from "../../context/notificationsContext";

import Navbar from "../components/DashboardComponents/Navbar";

// MUI dark theme
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, []);

  // MUI dark theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </>
  );
}
