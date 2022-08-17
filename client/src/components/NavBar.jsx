import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {FaRegHandshake} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {BsCalendarDate, BsTrophy, BsBook, BsBell} from 'react-icons/bs'
import {AiOutlineSetting, AiOutlineUser, AiOutlineCalculator, AiOutlineMessage, AiOutlineHome, AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai'
import '../styles/components/NavBar.css'
import { logout, reset} from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { reset as reset2 } from '../features/posts/postSlice'
import {reset as resetChat} from '../features/chat/chatSlice'
import {reset as resetUsers} from '../features/users/userSlice'
import { checkNotifications } from '../features/notifications/notificationsSlice'
import SettingsModal from '../components/SettingsModal'
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



  return (
    <div className="top">
        <div className='Nav--bar'>
            <div><Link to='/' className='Logo'><CgGym /> <span className='nav--title'>Keep Me Accountable</span></Link></div> 
            <div><Link to='/' className='Nav--row top--nav--item' title='Home'><AiOutlineHome /> <span>Home</span></Link></div> 
            <div onClick={handleNotifications}><Link to='/notifications' className='Nav--row' title='Notifications'><div className='notification--bell'><BsBell/>{count > 0 ? <span className='notification--count'>{count}</span>: ''}</div><span>Notifications</span></Link></div>
            <div><Link to='/users' className='Nav--row' title='Users'><AiOutlineUser /><span>Users</span></Link></div>
            <div><Link to='/achievements' className='Nav--row larger--icon' title='Achievements'><BsTrophy /><span>Achievements</span></Link></div>
            <div><Link to='/users' className='Nav--row' title='Gym Buddy'><FaRegHandshake /><span>Accountability Partner</span></Link></div> 
            <div><Link to='/schedule' className='Nav--row larger--icon' title='Schedule'><BsCalendarDate /><span>Schedule</span></Link></div> 
            <div><Link to='/rules' className='Nav--row' title='Rules'><BsBook /><span>75 Hard Rules</span></Link></div> 
            <div><Link to='/messages' className='Nav--row' title='Messages'><AiOutlineMessage /><span>Messages</span></Link></div> 
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
