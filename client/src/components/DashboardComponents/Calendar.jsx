import { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Loader from "../Loader";
import { Scheduler } from "@aldabil/react-scheduler";

//no project components
import NoProjectsMessage from "./ProjectComponents/NoProjectsMessage";
import CreateProjectModal from "./ProjectComponents/CreateProjectModal";

//context
import { ProjectsContext } from "../../../context/projectContext";
import { TasksContext } from "../../../context/tasksContext";
const defaultSettings = {
  weekDays: [0, 1, 2, 3, 4, 5, 6],
  weekStartOn: 1,
  startHour: 0,
  endHour: 24,
  step: 30,
};

export default function Calendar() {
  const { allTasks, setAllTasks } = useContext(TasksContext); // get tasks from TasksContext
  const { projects } = useContext(ProjectsContext); // get projects from ProjectsContext

  const [createProjectModal, setCreateProjectModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(() => {
      return allTasks.map((task) => {
        return {
          event_id: task._id,
          title: task.taskName,
          start: new Date(task.fromDate),
          end: new Date(task.toDate),
          assignedTo: task.assignedTo,
          description: task.description,
        };
      });
    });
    setLoading(false);
  }, [allTasks]);

  async function handleDelete(id) {
    try {
      await axios.delete(`/api/project/any/deleteTask/${id}`).then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success(res.data.message);
          setAllTasks(res.data.tasks);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {projects.length > 0 ? (
        loading ? (
          <Loader />
        ) : (
          <Scheduler
            view="month"
            height="700"
            month={defaultSettings}
            week={defaultSettings}
            day={defaultSettings}
            events={events}
            editable={false}
            fields={[
              {
                name: "assignedTo",
                type: "input",
                config: {
                  label: "Assigned To",
                  required: true,
                  min: 3,
                  variant: "outlined",
                },
              },
              {
                name: "description",
                type: "input",
                config: {
                  label: "Description",
                  required: false,
                  min: 3,
                  variant: "outlined",
                },
              },
            ]}
            viewerTitleComponent={(fields, event) => {
              return (
                <div className="flex flex-col justify-center">
                  <div className="flex gap-2 items-center">
                    <p className="text-base text-white">Task Name:</p>
                    <h1 className="text-xl">{fields.title}</h1>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-base text-white">Assigned To:</p>
                    <h1 className="text-xl">{fields.assignedTo}</h1>
                  </div>
                </div>
              );
            }}
            viewerExtraComponent={(fields, event) => {
              return (
                <div className="flex flex-col justify-center">
                  <p className="text-base text-gray-400">Description:</p>
                  <h1 className="text-xl">{event.description}</h1>
                </div>
              );
            }}
            onDelete={(id) => handleDelete(id)}
          />
        )
      ) : (
        <NoProjectsMessage setCreateProjectModal={setCreateProjectModal} />
      )}
      {createProjectModal && (
        <CreateProjectModal modalActive={setCreateProjectModal} />
      )}
    </>
  );
}
