import React, { useState, useEffect, useContext } from "react";
import CreateTask from "./CreateTask";
import TaskCard from "./TaskCard";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { startOfWeek, compareAsc, endOfWeek, addWeeks } from "date-fns";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

// context for tasks
import { TasksContext } from "../../../../context/tasksContext";

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

const clickableMinutesOnCalendar = ["0", "15", "30", "45"];

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
  const { tasks } = useContext(TasksContext);
  // taking tasks and filtering them for the selected date
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  // controlling create task modal
  const [createTaskModalActive, setCreateTaskModalActive] = useState(false);
  const [week, setWeek] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, 1 = next week, -1 = previous week
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

  // setting previous/current/next week Default: current week
  function handleWeekPrevCurrNext() {
    const today = new Date();
    const offsetToday = addWeeks(new Date(), weekOffset);
    const monday = startOfWeek(offsetToday, { weekStartsOn: 1 });
    const sunday = endOfWeek(offsetToday, { weekStartsOn: 1 });

    const weekHelper = [];
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
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(day.getDate() + i);
      weekHelper.push({
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
    setWeek(weekHelper);

    // helper function to select the date that is NOT in the past
    const filterForFutureDays = weekHelper.filter(
      (day) => day.isInThePast == false
    )[0];
    setSelectedDate(() => {
      // if there is no future date, select the first day of the week
      return filterForFutureDays === undefined
        ? weekHelper[0]
        : filterForFutureDays;
    });
  }

  // getting current week days
  useEffect(() => {
    handleWeekPrevCurrNext();
  }, [weekOffset]);

  // setting tasks for selected date
  function handleTasksForSelectedDate() {
    if (tasks.length === 0) return;
    if (selectedDate === undefined) return;

    const tasksForSelectedDateHelper = tasks
      .filter((task) => {
        const taskDate = new Date(task.fromDate);
        return (
          selectedDate.date.year === taskDate.getFullYear() &&
          selectedDate.date.month === taskDate.getMonth() &&
          selectedDate.date.day === taskDate.getDate()
        );
      })
      .map((task) => {
        const fromDate = new Date(task.fromDate);
        const toDate = new Date(task.toDate);

        // formatting date to be able to use it in the calendar

        return {
          ...task,
          fromDate: {
            year: fromDate.getFullYear(),
            month: fromDate.getMonth(),
            day: fromDate.getDate(),
            hour: fromDate.getHours(),
            minute: fromDate.getMinutes(),
          },
          toDate: {
            year: toDate.getFullYear(),
            month: toDate.getMonth(),
            day: toDate.getDate(),
            hour: toDate.getHours(),
            minute: toDate.getMinutes(),
          },
        };
      });

    setTasksForSelectedDate(tasksForSelectedDateHelper);
  }

  useEffect(() => {
    handleTasksForSelectedDate();
  }, [selectedDate]);

  // setting selected time
  function handleTimeSelect(time) {
    let { hour, ampm, minute } = time;

    if (hour === "") {
      hour = "0";
      ampm = "AM";
    }

    setSelectedTime({
      hour: hour,
      ampm: ampm,
      minute: minute,
    });
    setCreateTaskModalActive(true);
  }

  console.log(tasksForSelectedDate);
  // console.log("chuj");
  // console.log(firstAndLastDay);
  // console.log(week);
  // console.log(selectedTime);
  // console.log(weekOffset);
  return (
    <>
      {selectedDate ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="p-2 pb-1 bg-white rounded-tl-xl">
            <div className="flex flex-col gap-3">
              <div className="flex mb-4 ">
                <div className="w-14"></div>
                <div className="grow flex flex-col gap-4">
                  {/* changing calendar weeks/dates */}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="flex"
                      onClick={() => {
                        setWeekOffset(weekOffset - 1);
                      }}
                    >
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
                    <button
                      type="button"
                      className="flex"
                      onClick={() => {
                        setWeekOffset(weekOffset + 1);
                      }}
                    >
                      <span className="text-xs">next</span>
                      <ArrowRightIcon
                        className="h-4 w-4 text-indigo-600"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {/* calendar week days */}
                  <div className="flex items-center justify-around gap-4">
                    {week.map((day, idx) => {
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setSelectedDate(week[idx])}
                          className={`grow rounded-lg flex flex-wrap items-center justify-center gap-1 ${
                            day.dayName === selectedDate.dayName
                              ? "outline outline-offset-2 outline-2 outline-gray-600"
                              : "hover:outline outline-offset-2 hover:outline-2 hover:outline-gray-300"
                          } ${day.isInThePast ? "bg-gray-300" : "bg-gray-100"}`}
                        >
                          <span className="">{day.dayName.slice(0, 3)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* calendar hours */}
              <div className="grid-cols-1">
                {hours.map((hour, idx) => {
                  return (
                    <div key={idx} className="flex h-16 last:h-0">
                      <div className="text-xs w-14 relative">
                        <span className="absolute -translate-y-1/2">
                          {hour}
                        </span>
                      </div>
                      <div
                        className={`${
                          hour === "" ? " border-t-4 " : " border-t-2 "
                        } border-gray-300 w-full flex flex-col`}
                      >
                        {/* render buttons to pass the time and open create task modal */}
                        {/* each button is responsible for 15 minutes on calendar */}
                        {clickableMinutesOnCalendar.map((minute) => {
                          tasksForSelectedDate.map((task) => {
                            if (
                              task.fromDate.hour === hour &&
                              task.fromDate.minute === minute
                            ) {
                              console.log(hour, minute, "true");
                              return <div>chjuj</div>;
                            } else {
                              return (
                                <button
                                  type="button"
                                  key={minute}
                                  className={`w-full grow hover:bg-gray-200 transition-all ${
                                    selectedDate.isInThePast === true
                                      ? " bg-gray-200 "
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleTimeSelect({
                                      hour: hour.slice(0, -3),
                                      ampm: hour.slice(-2),
                                      minute: minute,
                                    })
                                  }
                                  disabled={selectedDate.isInThePast}
                                ></button>
                              );
                            }
                          });
                        })}

                        {/* return (
                            <button
                              type="button"
                              key={minute}
                              className={`w-full grow hover:bg-gray-200 transition-all ${
                                selectedDate.isInThePast === true
                                  ? " bg-gray-200 "
                                  : ""
                              }`}
                              onClick={() =>
                                handleTimeSelect({
                                  hour: hour.slice(0, -3),
                                  ampm: hour.slice(-2),
                                  minute: minute,
                                })
                              }
                              disabled={selectedDate.isInThePast}
                            ></button> */}
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
      ) : (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )}
    </>
  );
}
