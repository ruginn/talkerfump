import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import defaultCat from '../pictures/defaultCat.jpeg'
import '../styles/components/TopBar.css'
import { AiOutlineLogout } from 'react-icons/ai'
import { logout, reset} from '../features/auth/authSlice'
import { reset as reset2 } from '../features/posts/postSlice'
import {reset as resetChat} from '../features/chat/chatSlice'
import {reset as resetUsers} from '../features/users/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Topbar() {
    const {user} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
      navigate('/login')
      dispatch(logout())
        dispatch(reset())
        dispatch(reset2())
        dispatch(resetChat())
        dispatch(resetUsers())
      // dispatch(reset())
      // dispatch(reset2())
      // dispatch(resetChat())
      // dispatch(resetUsers())
      // navigate('/login')
  }

  return (
    <div className='home--top--bar gone'>
          <SearchBar className='margin--left'/>
          <div className='top--bar--right'>
            <Link to={`/users/${user.id}`}>
              {user && <img src={user.profileImage ? user.profileImage:defaultCat} className='profile--pic--top' />}
              {user && <p>{user.firstName + ' ' + user?.lastName}</p>}
            </Link>
            <div className='top--right--drop'>
              <div className='top--right--inner' onClick={onLogout}>
                <AiOutlineLogout/> <span>Logout</span>
              </div>
            </div>
          </div>
    </div>
  )
}
