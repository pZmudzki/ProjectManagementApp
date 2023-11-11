import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function checkUser() {
    try {
      const isLoggedInRes = await axios.get("/loggedIn");
      setUser(isLoggedInRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
