import React,{useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";

function renderEventContent(eventInfo) {
  return (
    <>
      <p
        style={{
          color: "#fff",
          backgroundColor: eventInfo.event.backgroundColor,
          width: "100%",
          padding: "3px 5px",
          borderRadius: "3px",
          cursor: "pointer",
          whiteSpace: "normal",
        }}
      >
        {eventInfo.timeText}
        {" "}
        {eventInfo.event.title}
      </p>
    </>
  );
}

const Calendar = ({onDayClick, onEventClick}) => {
  const [eventDates, setEventDates] = useState([
    { 
      id: 1,
      title: 'Jumuah Prayer',
      start: '2021-03-12T12:30:00',
      end: '2021-03-12T13:00:00',
      backgroundColor: "#3788d8"
    },
    { 
      id: 2,
      title: 'Jumuah Prayer',
      start: '2021-03-12T13:00:00',
      end: '2021-03-12T13:30:00',
      backgroundColor: "#3788d8"
    },
    {
      id: 3,
      title: "Jumu'ah Prayer",
      start: '2021-03-19T13:30:00',
      end: '2021-03-19T14:00:00',
      backgroundColor: "#3788d8"
    },
    { 
      id: 4,
      title: 'Jumuah Prayer',
      start: '2021-03-12T12:30:00',
      end: '2021-03-12T13:00:00',
      backgroundColor: "#3788d8"
    },
    { 
      id: 5,
      title: 'Jumuah Prayer',
      start: '2021-03-19T13:00:00',
      end: '2021-03-19T13:30:00',
      backgroundColor: "#3788d8"
    },
    {
      id: 6,
      title: "Jumu'ah Prayer",
      start: '2021-03-19T13:30:00',
      end: '2021-03-19T14:00:00',
      backgroundColor: "#3788d8"
    },
  ])

  const handleDayClick = (day) => {
    onDayClick(day)
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      initialView="dayGridMonth"
      weekends
      events={eventDates}
      eventContent={renderEventContent}
      eventClick={(info) => onEventClick(info)}
    />

  )
}
export default Calendar;