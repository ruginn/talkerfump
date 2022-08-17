import express from 'express'
import { registerUser, loginUser, updateUser, uploadProfilePicture , updateProfilePicture} from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update', protect, updateUser)
router.post('/uploadProfilePicture', protect, uploadProfilePicture)
router.post('/updateprofilepic', protect, updateProfilePicture)


export default router

