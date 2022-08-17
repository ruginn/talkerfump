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
    const date = new Date()
    // let testingMonth = testingDate.getMonth() + 1
    // let testingDatee = testingDate.getDate() 
    // if (testingMonth.toString().length === 1){
    //     testingMonth = `0${testingMonth}`
    // }
    // if(testingDatee){
    //     console.log('yes')
    // }




    const newDate = new Date(date.setDate(date.getDate() - 1))
    let yesterdayMonth = newDate.getMonth() + 1 
    if(yesterdayMonth.toString().length === 1){
        yesterdayMonth = `0${yesterdayMonth}`
    }

    let yesterdayDay = newDate.getDate()  
    if(yesterdayDay.toString().length === 1){
        yesterdayDay = `0${yesterdayDay}`
    }
    let yesterday = `${newDate.getFullYear()}-${yesterdayMonth}-${yesterdayDay}`
    console.log(newDate.toLocaleString())
    const createdAt = new Date()
    console.log(createdAt.getDate())

    const [events, setEvents] = useState([
        {title: 'event69', date: '2022-07-01'}, 
        {title: 'event69', date: '2022-07-08'},
        {title: 'backday', date: '2022-08-08'},
        {title: 'testing', date: newDate},
        {title: 'day1', date: yesterday}, 
       
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
            // dateClick={onDateClick}
        />
    </div>
  )
}
