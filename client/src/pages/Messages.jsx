import io from 'socket.io-client'
import {useState} from 'react'
import Chat from '../components/Chat'
import { useSelector } from 'react-redux'

const socket = io.connect('http://localhost:8080')

export default function Messages() {
  const username = useSelector((state) => state.auth.user.username)
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if(username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true)
    }
  }

  

  return (
    <div className="App">
      <div className='container'>
        <h3>Join a room</h3>
        <label htmlFor="name">Name</label>
        {/* <input type="text" id='name' placeholder='Name' onChange={(e) => {setUsername(e.target.value)}}/> */}
        <label htmlFor="room">Room</label>
        <input type="text"  id='room' placeholder='Room' onChange={(e) => {setRoom(e.target.value)}}/>
        <button onClick={joinRoom}>Join</button>
      </div>
      {showChat && <Chat socket={socket} username={username} room={room}/>}
    </div>
  );
}
