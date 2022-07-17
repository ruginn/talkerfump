import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { commentOnPost } from '../features/posts/postSlice'
import '../styles/Comment.css'
import profileCat from '../pictures/defaultCat.jpeg'
import {Link} from 'react-router-dom'
import CommentItem from './CommentItem'

export default function Comment({post}) {
    const [commentText, setCommentText] = useState('')

    const dispatch = useDispatch();


    const onChange = (e) => {
        setCommentText(e.target.value)
    }
    

    const onSubmit = (e) => {
        e.preventDefault()
        const commentData = {
            commentText, 
            postId: post._id
        }
        dispatch(commentOnPost(commentData))
        setCommentText('')
    }

  return (
    <div className='comment--container'>
        {post.comments.length > 0 && post.comments.map((comment) => 
            <div key={comment._id}>
                <CommentItem comment={comment} postUserId={post.userId._id} key={comment._id}/>
            </div> 
        )
        }
        <form onSubmit={onSubmit}>
            <label htmlFor="commentText"></label>
            <input type="text" name='commentText' id='comment' placeholder='Add to the conversation...' onChange={onChange} value={commentText}/>
            <button>Post</button>
        </form>
    </div>
  )
}
