import { Modal, useMantineTheme } from '@mantine/core';
import {useSelector, useDispatch} from 'react-redux'
import defaultCat from '../pictures/defaultCat.jpeg'
import {useState, useRef} from 'react'
import {BiBeer, BiPhotoAlbum} from 'react-icons/bi'
import {createPost} from '../features/posts/postSlice'
import { streak as updateStreak} from '../features/auth/authSlice';
import { setModalPage1, setModalPage2, setModalPage3, setModalPage4 } from '../features/general/generalSlice';
import '../styles/components/PostModal.css'
import {FiSun } from 'react-icons/fi'
import {GrRun } from 'react-icons/gr'
import {BsBook} from 'react-icons/bs'
import {TbBeerOff} from 'react-icons/tb'
import {GiForkKnifeSpoon} from 'react-icons/gi'
import {IoWaterOutline} from 'react-icons/io5'
import {AiOutlineCamera} from 'react-icons/ai'



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
        const alcoholVal = alcohol === 'No'? true: false 
        const eatVal = cleanEat === 'Yes'? true: false
        const waterVal = water === 'Yes' ? true: false 
        const photoVal = privatePhoto  === 'Yes' ? true: false
        const runVal = workout1 === '' ? false: workout1
        const sunVal = workout2 === '' ? false: workout2
        const bookVal = title === '' ? false: title

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
                title: bookVal,  
                author, 
                pages,
            }, 
            workout1: {
                exercise: runVal, 
                duration: duration1
            }, 
            workout2: {
                exercise: sunVal, 
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
        form1()
        setPreviewSource(false)
    }

    

    

    const form1 = () => {
        dispatch(setModalPage1())
    }
    const form2 = () => {
        dispatch(setModalPage2())

    }
    const form3 = () => {
        dispatch(setModalPage3())
    }

    const form4 = () => {
        dispatch(setModalPage4())
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
            setPreviewSource('')
            form1()
            }}
      >
          <div className='Post--Modal--Container'>
            <form className='Post--Form' onSubmit={handleSubmit}>
                <div className='Post--modal--icons'>
                    <button type='button' onClick={form1} className={modalPage === 1 ? 'active--tab':'not--active--tab'}>
                      <AiOutlineCamera className='camera--modal' />
                    </button>
                    <button type='button' onClick={form2} className={modalPage === 2 ? 'active--tab':'not--active--tab'}>
                        <GrRun className='run--modal'/>
                        <FiSun className='sun--modal'/>
                    </button>
                    <button type='button' onClick={form3} className={modalPage === 3 ? 'active--tab':'not--active--tab'}>
                        <BsBook className='book--modal'/> 
                    </button>
                    <button type='button' onClick={form4} className={modalPage === 4 ? 'active--tab':'not--active--tab'}>
                        <GiForkKnifeSpoon className='spoon--modal'/>
                        <IoWaterOutline className='water--modal'/> 
                        <TbBeerOff className='beer--modal'/>
                    </button>
                </div>
                
                {modalPage === 1 && <div>
                <div className='Post--Modal--Main'>
                <h2 htmlFor="post">Hi {user && user.firstName}, let's log your daily activity!</h2>
                <input type="text" id='post' name='post' onChange={onChange2} value={post} className='post-general' placeholder="Tell us about your day..."/> 
                <h3>Progress Photo</h3>
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
                <input type="file" name="image" accept='image/' onChange={handleFileChange} placeholder='upload an image' ref={postRef} className='hide--me'/>
                {/* value={fileInputState} */}
                {/* {previewSource && <img src={previewSource} alt='image' value={previewSource}
                style={{height: '300px'}}
                />} */}
                <h4>Would you like to keep this photo private?</h4>
                <label htmlFor="photoYes">Yes</label>
                <input type="radio" name='privatePhoto' id='photoYes' value='Yes' onChange={onChange2} checked={privatePhoto === 'Yes'} />
                <label htmlFor="photoNo">No</label>
                <input type="radio" name='privatePhoto' id='photoNo' value='No' onChange={onChange2} checked={privatePhoto === 'No'}/>
                </div>
                
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={form2} className='Post--Modal--Button'>Next</button>  
                </div>
                </div>}
                
                {modalPage === 2 && <div >
                <div className='Post--Modal--Main'>
                    <h4>What exercises did you do today?</h4>
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
                </div>
                
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={form1} className='Post--Modal--Button'>Back</button>
                    <button type='button' onClick={form3} className='Post--Modal--Button'>Next</button>
                </div>
                </div>}

                {modalPage === 3  && <div>
                <div className='Post--Modal--Main'>
                    <h4>What did you read today?</h4>
                    <div className='Reading--List'>
                        <label htmlFor="title">Book Title</label>
                        <input type="text" name='title' onChange={onChange2} value={title}  id='title'/>
                        <label htmlFor="author">Author</label>
                        <input type="text" name='author' onChange={onChange2} value={author}  id='author'/>
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
                
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={form2} className='Post--Modal--Button'>Back</button>
                    <button type='button' onClick={form4} className='Post--Modal--Button'>Next</button> 
                </div>
                </div> }

                {modalPage === 4 && <div >
                <div className='Post--Modal--Main'>
                    <h4>Did you drink alcohol today?</h4>
                    <label htmlFor="alcoholYes">Yes</label>
                    {/* <input type="checkbox" value={alcohol} onChange={onChange2} checked={alcohol} name='alcohol'/> */}
                    <input type="radio" name='alcohol' id='alcoholYes' value='Yes' onChange={onChange2} checked={alcohol === 'Yes'} />
                    <label htmlFor="alcoholNo">No</label>
                    <input type="radio" name='alcohol' id='alcoholNo' value='No' onChange={onChange2} checked={alcohol === 'No'}/> 
                    
                    <h4>Did you follow your diet today?</h4>
                    <label htmlFor="eatYes">Yes</label>
                    <input type="radio" name='cleanEat' id='eatYes' value='Yes' onChange={onChange2} checked={cleanEat === 'Yes'} />
                    <label htmlFor="eatNo">No</label>
                    <input type="radio" name='cleanEat' id='eatNo' value='No' onChange={onChange2} checked={cleanEat === 'No'}/>
                    
                    <h4>Did you drink a gallon of water today?</h4>
                    <label htmlFor="waterYes">Yes</label>
                    <input type="radio" name='water' id='waterYes' value='Yes' onChange={onChange2} checked={water === 'Yes'} />
                    <label htmlFor="waterNo">No</label>
                    <input type="radio" name='water' id='waterNo' value='No' onChange={onChange2} checked={water === 'No'}/>
                    <br />
                </div>
                
                <div className='Post--Modal--Bottom'>
                    <button type='button' onClick={form3} className='Post--Modal--Button'>Back</button>
                    <button className='Post--Modal--Button submit--button' >Post</button>
                </div>
                </div>}
            </form>

          </div>
      </Modal>
    );
  }