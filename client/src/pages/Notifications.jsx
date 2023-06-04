import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {getNotifications} from '../features/notifications/notificationsSlice'
import NotificationsItem from '../components/NotificationsItem'
import {setTopBarTrue} from '../features/general/generalSlice'

export default function Notifications() {
    const dispatch = useDispatch()
    const {notifications} = useSelector((state) => state.notifications)

    useEffect(() => {
        dispatch(getNotifications())
        dispatch(setTopBarTrue())
    }, [])


  return (
    <div>
        <h1>Notifications</h1>
        <div>
            {notifications.map((notification) => (
                <NotificationsItem notification={notification} key={notification._id}/>
            ))}
        </div>
    </div>
  )
}
