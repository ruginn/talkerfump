import {useSelector, useDispatch, useRef} from 'react-redux'
import {useState} from 'react'
import {createPost} from '../features/posts/postSlice'
import PostModal from '../components/PostModal'
import '../styles/components/PostForm.css'
import { Link } from 'react-router-dom'

import React from 'react'

export default function PostForm() {
    const dispatch = useDispatch();
    const [postText, setPostText] = useState('')
    const {user} = useSelector((state)=> state.auth)


    
    const onChange = (e) => {
        setPostText(e.target.value)
    }    

    const onSubmit = (e) => {
        e.preventDefault()
        const postData = {
            postText, 
            userId: user.id,
            book: {
                title: 'is this working', 
                author: 'hello', 
                pages: 1,
            }, 
            workout1: 'this is work out 1', 
            workout2: 'this is work out2', 
            progressPhoto: {
                photo: 'string', 
                private: true
            }, 
            alcohol: false,
            cleanEat: false, 
            createdAt: new Date()
        }
        dispatch(createPost(postData))
        setPostText('')

    }
    const [postModal, setPostModal] = useState(false)

  return (
    <div >
        <div className='post--form--container' >
            <div className='inner--form--container1'>
            {user && <Link to={`/users/${user.id}`} >{user.profileImage? <img src={user.profileImage} className='pp--post--form'/>:''}</Link>}
            <div onClick={()=>setPostModal(true)} className='post--input--container'>
                <input type="text" placeholder='Enter your daily activity!'/>
            </div>
            </div>

        </div>
        <PostModal postModal={postModal} setPostModal={setPostModal}/>
    </div>
  )
}
