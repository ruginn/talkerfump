import { Modal, useMantineTheme } from '@mantine/core';
import { useSelector } from 'react-redux';
import FollowerCard from './FollowerCard';

export default function FollowersModal({followersModal, setFollowersModal, username}) {
    const theme = useMantineTheme();
    const users = useSelector((state) => state.users.users)
    

    
    return (
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="lg"
        opened={followersModal}
        onClose={()=>setFollowersModal(false)}
      >
          <div className='followers--modal--container'>
              <h1>{username}'s Followers</h1>
              {users.map((user) => (
                  <FollowerCard user={user} key={user._id} setFollowersModal={setFollowersModal}/>
              ))}
              
          </div>
      </Modal>
    );
}



{/* <div >
                {posts.map((post) => (
                  <Post key={post._id} post= {post}/>
                ))}
              </div> */}
