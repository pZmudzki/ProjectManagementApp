import React, { useState, useContext, useEffect, useRef } from "react";
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
      setMessage("");
      axios
        .post(`api/messages/${selectedUser._id}`, { message })
        .then((res) => {
          setMessage("");
          socket.emit("sendMessage", selectedUser._id, res.data);
          setMessages((prev) => [...prev, res.data]);
        });
    }
  }

  // listen for new messages
  useEffect(() => {
    socket.emit("userConnected", user._id);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // get messages for from database
  const getMessages = async () => {
    await axios.get(`api/messages/${selectedUser._id}`).then((res) => {
      setMessages(res.data);
      setLoadingMessages(false);
    });
  };

  useEffect(() => {
    getMessages();
  }, [selectedUser]);

  // scroll to the bottom of the chat
  const messagesEndRef = useRef(null);
  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView();
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // group messages by date
  const groupedMessagesByDate = messages.reduce((groups, message) => {
    const date = message.date.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  // format date to time
  function formatDateToTime(date) {
    const time = new Date(date);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    if (hours < 10) hours = `0${hours}`;
    return `${hours}:${minutes}`;
  }

  return (
    <main className="w-full bg-white">
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
        <div className="flex flex-col flex-grow px-3 py-2 space-y-2 overflow-y-auto">
          {/* chat message */}
          {loadingMessages ? (
            <Loader />
          ) : (
            Object.keys(groupedMessagesByDate).map((date) => {
              return (
                <div key={date}>
                  <h1 className="text-center font-bold">{date}</h1>
                  <div className="flex flex-col">
                    {groupedMessagesByDate[date].map((message) => {
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
                        <div
                          key={message._id}
                          className="flex flex-col items-start"
                        >
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
                    })}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
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
