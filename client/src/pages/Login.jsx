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
import {AiOutlineMail} from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'

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
          <div className='login--left--container'>
            <h1>Keep Me Accountable 75</h1>
            <h3>A 75 Hard Joural</h3>
            <p>Connect with other users and get an Accountability Buddy</p>
          </div>
        </div>
      </div>
      <div className='login--background'>
        <div className='circle--one'></div>
        <div className='circle--two'></div>
      </div>
      <div className="login--right">
        <div className='login--container'>
          <h2>Welcome Back</h2>
          <form onSubmit={onSubmit} className='login--form'>
            <div className='login--input'> 
              <AiOutlineMail />
              <label htmlFor="email"></label>
              <input type="text" id='email' name='email' value={email} onChange={onChange} placeholder='Email'/>
            </div>
            <div className='login--input'>
            <BsKey /> 
              <label htmlFor="password"></label>
              <input type="password" id='password' name='password' value={password} onChange={onChange} placeholder='Password' />
            </div>
            <button className='login--button'>Login</button>
          </form>
          <Link to='/register' >Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  )
}
