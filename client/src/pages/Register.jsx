import React, {useState ,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate , Link} from 'react-router-dom'
import { register } from '../features/auth/authSlice'
import Login1 from '../pictures/LoginPhotos/login1.jpeg'
import Login2 from '../pictures/LoginPhotos/login2.jpeg'
import Login3 from '../pictures/LoginPhotos/login3.jpeg'
import Login4 from '../pictures/LoginPhotos/login4.jpeg'
import Login5 from '../pictures/LoginPhotos/login5.jpeg'
import '../styles/pages/Register.css'
import {AiOutlineUser, AiOutlineMail} from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'
import {IoEarthOutline} from 'react-icons/io5'


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

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(()=> {
        if (isError){
            alert(message)
        }
        if(isSuccess || user) {
            navigate('/')
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
                firstName, email, password, username, lastName
            }
            dispatch(register(userData))
        }
    }

    const [randomNum, setRandomNum] = useState(
        Math.floor(Math.random() * 5)
      )
      
    
      const loginPic = [Login1, Login2, Login3, Login4, Login5 ]
  return (
    <div className='Register'>
    <img src={loginPic[randomNum]} alt="" />
    <div className="register--filter"></div>
    <h1 className='register--title'>Keep Me Accountable 75</h1>
    <div className='register--container'>
        <h2>Register Section</h2>
            <form onSubmit={onSubmit} className='register--form'>
                <div className='register--input'>
                    <AiOutlineUser/>
                    <label htmlFor="firstName"></label>
                    <input type="text" name='firstName' id='firstName' value={firstName} onChange={onChange} placeholder='First Name'/> 
                </div>
                <div className='register--input'>
                    <AiOutlineUser/>
                    <label htmlFor="lastName"></label>
                    <input type="text" name='lastName' id='lastName' value={lastName} onChange={onChange} placeholder='Last Name'/> 
                </div>
                <div className='register--input'>
                    <IoEarthOutline/>
                    <label htmlFor="username"></label>
                    <input type="text" name='username' id='username' value={username} onChange={onChange} placeholder='Username'/>
                </div>
                <div className='register--input'>
                    <AiOutlineMail /> 
                    <label htmlFor="email"></label>
                    <input type="text" name='email' id='email' value={email} onChange={onChange} placeholder='Email'/> 
                </div>
                <div className='register--input'>
                    <BsKey />
                    <label htmlFor="password"></label>
                    <input type="password" name='password' id='password' value={password} onChange={onChange} placeholder='Password'/> 
                </div>
                <div className='register--input'>
                    <BsKey />
                    <label htmlFor="password2"></label>
                    <input type="password" name='password2' id='password2' value={password2} onChange={onChange} placeholder='Confirm Password'/>   
                </div>
                <button type='submit' className='register--button'>Register</button>
            </form>
            <Link to='/login' >Already have an account? Login</Link>  
        </div>
    </div>
  )
}
