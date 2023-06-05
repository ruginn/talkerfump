import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import defaultCat from '../pictures/defaultCat.jpeg'

export default function Topbar() {
    const {user} = useSelector((state)=> state.auth)


  return (
    <div className='home--top--bar gone'>
          <SearchBar className='margin--left'/>
          <Link to={`/users/${user.id}`}>
            {user && <img src={user.profileImage ? user.profileImage:defaultCat} className='profile--pic--top' />}
            {user && <p>{user.firstName + ' ' + user?.lastName}</p>}
          </Link>
    </div>
  )
}
