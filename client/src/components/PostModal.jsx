import { Modal, useMantineTheme } from '@mantine/core';
import {useSelector, useDispatch} from 'react-redux'
import defaultCat from '../pictures/defaultCat.jpeg'
import {useState, useRef} from 'react'
import {BiPhotoAlbum} from 'react-icons/bi'
import {createPost} from '../features/posts/postSlice'
import { streak as updateStreak} from '../features/auth/authSlice';
import { setModalPage1, setModalPage2, setModalPage3 } from '../features/general/generalSlice';
import '../styles/components/PostModal.css'



export default function PostModal({postModal, setPostModal}) {
    const theme = useMantineTheme();
    const postRef = useRef()


    const dispatch = useDispatch();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setselectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const modalPage = useSelector((state) => state.general.modalPage)

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

   const compareDates = (mDate, createdAt) => {
   // checks if user is still in streak 
    // takes last day entered and converts to the begining of the day
    const streakDate = new Date(user.day?.date)
    const streakDateNoTime = streakDate.setHours(0, 0, 0, 0)

    // sets the post day to the beginning of the day
    let postDateM = new Date(mDate)
    postDateM  = new Date(postDateM.setHours(0, 0, 0, 0))
    

    // converts post day yesterday without setting the mDate into the yesterday
    let yesterdayYear = postDateM.getFullYear()
    let yesterdayDate = postDateM.getDate() - 1
    let yesterdayMonth = postDateM.getMonth()
    let yesterday = new Date(yesterdayYear, yesterdayMonth, yesterdayDate)


    // compares to see if post day is the same as last post, yesterday, or another day breaking streak
    if(yesterday.toString() === new Date(streakDateNoTime).toString()){
        console.log('yesterday')
        return {day: {streak: user.day.streak + 1, date: createdAt }}
    } else if(postDateM.toString() === new Date(streakDateNoTime).toString()){
        console.log('same day')
        return {day: {streak: user.day.streak,  date: createdAt }}
    } else{
        console.log('streak broken')
        return {day: {streak: 1, date: createdAt }}
    } 
   }




    const onSubmit = async(base64EncodedImage) => {
        const alcoholVal = alcohol === 'Yes'? true: false 
        const eatVal = cleanEat === 'Yes'? true: false
        const waterVal = water === 'Yes' ? true: false 
        const photoVal = privatePhoto  === 'Yes' ? true: false
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        const createdAt = new Date()
        const mDate = new Date()
        const streak = compareDates(mDate, createdAt)


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
            streak: streak.day,
            streakDay : streak.day.streak, 
            alcohol: alcoholVal,
            cleanEat: eatVal, 
            water: waterVal, 
            privatePhoto: photoVal,
            createdAt, 
            mDate,

        }
        dispatch(createPost(postData))
        dispatch(updateStreak(streak.day))
        setPostModal(false)
        setFormData({
            duration1: 45, 
            duration2: 45, 
            pages: 10, 
            alcohol: false,
            cleanEat: true, 
            water: true, 
        })
        setBlockOne(true)
        setBlockTwo(false)
        setBlockThree(false)
        setPreviewSource(false)
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
        size="lg"
        opened={postModal}
        onClose={()=>{
            setPostModal(false) 
            setselectedFile('')
            setFileInputState('')
            setPreviewSource('')}}
      >
          <div className='Post--Modal--Container'>
            <hr />
            <form className='Post--Form' onSubmit={handleSubmit}>
                {blockOne && <div>
                <div className='Post--Modal--Main'>
                <label htmlFor="post">Hi {user && user.firstName}, let's log your daily activity!</label>
                <br></br>
                <input type="text" id='post' name='post' onChange={onChange2} value={post} className='post-general' placeholder="I'm having a good day! :)"/> 
                <p>Progress Photo</p>
                {!previewSource && <div className='Blank--Image' onClick={()=>postRef.current.click()}>
                    <BiPhotoAlbum />
                    <p>Add a photo</p> 
                </div>}
                {previewSource && 
                <div className='post--modal--image--div'>
                 <img src={previewSource} value={previewSource} className='Post--Modal--Image' />
                 <p onClick={()=>(setPreviewSource(false))}>x</p>
                </div>
                }
                <br></br>
                <input type="file" name="image" accept='image/' onChange={handleFileChange} placeholder='upload an image' ref={postRef} className='hide--me'/>
                {/* value={fileInputState} */}
                <br></br>
                {/* {previewSource && <img src={previewSource} alt='image' value={previewSource}
                style={{height: '300px'}}
                />} */}
                <p>Would you like to keep this photo private?</p>
                <label htmlFor="photoYes">Yes</label>
                <input type="radio" name='privatePhoto' id='photoYes' value='Yes' onChange={onChange2} checked={privatePhoto === 'Yes'} />
                <label htmlFor="photoNo">No</label>
                <input type="radio" name='privatePhoto' id='photoNo' value='No' onChange={onChange2} checked={privatePhoto === 'No'}/>
                {/* <p>What did you read today?</p>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' onChange={onChange2} value={title} placeholder='The Alchemist' id='title'/>
                <br></br>
                <label htmlFor="author">Author</label>
                <input type="text" name='author' onChange={onChange2} value={author} placeholder='Paulo Coelho' id='author'/>
                <br></br>
                <input type="number" id='pages' onChange={onChange2} value={pages} name='pages'/>
                <label htmlFor="pages">Pages</label>
                <br></br> */}
                </div>
                <div className='Post--Progress--Bar'>
                    <div className='Post-Progress--Line'>
                        <div className='Progress--Cir Circ-1 Circ--Active'></div>
                        <div className='Progress--Cir Circ-2'></div>
                        <div className='Progress--Cir Circ-3'></div>
                    </div> 
                </div>
                {/* <div className='Post-Progress--Line'>
                    <div className='Progress--Cir Circ-1'></div>
                    <div className='Progress--Cir Circ-2'></div>
                    <div className='Progress--Cir Circ-3'></div>
                </div>  */}
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={blockOneControl} className='Post--Modal--Button'>Next</button>  
                </div>
                </div>}
                {blockTwo  && <div>
                <div className='Post--Modal--Main'>
                    <p>What did you read today?</p>
                    <div className='Reading--List'>
                        <label htmlFor="title">Book Title</label>
                        <input type="text" name='title' onChange={onChange2} value={title} placeholder='The Alchemist' id='title'/>
                        <label htmlFor="author">Author</label>
                        <input type="text" name='author' onChange={onChange2} value={author} placeholder='Paulo Coelho' id='author'/>
                        <label htmlFor='pages'>Pages Read</label>
                        <input type="number" id='pages' onChange={onChange2} value={pages} name='pages'/>
                    </div>
                    {/* <p>What exercises did you do today?</p>
                    <label htmlFor="workout1">Exercise</label>
                    <input type="text" name='workout1' onChange={onChange2} value={workout1} id='workout1' />
                    <input type="number" name='duration1' onChange={onChange2} value={duration1} id='duration1'/>
                    <label htmlFor="duration1">Minutes</label>
                    <br />
                    <label htmlFor="workout2">Outside exercise</label>
                    <input type="text" name='workout2' onChange={onChange2} value={workout2} id='workout2'/>
                    <input type="number" name='duration2' onChange={onChange2} value={duration2} id='duration2'/>
                    <label htmlFor="duration2">Minutes</label>
                    <br /> */}
                </div>
                <div className='Post--Progress--Bar'>
                    <div className='Post-Progress--Line'>
                        <div className='Progress--Cir Circ-1 Circ--Active'></div>
                        <div className='Progress--Cir Circ-2 Circ--Active'></div>
                        <div className='Progress--Cir Circ-3'></div>
                    </div> 
                </div>
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={blockOneControl} className='Post--Modal--Button'>Back</button>
                    <button type='button' onClick={blockTwoControl} className='Post--Modal--Button'>Next</button> 
                </div>
                </div> }
                {blockThree && <div >
                <div className='Post--Modal--Main'>
                    <p>What exercises did you do today?</p>
                    <div className='Workout--Block'>
                        <label htmlFor="workout1">Exercise</label>
                        <input type="text" name='workout1' onChange={onChange2} value={workout1} id='workout1' />
                        <input type="number" name='duration1' onChange={onChange2} value={duration1} id='duration1'/>
                        <label htmlFor="duration1">Minutes</label>  
                        <label htmlFor="workout2">Outside exercise</label>
                        <input type="text" name='workout2' onChange={onChange2} value={workout2} id='workout2'/>
                        <input type="number" name='duration2' onChange={onChange2} value={duration2} id='duration2'/>
                        <label htmlFor="duration2">Minutes</label>
                    </div>
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
                </div>
                <div className='Post--Progress--Bar'>
                    <div className='Post-Progress--Line'>
                        <div className='Progress--Cir Circ-1 Circ--Active'></div>
                        <div className='Progress--Cir Circ-2 Circ--Active'></div>
                        <div className='Progress--Cir Circ-3 Circ--Active'></div>
                    </div> 
                </div>
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={blockTwoControl} className='Post--Modal--Button'>Back</button>
                    <button className='Post--Modal--Button' >Submit</button>
                </div>
                </div>}
            </form>
          </div>
      </Modal>
    );
  }