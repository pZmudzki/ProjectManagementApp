import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import UserList from "./TeamComponents/UserList";

export default function Team() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex absolute top-[66px] right-0 bottom-0 left-0 z-0">
      {/* sidebar with users */}
      <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      {/* chat view */}
      {selectedUser ? (
        <Outlet context={[selectedUser]} />
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center">
          <h1 className="text-2xl font-semibold">Select a user</h1>
        </div>
      )}
    </div>
  );
}
