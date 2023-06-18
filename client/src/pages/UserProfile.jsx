import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { getUser, followUser, unfollowUser, findFollowers, findFollowing } from '../features/users/userSlice'
import {addOtherUser, createChat, setMobileChatTrue} from '../features/chat/chatSlice'
import profilePic from '../pictures/defaultCat.jpeg'
import Spinner from '../components/Spinner'
import { getUserPosts } from '../features/posts/postSlice'
import Post from '../components/Post'
import {  following, unfollowing} from '../features/auth/authSlice'
import FollowersModal from '../components/FollowersModal'
import FollowingModal from '../components/FollowingModal'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import '../styles/pages/UserProfile.css'
import { getChatMessages, resetChatMessages } from '../features/chat/chatSlice'
import UserProgress from '../components/UserProgress'
import { useNavigate } from 'react-router-dom'
import {setTopBarTrue} from '../features/general/generalSlice'
import ImageUploader from '../components/ImageUploader'
import { AiOutlineCamera } from 'react-icons/ai'


const socket = io.connect('http://localhost:8080')

export default function UserProfile() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = params.userId
    const auth = useSelector((state) => state.auth.user)
    const {user, isLoading} = useSelector((state) => state.users)
    const {posts} = useSelector((state) => state.post)
    const activeChat = useSelector((state) => state.chats.activeChat)
    

    useEffect(() => {
      dispatch(getUser(userId))
      dispatch(getUserPosts(userId))
    }, [userId, dispatch])
    
    useEffect(() => {
      dispatch(setTopBarTrue())
    },)

    const onFollow =  () => {
      dispatch(followUser(userId))
      if (auth.id !== userId){
        dispatch(following(userId))
        const messageData = {
          room: userId, 
          activity: 'is now following you.',
          user: auth.username, 
        }
        socket.emit('join_room', userId)
        socket.emit('send_notifications', messageData)
        socket.emit('leave_room', userId)
      } else {
        alert ('you can not follow yourself')
      }
    }
  
    const onUnfollow = () => {
      dispatch(unfollowUser(userId))
      dispatch(unfollowing(userId))
    }


    const [followersModal, setFollowersModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)
    const [ImageUploaderModal, setImageUploaderModal] = useState(false)

    

    const openFollowersModal = () => {
      dispatch(findFollowers(userId))
      setFollowersModal(true)
    }

    const openFollowingModal = () => {
      dispatch(findFollowing(userId))
      setFollowingModal(true)
      
    }

    const onCreateChat = async () => {
      if(activeChat){
        socket.emit('leave_room', activeChat._id)
      }
      const chatData = {userId: userId}
      dispatch(createChat(chatData)).unwrap().then((data)=>{
        // const chatId = {}
        // if(data[0]){
        // chatId = {
        //   chatId: data[0]._id
        // }
        // }
        console.log(data)
        // socket.emit('join_room', data[0]._id)
        if(data[0]){
          socket.emit('join_room', data[0]._id)
          dispatch(getChatMessages({chatId: data[0]._id}))
        } else{
          socket.emit('join_room', data._id)
          dispatch(resetChatMessages())
        }
        dispatch(setMobileChatTrue())
        dispatch(addOtherUser(user))
        navigate('/messages')
        // dispatch(getChatMessages({chatId: data[0]._id}))
      })
    }

    const openImageUploader = () =>{
      setImageUploaderModal(true)
    } 

  return (
    <div>
      {user && 
        <div className='user--profile--container'>
        <div className='user--profile--card'>
          <div className='container--img'>
            <img src= {user.profileImage? user.profileImage: profilePic} alt="" className='user--profile--image'/>
            {userId === auth.id &&
            <div className='image--click'><AiOutlineCamera onClick={openImageUploader}/></div>}
          </div>
         <div className='profile--card--outer--container'> 
         <div className='profile--card--inner--container'>
          <h3>@{user && user.username}</h3>
            <p>{user.firstName} {user.lastName}</p>
            <p><b>{posts&& posts.length}</b> {posts.length === 1? 'post':'posts'}</p>
            <span onClick={openFollowersModal} className='pointer'><b>{user && user.followers.length}</b> followers </span>
            <span onClick={openFollowingModal} className='pointer'><b>{user && user.following.length}</b> following</span> 

            <br />
            {auth.id !== params.userId?
              user && user.followers.includes(auth.id)? 
                <button onClick={onUnfollow}>Unfollow</button>: 
                <button onClick={onFollow}>Follow</button>  : 
                <div className='' onClick={openImageUploader}><AiOutlineCamera/></div>
            }
            {auth.id === params.userId? '':
            <Link to='/messages'><button onClick={onCreateChat}>Message</button></Link>}
         </div>
         {/* <h3>@{user && user.username}</h3>
          <p>{user.firstName} {user.lastName}</p>
          <p><b>{posts&& posts.length}</b> {posts.length === 1? 'post':'posts'}</p>
          <span onClick={openFollowersModal} className='pointer'><b>{user && user.followers.length}</b> followers </span>
          <span onClick={openFollowingModal} className='pointer'><b>{user && user.following.length}</b> following</span> 

          <br />
          {auth.id !== params.userId?
            user && user.followers.includes(auth.id)? 
              <button onClick={onUnfollow}>Unfollow</button>: 
              <button onClick={onFollow}>Follow</button>  : 
              <button>Edit Profile</button>
          }
          {auth.id === params.userId? '':
          <Link to='/messages'><button onClick={onCreateChat}>Message</button></Link>} */}
          </div>
        </div>
        <div>
            {/* <UserProgress className='up-progress'/> */}
        </div>
          <section className='user--profile--content'>
          {isLoading && <Spinner />}
            {posts.length > 0 ? (
              <div >
                {posts.map((post) => (
                  <Post key={post._id} post= {post}/>
                ))}
              </div>
            ) : (
              <h3>{user.username} has not set any post</h3>
            )}
         </section> 
         </div> 
      }
      {user && <FollowersModal followersModal={followersModal} setFollowersModal={setFollowersModal} username= {user.username}/>}
      {user && <FollowingModal followingModal={followingModal} setFollowingModal={setFollowingModal} username= {user.username}/>}
      {user && <ImageUploader ImageUploaderModal={ImageUploaderModal} setImageUploaderModal={setImageUploaderModal}/>}
    </div>
  )
}
