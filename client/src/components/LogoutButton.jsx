import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton(props) {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get("/logout").then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(res.data.isAuthenticated);
        navigate("/login", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className={props.className} onClick={logout}>
      Logout
    </button>
  );
}
