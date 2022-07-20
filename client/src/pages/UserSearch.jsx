import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {getUsers} from '../features/users/userSlice'
import UserCard from '../components/UserCard'

export default function UserSearch() {
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    
  return (
    <div>
        <h6>This is a list of our users</h6>
        <section>
            {users.length > 0 ? (
                <div className='users--container'>
                    {users.map((user) => (
                        <UserCard key={user._id} user={user}/>
            ))}
                </div>
            ): (<p>there are no users</p>)}
        </section>
    </div>
  )
}
