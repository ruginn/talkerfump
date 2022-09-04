import React,  {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChat, getChatMessages, addOtherUser } from '../features/chat/chatSlice'
import { getUser } from '../features/users/userSlice'
import '../styles/components/UserChatCard.css'
import profileCat from '../pictures/defaultCat.jpeg'
import moment from 'moment'

export default function UserChatCard({chat, socket, setShowChat, messageList, setMessageList, chatRef, setMobileChat, mobileChat}) {
    const [room, setRoom] = useState('')
    const dispatch = useDispatch();
    const authId = useSelector((state)=> state.auth.user.id)
    const user = chat.users.filter((user) => user._id !== authId)
    const activeChat = useSelector((state)=> state.chats.activeChat)
    

    const roomChange = async () =>{
      setMobileChat(true)
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
    
    const [messageNotification, setMessageNotification] = useState('')

    useEffect(() => {
      if (chat?.messages[chat.messages.length -1]?.userId !== authId && chat?.messages[chat.messages.length -1]?.seen === false){
        setMessageNotification('fill--notification--dot')
      }
    },[])
    

    // const compareDates = (mDate, createdAt) => {
    //   // checks if user is still in streak 
    //    // takes last day entered and converts to the begining of the day
    //    const streakDate = new Date(user.day.date)
    //    const streakDateNoTime = streakDate.setHours(0, 0, 0, 0)
   
    //    // sets the post day to the beginning of the day
    //    let postDateM = new Date(mDate)
    //    postDateM  = new Date(postDateM.setHours(0, 0, 0, 0))
       
   
    //    // converts post day yesterday without setting the mDate into the yesterday
    //    let yesterdayYear = postDateM.getFullYear()
    //    let yesterdayDate = postDateM.getDate() - 1
    //    let yesterdayMonth = postDateM.getMonth()
    //    let yesterday = new Date(yesterdayYear, yesterdayMonth, yesterdayDate)
   
   
    //    // compares to see if post day is the same as last post, yesterday, or another day breaking streak
    //    if(yesterday.toString() === new Date(streakDateNoTime).toString()){
    //        console.log('yesterday')
    //        return {day: {streak: user.day.streak + 1, date: createdAt }}
    //    } else if(postDateM.toString() === new Date(streakDateNoTime).toString()){
    //        console.log('same day')
    //        return {day: {streak: user.day.streak,  date: createdAt }}
    //    } else{
    //        console.log('streak broken')
    //        return {day: {streak: 1, date: createdAt }}
    //    } 
    //   }




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
          {chat.messages.length > 0 && <p className='chat--card--message'>{chat.messages[chat.messages.length - 1].message}</p>}
      </div>
    </div>
  )
}
