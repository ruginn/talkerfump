import React, {useState} from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePic } from '../features/auth/authSlice';



export default function ImageUploader({ImageUploaderModal, setImageUploaderModal}) {
    const auth = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const theme = useMantineTheme();

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setselectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const [imageUrl, setImageUrl] = useState('')


    
    const handleFileChange = ({target}) => {
        const file = target.files[0]
        previewFile(file);
        setselectedFile(file)
        setFileInputState(target.value)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault() 
        if(!previewFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
            uploadImage(reader.result, auth.id, auth.token);
        }
        reader.onerror = () => {
            console.error('oh no')
        }
        setImageUploaderModal(false)
    }

    const uploadImage = async (base64EncodedImage, userId, token) => {
        try {
            await fetch('http://localhost:8080/api/auth/updateprofilepic', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage,  userId: auth.id}),
                headers: { 'Content-Type': 'application/json', 
                            'Authorization': `Bearer ${token}`},
            }).then(response => response.json()).then(data => dispatch(updateProfilePic(data)))
        } catch (error) {
            
        }
       
    }

   


  return (
    <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="30%"
        opened={ImageUploaderModal}
        onClose={()=>{
            setImageUploaderModal(false)
            setselectedFile('')
            setFileInputState('')
            setPreviewSource('')
            }}
      >
          <div className='image--uploader'>
            <form type='submit'>
                <input type="file" name="image" accept='image/' onChange={handleFileChange} placeholder='upload an image' value={fileInputState} />
                <button onClick={handleSubmitFile}>Submit</button>
            </form>
            {previewSource && <img src={previewSource} alt='image'
                style={{height: '300px'}}
            />}
          </div>
      </Modal>
    );
  }