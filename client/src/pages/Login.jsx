import React from 'react'
import { login, reset } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {email, password} = formData

  const {user, isLoading, isSuccess, isError, message} = useSelector((state)=> state.auth)

  useEffect(() => {
    if(isError){
      alert('incorrect password or email') 
    }
    if(isSuccess || user){
      alert('login Successful')
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
  return (
    <div className='login--page'>
      <h3>login section</h3>
      <form onSubmit={onSubmit} >
        <label htmlFor="email">Email</label>
        <input type="text" id='email' name='email' value={email} onChange={onChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" id='password' name='password' value={password} onChange={onChange} />
        <button>Login</button>
      </form>
      
    </div>
  )
}
