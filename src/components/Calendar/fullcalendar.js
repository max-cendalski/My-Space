import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"


const CalendarComponent = () => {
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  }
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
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
