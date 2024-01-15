import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Toaster } from "react-hot-toast";

// components
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import RegisterPage from "./Pages/authPages/RegisterPage";
import LoginPage from "./Pages/authPages/LoginPage";
import ForgotPasswordPage from "./Pages/authPages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/authPages/ResetPasswordPage";
import Dashboard from "./Pages/Dashboard";

import Team from "./components/DashboardComponents/Team";
import Projects from "./components/DashboardComponents/Projects";
import Calendar from "./components/DashboardComponents/Calendar";
import Notifications from "./components/DashboardComponents/Notifications";

import Support from "./components/SupportComponents/Support";

// team components
import ProfileView from "./components/DashboardComponents/TeamComponents/ProfileView";
import ChatView from "./components/DashboardComponents/TeamComponents/ChatView";

// for logged in user
import UserSettings from "./components/UserComponents/UserSettings";
import UserProfile from "./components/UserComponents/UserProfile";

// config
import config from "../config";

const environment = import.meta.env.VITE_NODE_ENV || "development";
const { serverUrl } = config[environment];

// axios config
axios.defaults.baseURL = serverUrl;
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
        <Route exact path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* protected routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<Projects />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="team" element={<Team />}>
            <Route path="user" element={<ProfileView />} />
            <Route path="chat" element={<ChatView />} />
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="usersettings" element={<UserSettings />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
