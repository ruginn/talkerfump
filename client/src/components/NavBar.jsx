import {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {FaRegHandshake} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {BsCalendarDate, BsTrophy, BsBook, BsBell} from 'react-icons/bs'
import {AiOutlineSetting, AiOutlineUser, AiOutlineMessage, AiOutlineHome, AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai'
import {VscChromeClose} from 'react-icons/vsc'
import '../styles/components/NavBar.css'
import { logout, reset} from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { reset as reset2 } from '../features/posts/postSlice'
import {reset as resetChat} from '../features/chat/chatSlice'
import {reset as resetUsers} from '../features/users/userSlice'
import { checkNotifications } from '../features/notifications/notificationsSlice'
import SettingsModal from '../components/SettingsModal'
import logo from '../pictures/logokma.svg'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:8080')


export default function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth.user)
    const {notifications, count} = useSelector((state) => state.notifications)

    const [settingsModal, setSettingsModal] = useState(false)
    const onLogout = () => {
        navigate('/login')
        dispatch(logout())
          dispatch(reset())
          dispatch(reset2())
          dispatch(resetChat())
          dispatch(resetUsers())
        // dispatch(reset())
        // dispatch(reset2())
        // dispatch(resetChat())
        // dispatch(resetUsers())
        // navigate('/login')
    }

    useEffect(() => {
      socket.emit('user_loggedIn', auth.id)
      
    },[])

    const handleNotifications = () =>{
      dispatch(checkNotifications())
    }

    let navRef = useRef()
    let burgerRef = useRef()

    useEffect(() => {
      let handler = (e) => {
        if(!navRef.current.contains(e.target)) {
          setNavDisplay(false)
        }
      }
      document.addEventListener('mousedown', handler) 
      return () => {
        document.removeEventListener('mousedown', handler)
      }
    }, [])

    
    
    const [navDisplay, setNavDisplay] = useState(false)

    const toggleNav = () => {
      setNavDisplay((prev) => !prev)
      console.log(navDisplay)
    }
    
    const mobileNotification = () => {
      handleNotifications()
      toggleNav()
    }

    let navMobile = navDisplay? 'display' : ''
   
  return (
    <div className="top">
        <div className='Mobile--nav'>
          <Link to='/' className='Mobile--logo'> <img src={logo} alt="" className='nav--logo'/><span className='nav--title'>Keep Me Accountable 75</span></Link>
          {!navDisplay && <div className='burger--menu' onClick={toggleNav} ref={burgerRef}>
            <span className='hamburger'></span>
            <span className='hamburger'></span>
            <span className='hamburger'></span>
          </div>}
          {navDisplay &&  <div onClick={toggleNav} className='nav--x'><VscChromeClose/></div>}
        </div>
        <div className={`Nav--bar ${navDisplay ? 'display': ''}`} ref={navRef}>
            <div onClick={toggleNav}><Link to='/' className='Logo'> <img src={logo} alt="" className='nav--logo'/><span className='nav--title'>Keep Me Accountable 75</span></Link></div> 
            <div onClick={toggleNav}><Link to='/' className='Nav--row top--nav--item' title='Home'><AiOutlineHome /> <span>Home</span></Link></div> 
            <div onClick={mobileNotification}><Link to='/notifications' className='Nav--row' title='Notifications'><div className='notification--bell'><BsBell/>{count > 0 ? <span className='notification--count'>{count}</span>: ''}</div><span>Notifications</span></Link></div>
            <div onClick={toggleNav}><Link to='/users' className='Nav--row' title='Users'><AiOutlineUser /><span>Users</span></Link></div>
            {/* <div onClick={toggleNav}><Link to='/achievements' className='Nav--row larger--icon' title='Achievements'><BsTrophy /><span>Achievements</span></Link></div> */}
            <div onClick={toggleNav}><Link to='/accountability' className='Nav--row' title='Gym Buddy'><FaRegHandshake /><span>Accountability Partner</span></Link></div> 
            {/* <div onClick={toggleNav}><Link to='/schedule' className='Nav--row larger--icon' title='Schedule'><BsCalendarDate /><span>Schedule</span></Link></div>  */}
            <div onClick={toggleNav}><Link to='/rules' className='Nav--row' title='Rules'><BsBook /><span>75 Hard Rules</span></Link></div> 
            <div onClick={toggleNav}><Link to='/messages' className='Nav--row' title='Messages'><AiOutlineMessage /><span>Messages</span></Link></div> 
            {/* <div className='Nav--row darker--bg push--bottom' onClick={onLogout}><AiOutlineLogout/> <span>Logout</span></div>   */}
            <div className='push--bottom'> 
             <div><span className='Nav--row darker--bg' onClick={()=> setSettingsModal(true)}><AiOutlineSetting /><span>Settings</span></span></div> 
             <div className='Nav--row darker--bg ' onClick={onLogout}><AiOutlineLogout/> <span>Logout</span></div> 
            </div>
            <SettingsModal settingsModal={settingsModal} setSettingsModal={setSettingsModal} hello='helllooo' /> 
       
        </div>
    </div>
  )
}
