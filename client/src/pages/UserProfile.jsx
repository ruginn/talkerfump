import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import { getUser, followUser, unfollowUser, findFollowers, findFollowing } from '../features/users/userSlice'
import profilePic from '../pictures/defaultCat.jpeg'
import Spinner from '../components/Spinner'
import { getUserPosts } from '../features/posts/postSlice'
import Post from '../components/Post'
import {  following, unfollowing} from '../features/auth/authSlice'
import FollowersModal from '../components/FollowersModal'
import FollowingModal from '../components/FollowingModal'


export default function UserProfile() {
    const params = useParams()
    const dispatch = useDispatch()

    const userId = params.userId
    const auth = useSelector((state) => state.auth.user)
    const {user, isLoading} = useSelector((state) => state.users)
    const {posts} = useSelector((state) => state.post)
    
    

    useEffect(() => {
      dispatch(getUser(userId))
      dispatch(getUserPosts(userId))
    }, [userId, dispatch])
    


    const onFollow =  () => {
      dispatch(followUser(userId))
      if (auth.id !== userId){
        dispatch(following(userId))
      } else {
        alert ('you can not follow yourself')
      }
    }
  
    const onUnfollow = () => {
      dispatch(unfollowUser(userId))
      dispatch(unfollowing(userId))
    }


    const [followersModal, setFollowersModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)
    

    const openFollowersModal = () => {
      dispatch(findFollowers(userId))
      setFollowersModal(true)
    }

    const openFollowingModal = () => {
      dispatch(findFollowing(userId))
      setFollowingModal(true)
      
    }


  return (
    <div>
      {user && 
        <div>
          <img src= {user.profileImage? user.profileImage: profilePic} alt="" className='profile--pic'/>
          
          <h3>@{user && user.username}</h3>
          <p>{posts&& posts.length} posts</p>
          <span onClick={openFollowersModal}>{user && user.followers.length} followers </span>
          <span onClick={openFollowingModal}>{user && user.following.length} following</span> 

          <br />
          {auth.id !== params.userId?
            user && user.followers.includes(auth.id)? 
              <button onClick={onUnfollow}>Unfollow</button>: 
              <button onClick={onFollow}>Follow</button>  : 
              <button>Edit Profile</button>
          }
          <section className='content'>
          {isLoading && <Spinner />}
            {posts.length > 0 ? (
              <div >
                {posts.map((post) => (
                  <Post key={post._id} post= {post}/>
                ))}
              </div>
            ) : (
              <h3>You have not set any post</h3>
            )}
         </section>
        </div> 

      }
      {user && <FollowersModal followersModal={followersModal} setFollowersModal={setFollowersModal} username= {user.username}/>}
      {user && <FollowingModal followingModal={followingModal} setFollowingModal={setFollowingModal} username= {user.username}/>}
    </div>
  )
}
