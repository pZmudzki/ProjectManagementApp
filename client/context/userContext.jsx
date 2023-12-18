import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Loader from "../src/components/Loader";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkUser = async () => {
    try {
      await axios.get("/loggedIn").then((res) => {
        setUser(res.data.user);
        // console.log(res.data.user);
        setIsAuthenticated(res.data.isAuthenticated);
        // console.log(res.data.isAuthenticated);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {isAuthenticated === null ? <Loader /> : children}
    </UserContext.Provider>
  );
}
