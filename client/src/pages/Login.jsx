import React from 'react'
import { login, reset } from '../features/auth/authSlice'
import { useDispatch, useSelector} from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Login1 from '../pictures/LoginPhotos/login1.jpeg'
import Login2 from '../pictures/LoginPhotos/login2.jpeg'
import Login3 from '../pictures/LoginPhotos/login3.jpeg'
import Login4 from '../pictures/LoginPhotos/login4.jpeg'
import Login5 from '../pictures/LoginPhotos/login5.jpeg'
import {AiOutlineMail} from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import '../styles/pages/Login.css'


export default function Login() {
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  })
  const [formErrors, setFormErrors] = useState({
    email: '', 
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {email, password} = formData

  const {user, isSuccess, isError, isLoading, message} = useSelector((state)=> state.auth)

  useEffect(() => {
    if(isError){
      toast.error('Incorrect login credentials', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    if(isSuccess || user){
      navigate('/')
    }

  }, [user, isError, isSuccess, message,  dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!regex.test(values.email)) {
        errors.email = 'Please enter a valid Email'
    }
    if (!values.password) {
      errors.password = "Password is required"
    }
    return errors
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(reset())
    setFormErrors(validate(formData))
    console.log(formData)
    if (password.length >= 1 && email.length >= 1){
      dispatch(login(formData))
    }
  }

  const handleRegisterReset = () => {
    dispatch(reset())
  }

  const [randomNum, setRandomNum] = useState(
    Math.floor(Math.random() * 5)
  )
  

  const loginPic = [Login1, Login2, Login3, Login4, Login5 ]
  
  const emailSelect = useRef()
  const passwordSelect = useRef()

  const selectedSection = (inputSelector) => {
    inputSelector.current.focus()
  }


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
            <div onClick={() => selectedSection(emailSelect)} className={`login--input ${formErrors.email && formErrors.email !== ''? 'red--border' : ' '}`}> 
              <AiOutlineMail />
              <label htmlFor="email"></label>
              <input ref={emailSelect} type="text" id='email' name='email' value={email} onChange={onChange} placeholder='Email'/>
            </div>
            {formErrors.email !== '' && <p className='register--invalid'>{formErrors.email}</p>}
            <div onClick={() => selectedSection(passwordSelect)} className={`login--input ${formErrors.password && formErrors.password !== ''? 'red--border' : ' '}`}>
            <BsKey /> 
              <label htmlFor="password"></label>
              <input ref={passwordSelect} type="password" id='password' name='password' value={password} onChange={onChange} placeholder='Password' />
            </div>
            {formErrors.password !== '' && <p className='register--invalid'>{formErrors.password}</p>}
            <button className='login--button'>Login</button>
          </form>
          <Link to='/register' onClick={handleRegisterReset} >Don't have an account? Register</Link>
        </div>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    </div>
  )
}
