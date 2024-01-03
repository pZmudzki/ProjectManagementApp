import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SelectedProjectContext } from "../../context/selectedProjectContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ classes }) {
  const navigate = useNavigate();
  const { setSelectedProject } = useContext(SelectedProjectContext);

  const { setUser, setIsAuthenticated } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get("/logout").then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(res.data.isAuthenticated);
        setSelectedProject(null);
        localStorage.clear();
        navigate("/login", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={classes} onClick={logout}>
      Logout
    </button>
  );
}
