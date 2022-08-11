import React,  {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChat, getChatMessages, addOtherUser } from '../features/chat/chatSlice'
import { getUser } from '../features/users/userSlice'
import '../styles/components/UserChatCard.css'
import profileCat from '../pictures/defaultCat.jpeg'

export default function UserChatCard({chat, socket, setShowChat, messageList, setMessageList, chatRef}) {
    const [room, setRoom] = useState('')
    const dispatch = useDispatch();
    const authId = useSelector((state)=> state.auth.user.id)
    const user = chat.users.filter((user) => user._id !== authId)
    const activeChat = useSelector((state)=> state.chats.activeChat)
    

    const roomChange = async () =>{
      const chatData = {
        chatId: chat._id
      }
      dispatch(getUser(user[0]._id))
      dispatch(addOtherUser(user[0]))
      dispatch(setActiveChat(chat))
      dispatch(getChatMessages(chatData))
      socket.emit('leave_room', activeChat._id)
      socket.emit('join_room', chat._id)
      setMessageList([])
      setShowChat(true)
      chatRef.current.focus()
    }





  return (
    <div onClick={roomChange} className={activeChat && activeChat._id === chat._id?'user--chat--card--container gray--user': 'user--chat--card--container'}>
    <img src={user[0].profileImage? user[0].profileImage: profileCat} alt="" className='chat--profile--image'/>
     <p>{user[0].username}</p>
    </div>
  )
}
