import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import profileCat from '../pictures/defaultCat.jpeg'
import '../styles/components/Post.css'
import { deletePost, likePost} from '../features/posts/postSlice'
import {useState } from 'react'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import {TbBeerOff} from 'react-icons/tb'
import {GiForkKnifeSpoon} from 'react-icons/gi'
import {IoWaterOutline} from 'react-icons/io5'
import LikesModal from './LikesModal'
import { getPostLikes } from '../features/users/userSlice'

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
          <Link to={`/users/${post.userId._id}`} ><img src={post.userId.profileImage? post.userId.profileImage: profileCat} alt="" className='profile--post'/></Link>
        </div>

        <div>
          <p>{post.streak && `Day ${post.streak}`}</p>
          <p className='post--text'>{post.postText}</p>
          {post.progressPhoto && !post.progressPhoto.privatePhoto && <img src={post.progressPhoto.photo} className='progress--photo'/>}
          {post.workout1 && <p>Exercise 1: {post.workout1.exercise} for {post.workout1.duration} Minutes </p>}
          {post.workout2 && <h3>Outside Exercise</h3>}
          {post.workout2 && <p>Exercise 2: {post.workout2.exercise} for {post.workout2.duration} Minutes </p>}
          {post.book && <p>Read {post.book.pages} pages from {post.book.title} by {post.book.author}</p>}
          {post.cleanEat && <GiForkKnifeSpoon className='fork'/>} 
          {post.water && <IoWaterOutline className='water'/>}
          {!post.alcohol && <TbBeerOff className='beer'/>}
          <div className='like--container'>
            <span className='heart--svg' onClick={onLikePost}>{post.likes.includes(user.id)? <AiFillHeart/>: <span className='black--heart'><AiOutlineHeart /></span>}</span>
            <span className='like--value' onClick={openLikes}><b>{post.likes.length}</b> {post.likes.length === 1? 'Like': 'Likes'}</span>
            <span className='comment--counter pointer' onClick={()=>setExpandComment((prev) => !prev)}><b>{post.comments.length}</b> comments</span>
          </div>  
          <div>
            <span> posted by {post.userId.username}</span>
            <span> at {new Date(post.createdAt).toLocaleString('en-US')}</span>
          </div>
        </div>
        {user.id=== post.userId._id && <div onClick={onDeletePost}>X</div>}
      </div>
      <div className='post--comment--container'>
        {<Comment post={post} key={post._id} expandComments={expandComments} setExpandComment={setExpandComment}/>}
      </div>
      <LikesModal likesModal={likesModal} setLikesModal={setLikesModal}/> 
    </div>
  )
}
