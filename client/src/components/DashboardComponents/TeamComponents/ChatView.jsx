import React from "react";

export default function ChatView() {
  return (
    <main className="border-l-2">
      <div className="flex flex-col h-full">
        {/* chat header */}
        <div className="flex items-center justify-between px-3 py-3 border-b-2">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Chat</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
          </div>
        </div>
        {/* chat body */}
        <div className="flex flex-col flex-grow px-3 py-2 space-y-2 overflow-y-auto">
          {/* chat message */}
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="flex flex-col ml-2">
                <h1 className="text-sm font-semibold">John Doe</h1>
                <h2 className="text-xs font-light">10:30 AM</h2>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <p className="px-3 py-2 mt-1 text-sm font-light bg-gray-300 rounded-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quos, voluptatum, voluptate, quibusdam quia
                voluptatibus asperiores quae similique fugiat ab doloremque.
                Quisquam quos, voluptatum, voluptate, quibusdam quia
                voluptatibus asperiores quae similique fugiat ab doloremque.
              </p>
            </div>
          </div>
          {/* chat message */}
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <div className="flex flex-col mr-2">
                <h1 className="text-sm font-semibold">John Doe</h1>
                <h2 className="text-xs font-light">10:30 AM</h2>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex flex-col items-end">
              <p className="px-3 py-2 mt-1 text-sm font-light bg-gray-300 rounded-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quos, voluptatum, voluptate, quibusdam quia
                voluptatibus asperiores quae similique fugiat ab doloremque.
                Quisquam quos, voluptatum, voluptate, quibusdam quia
                voluptatibus asperiores quae similique fugiat ab doloremque.
              </p>
            </div>
          </div>
          {/* chat message */}
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="flex flex-col ml-2">
                <h1 className="text-sm font-semibold">John Doe</h1>
                <h2 className="text-xs font-light">10:30 AM</h2>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <p className="px-3 py-2 mt-1 text-sm font-light bg-gray-300 rounded-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam quos, voluptatum, voluptate, quibusdam quia
                voluptatibus asperiores quae similique fugiat ab doloremque.
                Quisquam quos, voluptatum, voluptate, quibusdam quia
                voluptatibus asperiores quae similique fugiat ab doloremque.
              </p>
            </div>
          </div>
        </div>
        {/* chat footer */}
        <div className="flex items-center justify-between h-[66px] px-3 border-t border-gray-300">
          <div className="flex items-center">
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <input
              type="text"
              className="w-full h-8 ml-2 rounded-md bg-gray-300"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
            <button className="w-8 h-8 rounded-full bg-gray-300"></button>
          </div>
        </div>
      </div>
    </main>
  );
}
