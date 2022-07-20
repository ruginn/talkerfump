import React from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import '../styles/components/FollowerCard.css'
import { Link } from 'react-router-dom'

export default function FollowerCard({user, setFollowersModal, setFollowingModal}) {
    const userId = user._id


    const onCloseModal = () =>{
        setFollowersModal(false)
    }
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
        {/* <button>Remove</button> */}
    </div>
  )
}
