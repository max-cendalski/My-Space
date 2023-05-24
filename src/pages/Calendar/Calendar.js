import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar =() => {

    return (
      <>
        <Navbar />
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </>
    );

}

export default Calendar;
