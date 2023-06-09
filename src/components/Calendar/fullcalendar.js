import React, { useState, useEffect } from 'react';
import { setDoc,doc,collection, onSnapshot ,deleteDoc} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
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
  

  useEffect(()=> {
    console.log('cur',currentEvents)
  },[currentEvents])


  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const newEvent= {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      calendarApi.addEvent(newEvent)
      addEventToDatabase(newEvent)
    }
  }


  const addEventToDatabase = (event )=> {
    console.log('eventid',event.id)
    const addEvent = async () => {
      try {
        await setDoc(doc(db, "users", user.uid, "calendarEvents", event.id), event);
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













// import React from 'react'
// import { formatDate } from '@fullcalendar/core'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import { INITIAL_EVENTS, createEventId } from './event-utils'

// export default class CalendarComponent extends React.Component {

//   state = {
//     weekendsVisible: true,
//     currentEvents: []
//   }

//   render() {
//     return (
     
//         <article className='calendar-container'>
//           {this.renderSidebar()}
//           <div className='demo-app-main'>
//             <FullCalendar
//               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//               headerToolbar={{
//                 left: 'prev,next today',
//                 center: 'title',
//                 right: 'dayGridMonth,timeGridDay'
//               }}
//               initialView='dayGridMonth'
//               editable={true}
//               selectable={true}
//               selectMirror={true}
//               dayMaxEvents={true}
//               weekends={this.state.weekendsVisible}
//               initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//               select={this.handleDateSelect}
//               eventContent={renderEventContent} // custom render function
//               eventClick={this.handleEventClick}
//               eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//             />
//           </div>
//         </article>
    
//     )
//   }

//   renderSidebar() {
//     return (
//       <div className='demo-app-sidebar'>

//         <div className='demo-app-sidebar-section'>
//           <label>
//             <input
//               type='checkbox'
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>

//       </div>
//     )
//   }

//   handleWeekendsToggle = () => {
//     this.setState({
//       weekendsVisible: !this.state.weekendsVisible
//     })
//   }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   handleEventClick = (clickInfo) => {
//     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }

//   handleEvents = (events) => {
//     this.setState({
//       currentEvents: events
//     })
//   }

// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }

