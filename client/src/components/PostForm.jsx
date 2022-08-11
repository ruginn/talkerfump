import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {createPost} from '../features/posts/postSlice'


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
  return (
    <div>
        <form onSubmit={onSubmit}>
            <label htmlFor="postText">Whats poping {user && user.firstName}? </label>
            <input type="text" id='postText' name='postText' onChange={onChange} value={postText}  placeholder="I'm having a good day! :)"/> 
            <button>Submit</button>
        </form>
    </div>
  )
}
