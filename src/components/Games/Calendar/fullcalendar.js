import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const CalendarComponent = () => {
  return (

      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />

  );
};

export default CalendarComponent;
