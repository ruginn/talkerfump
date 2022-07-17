import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { logout, reset, updateAuth} from '../features/auth/authSlice'
import PostForm from '../components/PostForm'
import { getTimeline} from '../features/posts/postSlice'
import Post from '../components/Post'
import Spinner from '../components/Spinner'
import { reset as reset2 } from '../features/posts/postSlice'
import { getUser } from '../features/users/userSlice'

export default function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {user} = useSelector((state)=> state.auth)
    const {posts, isLoading, isError, isSuccess} = useSelector((state)=> state.post) 

    useEffect(()=> {
       if(!user){
        navigate('/login')
       }
       dispatch(getTimeline())
    }, [navigate])
    
    // user, navigate, isError
    
    // if(posts){
    //   const userPosts = 
    // }


    const onLogout = () =>  {
      dispatch(logout())
      dispatch(reset())
      dispatch(reset2())
      navigate('/login')
    }

    

  return (
    <div>
    {/* Need to see if user exist before using, as it will say user is null and can not retrieve user.${whatever} */}
        {/* <button onClick={onLogout}>Logout</button> */}
        <h3>Welcome {user && user.firstName}</h3>
        {/* <p>{posts.length} posts</p> */}
        <span>{user && user.followers.length} followers </span>
        <span>{user && user.following.length} following</span>
        <PostForm />
        <section className='content'>
          {posts.length > 0 ? (
            <div >
              {posts.map((post) => (
                <Post key={post._id} post= {post}/>
              ))}
            </div>
          ) : (
            <h3>You have not created any post</h3>
          )}
        </section>
    </div>
    
  )
}
