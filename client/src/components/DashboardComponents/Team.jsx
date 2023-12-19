import React, { useState } from "react";

import UsersList from "./TeamComponents/UsersList";
import ChatView from "./TeamComponents/ChatView";

export default function Team() {
  return (
    <div className="flex absolute top-[66px] right-0 bottom-0 left-0 z-0 p-3">
      {/* sidebar with users */}
      <UsersList />
      {/* chat view */}
      <ChatView />
    </div>
  );
}
