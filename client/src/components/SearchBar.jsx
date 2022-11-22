import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../features/users/userSlice'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [searchPara, setSearchPara] = useState({
        para: ''
    })

    const {para} = searchPara
    const onChange = (e) => {
        setSearchPara((prev) => (
            {
            ...prev, 
            [e.target.name]: e.target.value      
            }
        ))
    }
    
    const searchSubmit = (e) => {
        e.preventDefault()
        dispatch(searchUsers(searchPara))
        console.log('it has been submitted')
    }

    useEffect(() => {
        console.log(searchPara)
    },[searchPara])
    

    return (
    <div>
        <form onSubmit={searchSubmit}>
            <input type="text" value={para} name='para' placeholder='search for a user' onChange={onChange}/>
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}
