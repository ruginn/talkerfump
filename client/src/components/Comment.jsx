import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentOnPost } from '../features/posts/postSlice'
import '../styles/components/Comment.css'
import profileCat from '../pictures/defaultCat.jpeg'
import {Link} from 'react-router-dom'
import CommentItem from './CommentItem'
import moment from 'moment'
import io from 'socket.io-client'


const socket = io.connect('https://kma75.onrender.com')

export default function Comment({post, expandComments, setExpandComment}) {
    const [commentText, setCommentText] = useState('')
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();


    const onChange = (e) => {
        setCommentText(e.target.value)
    }
    

    const onSubmit = (e) => {
        e.preventDefault()
        const commentData = {
            commentText, 
            createdAt: new Date(),
            postId: post._id
        }
        dispatch(commentOnPost(commentData))
        setCommentText('')
        const messageData = {
            room: post.userId._id, 
            activity: 'commented on your post.',
            user: user.username, 
          }
          socket.emit('join_room', post.userId._id)
          socket.emit('send_notifications', messageData)
          socket.emit('leave_room', post.userId._id)
    }

    // const  [expandComments, setExpandCommment] = useState(false)

    const commentInput = useRef()
    const commentSelect = () => {
        commentInput.current.focus()
    }
  return (
    <div className='comment--container'>
        {post.comments[0] && <CommentItem comment={post.comments[0]} postUserId={post.userId._id} key={post.comments._id}/>}
        {/* {!expandComments && post.comments.length > 1 && <p onClick={()=>setExpandComment((prev)=> !prev) } className='pointer'>{`View ${post.comments.length - 1} more comments`}</p>} */}
        {expandComments && post.comments.length > 0 && post.comments.slice(1).map((comment) => 
            <div key={comment._id}>
                <CommentItem comment={comment} postUserId={post.userId._id} key={comment._id}/>
            </div> 
        )
        }
        {/* {expandComments && <p onClick={()=>setExpandComment((prev)=> !prev)} className='pointer'>Hide Comments</p>} */}
        <div>

        </div>
        <div className='comment--bottom--container'>
            {user && <Link to={`/users/${user.id}`} className='text--none'> {user.profileImage?  <img src= {user.profileImage} alt="" className='profile--comment'/>:<div className='pp--comment--none'><span>{user.firstName[0].toUpperCase()}</span><span>{user?.lastName[0].toUpperCase()}</span></div>}</Link>}
            <form onSubmit={onSubmit} className='comment--form--container' onClick={commentSelect}>
                <label htmlFor="commentText"></label>
                <input ref={commentInput} type="text" name='commentText' id='comment' placeholder='Add to the conversation...' onChange={onChange} value={commentText}/>
            </form>
        </div>
        {/* {user && <Link to={`/users/${user.id}`} className='text--none'> {user.profileImage?  <img src= {user.profileImage} alt="" className='profile--comment'/>:<div className='pp--comment--none'><span>{user.firstName[0].toUpperCase()}</span><span>{user?.lastName[0].toUpperCase()}</span></div>}</Link>}
        <form onSubmit={onSubmit} className='comment--form--container' onClick={commentSelect}>
            <label htmlFor="commentText"></label>
            <input ref={commentInput} type="text" name='commentText' id='comment' placeholder='Add to the conversation...' onChange={onChange} value={commentText}/>
        </form> */}
    </div>
  )
} 
