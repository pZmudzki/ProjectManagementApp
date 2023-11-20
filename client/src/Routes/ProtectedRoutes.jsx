import React, { useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? <Outlet /> : navigate("/login");
};

export default ProtectedRoute;
