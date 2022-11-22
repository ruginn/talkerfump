import React, {useState} from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { logout, reset} from '../features/auth/authSlice'
import {getUserChats} from '../features/chat/chatSlice'
import PostForm from '../components/PostForm'
import { getTimeline} from '../features/posts/postSlice'
import Post from '../components/Post'
import FollowersModal from '../components/FollowersModal'
import FollowingModal from '../components/FollowingModal'
import ImageUploader from '../components/ImageUploader'
import '../styles/pages/Home.css'
import defaultCat from '../pictures/defaultCat.jpeg'
import PostModal from '../components/PostModal'
import {getNotifications} from '../features/notifications/notificationsSlice'
import {AiOutlineCamera} from "react-icons/ai"
import { reset as reset2 } from '../features/posts/postSlice'
import { findFollowers, findFollowing } from '../features/users/userSlice'


export default function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {user} = useSelector((state)=> state.auth)
    const {posts, onLoading} = useSelector((state)=> state.post) 


    useEffect(()=> {
       if(!user){
        navigate('/login')
       }
       dispatch(getTimeline())
       dispatch(getUserChats())
       dispatch(getNotifications())
      //  dispatch(notificationCount())
    }, [navigate, onLoading])
    
    // user, navigate, isError
    
    // if(posts){
    //   const userPosts = 
    // }


    const onLogout = () =>  {
      dispatch(logout())
      dispatch(reset())
      dispatch(reset2())
      navigate('/login')
    }

    
    const [followersModal, setFollowersModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)
    const [ImageUploaderModal, setImageUploaderModal] = useState(false)

    const openFollowersModal = () => {
      dispatch(findFollowers(user.id))
      setFollowersModal(true)
    }


    const openFollowingModal = () => {
      dispatch(findFollowing(user.id))
      setFollowingModal(true)
    }

    const openImageUploader = () =>{
      setImageUploaderModal(true)
    }

    const [postModal, setPostModal] = useState(false)
  return (
    <div>
    {/* Need to see if user exist before using, as it will say user is null and can not retrieve user.${whatever} */}
        {/* <button onClick={onLogout}>Logout</button> */}
        <h3>Welcome {user && user.firstName}</h3>
        <div className='profile--pic--container--home'>
          {user && <img src={user.profileImage ? user.profileImage:defaultCat} className='profile--pic--home' />}
          <div className='profile--pic--uploader' onClick={openImageUploader}><AiOutlineCamera/></div>
        </div>
        <p><b>{user && posts.filter((post) => (post.userId._id === user.id)).length}</b> posts</p>
        <span onClick={openFollowersModal}><b>{user && user.followers.length}</b> followers </span>
        <span onClick={openFollowingModal}><b>{user && user.following.length}</b> following</span>
        <br></br>
        <button onClick={()=>setPostModal(true)}>Create a Post</button>
        <PostModal postModal={postModal} setPostModal={setPostModal}/>
        {/* <PostForm /> */}
        <section className='content'>
          {posts.length > 0 ? (
            <div >
              {posts.map((post) => (
                <Post key={post._id} post= {post}/>
              ))}
            </div>
          ) : (
            <h3>You have not created any post</h3>
          )}
        </section>
        {user && <FollowersModal followersModal={followersModal} setFollowersModal={setFollowersModal} username= {user.username}/>}
        {user && <FollowingModal followingModal={followingModal} setFollowingModal={setFollowingModal} username= {user.username}/>}
        {user && <ImageUploader ImageUploaderModal={ImageUploaderModal} setImageUploaderModal={setImageUploaderModal}/>}
    </div>
    
  )
}
