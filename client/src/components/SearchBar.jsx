import {useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import { searchUsers } from '../features/users/userSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/components/SearchBar.css'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        dispatch(searchUsers(searchPara)).then(navigate('/users'))
        
        console.log('it has been submitted')
    }

    useEffect(() => {
        console.log(searchPara)
    },[searchPara])
    

    const searchRef = useRef()

    const onSearchClick = () =>{
        searchRef.current.focus()
    }

    return (
    <div >
        <form onSubmit={searchSubmit} className='search--bar' onClick={onSearchClick}>
            <AiOutlineSearch/>
            <input ref ={searchRef} type="text" value={para} name='para' placeholder='Search...' onChange={onChange}/>
            {/* <button type='submit'>Search</button> */}
        </form>
    </div>
  )
}
