import React, { useState, useContext } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import UserListCard from "./UserListCard";

//context
import { ProjectsContext } from "../../../../context/projectContext";

export default function UserList({ setSelectedUser, selectedUser }) {
  const { projects } = useContext(ProjectsContext);

  const [searchUser, setSearchUser] = useState("");

  function handleSearch(e) {
    setSearchUser(e.target.value);
  }

  return (
    <aside className="w-min flex flex-col border-r-2">
      <div className="flex gap-2 px-5 py-3 items-center border-b-2">
        <input
          type="text"
          id="searchbar"
          name="searchbar"
          placeholder="Search user"
          className="bg-gray-200 py-1 px-2 rounded-xl"
          value={searchUser}
          onChange={handleSearch}
        />
        <MagnifyingGlassIcon className="h-5 w-5 " aria-hidden="true" />
      </div>
      <div className="h-full overflow-y-scroll">
        {projects.map((project) => {
          return (
            <Accordion key={project._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={project._id}
                // className="flex flex-col gap-2 px-5 py-3"
              >
                <Typography>{project.projectName}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: "0",
                }}
              >
                <ul className="flex flex-col gap-1">
                  <UserListCard
                    isProjectManager={true}
                    displayedUser={project.projectManager}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                  {project.projectTeam
                    .filter((user) => {
                      if (searchUser === "") {
                        return user;
                      } else if (
                        user.username
                          .toLowerCase()
                          .includes(searchUser.toLowerCase())
                      ) {
                        return user;
                      }
                    })
                    .map((user) => {
                      return (
                        <UserListCard
                          isProjectManager={false}
                          key={user._id}
                          displayedUser={user}
                          selectedUser={selectedUser}
                          setSelectedUser={setSelectedUser}
                        />
                      );
                    })}
                </ul>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </aside>
  );
}
