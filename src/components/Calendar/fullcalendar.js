import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const CalendarComponent = () => {
  const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr);
  }
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth",
      }}
      dateClick={handleDateClick}
    />
  );
};

export default CalendarComponent;
