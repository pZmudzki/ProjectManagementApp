import React, { useState } from "react";

const hours = [
  "",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 AM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "",
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TaskCalendar({ setCreateTaskModalActive }) {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex my-4 ">
          <div className="w-14"></div>
          <div className="grow flex items-center justify-around gap-4">
            {days.map((day) => {
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`grow rounded-lg ${
                    day === selectedDay
                      ? "outline outline-offset-2 outline-2 outline-gray-600"
                      : "hover:outline outline-offset-2 hover:outline-2 hover:outline-gray-300"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          {hours.map((hour, idx) => {
            return (
              <div key={idx} className="flex h-16 last:h-0">
                <div className="text-xs w-14 relative">
                  <span className="absolute -translate-y-1/2">{hour}</span>
                </div>
                <div
                  onClick={() => setCreateTaskModalActive(true)}
                  className="border-t-2 border-gray-300 w-full"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
