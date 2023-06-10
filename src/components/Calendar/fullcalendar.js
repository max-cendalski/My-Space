import React, { useState, useEffect } from 'react';
import { addDoc, doc, collection, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UserAuth } from "../../context/AuthContext";

function CalendarComponent() {
  const { user } = UserAuth();
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const calendarRef = React.useRef(null);


  const [isDialogOpen, setDialogOpen] = useState(false);
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


  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = async (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setSelectedDateInfo(selectInfo);
    setDialogOpen(true);
  }
  
  const handleDialogSubmit = async (title) => {
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

    setDialogOpen(false);
  }


  const addEventToDatabase = (event) => {
    const addEvent = async () => {
      try {
        await addDoc(collection(db, "users", user.uid, "calendarEvents"), event);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addEvent();
  }

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      (async function deleteEventFromDB() {
        try {
          const eventRef = doc(db, "users", user.uid, "calendarEvents", clickInfo.event.id);
          await deleteDoc(eventRef);
        } catch (err) {
          console.error("ERROR:", err);
        }
      })()
      clickInfo.event.remove();
    }
  }

  const handleEventDrop = async (info) => {
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
  const MyDialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <article className="dialog-calendar">
        <section className="dialog-calendar-content">
          {children}
          <button onClick={onClose}>Close</button>
        </section>
      </article>
    );
  };

  return (
    <article className='calendar-container'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        onToggle={handleWeekendsToggle}
      />
      <MyDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
      <article>
        <h1>Add new event</h1>
        <form  onSubmit={event => {
          event.preventDefault();
          handleDialogSubmit(event.target.elements.title.value);
        }}>
          <label>
            <input type="text" name="title" />
          </label>
          <button type="submit">Create event</button>
        </form>
        </article>
      </MyDialog>
      <article className='demo-app-main'>
        <FullCalendar
          ref={calendarRef}
          longPressDelay={500} // sets the delay for press and hold
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










