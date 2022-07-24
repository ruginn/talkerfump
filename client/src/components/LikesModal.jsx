import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import FollowerCard from './FollowerCard';
import { useSelector } from 'react-redux';



export default function LikesModal({likesModal, setLikesModal}) {
    const theme = useMantineTheme();
    const users = useSelector((state) => state.users.users)




  return (
    <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="30%"
        opened={likesModal}
        onClose={()=>setLikesModal(false)}
      >
          <div className='followers--modal--container'>
              <h1>Likes</h1>
              {users.map((user) => (
                  <FollowerCard user={user} key={user._id} setLikesModal={setLikesModal}/>
              ))}
              
          </div>
      </Modal>
  )
}
