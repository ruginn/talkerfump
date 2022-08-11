import { Modal, useMantineTheme } from '@mantine/core';
import { useSelector } from 'react-redux';
import FollowerCard from './FollowerCard';

export default function FollowingModal({followingModal, setFollowingModal, username}) {
    const theme = useMantineTheme();
    const users = useSelector((state) => state.users.users)

    return (
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="30%"
        opened={followingModal}
        onClose={()=>setFollowingModal(false)}
      >
          <div className='followers--modal--container'>
              <h1>Following</h1>
              {users.map((user) => (
                  <FollowerCard user={user} key={user._id} setFollowingModal={setFollowingModal}/>
              ))}
              
          </div>
      </Modal>
    );
}