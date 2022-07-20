import React from 'react'
import { login } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Login1 from '../pictures/LoginPhotos/login1.jpeg'
import Login2 from '../pictures/LoginPhotos/login2.jpeg'
import Login3 from '../pictures/LoginPhotos/login3.jpeg'
import Login4 from '../pictures/LoginPhotos/login4.jpeg'
import Login5 from '../pictures/LoginPhotos/login5.jpeg'

import '../styles/pages/Login.css'


export default function Login() {
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {email, password} = formData

  const {user, isSuccess, isError, message} = useSelector((state)=> state.auth)

  useEffect(() => {
    if(isError){
      alert('incorrect password or email') 
    }
    if(isSuccess || user){
      navigate('/')
    }

  }, [user, isError, isSuccess, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email, password
    }
    dispatch(login(userData))
  }

  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * 5)
  )
  

  const loginPic = [Login1, Login2, Login3, Login4, Login5 ]

  console.log(randomNum)

  return (
    <div className='login--page'>
      <div className='login--left'>
        <img src={loginPic[randomNum]} alt="" />
        <div className='login--left--center'>
          <h1>Welcome to</h1>
          <h1>Fitness Friend</h1>
        </div>
      </div>
      <div className="login--right">
        <h3>Login section</h3>
        <form onSubmit={onSubmit} >
          <label htmlFor="email">Email</label>
          <input type="text" id='email' name='email' value={email} onChange={onChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' value={password} onChange={onChange} />
          <button>Login</button>
        </form>
        <Link to='/register' >Don't have an account? Register</Link>
      </div>
    </div>
  )
}
