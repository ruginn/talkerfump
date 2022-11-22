import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {getUsers} from '../features/users/userSlice'
import UserCard from '../components/UserCard'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import '../styles/pages/UserSearch.css'

export default function UserSearch() {
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const {user} = useSelector((state)=> state.auth)
    const navigate = useNavigate()

    useEffect(()=> {
        if(!user){
        navigate('/login')
        }
    }, [])

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    
  return (
    <div>
    <SearchBar /> 
        <section className='userSearch--main'>
            {users.length > 0 ? (
                <div className='usersearch--container'>
                    {users.map((user) => (
                        <UserCard key={user._id} user={user}/>
            ))}
                </div>
            ): (<p>there are no users</p>)}
        </section>
    </div>
  )
}
