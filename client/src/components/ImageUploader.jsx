import React, {useState, useRef} from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import { BiPhotoAlbum } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePic } from '../features/auth/authSlice';
import '../styles/components/ImageUploader.css'



export default function ImageUploader({ImageUploaderModal, setImageUploaderModal}) {
    const auth = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const theme = useMantineTheme();
    const postRef = useRef()

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
        size="lg"
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
                <p>Change Profile Photo</p>
                <input type="file" name="image" accept='image/' onChange={handleFileChange} placeholder='upload an image' ref={postRef} value={fileInputState}  className='hide--me'/>
                {!previewSource && 
                    <div className='Blank--Image' onClick={()=>postRef.current.click()}>
                        <BiPhotoAlbum />
                        <p>Add a photo</p> 
                    </div>}
                {previewSource && <img src={previewSource} alt='image' style={{height: '300px'}}/>}
                <div className='image--uploader--submit--container'>
                    <button onClick={handleSubmitFile} className='Post--Modal--Button'>Submit</button>
                </div>
                {/* <button onClick={handleSubmitFile}>Submit</button> */}
            </form>
            {/* {!previewSource && <div className='Blank--Image' onClick={()=>postRef.current.click()}>
                    <BiPhotoAlbum />
                    <p>Add a photo</p> 
                </div>}
            {previewSource && <img src={previewSource} alt='image'
                style={{height: '300px'}}
            />} */}
          </div>
      </Modal>
    );
  }