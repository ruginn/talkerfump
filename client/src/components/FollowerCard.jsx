import React from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import '../styles/components/FollowerCard.css'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { unfollowUser, followUser } from '../features/users/userSlice'
import { unfollowing, following } from '../features/auth/authSlice'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')


export default function FollowerCard({user, setFollowersModal, setFollowingModal}) {
    const userId = user._id
    const dispatch = useDispatch()
    const auth = useSelector((state)=> state.auth.user)

    const isFollowing = auth.following.includes(user._id)

    const onCloseModal = () =>{
        setFollowersModal(false)
    }

    const onUnfollowUser = () => {
        dispatch(unfollowUser(userId))
        dispatch(unfollowing(userId))
    }

    const onFollow = () => {
        dispatch(followUser(userId))
        dispatch(following(userId))
        const messageData = {
            room: userId, 
            activity: 'is now following you.',
            user: auth.username, 
          }
          socket.emit('join_room', userId)
          socket.emit('send_notifications', messageData)
          socket.emit('leave_room', userId)
    }

    console.log(isFollowing)

  return (
    <div className='followCard--container'>
        <Link to={`/users/${userId}`} onClick={onCloseModal}>
        <div >
            {user.profileImage?  <img src= {user.profileImage} alt="" className='profile--pic--Fcard'/>:<div className='pp--Fcard--none'><span>{user?.firstName[0].toUpperCase()}</span><span>{user?.lastName[0].toUpperCase()}</span></div>}
            {/* <img src={user.profileImage? user.profileImage : profileCat} alt="" className='profile--pic--Fcard' /> */}
        </div>
        <div>
            <p className='followCard--username'>@{user.username}</p>
            <p className='followCard--name'>{user.firstName} {user.lastName}</p>
        </div> </Link>
        {auth.id === userId? '' :
        isFollowing? <button onClick={onUnfollowUser} className='follow--button following'>Unfollow</button> : <button onClick={onFollow} className='follow--button unfollowing'>Follow</button>}
        
    </div>
  )
}
