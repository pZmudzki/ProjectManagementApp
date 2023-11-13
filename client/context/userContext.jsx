import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkUser = async () => {
    try {
      await axios.get("/loggedIn").then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(res.data.isAuthenticated);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {isAuthenticated === null ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
}
