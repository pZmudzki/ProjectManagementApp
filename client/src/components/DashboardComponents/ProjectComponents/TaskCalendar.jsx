import React, { useState, useEffect } from "react";
import CreateTask from "./CreateTask";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

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
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [firstAndLastDay, setFirstAndLastDay] = useState({
    firstDay: {
      year: "",
      month: "",
      day: "",
    },
    lastDay: {
      year: "",
      month: "",
      day: "",
    },
  });

  function setCurrentWeek() {
    const today = new Date();
    console.log(today);
    const monday = startOfWeek(today, { weekStartsOn: 1 });
    const sunday = endOfWeek(today, { weekStartsOn: 1 });
    // console.log(monday);
    // console.log(sunday);
    // set first and last day of the week
    setFirstAndLastDay({
      firstDay: {
        year: monday.getFullYear(),
        month: monday.getMonth(),
        day: monday.getDate(),
      },
      lastDay: {
        year: sunday.getFullYear(),
        month: sunday.getMonth(),
        day: sunday.getDate(),
      },
    });
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(day.getDate() + i);
      week.push({
        dayName: dayNames[day.getDay()],
        date: {
          year: day.getFullYear(),
          month: day.getMonth(),
          day: day.getDate(),
        },
        isInThePast:
          day.getTime() < today.getTime(today.setHours(0, 0, 0, 0))
            ? true
            : false,
      });
    }
    setCurrWeek(week);
    setSelectedDate(() => {
      return week.filter((day) => day.isInThePast == false)[0];
    });

    // setLoading(false);
  }

  // getting current week days
  useEffect(() => {
    setCurrentWeek();
  }, []);

  // setting selected time
  function handleTimeSelect(time) {
    const { hour, ampm, minute } = time;
    setSelectedTime({
      hour: hour,
      ampm: ampm,
      minute: minute,
    });
    setCreateTaskModalActive(true);
  }

  // console.log(firstAndLastDay);
  // console.log(currWeek);
  console.log(selectedDate);
  // console.log(selectedTime);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex mb-4 ">
              <div className="w-14"></div>
              <div className="grow flex flex-col gap-4">
                {/* changing calendar weeks/dates */}
                <div className="flex justify-between items-center">
                  <button type="button" className="flex">
                    <ArrowLeftIcon
                      className="h-4 w-4 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="text-xs">previous</span>
                  </button>
                  <div className="flex justify-center items-center gap-1">
                    <span className="text-s">
                      {firstAndLastDay.firstDay.year}-
                      {firstAndLastDay.firstDay.month}-
                      {firstAndLastDay.firstDay.day} -{" "}
                      {firstAndLastDay.lastDay.year}-
                      {firstAndLastDay.lastDay.month}-
                      {firstAndLastDay.lastDay.day}
                    </span>
                    <button type="button">
                      <CalendarDaysIcon
                        className="h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <button type="button" className="flex">
                    <span className="text-xs">next</span>
                    <ArrowRightIcon
                      className="h-4 w-4 text-indigo-600"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {/* calendar week days */}
                <div className="flex items-center justify-around gap-4">
                  {currWeek.map((day, idx) => {
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedDate(currWeek[idx])}
                        className={`grow rounded-lg flex flex-wrap items-center justify-center gap-1 ${
                          day.dayName === selectedDate.dayName
                            ? "outline outline-offset-2 outline-2 outline-gray-600"
                            : "hover:outline outline-offset-2 hover:outline-2 hover:outline-gray-300"
                        } ${day.isInThePast ? "bg-gray-300" : "bg-gray-100"}`}
                      >
                        <span>{day.dayName.slice(0, 3)}</span>
                        <span className="text-indigo-500">
                          {day.date.month}-{day.date.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* calendar hours */}
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
                        className="w-full grow hover:bg-gray-200 transition-all"
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
                        className="w-full grow hover:bg-gray-200 transition-all"
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
                        className="w-full grow hover:bg-gray-200 transition-all"
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
                        className="w-full grow hover:bg-gray-200 transition-all"
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
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}
        </div>
      </LocalizationProvider>
    </>
  );
}
