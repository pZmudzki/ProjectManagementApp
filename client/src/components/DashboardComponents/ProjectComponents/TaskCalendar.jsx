import React, { useState, useEffect } from "react";
import CreateTask from "./CreateTask";

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
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TaskCalendar() {
  const [createTaskModalActive, setCreateTaskModalActive] = useState(false);
  const [currWeek, setCurrWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState();

  function setCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(day.getDate() + i);
      week.push(day);
    }
    setCurrWeek(week);
    if (!selectedDay) {
      setSelectedDay(week[0]);
    }
  }

  // getting current week days
  useEffect(() => {
    setCurrentWeek();
  }, []);

  // setting selected time
  function handleTimeSelect(time) {
    // setSelectedTime(e.target.value);
    const { hour, ampm, minute } = time;
    setSelectedDay(() => {
      const day = new Date(selectedDay);
      // check if hour is empty string and if it is AM or PM
      day.setHours(
        hour === "" ? 0 : ampm === "AM" ? hour : hour + 12,
        minute,
        0,
        0
      );
      return day;
    });
    setCreateTaskModalActive(true);
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex my-4 ">
          <div className="w-14"></div>
          <div className="grow flex items-center justify-around gap-4">
            {currWeek.map((day) => {
              return (
                <button
                  type="button"
                  value={selectedDay}
                  key={day.getDay()}
                  onClick={() => setSelectedDay(day)}
                  className={`grow rounded-lg ${
                    day === selectedDay
                      ? "outline outline-offset-2 outline-2 outline-gray-600"
                      : "hover:outline outline-offset-2 hover:outline-2 hover:outline-gray-300"
                  }`}
                >
                  {dayNames[day.getDay()].slice(0, 3)}
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
                <div className="border-t-2 border-gray-300 w-full flex flex-col">
                  <button
                    type="button"
                    name="minute"
                    className="w-full grow hover:bg-gray-300 transition-all"
                    onClick={() =>
                      handleTimeSelect({
                        hour: hour.slice(0, -3),
                        ampm: hour.slice(-2),
                        minute: "00",
                      })
                    }
                  ></button>
                  <button
                    type="button"
                    className="w-full grow hover:bg-gray-300 transition-all"
                    onClick={() =>
                      handleTimeSelect({
                        hour: hour.slice(0, -3),
                        ampm: hour.slice(-2),
                        minute: "15",
                      })
                    }
                  ></button>
                  <button
                    type="button"
                    className="w-full grow hover:bg-gray-300 transition-all"
                    onClick={() =>
                      handleTimeSelect({
                        hour: hour.slice(0, -3),
                        ampm: hour.slice(-2),
                        minute: "30",
                      })
                    }
                  ></button>
                  <button
                    type="button"
                    className="w-full grow hover:bg-gray-300 transition-all"
                    onClick={() =>
                      handleTimeSelect({
                        hour: hour.slice(0, -3),
                        ampm: hour.slice(-2),
                        minute: "45",
                      })
                    }
                  ></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {createTaskModalActive && (
        <CreateTask
          setCreateTaskModalActive={setCreateTaskModalActive}
          selectedDay={selectedDay}
        />
      )}
    </div>
  );
}
