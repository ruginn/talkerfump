import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {CgGym} from 'react-icons/cg'
import {FaRegHandshake} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {BsCalendarDate, BsTrophy} from 'react-icons/bs'
import {AiOutlineSetting, AiOutlineUser, AiOutlineCalculator, AiOutlineMessage, AiOutlineHome, AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai'
import '../styles/components/NavBar.css'
import { logout, reset} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { reset as reset2 } from '../features/posts/postSlice'
import SettingsModal from '../components/SettingsModal'



export default function NavBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [settingsModal, setSettingsModal] = useState(false)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(reset2())
        navigate('/login')
    }

  return (
    <div className="top">
        <div className='Nav--bar'>
            <div><Link to='/' className='Logo'><CgGym /> <span>Keep Me Accountable</span></Link></div> 
            <div><Link to='/' className='Nav--row top--nav--item' title='Home'><AiOutlineHome /> <span>Home</span></Link></div> 
            <div><Link to='/users' className='Nav--row' title='Users'><AiOutlineUser/><span>Users</span></Link></div> 
            <div><Link to='/achievements' className='Nav--row larger--icon' title='Achievements'><BsTrophy /><span>Achievements</span></Link></div>
            <div><Link to='/users' className='Nav--row' title='Gym Buddy'><FaRegHandshake /><span>Gym Buddy</span></Link></div> 
            <div><Link to='/schedule' className='Nav--row larger--icon' title='Schedule'><BsCalendarDate /><span>Schedule</span></Link></div> 
            <div><Link to='/calculations' className='Nav--row' title='Calculations'><AiOutlineCalculator /><span>Calculations</span></Link></div> 
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
