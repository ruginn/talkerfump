import React from 'react'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setSeenNotifications } from '../features/notifications/notificationsSlice'
import '../styles/components/NotificationsItem.css'


export default function NotificationsItem({notification}) {
    const dispatch = useDispatch()


    useEffect(() => {
        if(!notification.read){
            dispatch(setSeenNotifications(notification._id)) 
        }
    }, [])



    return (
    <div className={notification.read? 'notification--item read' : 'notification--item unread'}>
        <div>
            <img src={notification.sender.profileImage} alt="" className='notification--profile--pic'/>
        </div>
        <div>
            <p>{notification.sender.username} {notification.content}</p>
            <p>{new Date(notification.createdAt).toLocaleString('en-US')}</p> 
        </div>
    </div>
  )
}
