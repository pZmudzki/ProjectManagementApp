import { useState } from "react";

import TicketsView from "./TicketsView";
import FAQView from "./FAQView";

export default function Support() {
  const [viewOpened, setViewOpened] = useState("tickets");
  return (
    <div className="flex flex-col md:flex-row absolute top-[66px] right-0 bottom-0 left-0 z-0">
      <nav className="flex md:flex-col items-center border-b-2 bg-indigo-50 min-w-fit text-xl sm:text-2xl">
        <button
          type="button"
          name="tickets button"
          onClick={() => setViewOpened("tickets")}
          className={
            "p-3 w-full hover:bg-indigo-300 hover:text-black transition" +
            (viewOpened === "tickets"
              ? " bg-indigo-500 border-b-4 md:border-r-4 md:border-b-0 border-black text-white"
              : " bg-transparent border-b-4 md:border-r-4 md:border-b-0 border-gray-300")
          }
        >
          Create Ticket
        </button>
        <button
          type="button"
          name="faq button"
          onClick={() => setViewOpened("faq")}
          className={
            "p-3 w-full hover:bg-indigo-300 hover:text-black transition " +
            (viewOpened === "faq"
              ? " bg-indigo-500 border-b-4 md:border-r-4 md:border-b-0 border-black text-white"
              : " bg-transparent border-b-4 md:border-r-4 md:border-b-0 border-gray-300")
          }
        >
          FAQ
        </button>
      </nav>
      {viewOpened === "tickets" ? <TicketsView /> : <FAQView />}
    </div>
  );
}
