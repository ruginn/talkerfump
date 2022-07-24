import React, {useState} from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import {Link} from 'react-router-dom'
import { commentOnPost, deleteComment, likeComment } from '../features/posts/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import LikesModal from './LikesModal'
import { getCommentLikes } from '../features/users/userSlice'


export default function CommentItem({comment, postUserId}) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth.user)


    const [likesModal, setLikesModal] = useState(false)

    const onDelete = () => {
        const commentData ={
            commentId: comment._id,
            postId: comment.postId 
        }
        dispatch(deleteComment(commentData))
    }

    const onLike = () => {
        const commentData = {
            commentId: comment._id, 
            postId: comment.postId
        }
        dispatch(likeComment(commentData))
    }

    const openLikes = () => {
        dispatch(getCommentLikes(comment._id))
        setLikesModal((prev) => !prev)
    }


  return (
    <div key={comment._id} className='comment'>
        <div>
        {comment.userId && <Link to={`/users/${comment.userId._id}`} ><img src={comment.userId.profileImage? comment.userId.profileImage: profileCat} alt="" className='profile--comment'/></Link>}
            {/* <img src={profileCat} alt="" className='profile--comment'/>  */}
        </div>
        <div className='comment--content'>
            <p className='comment--text'>{comment.commentText}</p>
            <div className='comment--heart--container'>
                <div onClick={onLike}>
                    {comment.likes.includes(auth.id)?
                    <span className='comment--heart red--heart--comment'><AiFillHeart /></span>:
                    <span className='comment--heart black--heart--comment'><AiOutlineHeart /></span>
                    }
                </div>
                <span className='comment--like--container' onClick={openLikes}><b>{comment.likes.length}</b> {comment.likes.length === 1? 'Like': 'Likes'}</span>
            </div>
            <p className='comment--details'>{comment.userId && comment.userId.username} commented at {new Date(comment.createdAt).toLocaleString('en-US')}</p>
        </div>
        {auth.id === comment.userId._id  || auth.id === postUserId ? <p onClick={onDelete}>x</p>: ''}
        <LikesModal likesModal={likesModal} setLikesModal={setLikesModal}/> 
    </div>
  )
}
