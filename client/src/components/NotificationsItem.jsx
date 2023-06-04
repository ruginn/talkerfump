import React from 'react'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import profileCat from '../pictures/defaultCat.jpeg'
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
    <Link to={`/users/${notification.sender._id}`} className='notification--link' >
        <div className={notification.read? 'notification--item read' : 'notification--item unread'}>
            <div>
                {notification.sender.profileImage?<img src= {notification.sender.profileImage} alt="" className='notification--profile--pic'/>:<div className='notification--pp--none'><span>{notification.sender.firstName[0].toUpperCase()}</span><span>{notification.sender?.lastName[0].toUpperCase()}</span></div>}
                {/* <img src={notification.sender.profileImage ? notification.sender.profileImage: profileCat } alt="" className='notification--profile--pic'/> */}
            </div>
            <div className='notification--text'>
                <p><b>{notification.sender.username}</b> {notification.content}</p>
                <p className='notification--text2'>{new Date(notification.createdAt).toLocaleString('en-US')}</p> 
            </div>
        </div>
    </Link> 
    /* <div className={notification.read? 'notification--item read' : 'notification--item unread'}>
        <div>
            <img src={notification.sender.profileImage ? notification.sender.profileImage: profileCat } alt="" className='notification--profile--pic'/>
        </div>
        <div>
            <p>{notification.sender.username} {notification.content}</p>
            <p>{new Date(notification.createdAt).toLocaleString('en-US')}</p> 
        </div>
    </div> */
  )
}
