import { useEffect, useRef } from 'react'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, addChatMessage, setMessageSeen, getUserChats, addOtherUser, getChatMessages, setMobileChatFalse } from '../features/chat/chatSlice'
import profileCat from '../pictures/defaultCat.jpeg'
import ScrollToBottom from 'react-scroll-to-bottom'
import '../styles/components/Chat.css'
import {Link} from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

export default function Chat({socket, username, room, messageList, setMessageList, chatRef}) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    // const [messageList, setMessageList] = useState([])
    const activeChat =  useSelector((state) => state.chats.activeChat)
    const previousMessages = useSelector((state) => state.chats.chatMessages)
    const authId = useSelector((state)=> state.auth.user.id)
    const user = useSelector((state) => state.chats.otherUser)
    const {mobileChat} = useSelector((state) => state.chats)
    

    // const userReally = useSelector((state) => state.chats.activeChat.users.filter(users => users !== authId))
    // console.log(userReally)

    useEffect(()=>{
        dispatch(getChatMessages({chatId: activeChat._id}))
    },[])

    const onClick = async (e) => {
        e.preventDefault()
        console.log(message.length + 'this is the length')
        console.log(message + 'this is the message')
        if(message.length > 0){
            const messageData = {
                room: activeChat._id, 
                userId: authId, 
                username, 
                message, 
                createdAt: new Date()
            }
            await socket.emit('send_message', messageData)
            setMessageList((prev) => [...prev, messageData])
            // dispatch(addChatMessage(messageData))
            const chatData = {
                chatId: activeChat._id,
                userId: authId, 
                createdAt: new Date(),  
                message
            }
            dispatch(createMessage(chatData)).then(() => {
                dispatch(getUserChats())
            })
            setMessage('')
        }
        // const chatData = {
        //     chatId: activeChat._id,
        //     userId: authId, 
        //     createdAt: new Date(),  
        //     message
        // }
        // dispatch(createMessage(chatData)).then(() => {
        //     dispatch(getUserChats())
        // })
        // setMessage('')
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            addChatMessage(data)
            setMessageList((prev) => [...prev, data])
        })

    }, [socket])

    // useEffect(()=> {
    //     chatRef.current.focus()
    // }, [])
    
    useEffect(() => {
        if (previousMessages){
            previousMessages.map(message => {
                if(!message.seen && message.userId._id !== authId){
                    dispatch(setMessageSeen(message._id))
                    console.log('set to true')
                }
            })
        } 
    }, [previousMessages])



    let chatMobileBox = mobileChat? 'chat--mobile': ''

    const chatMobileBack = () => {
        // setMobileChat(false)
        dispatch(setMobileChatFalse())
    }


    

    return (
    <div className={`chat ${chatMobileBox}`}>
        {user ? <div>
                        <div className='chat--box--header'>
                        {mobileChat && <IoIosArrowBack className='chat--back' onClick={chatMobileBack}/>}
                        <Link to={`/users/${user._id}`} className='chat--box--user'>
                            <img src={user.profileImage? user.profileImage : profileCat} alt="" className='chat--box--profile--image' />
                            <h3>{user? user.username:''}</h3>
                        </Link>
                        </div>
                <ScrollToBottom className='chat--body'>
                {/* <div className='chat--body'> */}
                <div>
                    {!previousMessages?'':
                        previousMessages.map((item) => (
                            <div key={item._id || item.message} className={authId === item.userId._id? 'chat--message reciever': 'chat--message sender'}>
                                {/* <span>{item.username||item.userId.username} :</span> */}
                                <span  className={authId === item.userId._id? 'text--container gray': 'text--container blue'}> {item.message}</span>   
                            </div>
                        ))
                    }
                </div>
                <div >
                    {messageList.map((data) => {
                        return <div key={new Date() + Math.random()} className={authId === data.userId? 'chat--message reciever': 'chat--message sender'}>
                        {/* <span>{data.username} :</span> */}
                        <span  className={authId === data.userId? 'text--container gray': 'text--container blue'}> {data.message}</span >
                        </div>
                    })}
                </div>
            {/* </div> */}
            </ScrollToBottom >
            <div className="chat--footer">
                <form type='submit'>
                    <input ref={chatRef} type="text" placeholder='what up'  onChange={(e)=> {setMessage(e.target.value)}} value={message} className='chat--input'/>
                    <button onClick={onClick} className='chat--button'>Send</button>
                </form>
            </div> 
        </div> : <h1>Choose someone to chat with</h1>}
    </div>
  )
}