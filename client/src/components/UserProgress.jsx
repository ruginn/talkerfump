import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import '../styles/components/UserProgress.css'

export default function UserProgress() {
  const user = useSelector((state) => state.users.user)
  let [percentCompleted, setPercentCompleted] = useState(0)
  
  useEffect(() => {
    if(user?.day){
      if(user?.day.streak){
        setPercentCompleted((user?.day?.streak/75) * 360)
      }
    }
  }, [user])

  

  return (
    <div>
        {user?.day && <div className='outer--circle' style={{background : `conic-gradient(blue ${percentCompleted}deg, rgb(221, 221, 221) ${percentCompleted}deg )`}}>
            <div className='inner--circle'>
              <b>{user?.day ? user.day.streak: 0}/75</b>
              <p className='M0'>Days</p>
            </div>
          {user.book}
        </div>}
    </div>
  )
}
