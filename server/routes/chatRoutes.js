import express from 'express'
import { createChat } from '../controllers/ChatController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createChat)

export default router