import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPartner } from '../features/auth/authSlice'
import { getUser } from '../features/users/userSlice'
import profileCat from '../pictures/defaultCat.jpeg'

export default function AccountabilityPartner() {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth.user)
    const user = useSelector((state) => state.users.user)

    useEffect(() => {
        dispatch(getUser(auth.buddy))
    },[])

    const clickPartner = () => {
        dispatch(getPartner())
    }
    console.log(user)

  return (
    <div>
        {! auth.buddy && 
        <div>
            <h1>Get an accountability partner</h1>
            <button onClick={clickPartner}>Opt in</button>
        </div>}
        {user && 
        <div>
            <div className='user--profile--card'>
            <img src= {user?.profileImage? user.profileImage: profileCat} alt="" className='user--profile--image'/>
            <h3>@{user && user.username}</h3>
            <p>{user.firstName} {user.lastName}</p>
            </div>
        </div>}
    </div>
  )
}
