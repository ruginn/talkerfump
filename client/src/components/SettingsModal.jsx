import { Modal, useMantineTheme } from '@mantine/core';
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/components/SettingsModal.css'
import { updateAuth } from '../features/auth/authSlice';

export default function SettingsModal({settingsModal, setSettingsModal, hello}) {
  const dispatch = useDispatch()
  const theme = useMantineTheme();
  const user = useSelector((state) => state.auth.user)
  const {firstName, lastName, username, email, aboutMe} = user

  const [userInfo, setUserInfo] = useState({
    firstName, 
    lastName, 
    username, 
    email, 
    aboutMe, 
  })

  const onChange = (e) => {
    setUserInfo((prev) => (
      {
        ...prev, 
        [e.target.name]: e.target.value
      }
    ))
  }


  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateAuth(userInfo))
  }

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="lg"
      opened={settingsModal}
      onClose={()=>setSettingsModal(false)}
    >
        <div className='settings--container'>
            <h1>Settings</h1>
            <form type='Submit' className='settings--form--container'>

                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' name='firstName' value={userInfo.firstName} onChange={onChange} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' name='lastName' value={userInfo.lastName} onChange={onChange} />
                <label htmlFor="username">Username</label>
                <input type="text" id='username' name='username' value={userInfo.username} onChange={onChange} />
                <label htmlFor="email">Email</label>
                <input type="text" id='email' name='email' value={userInfo.email} onChange={onChange} />
                <label htmlFor="aboutMe">About Me</label>
                <input type="text" id='aboutMe' name='aboutMe' value={userInfo.aboutMe} onChange={onChange} />
              <button onClick={onSubmit}>Update</button>
            </form>
        </div>
    </Modal>
  );
}
