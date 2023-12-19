import React, { useState } from "react";

import {
  MagnifyingGlassIcon,
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

const testusers = [
  {
    username: "User 1",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/0.jpg",
  },
  {
    username: "User 2",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    username: "User 3",
    status: "Offline",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    username: "User 1",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/0.jpg",
  },
  {
    username: "User 2",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    username: "User 3",
    status: "Offline",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    username: "User 1",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/0.jpg",
  },
  {
    username: "User 2",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    username: "User 3",
    status: "Offline",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    username: "User 1",
    status: "Active",
    img: "https://randomuser.me/api/portraits/women/0.jpg",
  },
  {
    username: "User 2",
    status: "Active",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    username: "User 3",
    status: "Offline",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

export default function UsersList() {
  const [searchUser, setSearchUser] = useState("");
  function handleSearch(e) {
    setSearchUser(e.target.value);
  }

  return (
    <aside className="w-fit flex flex-col">
      <div className="flex gap-1 px-5 py-3 items-center border-b-2">
        <input
          type="text"
          id="searchbar"
          name="searchbar"
          placeholder="Search user"
          className="bg-gray-200 py-1 px-2 rounded-xl"
          value={searchUser}
          onChange={handleSearch}
        />
        <MagnifyingGlassIcon className="h-5 w-5 " aria-hidden="true" />
      </div>
      <div className="h-full">
        <ul className="flex flex-col gap-2 p-2 overflow-y-scroll">
          {testusers.map((user, idx) => {
            return (
              <li className="flex gap-2 items-center justify-between p-2 bg-gray-200 rounded">
                <div className="flex items-center gap-2">
                  <img
                    src={user.img}
                    alt="user profile picture"
                    className="h-12 w-12 rounded-full border-2 outline outline-1 outline-indigo-600"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl">{user.username}</span>
                    <span
                      className={`text-xs ${
                        user.status === "Active"
                          ? "text-green-500"
                          : "text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button">
                    <UserIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </button>
                  <button type="button">
                    <ChatBubbleOvalLeftEllipsisIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
