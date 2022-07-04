import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CreatePost from '../components/CreatePost'

export default function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const user = useSelector((state)=> state.auth.user.user)


    useEffect(()=> {
        if(!user ) {
            navigate('/login')
        }
    }, [ user, navigate])
    

    console.log(user)

  return (
    <div>
        <h3>Welcome {user && user.firstName}</h3>
        <p>0 posts</p>
        <span>{user.followers.length} followers </span>
        <span>{user.following.length} following</span>
        <CreatePost />
    </div>
    
  )
}
