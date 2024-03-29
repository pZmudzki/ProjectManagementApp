import { useContext, Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

//context
import { UserContext } from "../../../context/userContext";
import { NotificationsContext } from "../../../context/notificationsContext";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import LogoutButton from "../LogoutButton";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { notifications } = useContext(NotificationsContext);

  const [currentPage, setCurrentPage] = useState("Overview");

  const userNavigation = [
    { name: "Your Profile", href: "./userprofile" },
    { name: "Settings", href: "./usersettings" },
    { name: "Support", href: "./support" },
  ];

  const navigation = [
    { name: "Projects", href: "/dashboard" },
    { name: "Calendar", href: "/dashboard/calendar" },
    { name: "Team", href: "/dashboard/team" },
  ];

  function pageChange() {
    setCurrentPage(() => {
      switch (location.pathname) {
        case "/dashboard":
          return "Projects";
        case "/dashboard/calendar":
          return "Calendar";
        case "/dashboard/team":
          return "Team";
        case "/dashboard/team/user":
          return "Team";
        case "/dashboard/team/chat":
          return "Team";
        case "/dashboard/reports":
          return "Reports";
        case "/dashboard/notifications":
          return "Notifications";
        case "/dashboard/usersettings":
          return "Settings";
        case "/dashboard/userprofile":
          return "Your Profile";
        case "/dashboard/support":
          return "Support";
        default:
          return currentPage;
      }
    });
  }
  useEffect(() => {
    pageChange();
  }, [location.pathname]);

  function getDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      <div className="border-b-2 border-indigo-400">
        <Disclosure as="nav" className="bg-indigo-600">
          {({ open }) => (
            <>
              <div className=" px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/dashboard" className="p-1.5">
                        <h1 className="transition font-bold text-gray-50 text-3xl italic hover:text-indigo-200">
                          ProjectFlow
                        </h1>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              currentPage === item.name
                                ? "bg-gray-900 text-white"
                                : "text-gray-100 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Notification dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div className="relative">
                          <Menu.Button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </Menu.Button>
                          {/* red indicator if there are any new notifications */}
                          {notifications.filter(
                            (notification) => !notification.read
                          ).length > 0 && (
                            <div className="absolute top-0 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2">
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            </div>
                          )}
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-[9999] mt-2 w-60 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                            {notifications.length > 0 ? (
                              <div className="flex flex-col">
                                <div className=" max-h-72 overflow-y-auto">
                                  {notifications.filter(
                                    (notification) => !notification.read
                                  ).length > 0 ? (
                                    notifications
                                      .filter(
                                        (notification) => !notification.read
                                      )
                                      .map((notification) => (
                                        <Menu.Item key={notification._id}>
                                          <Link to="/dashboard/notifications">
                                            <div className="block px-4 py-2 text-sm bg-white dark:bg-neutral-700 hover:dark:bg-neutral-800 hover:bg-gray-100 border-b-2 border-gray-200">
                                              <div className="flex flex-col">
                                                <div className="flex justify-between items-center">
                                                  <span className="text-xs">
                                                    {
                                                      notification.notificationType
                                                    }
                                                  </span>
                                                  <span className="text-xs">
                                                    {getDate(notification.date)}
                                                  </span>
                                                </div>
                                                <span className="text-md font-bold">
                                                  {notification.message}
                                                </span>
                                              </div>
                                            </div>
                                          </Link>
                                        </Menu.Item>
                                      ))
                                  ) : (
                                    <Menu.Item>
                                      <div className="px-4 py-2 text-sm text-gray-700">
                                        No new notifications
                                      </div>
                                    </Menu.Item>
                                  )}
                                </div>
                                <Menu.Item>
                                  <Link
                                    to="/dashboard/notifications"
                                    className="block px-4 py-1 text-sm text-gray-700 text-center bg-indigo-200"
                                  >
                                    View all notifications
                                  </Link>
                                </Menu.Item>
                              </div>
                            ) : (
                              <Menu.Item>
                                <div className="px-4 py-2 text-sm text-gray-700">
                                  No new notifications
                                </div>
                              </Menu.Item>
                            )}
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={user.profilePicture}
                              alt="user profile picture"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-[9999] mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.href}
                                    className={classNames(
                                      active ? "text-white bg-gray-400 dark:bg-gray-800" : "",
                                      "block px-4 py-2 text-sm",
                                      currentPage === item.name
                                        ? "bg-gray-700 text-white"
                                        : ""
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                            <LogoutButton
                              classes={
                                "block px-4 py-2 text-sm w-full text-left hover:text-white hover:bg-gray-400 hover:dark:bg-gray-800"
                              }
                            />
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden absolute z-[9999] bg-inherit w-full border-b-4 border-indigo-900">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        currentPage === item.name
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.profilePicture}
                        alt="user profile picture"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user && user.username}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user && user.email}
                      </div>
                    </div>
                    <Disclosure.Button
                      as="a"
                      href="/dashboard/notifications"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      {/* red indicator if there are any new notifications */}
                      {notifications.filter(
                        (notification) => !notification.read
                      ).length > 0 && (
                        <div className="absolute top-0 right-0 h-3 w-3 translate-x-1/2 -translate-y-1/2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                        </div>
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={`/dashboard/${item.href}`}
                        className={classNames(
                          "block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white text-left w-full",
                          currentPage === item.name
                            ? "bg-gray-700 text-white"
                            : ""
                        )}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                    <LogoutButton classes="block rounded-md text-left w-full px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white" />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
