import React,  {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChat, getChatMessages, addOtherUser } from '../features/chat/chatSlice'
import '../styles/components/UserChatCard.css'
import profileCat from '../pictures/defaultCat.jpeg'

export default function UserChatCard({chat, socket, setShowChat, messageList, setMessageList}) {
    const [room, setRoom] = useState('')
    const dispatch = useDispatch();
    const authId = useSelector((state)=> state.auth.user.id)
    const user = chat.users.filter((user) => user._id !== authId)
    const activeChat = useSelector((state)=> state.chats.activeChat)

    const roomChange = () =>{
      const chatData = {
        chatId: chat._id
      }
      dispatch(addOtherUser(user[0]))
      dispatch(setActiveChat(chat))
      dispatch(getChatMessages(chatData))
      socket.emit('leave_room', activeChat._id)
      socket.emit('join_room', chat._id)
      setMessageList([])
      setShowChat(true)
    }



  return (
    <div onClick={roomChange} className='user--chat--card--container'>
    <img src={user[0].profileImage? user[0].profileImage: profileCat} alt="" className='chat--profile--image'/>
     <p>{user[0].username}</p>
    </div>
  )
}
