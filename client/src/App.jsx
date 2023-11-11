import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Toaster } from "react-hot-toast";

// components
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Pages/ErrorPage";
import RegisterPage from "./Pages/authPages/RegisterPage";
import LoginPage from "./Pages/authPages/LoginPage";
import Dashboard from "./Pages/Dashboard";

// context
import { UserContextProvider } from "../context/userContext";

// axios config
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />

          {/* auth */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* protected routes */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
