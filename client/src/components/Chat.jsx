import { useEffect } from 'react'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, addChatMessage } from '../features/chat/chatSlice'


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
        <div>Chat with {user? user.username:''}</div>
        <div>
            {!previousMessages?'':
                previousMessages.map((item) => (
                    <div key={item._id || item.message}>
                        <span>{item.username||item.userId.username} :</span>
                        <span> {item.message}</span>   
                    </div>
                ))
            }
        </div>
        <div className='chat--body'>
            {messageList.map((data) => {
                return <div key={data.message}>
                <span>{data.username} :</span>
                <span> {data.message}</span >
                </div>
            })}
        </div>
        <div className="chat--footer">
            <form type='submit'>
                <input type="text" placeholder='what up'  onChange={(e)=> {setMessage(e.target.value)}} value={message}/>
                <button onClick={onClick}>Send</button>
            </form>
        </div>
    </div>
  )
}