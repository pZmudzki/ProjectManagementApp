import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome</h2>
      {user && <p>{user.username}</p>}
    </>
  );
}
