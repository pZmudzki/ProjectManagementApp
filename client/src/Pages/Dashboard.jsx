import { useContext, useEffect, Fragment } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

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
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>
      </div>
    </>
  );
}
