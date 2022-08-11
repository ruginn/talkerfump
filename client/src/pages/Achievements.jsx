import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Achievements() {
  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate()

  useEffect(()=> {
    if(!user){
     navigate('/login')
    }
  }, [])
  
  
  return (
    <div>
        this is the achievement page
    </div>
  )
}
