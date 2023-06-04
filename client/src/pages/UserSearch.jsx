import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {getUsers} from '../features/users/userSlice'
import UserCard from '../components/UserCard'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import '../styles/pages/UserSearch.css'
import {setTopBarTrue} from '../features/general/generalSlice'

export default function UserSearch() {
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()

    useEffect(()=> {
        if(!user){
        navigate('/login')
        }
        dispatch(setTopBarTrue())
    }, [])

    // useEffect(() => {
    //     dispatch(getUsers())
    // }, [dispatch])
    
  return (
    <div>
    {/* <SearchBar />  */}
        <section className='userSearch--main'>
            {users.length > 0 ? (
                <div className='usersearch--container'>
                    {users.map((user) => (
                        <UserCard key={user._id} user={user}/>
            ))}
                </div>
            ): (<p>We could not find any related users</p>)}
        </section>
    </div>
  )
}
