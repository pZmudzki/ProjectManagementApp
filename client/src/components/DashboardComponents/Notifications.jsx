import { useState, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//context
import { NotificationsContext } from "../../../context/notificationsContext";

export default function Notifications() {
  const { notifications, setNotifications } = useContext(NotificationsContext);
  const [searchNotification, setSearchNotification] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [areAllChecked, setAreAllChecked] = useState(false);

  // Marking notifications as read/unread depending on the button clicked
  async function updateNotifications(e) {
    try {
      const { name } = e.target;
      const read = name === "markAsRead" ? true : false;
      await axios
        .post("/api/notifications/updateNotifications", {
          ids: selectedNotifications,
          read: read,
        })
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            setAreAllChecked(false);
            setSelectedNotifications([]);
            setNotifications(res.data.allNotifications);
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSearch(e) {
    setSearchNotification(e.target.value);
  }

  function handleSelectNotification(e) {
    const id = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setSelectedNotifications((prev) => [...prev, id]);
    } else {
      setSelectedNotifications((prev) =>
        prev.filter((notificationId) => notificationId !== id)
      );
    }
  }

  function handleSelectAll(e) {
    setAreAllChecked(!areAllChecked);
    if (e.target.checked) {
      // If the "select all" checkbox is checked, set all notifications as selected
      setSelectedNotifications(
        notifications.map((notification) => notification._id)
      );
    } else {
      // If the "select all" checkbox is unchecked, clear the selected notifications
      setSelectedNotifications([]);
    }
  }

  function getDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className="flex flex-col absolute top-[66px] right-0 bottom-0 left-0 z-0">
      <aside className="border-b-2 border-gray-200 flex flex-wrap gap-2 justify-between p-2">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            id="searchbar"
            name="searchbar"
            placeholder="Search notification"
            className="bg-gray-200 py-1 px-2 rounded-xl"
            value={searchNotification}
            onChange={handleSearch}
          />
          <MagnifyingGlassIcon className="h-5 w-5 " aria-hidden="true" />
        </div>
      </aside>

      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-1 py-1 px-2 items-center bg-indigo-500 min-w-max rounded-md">
            <input
              type="checkbox"
              name="selectAll"
              id="selectAll"
              checked={areAllChecked}
              className="cursor-pointer"
              onChange={handleSelectAll}
            />
            <label htmlFor="selectAll" className="text-white cursor-pointer">
              Select all
            </label>
          </div>
          <div className="flex flex-wrap justify-end gap-1">
            <button
              name="markAsRead"
              type="button"
              className="bg-indigo-500 text-white font-bold rounded-md py-1 px-2 shadow-md hover:bg-indigo-600 transition duration-200 ease-in-out"
              onClick={updateNotifications}
            >
              Mark selected as read
            </button>
            <button
              name="markAsUnread"
              type="button"
              className="bg-indigo-500 text-white font-bold rounded-md py-1 px-2 shadow-md hover:bg-indigo-600 transition duration-200 ease-in-out"
              onClick={updateNotifications}
            >
              Mark selected as unread
            </button>
          </div>
        </div>
        <ul className="flex flex-col gap-2 grow">
          {notifications
            .filter((notification) => {
              if (searchNotification === "") {
                return notification;
              } else if (
                notification.message
                  .toLowerCase()
                  .includes(searchNotification.toLowerCase())
              ) {
                return notification;
              } else if (
                notification.notificationType
                  .toLowerCase()
                  .includes(searchNotification.toLowerCase())
              ) {
                return notification;
              }
            })
            .sort((a, b) => {
              return a.read - b.read;
            })
            .map((notification) => (
              <li
                key={notification._id}
                className={`flex flex-col gap-1 py-1 px-2 rounded-md ${
                  notification.read
                    ? "bg-gray-500 text-white"
                    : "bg-indigo-100 border-2 border-indigo-500"
                }`}
              >
                <input
                  type="checkbox"
                  name="notification"
                  className="self-start cursor-pointer"
                  checked={selectedNotifications.includes(notification._id)}
                  value={notification._id}
                  onChange={handleSelectNotification}
                />
                <div className="flex justify-between">
                  <h1 className="text-ms font-bold">
                    <span className="font-normal text-xs">Type:</span>{" "}
                    {notification.notificationType}
                  </h1>
                  <h2>
                    <span className="font-normal text-xs">Date:</span>{" "}
                    {getDate(notification.date)}
                  </h2>
                </div>
                <p className="text-lg flex flex-wrap items-center">
                  <span className="font-normal text-xs">Message:</span>
                  {notification.message}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
