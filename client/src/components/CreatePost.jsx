import {useSelector} from 'react-redux'
import {useState} from 'react'

import React from 'react'

export default function CreatePost() {
    const [postText, setPostText] = useState('')
    const {user} = useSelector((state)=> state.auth.user)

    const onChange = (e) => {
        setPostText({
            [e.target.name]: e.target.value
        })
        console.log(postText)
    }    

    const onSubmit = (e) => {
        e.preventDefault()
        
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <label htmlFor="postText">Whats poping {user.firstName}? </label>
            <input type="text" id='postText' name='postText' onChange={onChange}/> 
            <button>Submit</button>
        </form>
    </div>
  )
}
