import io from 'socket.io-client'
import {useState, useEffect, useRef} from 'react'
import Chat from '../components/Chat'
import {getUserChats} from '../features/chat/chatSlice'
import {setTopBarFalse} from '../features/general/generalSlice'
import { useSelector, useDispatch } from 'react-redux'
import UserChatCard from '../components/UserChatCard'
import { getChatMessages } from '../features/chat/chatSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/Messages.css'


const socket = io.connect('https://kma75.onrender.com')

export default function Messages() {
  const dispatch = useDispatch()
  const chats = useSelector((state) => state.chats.chats)
  const [messageList, setMessageList] = useState([])
  const activeChat =  useSelector((state) => state.chats.activeChat)
  const {mobileChat} = useSelector((state) => state.chats)

  // const [mobileChat, setMobileChat] = useState(false)

  useEffect(() => {
    dispatch(getUserChats())
  }, [mobileChat])


  const {user} = useSelector((state)=> state.auth)
  const navigate = useNavigate()

  useEffect(()=> {
    if(!user){
     navigate('/login')
    }
  }, [])

  useEffect(() => {
    dispatch(setTopBarFalse())
  },)

  const username = useSelector((state) => state.auth.user.username)
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(true)

  const chatRef = useRef()


  // useEffect(() => {
  //   console.log(activeChat + 'this is the active chat')
  //   const chatData = {
  //     chatId: activeChat._id
  //   }
  //   socket.emit('join_room', activeChat._id)
  //   dispatch(getChatMessages(chatData))
  // }, [])
 
  
  let toggleMobileChat = mobileChat ? 'toggle--mobile--user' : ''

  return (
    <div className="App">
      <div className='container'>
        <section className={`mobile--user--chat--container ${toggleMobileChat}`} >
          {chats.map((chat) => ( 
            <UserChatCard chat={chat} key={chat._id} socket={socket} setShowChat={setShowChat} messageList={messageList} setMessageList={setMessageList} chatRef={chatRef}/>
          ))}
        </section>
        {/* <input type="text" id='name' placeholder='Name' onChange={(e) => {setUsername(e.target.value)}}/> */}
        {/* <label htmlFor="room">Room</label>
        <input type="text"  id='room' placeholder='Room' onChange={(e) => {setRoom(e.target.value)}}/>
        <button onClick={joinRoom}>Join</button> */}
      </div>
      {showChat && <Chat socket={socket} username={username} room={room} messageList={messageList} setMessageList={setMessageList}/>}
    </div>
  );
}
