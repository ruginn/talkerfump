import express from 'express'
import { createChat, createMessage, findChat, getMessages, getUserChats,setMessageSeen } from '../controllers/ChatController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createChat)
router.get('/', protect, getUserChats)
router.get('/:id',  findChat)
router.post('/:id/message', protect, createMessage)
router.get('/:id/getmessages', protect, getMessages)
router.put('/:id/setseen', setMessageSeen)


export default router