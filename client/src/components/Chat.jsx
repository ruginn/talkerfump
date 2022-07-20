import { useEffect } from 'react'
import {useState} from 'react'


export default function Chat({socket, username, room}) {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])


    const onClick = async () => {
        if(message !== ''){
            const messageData = {
                room, 
                username, 
                message, 
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setMessageList((prev) => [...prev, messageData])
        }
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            setMessageList((prev) => [...prev, data])
            console.log(data)

        })
    }, [socket])

    return (
    <div className='chat'>
        <div className='chat--header'>
            <p>Live Chat {room}</p>
        </div>
        <div className='chat--body'>
            {messageList.map((data) => {
                return <div>
                <span>{data.username} :</span>
                <span> {data.message}</span >
                </div>
            })}
        </div>
        <div className="chat--footer">
            <input type="text" placeholder='what up'  onChange={(e)=> {setMessage(e.target.value)}}/>
            <button onClick={onClick}>Send</button>
        </div>
    </div>
  )
}