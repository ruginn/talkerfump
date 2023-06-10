import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import profileCat from '../pictures/defaultCat.jpeg'
import '../styles/components/Post.css'
import { deletePost, likePost} from '../features/posts/postSlice'
import {useState } from 'react'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import {AiOutlineHeart, AiFillHeart, AiOutlineClose} from 'react-icons/ai'
import {FiSun } from 'react-icons/fi'
import {GrRun } from 'react-icons/gr'
import {BsBook} from 'react-icons/bs'
import {ImCross} from 'react-icons/im'
import {TbBeerOff} from 'react-icons/tb'
import {GiForkKnifeSpoon} from 'react-icons/gi'
import {IoWaterOutline} from 'react-icons/io5'
import LikesModal from './LikesModal'
import { getPostLikes } from '../features/users/userSlice'
import moment from 'moment'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:8080')

export default function Post({ post}) {
    const dispatch = useDispatch()
    const user = useSelector((state)=> state.auth.user)

    const { isLoading, isError, isSuccess} = useSelector((state)=> state.post) 
    const [likesModal, setLikesModal] = useState(false)

    const onDeletePost = () => {
      dispatch(deletePost(post._id))
    }
    
    const onLikePost = () => {
      dispatch(likePost(post._id))
      if(!post.likes.includes(user.id)){
        const messageData = {
          room: post.userId._id, 
          activity: 'liked your post.',
          user: user.username, 
        }
        socket.emit('join_room', post.userId._id)
        socket.emit('send_notifications', messageData)
        socket.emit('leave_room', post.userId._id)
      }
    }

    // if (isLoading) {
    //   return <Spinner />
    // }

    const openLikes = () => {
      dispatch(getPostLikes(post._id))
      setLikesModal((prev) => !prev)
    }

    const  [expandComments, setExpandComment] = useState(false)



    return (
    <div className='post--container'> 
    {/* {isLoading? <Spinner /> : ( */}
      <div className='user--container'>
        <div className='profile--pic--container'>
          <Link to={`/users/${post.userId._id}`} className='post--user--link' >
            <img src={post.userId.profileImage? post.userId.profileImage: profileCat} alt="" className='profile--post'/>
            <div className='post--user--date'>
              <p className='post--username'>{post.userId ? post.userId.username: ''}</p>
              <p className='time--post'>{moment(post.createdAt).fromNow()}</p>
            </div>
          </Link>
          {user.id ===post.userId._id && <AiOutlineClose onClick={onDeletePost} />}
        </div>

        <div>
          <span className='post--streak'>{post.streak ? `Day ${post.streak}`: `Day ${post.streak}`} of 75</span>
          <span className='post--text'> {post.postText}</span>
          <div className='progress--photo--container'>
            {post.progressPhoto && !post.progressPhoto.privatePhoto && <img src={post.progressPhoto.photo} className='progress--photo'/>}
          </div>
          {/* {post.progressPhoto && !post.progressPhoto.privatePhoto && <img src={post.progressPhoto.photo} className='progress--photo'/>} */}
          <div className='post--achievements'>
            {post.workout1 ?  <GrRun className='run'/>: <ImCross/>}
            {post.workout2 ? <FiSun className='sun'/> : <ImCross/>}
            {post.book ? <BsBook className='book'/> : <ImCross/>}
            {post.cleanEat ? <GiForkKnifeSpoon className='fork'/>: <ImCross/>} 
            {post.water ? <IoWaterOutline className='water'/>: <ImCross/>}
            {!post.alcohol ? <TbBeerOff className='beer'/>: <ImCross/>}
          </div>
          <div className='like--container'>
            <div>
              <span className='heart--svg' onClick={onLikePost}>{post.likes.includes(user.id)? <AiFillHeart/>: <span className='black--heart'><AiOutlineHeart /></span>}</span>
              <span className='like--value' onClick={openLikes}><b>{post.likes.length}</b> {post.likes.length === 1? 'Like': 'Likes'}</span>
            </div>
            {/* <span className='heart--svg' onClick={onLikePost}>{post.likes.includes(user.id)? <AiFillHeart/>: <span className='black--heart'><AiOutlineHeart /></span>}</span>
            <span className='like--value' onClick={openLikes}><b>{post.likes.length}</b> {post.likes.length === 1? 'Like': 'Likes'}</span> */}
            <span className='comment--counter pointer' onClick={()=>setExpandComment((prev) => !prev)}><b>{post.comments.length}</b> comments</span>
          </div>  
        </div>
      </div>
      <div className='post--comment--container'>
        {<Comment post={post} key={post._id} expandComments={expandComments} setExpandComment={setExpandComment}/>}
      </div>
      <LikesModal likesModal={likesModal} setLikesModal={setLikesModal}/> 
    </div>
  )
}
