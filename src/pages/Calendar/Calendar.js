import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CalendarComponent from "../../components/Games/Calendar/fullcalendar";


const CalendarHomePage = () => {
  return (
    <>
      <Navbar />
      <CalendarComponent />
    </>
  );
};

export default CalendarHomePage;
