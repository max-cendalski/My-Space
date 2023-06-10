import React, { useState, useEffect } from 'react';
import { addDoc,doc,collection, onSnapshot ,deleteDoc, updateDoc} from "firebase/firestore";
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
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // clear date selection
  
    if (title) {
      let newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      
      const id =  await addEventToDatabase(newEvent);
      newEvent.id = id;
      calendarApi.addEvent(newEvent);
    }
  }
  
  const addEventToDatabase = (event )=> {
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
      (async function deleteEventFromDB  () {
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

  return (
    <article className='calendar-container'>
      <Sidebar 
        weekendsVisible={weekendsVisible} 
        onToggle={handleWeekendsToggle}
      />
      <div className='demo-app-main'>
        <FullCalendar
        ref={calendarRef}
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
      </div>
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









