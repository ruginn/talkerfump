import React, {useState ,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'


export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '',
        email: '', 
        username: '',
        password: '', 
        password2: '', 
    })

    const {firstName, lastName, email, username, password, password2} = formData;

    // const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(()=> {
        if (isError){
            alert(message)
        }
        if(isSuccess || user) {
            alert('register complete')
        }
    }, [user, isError, isSuccess, message, dispatch])


    const onChange = (e) => {
        setFormData((prevState) => (
            {
            ...prevState, 
            [e.target.name]: e.target.value
            })
        )
        console.log(formData)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
        alert('passwords do not match')
        } else {
            const userData = {
                firstName, email, password, username
            }
            dispatch(register(userData))
        }
    }

  return (
    <div className='Register'>
        <form onSubmit={onSubmit}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name='firstName' id='firstName' value={firstName} onChange={onChange}/>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name='lastName' id='lastName' value={lastName} onChange={onChange}/>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' value={username} onChange={onChange}/>
            <label htmlFor="email">Email</label>
            <input type="text" name='email' id='email' value={email} onChange={onChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' value={password} onChange={onChange}/>
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name='password2' id='password2' value={password2} onChange={onChange}/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}
