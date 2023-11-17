import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Toaster } from "react-hot-toast";

// import ProtectedRoute from "./Routes/ProtectedRoutes";

// components
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import RegisterPage from "./Pages/authPages/RegisterPage";
import LoginPage from "./Pages/authPages/LoginPage";
import Dashboard from "./Pages/Dashboard";
// import UserSettings from "./Pages/UserSettings";
// import UserProfile from "./Pages/UserProfile";
import Overview from "./components/DashboardComponents/Overview";
import Team from "./components/DashboardComponents/Team";
import Projects from "./components/DashboardComponents/Projects";

// axios config
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* auth */}
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />

        {/* protected routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={<Team />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
