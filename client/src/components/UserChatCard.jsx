import React,  {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChat, getChatMessages, addOtherUser, setMobileChatTrue } from '../features/chat/chatSlice'
import { getUser } from '../features/users/userSlice'
import '../styles/components/UserChatCard.css'
import profileCat from '../pictures/defaultCat.jpeg'
import moment from 'moment'
import { addToMessageNotifications } from '../features/general/generalSlice'

export default function UserChatCard({chat, socket, setShowChat, messageList, setMessageList, chatRef}) {
    const [room, setRoom] = useState('')
    const dispatch = useDispatch();
    const authId = useSelector((state)=> state.auth.user.id)
    const user = chat.users.filter((user) => user._id !== authId)
    const activeChat = useSelector((state)=> state.chats.activeChat)
    const [messageNotification, setMessageNotification] = useState('')

    const roomChange = async () =>{
      dispatch(setMobileChatTrue())
      // setMobileChat(true)
      setMessageNotification('')
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

    let highlightChat =  activeChat && activeChat._id === chat._id? 'gray--user': ''
    


    useEffect(() => {
      if (chat?.messages[chat.messages.length -1]?.userId !== authId && chat?.messages[chat.messages.length -1]?.seen === false){
        setMessageNotification('fill--notification--dot')
        dispatch(addToMessageNotifications())
      }
    },[])
    


    moment.locale('en', {
      calendar : {
          lastDay : '[Yesterday]',
          sameDay : 'LT',
          nextDay : '[Tomorrow at] LT',
          lastWeek : 'dddd',
          nextWeek : 'L',
          sameElse : 'L'
      }
  });



  return (
    // <div onClick={roomChange} className={activeChat && activeChat._id === chat._id?'user--chat--card--container gray--user ': 'user--chat--card--container'  }>
    <div onClick={roomChange} className={`user--chat--card--container ${highlightChat}`}>
        <span className={`notification--dot ${messageNotification}`}></span>
        <img src={user[0].profileImage? user[0].profileImage: profileCat} alt="" className='chat--profile--image'/>
        <div>
        <div className='chat--card--top'>
          <p className='chat--card--user'>{user[0].username}</p>
          {chat.messages.length > 0 && <p className='chat--card--time'>{moment(chat.messages[chat.messages.length - 1].createdAt).calendar()}</p>}
        </div>
          {chat.messages.length > 0 && <p className='chat--card--message'>{`${(chat.messages[chat.messages.length - 1].message).substring(0, 60)}${chat.messages[chat.messages.length - 1].message.length > 60 ? '...': ''}`}</p>}
      </div>
    </div>
  )
}
