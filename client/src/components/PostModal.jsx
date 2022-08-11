import { Modal, useMantineTheme } from '@mantine/core';
import {useSelector, useDispatch} from 'react-redux'
import {useState} from 'react'
import {createPost} from '../features/posts/postSlice'



export default function PostModal({postModal, setPostModal}) {
    const theme = useMantineTheme();

    const dispatch = useDispatch();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setselectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')


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

    const {user} = useSelector((state)=> state.auth)

    const [formData, setFormData] = useState({
        post: '',
        workout1: '',
        duration1: 45, 
        duration2: 45, 
        workout2: '', 
        title: '',
        author: '', 
        pages: 10, 
        photo: '', 
        privatePhoto: '',   
        alcohol: false,
        cleanEat: true, 
        water: true, 
    })


    const { post, workout1, workout2, title, author, pages, photo, privatePhoto, alcohol, cleanEat, duration1, duration2, water} = formData


    const onChange2 = (e) => {
        const {name, value, type, checked} = e.target
        setFormData((prevState) => (
            {
            ...prevState, 
            [name]: type === 'checkbox' ? checked: value
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault() 
        if(!previewFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile)
        reader.onloadend = () => {
            onSubmit(reader.result);
        }
        reader.onerror = () => {
            console.error('oh no')
        }
    }


    const onSubmit = async(base64EncodedImage) => {
        const alcoholVal = alcohol === 'Yes'? true: false 
        const eatVal = cleanEat === 'Yes'? true: false
        const waterVal = water === 'Yes' ? true: false 
        const photoVal = privatePhoto  === 'Yes' ? true: false
        const date = new Date()
        const dateYMD = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        // e.preventDefault()
        const postData = {
            datatron: base64EncodedImage, 
            postText: post, 
            userId: user.id,
            book: {
                title,  
                author, 
                pages,
            }, 
            workout1: {
                exercise: workout1, 
                duration: duration1
            }, 
            workout2: {
                exercise: workout2, 
                duration: duration2
            }, 
            progressPhoto: {
                photo: 'string', 
                private: photoVal
            }, 
            alcohol: alcoholVal,
            cleanEat: eatVal, 
            water: waterVal, 
            privatePhoto: photoVal,
            createdAt: dateYMD
        }
        dispatch(createPost(postData))
        setPostModal(false)
        // setFormData({
        //     duration1: 45, 
        //     duration2: 45, 
        //     pages: 10, 
        //     alcohol: false,
        //     cleanEat: true, 
        //     water: true, 
        // })
    }

    const [blockOne, setBlockOne] = useState(true)
    const [blockTwo, setBlockTwo] = useState(false)
    const [blockThree, setBlockThree] = useState(false)


    const blockOneControl = () => {
        setBlockOne((prev) => !prev)
        setBlockTwo((prev) => !prev)
    }

    const blockTwoControl = () => {
        setBlockTwo((prev) => !prev)
        setBlockThree((prev) => !prev)
    }

    return (
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={postModal}
        onClose={()=>{
            setPostModal(false) 
            setselectedFile('')
            setFileInputState('')
            setPreviewSource('')}}
      >
          <div className='settings--container'>
            <h1>Journal Your Daily Entry</h1>
            <form onSubmit={handleSubmit}>
                {blockOne && <div>
                <label htmlFor="post">Whats poping {user && user.firstName}? </label>
                <input type="text" id='post' name='post' onChange={onChange2} value={post}  placeholder="I'm having a good day! :)"/> 
                <input type="file" name="image" accept='image/' onChange={handleFileChange} placeholder='upload an image'  />
                {/* value={fileInputState} */}
                {previewSource && <img src={previewSource} alt='image' value={previewSource}
                style={{height: '300px'}}
                />}
                <p>Would you like to keep this photo private?</p>
                <label htmlFor="photoYes">Yes</label>
                <input type="radio" name='privatePhoto' id='photoYes' value='Yes' onChange={onChange2} checked={privatePhoto === 'Yes'} />
                <label htmlFor="photoNo">No</label>
                <input type="radio" name='privatePhoto' id='photoNo' value='No' onChange={onChange2} checked={privatePhoto === 'No'}/>
                <p>What did you read today?</p>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' onChange={onChange2} value={title} placeholder='The Alchemist' id='title'/>
                <label htmlFor="author">Title</label>
                <input type="text" name='author' onChange={onChange2} value={author} placeholder='Paulo Coelho' id='author'/>
                <input type="number" id='pages' onChange={onChange2} value={pages} name='pages'/>
                <label htmlFor="pages">Pages</label>
                <button type='button' onClick={blockOneControl}>Next</button>
                </div>}
                {blockTwo  && <div>
                <p>What exercises did you do today?</p>
                <label htmlFor="workout1">Exercise</label>
                <input type="text" name='workout1' onChange={onChange2} value={workout1} id='workout1' />
                <input type="number" name='duration1' onChange={onChange2} value={duration1} id='duration1'/>
                <label htmlFor="duration1">Minutes</label>
                <br />
                <label htmlFor="workout2">Outside exercise</label>
                <input type="text" name='workout2' onChange={onChange2} value={workout2} id='workout2'/>
                <input type="number" name='duration2' onChange={onChange2} value={duration2} id='duration2'/>
                <label htmlFor="duration2">Minutes</label>
                <br />
                <button type='button' onClick={blockOneControl}>Back</button>
                <button type='button' onClick={blockTwoControl}>Next</button>
                </div> }
                {blockThree && <div>
                <p>Did you drink alcohol today?</p>
                <label htmlFor="alcoholYes">Yes</label>
                {/* <input type="checkbox" value={alcohol} onChange={onChange2} checked={alcohol} name='alcohol'/> */}
                <input type="radio" name='alcohol' id='alcoholYes' value='Yes' onChange={onChange2} checked={alcohol === 'Yes'} />
                <label htmlFor="alcoholNo">No</label>
                <input type="radio" name='alcohol' id='alcoholNo' value='No' onChange={onChange2} checked={alcohol === 'No'}/> 
                
                <p>Did you follow your diet today?</p>
                <label htmlFor="eatYes">Yes</label>
                <input type="radio" name='cleanEat' id='eatYes' value='Yes' onChange={onChange2} checked={cleanEat === 'Yes'} />
                <label htmlFor="eatNo">No</label>
                <input type="radio" name='cleanEat' id='eatNo' value='No' onChange={onChange2} checked={cleanEat === 'No'}/>
                
                <p>Did you drink a gallon of water today?</p>
                <label htmlFor="waterYes">Yes</label>
                <input type="radio" name='water' id='waterYes' value='Yes' onChange={onChange2} checked={water === 'Yes'} />
                <label htmlFor="waterNo">No</label>
                <input type="radio" name='water' id='waterNo' value='No' onChange={onChange2} checked={water === 'No'}/>
                <br />
                <button type='button' onClick={blockTwoControl}>Back</button>
                <button>Submit</button>
                </div>}
            </form>
          </div>
      </Modal>
    );
  }