import { Modal, useMantineTheme } from '@mantine/core';
import '../styles/components/SettingsModal.css'


export default function SettingsModal({settingsModal, setSettingsModal, hello}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={settingsModal}
      onClose={()=>setSettingsModal(false)}
    >
        <div className='settings--container'>
            <h1>Settings</h1>
            <form >
                <label htmlFor="name">First Name</label>
                <input type="text" id='name' name='name'/>
                <h1 className='testing'>{hello}</h1>
                <h2>this is a test</h2>
            </form>
        </div>
    </Modal>
  );
}
