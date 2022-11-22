import React, {useState ,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate , Link} from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Login1 from '../pictures/LoginPhotos/login1.jpeg'
import Login2 from '../pictures/LoginPhotos/login2.jpeg'
import Login3 from '../pictures/LoginPhotos/login3.jpeg'
import Login4 from '../pictures/LoginPhotos/login4.jpeg'
import Login5 from '../pictures/LoginPhotos/login5.jpeg'
import '../styles/pages/Register.css'
import {AiOutlineUser, AiOutlineMail} from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'
import {IoEarthOutline} from 'react-icons/io5'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '',
        email: '', 
        username: '',
        password: '', 
        password2: '', 
    })
    const [formErrors, setFormErrors] = useState({
        firstName: '', 
        lastName: '',
        email: '', 
        username: '',
        password: '', 
        password2: '',
    })
    const [submitAttempt, setSubmitAttempt] = useState(false)
    const {firstName, lastName, email, username, password, password2} = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    
    useEffect(()=> {
        if (isError){
            toast.error('Registration error. Please complete the indicated areas.', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            if(message === 'An account exist with this email'){
                setFormErrors((prev) => (
                    {
                    ...prev, 
                    email: message
                    }
                ))
            } else if(message === 'This username has been claimed already'){
                setFormErrors((prev) => (
                    {
                    ...prev, 
                    username: message
                    }
                ))
            }
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
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!values.firstName) {
            errors.firstName = `First name is required`
        }
        if (!values.username) {
            errors.username = 'Username is required'
        }
        if (!values.email) {
            errors.email = 'Email is required'
        } else if (!regex.test(values.email)) {
            errors.email = 'Please enter a valid Email'
        }
        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters'
        } else if (values.password.length > 15) {
            errors.password = 'Password cannot exceed more than 15 characters'
        }
        if (values.password !== values.password2) {
            errors.password2 = 'Passwords do not match'
        }
        return errors;
    }


    
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(reset())
        setFormErrors(validate(formData))
        console.log(formErrors)
        if(password !== password2){
            toast.error('Registration error. Please complete the indicated areas', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        } else if(password.length < 4){
            toast.error('Registration error. Please complete the indicated fields', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        } else {
            dispatch(register(formData))
        }
    }

    const [randomNum, setRandomNum] = useState(
        Math.floor(Math.random() * 5)
      )
      
    
    const loginPic = [Login1, Login2, Login3, Login4, Login5 ]
    const handleLoginReset = () => {
        dispatch(reset())
    }


  return (
    <div className='Register'>
    <img src={loginPic[randomNum]} alt="" />
    <div className="register--filter"></div>
    <h1 className='register--title'>Keep Me Accountable 75</h1>
    <div className='register--container'>
        <h2>Register Section</h2>
            <form onSubmit={onSubmit} className='register--form'>
                <div className= {`register--input ${formErrors.firstName && formErrors.firstName !== ''? 'red--border' : ' '}`}>
                    <AiOutlineUser/>
                    <label htmlFor="firstName"></label>
                    <input type="text" name='firstName' id='firstName' value={firstName} onChange={onChange} placeholder='First Name'/> 
                </div>
                {formErrors.firstName !== '' && <p className='register--invalid'>{formErrors.firstName}</p>}
                <div className='register--input'>
                    <AiOutlineUser/>
                    <label htmlFor="lastName"></label>
                    <input type="text" name='lastName' id='lastName' value={lastName} onChange={onChange} placeholder='Last Name'/> 
                </div>
                <div className={`register--input ${formErrors.username && formErrors.username !== ''? 'red--border' : ' '}`}>
                    <IoEarthOutline/>
                    <label htmlFor="username"></label>
                    <input type="text" name='username' id='username' value={username} onChange={onChange} placeholder='Username'/>
                </div>
                {formErrors.username !== '' && <p className='register--invalid'>{formErrors.username}</p>}
                <div className={`register--input ${formErrors.email && formErrors.email !== ''? 'red--border' : ' '}`}>
                    <AiOutlineMail /> 
                    <label htmlFor="email"></label>
                    <input type="text" name='email' id='email' value={email} onChange={onChange} placeholder='Email'/> 
                </div>
                {formErrors.email !== '' && <p className='register--invalid'>{formErrors.email}</p>}
                <div className={`register--input ${formErrors.password && formErrors.password !== ''? 'red--border' : ' '}`}>
                    <BsKey />
                    <label htmlFor="password"></label>
                    <input type="password" name='password' id='password' value={password} onChange={onChange} placeholder='Password'/> 
                </div>
                {formErrors.password !== '' && <p className='register--invalid'>{formErrors.password}</p>}
                <div className={`register--input ${formErrors.password2 && formErrors.password2 !== ''? 'red--border' : ' '}`}>
                    <BsKey />
                    <label htmlFor="password2"></label>
                    <input type="password" name='password2' id='password2' value={password2} onChange={onChange} placeholder='Confirm Password'/>   
                </div>
                {formErrors.password2 !== '' && <p className='register--invalid'>{formErrors.password2}</p>}
                <button type='submit' className='register--button'>Register</button>
            </form>
            <Link to='/login' onClick={handleLoginReset}>Already have an account? Login</Link>  
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
