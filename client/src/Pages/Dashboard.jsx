import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";


// context
import { UserContext } from "../../context/userContext";
import { ProjectsContextProvider } from "../../context/projectContext";

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
      <div className="min-h-full ">
        <Navbar />
        <main className="">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <ProjectsContextProvider>
              <Outlet />
            </ProjectsContextProvider>
          </div>
        </main>
      </div>
    </>
  );
}
