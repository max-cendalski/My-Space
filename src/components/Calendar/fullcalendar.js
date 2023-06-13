import React, { useState, useEffect } from 'react';
import { addDoc, doc, collection, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UserAuth } from "../../context/AuthContext";
import CalendarDialogDel from '../utils/CalendarDialogDel';
import CalendarDialogCreate from '../utils/CalendarDialogAdd';

function CalendarComponent() {
  const { user } = UserAuth();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = React.useRef(null);

  const [clickInfoState, setClickInfoState] = useState(null);
  const [showDialogDeleteEvent, setShowDialogDeleteEvent] = useState(false)
  const [showDialogAddEvent, setShowDialogAddEvent] = useState(false)

  const [selectedDateInfo, setSelectedDateInfo] = useState(null);



  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `users/${user.uid}`, "calendarEvents"),
      (snapShot) => {
        let eventList = [];

        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          calendarApi.removeAllEvents();
        }

        snapShot.docs.forEach((doc) => {
          const event = { id: doc.id, ...doc.data() };
          eventList.push(event);

          if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.addEvent(event);
          }
        });
        setCurrentEvents(eventList);
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (showDialogAddEvent) {
      document.getElementsByTagName('input')[1].focus();
    }
  }, [showDialogAddEvent]);


  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setSelectedDateInfo(selectInfo);
    setShowDialogAddEvent(true)
  }

  const handleDialogSubmit = (title) => { //Add new event
    let newEvent = {
      title,
      start: selectedDateInfo.startStr,
      end: selectedDateInfo.endStr,
      allDay: selectedDateInfo.allDay
    };

    const id = addEventToDatabase(newEvent);
    newEvent.id = id;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(newEvent);
    setSelectedDateInfo(null);
    setShowDialogAddEvent(false)
  }

  const addEventToDatabase = (event) => { //add new event to DB function
    const addEvent = async () => {
      try {
        await addDoc(collection(db, "users", user.uid, "calendarEvents"), event);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addEvent();
  }

  const handleEventClick = (clickInfo) => { //Existed event click
    setClickInfoState(clickInfo);
    setShowDialogDeleteEvent(true)
  }

  const confirmRemoveEvent = () => {
    (async function deleteEventFromDB() {
      try {
        const eventRef = doc(db, "users", user.uid, "calendarEvents", clickInfoState.event.id);
        await deleteDoc(eventRef);
      } catch (err) {
        console.error("ERROR:", err);
      }
    })()
    clickInfoState.event.remove();
    setShowDialogDeleteEvent(true)
  }

  const handleEventDrop = async (info) => { //Drag and drop function
    const event = info.event;
    try {
      await updateDoc(doc(db, "users", user.uid, "calendarEvents", event.id), {
        start: event.start.toISOString(),
        end: event.end?.toISOString()
      });
    } catch (e) {
      console.error("Error updating document:", e);
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events);
  }


  return (
    <article className='calendar-container'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        onToggle={handleWeekendsToggle}
      />
      <CalendarDialogDel
        showDialog={showDialogDeleteEvent}
        onClose={() => setShowDialogDeleteEvent(false)}
        onConfirm={confirmRemoveEvent}
      />
      <CalendarDialogCreate
        showDialog={showDialogAddEvent}
        onClose={() => setShowDialogAddEvent(false)}
        onSubmit={handleDialogSubmit}
      />
      <article className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
          longPressDelay={400} // sets the delay for press and hold
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={currentEvents}
          eventDrop={handleEventDrop}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />

      </article>


    </article>
  );
}

function Sidebar({ weekendsVisible, onToggle }) {
  return (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={onToggle}
          ></input>
          toggle weekends
        </label>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarComponent;










