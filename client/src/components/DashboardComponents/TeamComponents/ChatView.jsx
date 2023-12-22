import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Loader from "../../Loader";

import { socket } from "../../../socket";

//context
import { UserContext } from "../../../../context/userContext";

export default function ChatView() {
  const { user } = useContext(UserContext);
  const [selectedUser] = useOutletContext();

  const [loadingMessages, setLoadingMessages] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function handleSendMessage(e) {
    e.preventDefault();
    if (message !== "") {
      // socket.emit("chat message", message);
      // setMessage("");
      axios
        .post(`api/messages/${selectedUser._id}`, { message })
        .then((res) => {
          console.log(res.data);
          setMessage("");
        });
    }
  }

  const getMessages = async () => {
    await axios.get(`api/messages/${selectedUser._id}`).then((res) => {
      setMessages(res.data);
      setLoadingMessages(false);
    });
  };

  useEffect(() => {
    getMessages();
  }, [selectedUser]);

  function formatDateToTime(date) {
    const time = new Date(date);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes}`;
  }

  return (
    <main className="w-full">
      <div className="flex flex-col h-full">
        {/* chat header */}
        <div className="flex items-center justify-between px-3 py-3 border-b-2">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <img
                src={selectedUser.profilePicture}
                alt="user profile picture"
                className="h-12 w-12 rounded-full border-2 outline outline-1 outline-indigo-600 object-cover"
              />
              <span>{selectedUser.username}</span>
            </h1>
          </div>
        </div>
        {/* chat body */}
        <div className="flex flex-col justify-end flex-grow px-3 py-2 space-y-2 overflow-y-auto">
          {/* chat message */}
          {loadingMessages ? (
            <Loader />
          ) : (
            messages.map((message) => {
              return message.sender === user._id ? (
                <div
                  key={message._id}
                  className="flex flex-col items-start self-end"
                >
                  <h2 className="text-xs font-light self-end">
                    {formatDateToTime(message.date)}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col items-start">
                      <p className="px-3 py-2 mt-1 text-sm font-light bg-gray-300 rounded-md">
                        {message.message}
                      </p>
                    </div>
                    <img
                      src={user.profilePicture}
                      alt="user profile picture"
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-400"
                    />
                  </div>
                </div>
              ) : (
                <div key={message._id} className="flex flex-col items-start">
                  <h2 className="text-xs font-light">
                    {formatDateToTime(message.date)}
                  </h2>
                  <div className="flex gap-2 items-center">
                    <img
                      src={selectedUser.profilePicture}
                      alt="user profile picture"
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-400"
                    />
                    <div className="flex flex-col items-start">
                      <p className="px-3 py-2 mt-1 text-sm font-light bg-gray-300 rounded-md">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* chat footer */}
        <div className="flex items-center justify-center p-3 border-t border-gray-300 bg-gray-200">
          <form onSubmit={handleSendMessage} className="relative w-9/12">
            <input
              type="text"
              name="message"
              value={message}
              placeholder="Type a message"
              className="rounded-md px-2 py-1 w-full h-8 border-2 outline outline-2 outline-gray-300"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="absolute right-0 top-0 rounded-md bg-indigo-600 h-8 p-1">
              <PaperAirplaneIcon
                className="h-full text-white"
                aria-hidden="true"
              />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
