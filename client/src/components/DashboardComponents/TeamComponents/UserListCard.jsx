import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

//context
import { UserContext } from "../../../../context/userContext";

export default function UserListCard({
  setIsSidebarOpen,
  displayedUser,
  selectedUser,
  setSelectedUser,
  isProjectManager,
}) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <li
      className={`flex gap-2 items-center justify-between p-2 bg-gray-200 dark:bg-gray-800  ${
        selectedUser &&
        selectedUser._id === displayedUser._id &&
        "bg-gray-300 dark:bg-neutral-900"
      } ${user._id === displayedUser._id && "hidden"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src={displayedUser.profilePicture}
          alt="user profile picture"
          className="h-12 w-12 rounded-full border-2 outline outline-1 outline-indigo-600 object-cover"
        />
        <div className="flex flex-col">
          <span className="text-xl">{displayedUser.username}</span>
          <span className="text-xs font-light">
            {isProjectManager ? "Project Manager" : "Team Member"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          name="view profile"
          type="button"
          onClick={() => {
            setSelectedUser(displayedUser);
            setIsSidebarOpen(false);
            navigate(`/dashboard/team/user`);
          }}
        >
          <UserIcon
            className="h-6 w-6 text-indigo-600 dark:text-indigo-300"
            aria-hidden="true"
          />
        </button>
        <button
          name="chat"
          type="button"
          onClick={() => {
            setSelectedUser(displayedUser);
            setIsSidebarOpen(false);
            navigate(`/dashboard/team/chat`);
          }}
        >
          <ChatBubbleOvalLeftEllipsisIcon
            className="h-6 w-6 text-indigo-600 dark:text-indigo-300"
            aria-hidden="true"
          />
        </button>
      </div>
    </li>
  );
}
