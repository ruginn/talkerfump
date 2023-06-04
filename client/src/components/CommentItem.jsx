import React, {useState} from 'react'
import profileCat from '../pictures/defaultCat.jpeg'
import {Link} from 'react-router-dom'
import { deleteComment, likeComment } from '../features/posts/postSlice'
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineHeart, AiFillHeart, AiOutlineClose } from 'react-icons/ai'
import LikesModal from './LikesModal'
import { getCommentLikes } from '../features/users/userSlice'
import moment from 'moment'


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
        {/* {comment.userId && <Link to={`/users/${comment.userId._id}`} ><img src={comment.userId.profileImage? comment.userId.profileImage: profileCat} alt="" className='profile--comment'/></Link>} */}
        {comment.userId && <Link to={`/users/${comment.userId._id}`} className='text--none'> {comment.userId.profileImage?  <img src= {comment.userId.profileImage} alt="" className='profile--comment'/>:<div className='pp--comment--none'><span>{comment.userId.firstName[0].toUpperCase()}</span><span>{comment.userId?.lastName[0].toUpperCase()}</span></div>}</Link>}

            {/* <img src={profileCat} alt="" className='profile--comment'/>  */}
        </div>
        <div className='comment--content'>
            <Link to={`/users/${comment.userId._id}`} className='username--comment'><span className="username--comment"><b>{comment.userId.firstName.toLowerCase()} </b></span></Link>
            <span className='comment--text'>{comment.commentText}</span>
            <div className='comment--heart--container'>
                <div onClick={onLike}>
                    {comment.likes.includes(auth.id)?
                    <span className='comment--heart red--heart--comment'><AiFillHeart /></span>:
                    <span className='comment--heart black--heart--comment'><AiOutlineHeart /></span>
                    }
                </div>
                <span className='comment--like--container' onClick={openLikes}><b>{comment.likes.length}</b> {comment.likes.length === 1? 'Like': 'Likes'}</span>
            </div>
            {/* <p className='comment--details'>{moment(comment.createdAt).fromNow()}</p> */}
        </div>
        <div className='comment--right'>
            {auth.id === comment.userId._id  || auth.id === postUserId ? <AiOutlineClose onClick={onDelete}/>: ''}
            <p className='comment--details'>{moment(comment.createdAt).fromNow()}</p>      
        </div>
        {/* {auth.id === comment.userId._id  || auth.id === postUserId ? <p onClick={onDelete}>x</p>: ''} */}
        <LikesModal likesModal={likesModal} setLikesModal={setLikesModal}/> 
    </div>
  )
}
