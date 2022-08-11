import React from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import '../styles/components/FollowerCard.css'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { unfollowUser, followUser } from '../features/users/userSlice'
import { unfollowing, following } from '../features/auth/authSlice'


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
    }

    console.log(isFollowing)

  return (
    <div className='followCard--container'>
        <Link to={`/users/${userId}`} onClick={onCloseModal}>
        <div >
            <img src={user.profileImage? user.profileImage : profileCat} alt="" className='profile--pic--Fcard' />
        </div>
        <div>
            <p>@{user.username}</p>
            <p>{user.firstName}</p>
        </div> </Link>
        {auth.id === userId? '' :
        isFollowing? <button onClick={onUnfollowUser}>Unfollow</button> : <button onClick={onFollow}>Follow</button>}
        
    </div>
  )
}
