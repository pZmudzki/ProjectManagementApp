import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import LoadingButton from "../LoadingButton";

//context
import { UserContext } from "../../../context/userContext";

export default function TicketsView() {
  const { user } = useContext(UserContext);
  const [ticketContent, setTicketContent] = useState({
    from: user.email,
    subject: "",
    text: "",
  });

  const [sendingRequest, setSendingRequest] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setTicketContent((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function sendTicket(e) {
    e.preventDefault();
    setSendingRequest(true);
    try {
      const { data } = await axios.post("/api/support/sendTicket", {
        ticketContent,
      });
      if (data.error) {
        setSendingRequest(false);
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setSendingRequest(false);
        setTicketContent({
          from: user.email,
          subject: "",
          text: "",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleReset() {
    setTicketContent({
      from: user.email,
      subject: "",
      text: "",
    });
  }

  return (
    <div className="flex w-full justify-center items-center p-3">
      <div className="flex flex-col border-2 border-indigo-500 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-indigo-500 py-6 px-10">
          <h1 className="text-2xl sm:text-4xl font-semibold text-white">
            Write us a ticket
          </h1>
          <p className="text-base sm:text-2xl px-2 text-gray-200 text-wrap">
            Our team will get back to you via email as soon as possible
          </p>
        </div>
        <form
          className=" p-3 flex flex-col gap-2 bg-gray-50"
          onSubmit={sendTicket}
        >
          <div className="flex flex-col">
            <label className="text-xl text-gray-500">From</label>
            <p className="border-b-2 border-gray-500 py-1 px-2 text-xl text-gray-600 bg-gray-100 rounded select-none">
              {ticketContent.from}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject" className="text-xl text-gray-500">
              Subject
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter a subject"
              value={ticketContent.subject}
              className="border-b-2 border-gray-500 py-1 px-2 text-xl bg-gray-100 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="text" className="text-xl text-gray-500">
              Description
            </label>
            <textarea
              onChange={handleChange}
              name="text"
              id="text"
              cols="30"
              rows="4"
              placeholder="Enter a description"
              value={ticketContent.text}
              className="border-b-2 border-gray-500 py-1 px-2 text-xl bg-gray-100 rounded"
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button
              name="reset form"
              type="button"
              onClick={handleReset}
              className="grow bg-red-500 text-white font-bold rounded-md py-1 px-2 shadow-md hover:bg-red-600 transition duration-200 ease-in-out text-xl"
            >
              Reset
            </button>
            <button
              name="submit form"
              type="submit"
              className="grow bg-green-500 text-white font-bold rounded-md py-1 px-2 shadow-md hover:bg-green-600 transition duration-200 ease-in-out text-xl"
            >
              {sendingRequest ? <LoadingButton /> : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
