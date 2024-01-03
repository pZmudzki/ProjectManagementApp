import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../src/components/Loader";

export const NotificationsContext = createContext();

export function NotificationsContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Getting all notifications
  async function getNotifications() {
    try {
      await axios
        .get("/api/notifications/getNotifications")
        .then((res) => {
          setNotifications(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      {loading ? <Loader /> : children}
    </NotificationsContext.Provider>
  );
}
