import React from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import UserProfile from '../pages/UserProfile'
import {Link} from 'react-router-dom'

export default function UserCard({user}) {
  return (
    <div>
      <Link to={`/users/${user._id}`} key={user._id}>
        <div className='profile--container'>
            <img src={user.profileImage ? user.profileImage : profileCat} alt="" className='profile--pic' /> 
        </div>
        <h1>{user.firstName}</h1>
        <h2>@{user.username}</h2>
        <span>{user.followers ? user.followers.length: ''} followers </span>
        <span>{user.following? user.following.length: ''} following</span>
        <br></br>
      </Link>
    </div>
  )
}
