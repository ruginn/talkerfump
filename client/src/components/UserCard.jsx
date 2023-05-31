import React from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import UserProfile from '../pages/UserProfile'
import {Link} from 'react-router-dom'
import '../styles/components/UserCard.css'

export default function UserCard({user}) {
  return (
    <div className='user--search--card'>
      <Link className='user--search--link' to={`/users/${user._id}`} key={user._id}>
        <div className='profile--container'>
          {user.profileImage?  <img src= {user.profileImage} alt="" className='profile--pic shift-margin'/>:<div><span>{user.firstName[0].toUpperCase()}</span><span>{user.lastName[0].toUpperCase()}</span></div>}
          {/* <img src={user.profileImage ? user.profileImage : profileCat} alt="" className='profile--pic shift-margin' />  */}
        </div>
        <div>
          <h1 className='user--search--cardName'>{user.firstName}</h1>
          <h2 className='user--search--cardName smaller--name'>@{user.username}</h2>
          <span>{user.followers ? user.followers.length: ''} followers </span>
          <span>{user.following? user.following.length: ''} following</span>
        </div>
        <br></br>
      </Link>
    </div>
  )
}
