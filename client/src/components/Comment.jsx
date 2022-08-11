import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnPost } from '../features/posts/postSlice'
import '../styles/components/Comment.css'
import profileCat from '../pictures/defaultCat.jpeg'
import {Link} from 'react-router-dom'
import CommentItem from './CommentItem'

export default function Comment({post, expandComments, setExpandComment}) {
    const [commentText, setCommentText] = useState('')

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
    }

    // const  [expandComments, setExpandCommment] = useState(false)

  return (
    <div className='comment--container'>
        {post.comments[0] && <CommentItem comment={post.comments[0]} postUserId={post.userId._id} key={post.comments._id}/>}
        {!expandComments && post.comments.length > 1 && <p onClick={()=>setExpandComment((prev)=> !prev) } className='pointer'>See more comments</p>}
        {expandComments && post.comments.length > 0 && post.comments.slice(1).map((comment) => 
            <div key={comment._id}>
                <CommentItem comment={comment} postUserId={post.userId._id} key={comment._id}/>
            </div> 
        )
        }
        {expandComments && <p onClick={()=>setExpandComment((prev)=> !prev)} className='pointer'>Hide Comments</p>}
        <form onSubmit={onSubmit}>
            <label htmlFor="commentText"></label>
            <input type="text" name='commentText' id='comment' placeholder='Add to the conversation...' onChange={onChange} value={commentText}/>
            <button>Post</button>
        </form>
    </div>
  )
}
