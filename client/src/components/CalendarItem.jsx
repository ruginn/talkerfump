import {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import React from 'react'

export default function CalendarItem() {
    // const onDateClick = () => {
    //     alert('date was clicked')
    // }
  
    const [events, setEvents] = useState([
        {title: 'event69', date: '2022-07-01'}, 
        {title: 'event69', date: '2022-07-08'},
        {title: 'backday', date: '2022-08-08'}
    ])

    return (
    <div>
        <FullCalendar 
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            // headerToolbar= {[
            //     {left: 'prev,next today'},
            //     {center: 'title'},
            //     {right: 'dayGridMonth,timeGridWeek,listWeek'}
            // ]}
            events = {events}
            // dateClick={onDateClick()}
        />
    </div>
  )
}
