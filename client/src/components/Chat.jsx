import { useEffect } from 'react'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, addChatMessage } from '../features/chat/chatSlice'
import profileCat from '../pictures/defaultCat.jpeg'
import ScrollToBottom from 'react-scroll-to-bottom'
import '../styles/components/Chat.css'


export default function Chat({socket, username, room, messageList, setMessageList}) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    // const [messageList, setMessageList] = useState([])
    const activeChat =  useSelector((state) => state.chats.activeChat)
    const previousMessages = useSelector((state) => state.chats.chatMessages)
    const authId = useSelector((state)=> state.auth.user.id)
    const user = useSelector((state) => state.chats.otherUser)
    

    const onClick = async (e) => {
        e.preventDefault()
        if(message !== ''){
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
        }
        const chatData = {
            chatId: activeChat._id,
            userId: authId, 
            createdAt: new Date(),  
            message
        }
        dispatch(createMessage(chatData))
        setMessage('')
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            addChatMessage(data)
            setMessageList((prev) => [...prev, data])
        })
        
    }, [socket])

    
    
    if(previousMessages){
        const prevMessages = previousMessages.map((items) => {
        return items.message
        })
    }

    return (
    <div className='chat'>
        {user ? <div>
                    <div className='chat--box--header'>
                        <img src={user.profileImage? user.profileImage : profileCat} alt="" className='chat--box--profile--image' />
                        <h3>{user? user.username:''}</h3>
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
                    <input type="text" placeholder='what up'  onChange={(e)=> {setMessage(e.target.value)}} value={message}/>
                    <button onClick={onClick}>Send</button>
                </form>
            </div> 
        </div> : <h1>Choose someone to chat with</h1>}
    </div>
  )
}