import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import profileCat from '../pictures/defaultCat.jpeg'
import '../styles/Post.css'
import { deletePost, likePost} from '../features/posts/postSlice'
import {useState } from 'react'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
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
    const  [expandComments, setExpandCommment] = useState(false)

    const openLikes = () => {
      dispatch(getPostLikes(post._id))
      setLikesModal((prev) => !prev)
    }

    return (
    <div className='post--container'> 
    {/* {isLoading? <Spinner /> : ( */}
      <div className='user--container'>
        <div className='profile--pic--container'>
          <Link to={`/users/${post.userId._id}`} ><img src={post.userId.profileImage? post.userId.profileImage: profileCat} alt="" className='profile--post'/></Link>
        </div>

        <div>
          <p className='post--text'>{post.postText}</p>
          <div className='like--container'>
            <span className='heart--svg' onClick={onLikePost}>{post.likes.includes(user.id)? <AiFillHeart/>: <span className='black--heart'><AiOutlineHeart /></span>}</span>
            <span className='like--value' onClick={openLikes}><b>{post.likes.length}</b> {post.likes.length === 1? 'Like': 'Likes'}</span>
            <span className='comment--counter'><b>{post.comments.length}</b> comments</span>
          </div>  
          <div>
            <span> posted by {post.userId.username}</span>
            <span> at {new Date(post.createdAt).toLocaleString('en-US')}</span>
          </div>
        </div>
        {user.id=== post.userId._id && <div onClick={onDeletePost}>X</div>}
      </div>
      <div className='post--comment--container'>
        <p onClick={()=>{setExpandCommment((prev)=>!prev)}}>see comments</p>
        {expandComments && <Comment post={post} key={post._id}/>}
        {expandComments && <h1 onClick={()=>{setExpandCommment((prev)=>!prev)}}>Hide comments</h1>}
      </div>
      <LikesModal likesModal={likesModal} setLikesModal={setLikesModal}/> 
    </div>
  )
}
